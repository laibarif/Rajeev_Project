import React, { useState } from 'react';
import { useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import './Footer.css'; // Import CSS for styling
import logo from '../../assets/FinalRedBG.svg'; // Adjust the path to your logo

const Footer = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailValidation = () => {
    if (!email.includes('@') || !email.includes('.') || email.split('.').pop().length < 2 || email.split('.').pop().length > 3) {
      setEmailError('Please enter a valid email address');
      setTimeout(() => setEmailError(''), 3000); // Error disappears after 3 seconds
    } else {
      setEmailError('');
      // Handle valid email submission (e.g., API call or form submission)
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-section">
          <img src={logo} alt="Blessed By PBA" className="footer-logo" />
          <h2 className="footer-brand-title">BLESSED BY PBA</h2>
          <div className="footer-contact">
            <div className="contact-item">
              <FaPhoneAlt />
              <div>
                <span className="contact-label">Call Us</span>
                <p className="contact-info">+61 432 555 415</p>
              </div>
            </div>
            <div className="contact-item">
              <FaEnvelope />
              <div>
                <span className="contact-label">Email</span>
                <p className="contact-info">info@propertybuyersaustraliagroup.com.au</p>
              </div>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt />
              <div>
                <span className="contact-label">Location</span>
                <p className="contact-info">North West of Sydney</p>
              </div>
            </div>
          </div>
        </div>

        {/* Center Section - Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/market-my-property">Market my Property</a></li>
            <li><a href="/why-sell-with-us">Why sell with us</a></li>
            <li><a href="/social-media-reach">Why are we in market</a></li>
            <li><a href="/service/mortgage-broker">Services</a></li>
            <li><a href="/chatwithus">Connect with us</a></li>
            <li><a href="/about-us">About us</a></li>
          </ul>
        </div>

        {/* Right Section - Newsletter Signup */}
        <div className="footer-section newsletter-section">
          <h3>Newsletter Signup</h3>
          <input
            type="email"
            placeholder="Enter Your Email"
            className="footer-input"
            value={email}
            onChange={handleEmailChange}
          />
          <button className="footer-button" onClick={handleEmailValidation}>Register Me</button>
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          <p>Sign up to our monthly newsletter for useful articles, Guides, e-Books</p>
          <div className="footer-social">
            <a href="https://www.facebook.com/groups/propertybuyersaustralia" className="facebook-icon" target="_blank">
              <FaFacebook size={30} />
            </a>
            <a href="https://www.instagram.com/propertybuyersaustralia/" className="instagram-icon" target="_blank">
              <FaInstagram size={30} />
            </a>
            <a href="https://api.whatsapp.com/send/?phone=61432555415&text=Hi&type=phone_number&app_absent=0" className="whatsapp-icon" target="_blank">
              <FaWhatsapp size={30} />
            </a>
            <a href="https://www.youtube.com/channel/UCO1QxoXGezsyTXUktE3ynpQ?view_as=subscriber" className="youtube-icon" target="_blank" rel="noopener noreferrer">
              <FaYoutube size={30} />
            </a>
          </div>
          <h6><a href="https://propertybuyersaustraliagroup.com.au/">Visit old Webiste</a></h6>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© Copyright Property Buyers Australia Group</p>
        <p><a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-condition">Terms and Conditions</a></p>
      </div>
    </footer>
  );
};

export default Footer;
