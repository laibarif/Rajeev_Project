import React, { useState } from "react";
import { useEffect } from "react";
import "./ChatWithUs.css";
import axios from "axios";
import image from "../../assets/chatwithus.svg";
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

const ChatWithUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    comment: "",
  });

  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState(""); 
  const [commentError, setCommentError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showIcons, setShowIcons] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "name") {
      const cleanedValue = value.replace(/[^a-zA-Z\s]/g, "");
      if (value !== cleanedValue) {
        setNameError("Name can only contain alphabetic characters.");
        setTimeout(() => {
          setNameError("");
        }, 3000);
      }
      setFormData({ ...formData, [name]: cleanedValue });
    }
    else if (name === "mobile") {
      const cleanedValue = value.replace(/[^0-9]/g, "");
      setMobileError(value !== cleanedValue ? "Please enter numbers only" : "");
      setFormData({ ...formData, [name]: cleanedValue });
    } 
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailParts = formData.email.split("@");
    if (
      emailParts.length !== 2 ||
      !emailParts[1].includes(".") ||
      emailParts[1].split(".").length < 2
    ) {
      setEmailError("Please enter a valid email address.");
      setTimeout(() => setEmailError(""), 3000);
      return;
    } else {
      setEmailError("");
    }

    if (formData.comment.trim() === "") {
      setCommentError("Please enter a comment.");
      setTimeout(() => setCommentError(""), 3000);
      return;
    }

    if (!mobileError && formData.mobile !== "") {
      axios
        .post(`${BACKEND_URL}/submit-form`, formData)
        .then((response) => {
          setSuccessMessage("Message Sent successfully");
          setFormData({ name: "", email: "", mobile: "", comment: "" });
          setTimeout(() => setSuccessMessage(""), 3000);
        })
        .catch((error) => console.error("There was an error!", error));
    } else {
      setMobileError("Please correct the mobile field");
    }
  };

  const toggleIcons = () => {
    setShowIcons(!showIcons);
  };

  const shareUrl = "https://propertybuyersaustraliagroup.com.au/landing-page/";

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, "_blank");
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              {nameError && <p style={{ color: "red" }}>{nameError}</p>}
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
              {emailError && <p style={{ color: "red" }}>{emailError}</p>}
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
              {mobileError && <p style={{ color: "red" }}>{mobileError}</p>}
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
              {commentError && <p style={{ color: "red" }}>{commentError}</p>}
            </div>
            <div className="form-buttons">
              <button
                className="cancel-btn"
                onClick={() =>
                  setFormData({ name: "", email: "", mobile: "", comment: "" })
                }
              >
                Cancel
              </button>
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>

            {successMessage && (
              <p style={{ color: "green", marginTop: "20px" }}>
                {successMessage}
              </p>
            )}
          </div>
        </div>

        <div className="additional-buttons">
          <div
            className="action-btn-container"
            style={{ position: "relative", display: "inline-block" }}
          >
            <button className="action-btn" onClick={toggleIcons}>
              Refer Us
            </button>

            {showIcons && (
              <div className="social-icons-container">
                <FaWhatsapp className="social-icon whatsapp" onClick={shareOnWhatsApp} />
                <FaFacebook className="social-icon facebook" onClick={shareOnFacebook} />
                <FaEnvelope className="social-icon envelope" onClick={shareOnEmail} />
                <FaInstagram className="social-icon instagram" onClick={shareOnInstagram} />
                <FaLinkedin className="social-icon linkedin" onClick={shareOnLinkedIn} />
                <FaTwitter className="social-icon twitter" onClick={shareOnTwitter} />
                <FaTimes className="social-icon close-icon" onClick={toggleIcons} />
              </div>
            )}
          </div>
          <div
            className="action-btn-container"
            style={{ position: "relative", display: "inline-block" }}
          >
            <div className="action-btn">
              <Link to="/social-media-reach">Follow Us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithUs;
