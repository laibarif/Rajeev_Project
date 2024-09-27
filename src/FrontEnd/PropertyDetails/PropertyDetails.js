import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate,Link } from 'react-router-dom';
import './PropertyDetails.css';  // Add your styles here
import { FaWhatsapp, FaFacebook, FaEnvelope, FaInstagram, FaLinkedin, FaTwitter, FaTimes } from 'react-icons/fa';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const navigate = useNavigate();
    const [showIcons, setShowIcons] = useState(false);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`http://77.37.125.30:5000/api/property/${id}`);
                setProperty(response.data);
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };
        fetchPropertyDetails();
    }, [id]);

    if (!property) {
        return <p>Loading...</p>;
    }

    // Function to handle "Enquire" button click
    const handleEnquire = () => {
        // Navigate to the Enquiry page with the property ID and number
        navigate(`/enquire/${property.id}`, { state: { name: property.name, id: property.id } });
    };

    const toggleIcons = () => {
        console.log("BUtton CLIked");

        setShowIcons(!showIcons); // Toggle the visibility of the icons
        console.log('Icons visibility state:', showIcons);
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
        <div className="property-details-container">
            <div className="property-detail-card">
                <div className="property-image-container">
                    <img
                        src={`http://77.37.125.30:5000${property.image || '/assets/default-property.jpg'}`}
                        alt={property.name}
                        className="property-image"
                    />
                </div>
                <div className="property-content">
                    <h3>{property.name}</h3>
                    <p><strong>Location:</strong> {property.location}</p>
                    <p><strong>Price:</strong> {property.price}</p>
                    <p>{property.description}</p>
                </div>
            </div>

            {/* Aligning buttons vertically on the right */}
            <div className="property-actions">
                <button className="property-action-btn" onClick={handleEnquire}>Enquire</button>

                <div className="property-action-btn">
                    <button className="" onClick={toggleIcons}>Refer Us</button>

                    {/* Social Media Icons */}
                    {showIcons && (
                        <div className="property-social-icons-container">
                            <FaWhatsapp className="property-social-icon" onClick={shareOnWhatsApp} />
                            <FaFacebook className="property-social-icon" onClick={shareOnFacebook} />
                            <FaEnvelope className="property-social-icon" onClick={shareOnEmail} />
                            <FaInstagram className="property-social-icon" onClick={shareOnInstagram} />
                            <FaLinkedin className="property-social-icon" onClick={shareOnLinkedIn} />
                            <FaTwitter className="property-social-icon" onClick={shareOnTwitter} />
                            <FaTimes className="property-social-icon close-icon" onClick={toggleIcons} />
                        </div>
                    )}
                </div>
                <div className="property-action-btn">
                    <Link to="/social-media-reach">Follow Us</Link>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;