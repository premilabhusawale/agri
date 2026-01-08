import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import LivePrices from "./Pages/LivePrices";
import MarketPlace from "./Pages/MarketPlace";
import ForFarmers from "./Pages/ForFarmers";
import About from "./Pages/About";
import Auth from "./Pages/Auth";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Orders from "./Pages/Orders";
import Accounts from "./Pages/Accounts";

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LivePrices" element={<LivePrices />} />
        <Route path="/MarketPlace" element={<MarketPlace />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/ForFarmers" element={<ForFarmers />} />
        <Route path="/About" element={<About />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/Account" element={<Accounts />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/Orders" element={<Orders />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
