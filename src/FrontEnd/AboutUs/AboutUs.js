import React , {useEffect} from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css'; // Import the CSS file
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';


const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const redirectToExternalPage = (url) => {
    window.location.href = url; // Redirects to the external URL
  };

  return (
    <div className="container">
      <h1 className="heading">About Us</h1>
      <div class="social-media-icons">
        <a href="https://www.facebook.com/groups/propertybuyersaustralia" class="facebook-icon" target="_blank"><FaFacebook size={40} /></a>
        <a href="https://www.instagram.com/propertybuyersaustralia/" class="instagram-icon" target="_blank"><FaInstagram size={40} /></a>
        <a href="https://api.whatsapp.com/send/?phone=61432555415&text=Hi&type=phone_number&app_absent=0" class="whatsapp-icon" target="_blank"><FaWhatsapp size={40} /></a>
        <a href="https://x.com/PBA_Australia?t=qor8m8MhBsJLrsNf-DmJYA&s=09" class="twitter-icon" target="_blank"><FaTwitter size={40} /></a>
        <a href="https://www.youtube.com/channel/UCO1QxoXGezsyTXUktE3ynpQ?view_as=subscriber" target="_blank" rel="noopener noreferrer">
          <FaYoutube size={40} />
        </a>
      </div>
      <p className="about-text">
        Property Buyers Australia Group is a very active group of the property experts. We are a highly collaborative Australian property forum that gives a platform to bring buyers and licensed independent property professionals (for example mortgage brokers, conveyancers, and licensed real estate people) closer to each other in a highly engaging manner.
        <br /><br />
        We connect with the property experts who can help turn your property ideas into reality. With comprehensive services that work closely with your expectations, Property Buyers Australia Group is always connecting people with what they need.
        <br /><br />
        This website belongs to Mentor Property Network Pty Ltd trading as Property Buyers Australia, ACN 639866578 ABN 64639866578 (and its associated companies, business, and trading names).
      </p>

      <div className="button-container">
        <Link to="/privacy-policy">
          <button className="button">
            Privacy Policy
          </button>
        </Link>

        <Link to="/terms-condition">
          <button className="button">
            Terms and Conditions
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
