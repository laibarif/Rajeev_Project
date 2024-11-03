import React from 'react';
import { useEffect } from 'react';
import { FaFacebook, FaUsers, FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from 'react-icons/fa'; // Import icons
import './SocialMediaReach.css';
import { Link } from 'react-router-dom';

function SocialMediaReach() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <div className="social-media-reach">
            <h1>Our Social Media Reach</h1>

            <ul className="social-media-list">
                <li>
                    <FaFacebook className="social-icon facebook" />
                    <div className="item-text">
                        <span className="platform-name">Facebook followers:</span>
                        <span className="follower-count">1.3K</span>
                    </div>
                    <a href="https://www.facebook.com/propertybuyersaus" target="_blank" rel="noopener noreferrer">
                        <button className="follow-button">Follow</button>
                    </a>
                </li>
                <hr />
                <li>
                    <FaUsers className="social-icon users" />
                    <div className="item-text">
                        <span className="platform-name">Facebook group:</span>
                        <span className="follower-count">13.5K</span>
                    </div>
                    <a href="https://www.facebook.com/groups/propertybuyersaustralia" target="_blank" rel="noopener noreferrer">
                        <button className="join-button">Join</button>
                    </a>
                </li>
                <hr />
                <li>
                    <FaInstagram className="social-icon instagram" />
                    <div className="item-text">
                        <span className="platform-name">Instagram:</span>
                        <span className="follower-count">9.2K</span>
                    </div>
                    <a href="https://instagram.com/propertybuyersaustralia?igshid=NzZlODBkYWE4Ng==" target="_blank" rel="noopener noreferrer">
                        <button className="follow-button">Follow</button>
                    </a>
                </li>
                <hr />
                <li>
                    <FaTiktok className="social-icon tiktok" />
                    <div className="item-text">
                        <span className="platform-name">TikTok:</span>
                        <span className="follower-count">13.1K</span>
                    </div>
                    <a href="https://www.tiktok.com/@propertybuyersaus" target="_blank" rel="noopener noreferrer">
                        <button className="follow-button">Follow</button>
                    </a>
                </li>
                <hr />
                <li>
                    <FaYoutube className="social-icon youtube" />
                    <div className="item-text">
                        <span className="platform-name">YouTube:</span>
                        <span className="follower-count">3.3K</span>
                    </div>
                    <a href="https://www.youtube.com/@propertybuyersaustralia" target="_blank" rel="noopener noreferrer">
                        <button className="subscribe-button">Subscribe</button>
                    </a>
                </li>
                <hr />
                <li>
                    <FaWhatsapp className="social-icon whatsapp" />
                    <div className="item-text">
                        <span className="platform-name">WhatsApp:</span>
                        <span className="follower-count">Thousands 1000 of members</span>
                    </div>
                    <a href="https://api.whatsapp.com/send/?phone=61432555415&text=Hi&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                        <button className="join-button">Join</button>
                    </a>
                </li>
                <hr />
            </ul>
        </div>

    );
}

export default SocialMediaReach;
