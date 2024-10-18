import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate, Link } from "react-router-dom";
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

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 8;
  const [showIcons, setShowIcons] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/view-properties`);
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

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      window.scrollTo(0, 0);
      setCurrentPage(pageNumber);
      
    }
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const toggleIcons = () => {
    setShowIcons(!showIcons); // Toggle the visibility of the icons
    console.log("Icons visibility state:", showIcons);
  };

  const shareUrl = "https://propertybuyersaustraliagroup.com.au/landing-page/";

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
  const viewDetails = (property) => {
    navigate(`/property/${property.id}`, {
      state: { currentPage: currentPage }, // Pass current page number
    });
  };

  return (
    <div className="view-properties-container">
      <h2 className="featured-heading">Featured Properties</h2>
      <div className="property-grid">
        {currentProperties.length > 0 ? (
          currentProperties.map((property) => (
            <div
              key={property.id}
              className={`property-card ${property.sold_out ? 'sold-out-card' : ''}`} // Conditional class for sold out properties
            >
              <div className="property-image-container">
                <Link to={`/property/${property.id}`}>
                  <img
                   src={`${BACKEND_URL}${
                    property.image || "/assets/default-property.jpg"
                  }`}
                   
                    alt={property.name}
                    className="property-image"
                  />
                </Link>
              </div>
              <div className="property-content">
                <h3>{property.name}</h3>
                <p>
                  <strong>Location:</strong> {property.location.slice(0,15)}...
                </p>
                <p>
                <strong>Price:</strong> {property.price === 0 || property.price === "0.00" ? " " : property.price}
                </p>
                <p>{property.description.slice(0, 50)}...</p>
                {property.sold_out ? (
                  <p className="sold-out">Sold Out</p>
                ) : (
                  <p className="available">Available</p>
                )}
                <Link to={`/property/${property.id}`} onClick={() => viewDetails(property)} className="property-details-link">View Details</Link>
                 </div>
            </div>
          ))
        ) : (
          <p>No properties available</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={goToPreviousPage}
          disabled={currentPage === 1} // Disable if on the first page
        >
          &lt; Prev
        </button>

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

        <button
          className="pagination-btn"
          onClick={goToNextPage}
          disabled={currentPage === totalPages} // Disable if on the last page
        >
          Next &gt;
        </button>
      </div>

      <div className="additional-buttons">
        <div className="action-btn-container">
          <button className="action-btn" onClick={toggleIcons}>
            Refer Us
          </button>

          {/* Social Media Icons */}
          {showIcons && (
            <div className="home-social-icons-container">
              <FaWhatsapp
                className="home-social-icon fa-whatsapp"
                onClick={shareOnWhatsApp}
              />
              <FaFacebook
                className="home-social-icon fa-facebook"
                onClick={shareOnFacebook}
              />
              <FaEnvelope className="home-social-icon fa-envelope" onClick={shareOnEmail} />
              <FaInstagram
                className="home-social-icon fa-instagram"
                onClick={shareOnInstagram}
              />
              <FaLinkedin
                className="home-social-icon fa-linkedin"
                onClick={shareOnLinkedIn}
              />
              <FaTwitter
                className="home-social-icon fa-twitter"
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

export default Home;
