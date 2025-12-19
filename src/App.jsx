import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./componants/Header";
import Market_prices from "./Pages/Market_prices";
import Footer from "./componants/Footer";
import Home from "./Pages/Home";
import MarketPlace from "./Pages/MarketPlace";
import How_itworks from "./Pages/How_itworks";


const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Markrt_prices" element={<Market_prices />} />
        <Route path="/MarketPlace" element={<MarketPlace />} />
        <Route path="/How_itworks"element={<How_itworks/>}/>
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App;
