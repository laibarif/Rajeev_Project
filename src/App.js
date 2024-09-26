import { Route, Routes,useLocation } from 'react-router-dom';
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
import SocialMediaReach from './FrontEnd/SocialMediaReach/SocialMediaReach';
import './App.css';

function App() {
  const location = useLocation();
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
