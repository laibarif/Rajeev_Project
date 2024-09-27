import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaFacebook,
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaTimes,
} from "react-icons/fa";

const ViewProperty = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 8;
  const [showIcons, setShowIcons] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "https://blessedbypba.org:5000/api/view-properties"
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const toggleIcons = () => {
    console.log("BUtton CLIked");

    setShowIcons(!showIcons); // Toggle the visibility of the icons
    console.log("Icons visibility state:", showIcons);
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
    <div className="view-properties-container">
      <h2 className="featured-heading">Featured Properties</h2>
      <div className="property-grid">
        {currentProperties.length > 0 ? (
          currentProperties.map((property) => (
            <div key={property.id} className="property-card">
              <div className="property-image-container">
                <img
                  src={`http://77.37.125.30:5000${
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
                <p>{property.description.slice(0, 100)}...</p>
                {/* Link to the Property Details page, passing the property ID */}
                <Link
                  to={`/property/${property.id}`}
                  className="property-details-link"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No properties available</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-btn ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="additional-buttons">
        <div className="action-btn-container">
          <button className="action-btn" onClick={toggleIcons}>
            Refer Us
          </button>

          {/* Social Media Icons - Positioned close to the Refer Us button */}
          {showIcons && (
            <div className="home-social-icons-container">
              <FaWhatsapp
                className="home-social-icon"
                onClick={shareOnWhatsApp}
              />
              <FaFacebook
                className="home-social-icon"
                onClick={shareOnFacebook}
              />
              <FaEnvelope className="home-social-icon" onClick={shareOnEmail} />
              <FaInstagram
                className="home-social-icon"
                onClick={shareOnInstagram}
              />
              <FaLinkedin
                className="home-social-icon"
                onClick={shareOnLinkedIn}
              />
              <FaTwitter
                className="home-social-icon"
                onClick={shareOnTwitter}
              />
              <FaTimes
                className="home-social-icon close-icon"
                onClick={toggleIcons}
              />
            </div>
          )}
        </div>
        <div className="action-btn-container">
          <div className="action-btn">
            <Link to="/social-media-reach">Follow Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProperty;
