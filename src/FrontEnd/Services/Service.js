import React, { useState } from 'react';
import './Service.css';
import { useParams } from 'react-router-dom';  // Import to get URL params
import image from "../../assets/service.svg";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaFacebook, FaEnvelope, FaInstagram, FaLinkedin, FaTwitter, FaTimes } from 'react-icons/fa';

const Services = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        serviceType: ''  // Add serviceType to formData
    });

    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [nameError, setNameError] = useState(''); // Add state for name error
    const [showIcons, setShowIcons] = useState(false);

    const { serviceType } = useParams();  // Get serviceType from URL

    const validateEmail = (email) => {
        const emailParts = email.split('@');
        if (emailParts.length !== 2) return false;

        const domainParts = emailParts[1].split('.');
        if (domainParts.length < 2 || domainParts[domainParts.length - 1].length < 2 || domainParts[domainParts.length - 1].length > 3) {
            return false;
        }

        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validate Name Field: Only letters and spaces are allowed
        if (name === "name") {
            const nameRegex = /^[a-zA-Z\s]*$/;
            if (!nameRegex.test(value)) {
                setNameError('Name can only contain alphabetic characters.');
                setTimeout(() => {
                    setNameError(''); // Clear the error message after 3 seconds
                }, 3000);
                return; // Stop further execution if validation fails
            }
        }

        // Validate Email
        if (name === "email") {
            if (!validateEmail(value)) {
                setErrorMessage('Please enter a valid email address.');
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            } else {
                setErrorMessage('');
            }
        }

        // Validate Mobile Number: Only digits are allowed
        if (name === "mobile") {
            const cleanedValue = value.replace(/[^0-9]/g, ""); // Removes non-numeric characters
            if (value !== cleanedValue) {
                setMobileError("Please enter numbers only.");
                setTimeout(() => {
                    setMobileError('');
                }, 3000);
            } else {
                setMobileError('');
            }
            setFormData({ ...formData, [name]: cleanedValue });  // Ensure only numbers are set in mobile field
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if mobile has errors or is empty
        if (mobileError || formData.mobile === '') {
            setMobileError('Please enter a valid mobile number');
            setTimeout(() => {
                setMobileError(''); // Clear the error message after 3 seconds
            }, 3000);
            return;
        }

        // Email validation
        if (!validateEmail(formData.email)) {
            setErrorMessage('Please enter a valid email address.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        // Submit the form
        const formWithServiceType = { ...formData, serviceType };

        axios.post('http://77.37.125.30:5000/other-services', formWithServiceType)
            .then((response) => {
                setSuccessMessage(true);
                setFormData({
                    name: '',
                    email: '',
                    mobile: '',
                    serviceType: ''
                });
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 3000);
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
            });
    };

    const toggleIcons = () => {
        setShowIcons(!showIcons);
    };

    const shareUrl = 'https://propertybuyersaustraliagroup.com.au/landing-page/';

    const shareOnWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, '_blank');
    };

    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    };

    const shareOnEmail = () => {
        window.open(`mailto:?subject=Check%20this%20out&body=${encodeURIComponent(shareUrl)}`, '_blank');
    };

    const shareOnInstagram = () => {
        alert("Instagram sharing requires the app, share the link manually.");
    };

    const shareOnLinkedIn = () => {
        window.open(`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}&title=Check%20this%20out!`, '_blank');
    };

    const shareOnTwitter = () => {
        window.open(`https://twitter.com/share?url=${encodeURIComponent(shareUrl)}&text=Check%20this%20out!`, '_blank');
    };

    return (
        <div className="market-property-container">
            <div className="market-property-form">
                <div className="form-content">
                    <div className="form-image">
                        <img src={image} alt={serviceType} />
                    </div>

                    <div className="form-fields">
                        <h2>{serviceType === 'mortgage-broker' ? 'Connect You To Mortgage Broker' : serviceType === 'accountant' ? 'Connect You To Accountant' : 'Connect You To Solicitor'}</h2>
                        {successMessage && (
                            <p className="success-message">Form submitted successfully!</p>
                        )}
                        {errorMessage && (
                            <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>
                        )}
                        {mobileError && (
                            <p className="error-message" style={{ color: 'red' }}>{mobileError}</p>
                        )}
                        {nameError && (
                            <p className="error-message" style={{ color: 'red' }}>{nameError}</p>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="mobile"
                                    placeholder="Mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-buttons">
                                <button className="cancel-btn" onClick={() => setFormData({ name: '', email: '', mobile: '', serviceType: '' })}>Cancel</button>
                                <button type="submit" className="submit-btn">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="additional-buttons">
                    <div className="action-btn-container" style={{ position: 'relative', display: 'inline-block' }}>
                        <button className="action-btn" onClick={toggleIcons}>Refer Us</button>

                        {showIcons && (
                            <div className="social-icons-container">
                                <FaWhatsapp className="social-icon" onClick={shareOnWhatsApp} />
                                <FaFacebook className="social-icon" onClick={shareOnFacebook} />
                                <FaEnvelope className="social-icon" onClick={shareOnEmail} />
                                <FaInstagram className="social-icon" onClick={shareOnInstagram} />
                                <FaLinkedin className="social-icon" onClick={shareOnLinkedIn} />
                                <FaTwitter className="social-icon" onClick={shareOnTwitter} />
                                <FaTimes className="social-icon close-icon" onClick={toggleIcons} />
                            </div>
                        )}
                    </div>
                    <div className="action-btn-container" style={{ position: 'relative', display: 'inline-block' }}>
                        <div className="action-btn">
                            <Link to="/social-media-reach">Follow Us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
