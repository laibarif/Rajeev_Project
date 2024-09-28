import React, { useState } from "react";
import "./MarketMyProperty.css";
import image from "../../assets/Market.svg";
import axios from "axios"; // Import axios
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
import { BACKEND_URL } from "../../utils/constant";

const MarketMyProperty = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    comment: "",
    address: "",
  });

  const [successMessage, setSuccessMessage] = useState(false); // To handle the message visibility
  const [errorMessage, setErrorMessage] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [nameError, setNameError] = useState("");
  const [showIcons, setShowIcons] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle name field to allow only alphabetic characters
    if (name === "name") {
      const cleanedValue = value.replace(/[^a-zA-Z\s]/g, ""); // Allow only alphabets and spaces

      // Check if the cleaned value is different from the original value (i.e., if a number was entered)
      if (value !== cleanedValue) {
        setNameError(
          "Only alphabetic characters are allowed in the name field"
        );

        // Set a timeout to remove the error message after 3 seconds
        setTimeout(() => {
          setNameError("");
        }, 3000);
      }

      setFormData({ ...formData, [name]: cleanedValue });
    }
    // Handle mobile field to allow only numbers
    else if (name === "mobile") {
      const cleanedValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      setMobileError(
        value !== cleanedValue ? "Only numeric characters are allowed" : ""
      );
      setFormData({ ...formData, [name]: cleanedValue });

      setTimeout(() => {
        setMobileError("");
      }, 3000);
    }
    // For all other fields
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation: check if email contains '@' and '.' before the last two or three words
    const emailParts = formData.email.split("@");
    if (
      emailParts.length !== 2 ||
      !emailParts[1].includes(".") ||
      emailParts[1].split(".").length < 2
    ) {
      setErrorMessage("Please enter a valid email address.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    // If there is a mobile error, do not submit the form
    if (mobileError) {
      return;
    }

    if (nameError) {
      return;
    }

    // If email is valid, clear the error message
    setErrorMessage("");

    axios
      .post(`${BACKEND_URL}/submit-property`, formData)
      .then((response) => {
        // Show success message
        setSuccessMessage(true);

        // Clear the form
        setFormData({
          name: "",
          email: "",
          mobile: "",
          comment: "",
          address: "",
        });

        // Hide the success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
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
    <div className="market-property-container">
      <div className="market-property-form">
        <div className="form-content">
          {/* Image on the left */}
          <div className="form-image">
            <img src={image} alt="Market My Property" />
          </div>

          {/* Form Fields */}
          <div className="form-fields">
            <h2>Market My Property</h2>
            {successMessage && (
              <p className="success-message">Form submitted successfully!</p>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {mobileError && <p className="error-message">{mobileError}</p>}
            {nameError && <p className="error-message">{nameError}</p>}
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
              <div className="form-group">
                <input
                  type="text"
                  name="comment"
                  placeholder="Comment"
                  value={formData.comment}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="address"
                  placeholder="Property Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-buttons">
                <button
                  className="cancel-btn"
                  onClick={() =>
                    setFormData({
                      name: "",
                      email: "",
                      mobile: "",
                      address: "",
                    })
                  }
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
          {/* Wrap the Refer Us button and icons in a container */}
          <div className="action-btn-container">
            <button className="action-btn refer-btn" onClick={toggleIcons}>
              Refer Us
            </button>

            {/* Social Media Icons - Positioned close to the Refer Us button */}
            {showIcons && (
              <div className="social-icons-container">
                <FaWhatsapp className="social-icon" onClick={shareOnWhatsApp} />
                <FaFacebook className="social-icon" onClick={shareOnFacebook} />
                <FaEnvelope className="social-icon" onClick={shareOnEmail} />
                <FaInstagram
                  className="social-icon"
                  onClick={shareOnInstagram}
                />
                <FaLinkedin className="social-icon" onClick={shareOnLinkedIn} />
                <FaTwitter className="social-icon" onClick={shareOnTwitter} />
                <FaTimes
                  className="social-icon close-icon"
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
    </div>
  );
};

export default MarketMyProperty;
