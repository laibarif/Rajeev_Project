import { Route, Routes,useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import Navbar from './FrontEnd/Navbar/Navbar'; 
import Home from './FrontEnd/Home/Home'; 
import Footer from './FrontEnd/Footer/Footer'; 
import MarketMyProperty from './FrontEnd/MarketMyProperty/MarketMyProperty';
import ChatWithUs from './FrontEnd/ChatWithUs/ChatWithUs';
import Services from './FrontEnd/Services/Service';
import Login from './FrontEnd/Login/Login';
import Adminpage from './FrontEnd/Adminpage/Adminpage';
import PropertyDetails from './FrontEnd/PropertyDetails/PropertyDetails';
import Enquiry from './FrontEnd/Enquiry/Enquiry'; 
import WhySellWithUs from './FrontEnd/WhySellWithUs/WhySellWithUs';
import AboutUs from './FrontEnd/AboutUs/AboutUs';
import TermsCondition from './FrontEnd/TermsCondition/TermsCondition';
import PrivacyPolicy from './FrontEnd/PrivacyPolicy/PrivacyPolicy';
import SocialMediaReach from './FrontEnd/SocialMediaReach/SocialMediaReach';
import './App.css';

function App() {
  const location = useLocation();
  // useEffect(() => {
  //   const script = document.createElement('script');
  // script.src = "https://widgets.leadconnectorhq.com/loader.js";
  // script.setAttribute("data-resources-url", "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
  // script.setAttribute("data-widget-id", "6720197d9d106a103e0fef77");
  // script.async = true;
  // script.onload = () => console.log("Chat widget loaded successfully.");
  // script.onerror = (error) => console.log("Error loading chat widget:", error);
  // document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/market-my-property" element={<MarketMyProperty />} />
        <Route path="/chatwithus" element={<ChatWithUs />} />
        <Route path="/service/:serviceType" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/adminpage" element={<Adminpage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-condition" element={<TermsCondition />} />
        <Route path="/why-sell-with-us" element={<WhySellWithUs />} />
        <Route path="/social-media-reach" element={<SocialMediaReach />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/enquire/:id" element={<Enquiry />} />

      </Routes>
      {location.pathname !== '/login' && <Footer />}
    </>
  );
}

export default App;
