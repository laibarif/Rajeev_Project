import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import image from "../../assets/service.svg";
import './Enquiry.css'
import { FaWhatsapp, FaFacebook, FaEnvelope, FaInstagram, FaLinkedin, FaTwitter, FaTimes } from 'react-icons/fa';

const EnquiryPage = () => {
    const location = useLocation();
    const { name, id } = location.state || {}; // Retrieve data passed through navigate

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [validationError, setValidationError] = useState('');
    const [showIcons, setShowIcons] = useState(false); // State to toggle the social media icons

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Check for mobile number input to ensure it's numeric and limit it to 10 digits
        if (name === 'mobile') {
            if (!/^\d*$/.test(value)) {
                setValidationError('Mobile number should contain only digits.');
                return;
            } else if (value.length > 10) {
                setValidationError('Mobile number cannot exceed 10 digits.');
                return;
            }
            setTimeout(() => {
                setValidationError('');
            }, 3000);
        }

        // Name validation: Ensure no digits are entered
        if (name === 'name') {
            const nameRegex = /^[a-zA-Z\s]*$/; // Only letters and spaces allowed
            if (!nameRegex.test(value)) {
                setValidationError('Name can only contain alphabetic characters.');
                // Auto-hide the error message after 3 seconds
                setTimeout(() => {
                    setValidationError('');
                }, 3000);
                return;
            }
        }

        setFormData({
            ...formData,
            [name]: value,
        });
        setValidationError(''); // Clear validation error
    };

    // Auto-hide messages after 3 seconds
    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
                setErrorMessage('');
            }, 3000);

            // Cleanup timeout
            return () => clearTimeout(timer);
        }
    }, [successMessage, errorMessage]);

    // Validate email format (Check if email contains '@' and a '.' before the last two or three characters)
    const validateEmail = (email) => {
        const emailParts = email.split('@');
        if (emailParts.length !== 2 || !emailParts[1].includes('.') || emailParts[1].split('.').length < 2) {
            return false; // Email is invalid
        }
        const domainParts = emailParts[1].split('.');
        if (domainParts[domainParts.length - 1].length < 2 || domainParts[domainParts.length - 1].length > 3) {
            return false; // The part after the last dot should have 2 or 3 characters (like .com or .org)
        }
        return true; // Email is valid
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Email validation
        if (!validateEmail(formData.email)) {
            setValidationError('Please enter a valid email address.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/enquiries', {
                propertyId: id, // Include property ID
                propertyName: name, // Include property name
                ...formData, // Include form data
            });

            if (response.status === 200) {
                setSuccessMessage('Form submitted successfully!');
                setFormData({
                    name: '',
                    email: '',
                    mobile: '',
                });
            }
        } catch (error) {
            setErrorMessage('Failed to submit the form. Please try again.');
            console.error('Error submitting form:', error);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: '',
            email: '',
            mobile: '',
        });
    };

    const toggleIcons = () => {
        setShowIcons(!showIcons); // Toggle the visibility of the icons
    };

    const shareUrl = 'https://propertybuyersaustraliagroup.com.au/landing-page/';

    // Social media share functions
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
                    {/* Image on the left */}
                    <div className="form-image">
                        <img src={image} alt="Property" />
                    </div>

                    {/* Form Fields */}
                    <div className="form-fields">
                        <h2>Enquiry for {name}</h2>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
                        {validationError && <p className="error-message" style={{ color: 'red' }}>{validationError}</p>}

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
                                    maxLength="10" // Limit to 10 digits
                                />
                            </div>
                            <div className="form-buttons">
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Additional buttons below the form */}
                <div className="additional-buttons">
                    <div className="action-btn-container" style={{ position: 'relative', display: 'inline-block' }}>
                        <button className="action-btn" onClick={toggleIcons}>Refer Us</button>

                        {/* Social Media Icons - Positioned close to the Refer Us button */}
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

export default EnquiryPage;
