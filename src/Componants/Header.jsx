import React from 'react'
import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import { User } from 'lucide-react'

const Header = () => {
  return (
  <header className="bg-[#D9D5CD]/80 backdrop-blur-md py-5 px-5 flex items-center justify-between sticky top-0 z-50">



      {/* LEFT: Logo */}
      <div className="text-2xl flex items-center gap-2">
        <span className="bg-green-800 p-2 rounded-lg">
          <Leaf className="text-white" size={24} />
        </span>
        <span>
          <span className="text-black font-bold">Agri</span>
          <span className="text-green-800 font-bold">Connect</span>
        </span>
      </div>

      {/* CENTER: Links */}
      <nav className="flex gap-6 text-gray-600 font-medium">
        <Link to="/" className="hover:text-green-800 transition-colors duration-200" >Home</Link>
        <Link to="/Market_prices" className="hover:text-green-800 transition-colors duration-200">Market prices</Link>
        <Link to="/MarketPlaces" className="hover:text-green-800 transition-colors duration-200"> MarketPlace </Link>
        <Link to="/How_itworks" className="hover:text-green-800 transition-colors duration-200">How it works</Link>
      </nav>


      {/* RIGHT: Buttons */}
      <div className="flex gap-4">
        <button className=" hover:bg-gray-200 px-4 py-2 rounded-md flex items-center gap-2 text-black font-bold">
          <User size={18} />
          Login
        </button>

        <button
          className="
    bg-green-800 text-white px-2 py-1 font-bold rounded-lg transition-all duration-300 hover:-translate-y-1">Get started
        </button>

      </div>

    </header>
  )
}

export default Header
