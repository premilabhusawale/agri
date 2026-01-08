import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import LivePrices from "./Pages/LivePrices";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import MarketPlace from "./Pages/MarketPlace";
import ForFarmers from "./Pages/ForFarmers";
import About from "./Pages/About";
import Auth from "./Pages/Auth";
import ProductDetails from "./Pages/ProductDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LivePrices" element={<LivePrices />} />
        <Route path="/MarketPlace" element={<MarketPlace />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/ForFarmers" element={<ForFarmers/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/Auth" element={<Auth/>} />
      </Routes>
      
      <Footer />
    </BrowserRouter>
  )
}

export default App;
