import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ChatBot from "./Components/ChatBot"; // Add this import

import Home from "./Pages/Home";
import LivePrices from "./Pages/LivePrices";
import MarketPlace from "./Pages/MarketPlace";
import ForFarmers from "./Pages/ForFarmers";
import About from "./Pages/About";
import Auth from "./Pages/Auth";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Checkout from "./Pages/Checkout";
import Orders from "./Pages/Orders";
import Accounts from "./Pages/Accounts";
import Messages from "./Pages/Messages";
import FarmerDashboard from "./Pages/FarmerDashboard";
import LivePricesSection from "./HeroSection/LivePriceSection";

const AppContent = () => {
  const location = useLocation();
  const hideLayout = location.pathname === '/Auth' || location.pathname === '/Accounts';

  return (
    <>
      {!hideLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LivePrices" element={<LivePrices />} />
        <Route path="/MarketPlace" element={<MarketPlace />} />
        <Route path="/ForFarmers" element={<ForFarmers />} />
        <Route path="/About" element={<About />} />
        <Route path="/LivePriceSection" element={<LivePricesSection />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/ProductDetails/:id" element={<ProductDetails />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Accounts" element={<Accounts />} />
        <Route path="/Messages" element={<Messages />} />
        <Route path="/FarmerDashboard" element={<FarmerDashboard />} />

      </Routes>
      {!hideLayout && <Footer />}

      {/* ChatBot will appear on all pages as a floating button */}
      <ChatBot />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;