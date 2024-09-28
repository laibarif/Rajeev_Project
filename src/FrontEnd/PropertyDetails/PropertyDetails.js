import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./PropertyDetails.css"; // Add your styles here
import {
  FaWhatsapp,
  FaFacebook,
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaTimes,
} from "react-icons/fa";
import { BACKEND_URL } from "../../utils/constant";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const navigate = useNavigate();
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/property/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
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
    navigate(`/enquire/${property.id}`, {
      state: { name: property.name, id: property.id },
    });
  };

  const toggleIcons = () => {
    setShowIcons(!showIcons); // Toggle the visibility of the icons
  };

  const shareUrl = "https://propertybuyersaustraliagroup.com.au/landing-page/";

  // Social media share functions
  const shareOnWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  };

  const shareOnEmail = () => {
    window.open(
      `mailto:?subject=Check%20this%20out&body=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareOnInstagram = () => {
    alert("Instagram sharing requires the app, share the link manually.");
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
        shareUrl
      )}&title=Check%20this%20out!`,
      "_blank"
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/share?url=${encodeURIComponent(
        shareUrl
      )}&text=Check%20this%20out!`,
      "_blank"
    );
  };

  return (
    <div className="property-details-container">
      <div className="property-detail-card">
        <div
          key={property.id}
          className={`property-card ${
            property.sold_out ? "sold-out-card" : ""
          }`}
        >
          <div className="property-image-container">
            <img
              src={`${BACKEND_URL}${
                property.image || "/assets/default-property.jpg"
              }`}
              alt={property.name}
              className="property-image"
            />
          </div>
          <div className="property-content">
            <h3>{property.name}</h3>
            <p>
              <strong>Location:</strong> {property.location}
            </p>
            <p>
              <strong>Price:</strong> {property.price}
            </p>
            <p>{property.description}</p>
            {property.sold_out ? (
              <p className="sold-out">Sold Out</p>
            ) : (
              <p className="available">Available</p>
            )}
          </div>
        </div>
      </div>
      <div className="property-actions">
        <button className="property-action-btn" onClick={handleEnquire}>
          Enquire
        </button>

        <div className="property-action-btn">
          <button className="" onClick={toggleIcons}>
            Refer Us
          </button>

          {/* Social Media Icons */}
          {showIcons && (
            <div className="property-social-icons-container">
              <FaWhatsapp
                className="property-social-icon fa-whatsapp"
                onClick={shareOnWhatsApp}
              />
              <FaFacebook
                className="property-social-icon fa-facebook"
                onClick={shareOnFacebook}
              />
              <FaEnvelope
                className="property-social-icon fa-envelope"
                onClick={shareOnEmail}
              />
              <FaInstagram
                className="property-social-icon fa-instagram"
                onClick={shareOnInstagram}
              />
              <FaLinkedin
                className="property-social-icon fa-linkedin"
                onClick={shareOnLinkedIn}
              />
              <FaTwitter
                className="property-social-icon fa-twitter"
                onClick={shareOnTwitter}
              />
              <FaTimes
                className="property-social-icon close-icon"
                onClick={toggleIcons}
              />
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
