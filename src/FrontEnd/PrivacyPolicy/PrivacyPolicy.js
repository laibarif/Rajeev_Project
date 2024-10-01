import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css'; // Import the CSS for styling

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="privacy-policy-container">
      <h1 className="privacy-policy-heading">Privacy Policy</h1>
      <div className="privacy-policy-content">
        <p>
          This privacy policy sets out how we use and protect any information that you give us when you use this website.
        </p>

        <p>
          We are committed to ensuring that your privacy is protected. Should we ask you to provide certain information by
          which you can be identified when using this website, then you can be assured that it will only be used in
          accordance with this privacy statement.
        </p>

        <p>
          We may change this policy from time to time by updating this page. You should check this page from time to time
          to ensure that you are happy with any changes.
        </p>

        <h2>What we collect</h2>
        <p>We may collect the following information:</p>
        <ul>
          <li>Name</li>
          <li>Contact information including email address and phone number</li>
          <li>Demographic information such as postcode, preferences, and interests</li>
          <li>Other information relevant to customer surveys and/or offers</li>
        </ul>

        <h2>What we do with the information we gather</h2>
        <p>
          We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:
        </p>
        <ul>
          <li>Internal record keeping.</li>
          <li>We may use the information to improve our products and services.</li>
          <li>
            We may periodically send promotional emails about new products, special offers, or other information which we
            think you may find interesting using the email address which you have provided.
          </li>
          <li>
            From time to time, we may also use your information to contact you for market research purposes. We may
            contact you by email, phone, fax, or mail.
          </li>
          <li>We may use the information to customize the website according to your interests.</li>
        </ul>

        <h2>Security</h2>
        <p>
          We are committed to ensuring that your information is secure. In order to prevent unauthorized access or
          disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and
          secure the information we collect online. We take all reasonable steps to keep secure any information which we
          hold about you. Personal information may be stored both electronically on our computer system, and in hard-copy
          form. Firewalls, 2048 Bit v3 SSL encryption, passwords, anti-virus software, and email filters act to protect
          all our electronic information. We do not store credit card information; we securely submit credit card
          information to our bank for processing.
        </p>

        <h2>How we use cookies</h2>
        <p>
          A cookie is a small file which asks permission to be placed on your computer’s hard drive. Once you agree, the
          file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site.
          Cookies allow web applications to respond to you as an individual. The web application can tailor its
          operations to your needs, likes and dislikes by gathering and remembering information about your preferences.
        </p>

        <p>
          We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic
          and improve our website in order to tailor it to customer needs. We only use this information for statistical
          analysis purposes and then the data is removed from the system.
        </p>

        <p>
          Overall, cookies help us provide you with a better website by enabling us to monitor which pages you find useful and
          which you do not. A cookie in no way gives us access to your computer or any information about you, other than
          the data you choose to share with us.
        </p>

        <p>
          You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually
          modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage
          of the website.
        </p>

        <h2>Links to other websites</h2>
        <p>
          Our website may contain links to other websites of interest. However, once you have used these links to leave
          our site, you should note that we do not have any control over that other website. Therefore, we cannot be
          responsible for the protection and privacy of any information which you provide whilst visiting such sites, and
          such sites are not governed by this privacy statement. You should exercise caution and look at the privacy
          statement applicable to the website in question.
        </p>

        <h2>Controlling your personal information</h2>
        <p>
          You may choose to restrict the collection or use of your personal information in the following ways:
        </p>
        <ul>
          <li>Whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes.</li>
          <li>
            If you have previously agreed to us using your personal information for direct marketing purposes, you may
            change your mind at any time by writing to or emailing us.
          </li>
        </ul>

        <p>
          We will not sell, distribute or lease your personal information to third parties unless we have your permission or
          are required by law to do so. We may use your personal information to send you promotional information about
          third parties which we think you may find interesting if you tell us that you wish this to happen.
        </p>

        <p>
          If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us
          as soon as possible at the above address. We will promptly correct any information found to be incorrect. You
          can email us at propertygrowthnetwork@gmail.com.
        </p>

        <h2>The information on this website is for information purposes only</h2>
        <p>
          The information on this website is for information purposes only. The Information has not been prepared taking into
          account your or any other person's financial objectives, situation, or needs. The Information does not
          constitute any offer, recommendation, or solicitation to you or any person to enter into any transaction or
          investment strategy.
        </p>

        <p>
          Users of the Information should seek independent professional advice, including investment, legal, and tax
          advice, amongst others (“Professional Advice”), on the use of the Information, whether in whole or in part, and
          the appropriateness of entering into a transaction or investment strategy. Opinions, projections, and estimates
          are subject to change, and any statements regarding future prospects may not be realized.
        </p>

        <p>
          Property Buyers Australia does not accept any liability and will not be liable for any loss or damage arising
          directly or indirectly (including special, incidental, or consequential loss or damage) from the use of the
          Information, however so arising, and including any loss, damage, or expense arising from, but not limited to,
          any defect, error, imperfection, fault, mistake, or inaccuracy in the Information, or associated services, or
          due to the unavailability of any other information or associated services. The information is subject to change
          without notice, and Property Buyers Australia is not under any duty or obligation to update or correct it. 

        </p>
        <p>
          The use of this website is under the 
          <Link to="/terms-condition"> Terms and Conditions</Link>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
