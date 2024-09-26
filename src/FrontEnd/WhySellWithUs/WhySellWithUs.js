import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './WhySellWithUs.css';
import { Link } from 'react-router-dom';

function WhySellWithUs() {
    return (
        <div className="why-sell-with-us">
            <h1>Why Sell With Us</h1>
            <div class="social-media-icons">
                <a href="https://www.facebook.com/groups/propertybuyersaustralia" class="facebook-icon" target="_blank"><FaFacebook size={40} /></a>
                <a href="https://www.instagram.com/propertybuyersaustralia/" class="instagram-icon" target="_blank"><FaInstagram size={40} /></a>
                <a href="https://api.whatsapp.com/send/?phone=61432555415&text=Hi&type=phone_number&app_absent=0" class="whatsapp-icon" target="_blank"><FaWhatsapp size={40} /></a>
                <a href="https://x.com/PBA_Australia?t=qor8m8MhBsJLrsNf-DmJYA&s=09" class="twitter-icon" target="_blank"><FaTwitter size={40} /></a>
                <a href="https://www.youtube.com/channel/UCO1QxoXGezsyTXUktE3ynpQ?view_as=subscriber" target="_blank" rel="noopener noreferrer">
                    <FaYoutube size={40} />
                </a>
            </div>

            <div className="sell-reasons-box">
                <ul className="sell-reasons-list">
                    <li>Real Estate social media influencers</li>
                    <li>Properties sold so far on our platform</li>
                    <li>Zero cost to you if we are unable to sell</li>
                    <li>We get paid when you get paid</li>
                    <li>Simple, straightforward, no drama</li>
                </ul>
            </div>

            <div className="button-container">
            <Link to="/market-my-property" className="market-button">Market My Property</Link>
            <Link to="/social-media-reach" className="social-button">Our social media reach</Link>
            </div>
        </div>
    );
}

export default WhySellWithUs;
