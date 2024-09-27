import React, { useState } from 'react';
import './ChatWithUs.css';
import axios from 'axios';
import image from "../../assets/chatwithus.svg";
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaFacebook, FaEnvelope, FaInstagram, FaLinkedin, FaTwitter, FaTimes } from 'react-icons/fa';

const ChatWithUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        comment: ''
    });

    const [mobileError, setMobileError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [commentError, setCommentError] = useState(''); // Added state for comment error
    const [successMessage, setSuccessMessage] = useState('');
    const [showIcons, setShowIcons] = useState(false); // State to toggle the social media icons

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "mobile") {
            const cleanedValue = value.replace(/[^0-9]/g, "");
            setMobileError(value !== cleanedValue ? "Please enter numbers only" : "");
            setFormData({ ...formData, [name]: cleanedValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Email validation: Check if email contains '@' and '.' before last part
        const emailParts = formData.email.split('@');
        if (emailParts.length !== 2 || !emailParts[1].includes('.') || emailParts[1].split('.').length < 2) {
            setEmailError('Please enter a valid email address.');
            setTimeout(() => setEmailError(''), 3000);
            return;
        } else {
            setEmailError('');
        }

        // Check if comment is provided
        if (formData.comment.trim() === '') {
            setCommentError("Please enter a comment."); // Set comment error message
            setTimeout(() => setCommentError(''), 5000); // Remove the message after 5 seconds
            return;
        }

        if (!mobileError && formData.mobile !== '') {
            axios.post('http://localhost:5000/submit-form', formData)
                .then(response => {
                    setSuccessMessage('Message Sent successfully');
                    setFormData({ name: '', email: '', mobile: '', comment: '' });
                    setTimeout(() => setSuccessMessage(''), 3000);
                })
                .catch(error => console.error('There was an error!', error));
        } else {
            setMobileError('Please correct the mobile field');
        }
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
                    <div className="form-image">
                        <img src={image} alt="Chat With Us" />
                    </div>

                    <div className="form-fields">
                        <h2>Connect With Us</h2>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                required
                            />
                            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Mobile"
                                required
                            />
                            {mobileError && <p style={{ color: 'red' }}>{mobileError}</p>}
                        </div>
                        <div className="form-group">
                            <textarea
                                id="comment"
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                placeholder="Enter your comment"
                                rows="5"
                                style={{ resize: "vertical" }}
                                required
                            ></textarea>
                            {commentError && <p style={{ color: 'red' }}>{commentError}</p>} {/* Display comment error */}
                        </div>
                        <div className="form-buttons">
                            <button
                                className="cancel-btn"
                                onClick={() => setFormData({ name: '', email: '', mobile: '', comment: '' })}
                            >
                                Cancel
                            </button>
                            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                        </div>

                        {successMessage && <p style={{ color: 'green', marginTop: '20px' }}>{successMessage}</p>}
                    </div>
                </div>

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
                            <Link to="/social-media-reach" >Follow Us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatWithUs;
