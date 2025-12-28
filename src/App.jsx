import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./componants/Header";
import LivePrices from "./Pages/LivePrices";
import Footer from "./componants/Footer";
import Home from "./Pages/Home";
import MarketPlace from "./Pages/MarketPlace";
import ForFarmers from "./Pages/ForFarmers";
import About from "./Pages/About";


const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/LivePrices" element={<LivePrices />} />
        <Route path="/MarketPlace" element={<MarketPlace />} />
        <Route path="/ForFarmers"element={<ForFarmers/>}/>
        <Route path="/About"element={<About/>}/>
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App;
