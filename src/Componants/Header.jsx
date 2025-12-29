import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Leaf, User } from 'lucide-react'

const Header = () => {
  // 🔹 STATE (ALWAYS HERE)
  const [search, setSearch] = useState('')
  const [showPopup, setShowPopup] = useState(false)

  return (
    <>
      <header className="bg-[#D9D5CD]/80 backdrop-blur-md py-5 px-5 flex items-center justify-between sticky top-0 z-50">

        {/* LEFT: Logo */}
        <div className="text-2xl flex items-center gap-2">
          <span className="bg-amber-400 p-2 rounded-lg">
            <Leaf className="text-black" size={24} />
          </span>
          <span>
            <span className="text-black font-bold">Agri</span>
            <span className="text-green-800 font-bold">Connect</span>
          </span>
        </div>

        {/* CENTER: Links */}
        <nav className="flex gap-6 text-gray-600 font-medium">
          <Link to="/" className="hover:text-green-800 hover:bg-gray-200 px-4 py-2 rounded-3xl">Home</Link>
          <Link to="/MarketPlace" className="hover:text-green-800 hover:bg-gray-200 px-4 py-2 rounded-3xl ">Marketplace</Link>
          <Link to="/LivePrices" className="hover:text-green-800 hover:bg-gray-200 px-4 py-2 rounded-3xl">Live prices</Link>
          <Link to="/ForFarmers" className="hover:text-green-800 hover:bg-gray-200 px-4 py-2 rounded-3xl">For Farmers</Link>
          <Link to="/About" className="hover:text-green-800 hover:bg-gray-200 px-4 py-2 rounded-3xl">About</Link>

        </nav>

        {/* SEARCH */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search crops,farmers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-4 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex gap-3">
          <button
  onClick={() => setShowPopup(true)}
  className="
    bg-amber-500 px-4 py-2 rounded-lg
    flex items-center gap-2
    text-black font-medium

    transition-all duration-200 ease-out
    shadow-md
    hover:-translate-y-1
    hover:shadow-xl
    active:translate-y-0
    active:shadow-md"  >
  <User size={18} />
  Login
</button>

        </div>
      </header>

     

              
      
    </>
  )
}

export default Header
