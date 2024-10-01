import React from 'react';
import { useEffect } from 'react';
import './TermsCondition.css'; // Import CSS for styling

const TermsCondition = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="terms-conditions-container">
      <h1 className="terms-conditions-heading">Terms & Conditions</h1>
      <div className="terms-conditions-content">
        <p>
          The following terms and conditions are formulated between Property Buyers Australia Group Pty Ltd trading as Property Buyers Australia, ACN 639866578 ABN 64639866578 (its associated companies, business, and trading names) hereinafter referred as “blessedbypba” and the consumers and the patrons of this website, its blog, newsletter, subscriptions, and various social media platforms, hereinafter referred as “Consumers”. This website, its blog, newsletter, subscriptions, and various social media platforms are hereinafter referred as “Platform”.
        </p>

        <h2>Terms of Use</h2>
        <p>
          The information on this “Platform” is provided for general information purposes only to its “Consumer” and should not be considered personal financial advice, legal advice, or any other kind of personal advice; nor does “blessedbypba”, nor our consumer networks, consider or recommend whether any particular product or offer meets your individual needs and circumstances.
        </p>

        <h2>User Indemnity</h2>
        <p>
          As a user of this “Platform”, you indemnify “blessedbypba” for any loss or damage or costs arising (whether directly or indirectly) out of any breach of the Terms and Conditions or any other legal obligation by you or your use of or conduct on this website, its blog, newsletter, subscriptions, and various social media platforms.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          As a user of the “Platform”, you expressly agree and acknowledge that in no circumstances will “blessedbypba” be liable to you for any indirect, incidental, special and/or consequential losses or damages or loss of profits of any nature arising (including but not limited to any act or omission by “blessedbypba”).
        </p>

        <h2>Social Media Terms of Use</h2>
        <p>
          By being a member of the social media channels of this website, you acknowledge and agree to the following:
        </p>
        <ul>
          <li>You are wilfully joining the social media channels.</li>
          <li>You can be removed if you do not adhere to the terms and conditions of this website.</li>
          <li>You can leave and remove yourself from the social media channels.</li>
        </ul>

        <h2>Disclaimer</h2>
        <p>
          By using the “Platform”, you agree to abide by and acknowledge the following disclaimer. “blessedbypba” is not involved in the actual transaction between service providers and customers who contract their services after first being introduced via the website, its blog, and the various social media channels.
        </p>

        <h2>Warranty</h2>
        <p>
          You agree to accept the sole responsibility for the legality of your actions using the laws that apply to you. You agree that “blessedbypba” has no responsibility for the legality of the actions of users or services of the “Platform”.
        </p>

        <h2>Indemnity</h2>
        <p>
          You indemnify and release “blessedbypba” and its directors, employees, agents, contractors, affiliates from and against any claims, demands, proceedings, losses, and damages of every kind and nature, including reasonable solicitor’s fees.
        </p>

        <h2>No Agency</h2>
        <p>
          You and “blessedbypba” are independent contractors and no agency, partnership, joint venture, employee-employer or franchisee-franchisor relationship is created by this agreement or your use of the “Platform”.
        </p>

        <h2>Third Party Links & Advertising</h2>
        <p>
          “blessedbypba” may display advertisements, which may or may not contain hyperlinks or buttons that take you to websites, blogs, and various social media channels operated by third parties.
        </p>

        <h2>Disclosure</h2>
        <p>
          We do not charge “Consumers” of our “Platform” to use our service. Instead, you acknowledge that we may receive service fees, marketing fees, advertisement fees, lead generation fees, finder fees, or other various types of fees from the service providers when one of our “Consumers” connects with them through our “Platform”.
        </p>

        <h2>Newsletters, Offers, and Notifications</h2>
        <p>
          You may subscribe to blessedbypba mailing list to receive emails, newsletters, offers, and notifications. You may unsubscribe at any time by using the ‘Unsubscribe’ details provided in our emails or by contacting us at info@propertybuyersaustralia.com.au.
        </p>
      </div>
    </div>
  );
};

export default TermsCondition;
