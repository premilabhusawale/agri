import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Leaf, User, Search } from 'lucide-react'

// Import your existing Dropdown component
import Dropdown from './ui/Dropdown'

// TopBar Component
const TopBar = ({ search, setSearch, isLoggedIn }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-[#235C42]/95 backdrop-blur-md py-5 px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      {/* Logo - Positioned with margin-right */}
      <Link to="/" className="text-2xl flex items-center gap-2.5 hover:opacity-90 transition-opacity mr-12">
        <span className="bg-amber-400 p-2.5 rounded-xl shadow-md">
          <Leaf className="text-black" size={28} />
        </span>
        <span className="text-3xl">
          <span className="text-white font-bold">Agri</span>
          <span className="text-amber-400 font-bold">Connect</span>
        </span>
      </Link>

    <div className="relative w-full max-w-xl mx-auto">
  <input
    type="text"
    placeholder="Search crops, farmers..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full pl-10 pr-4 py-2 rounded-lg
               bg-transparent
               border border-white
               text-white placeholder-gray-300
               focus:outline-none focus:ring-2 focus:ring-white"
  />
  <Search
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
    size={20}
  />
</div>


      {/* Authentication Section on Right */}
      <div className="flex gap-3 ml-8">
        {isLoggedIn ? (
          <Dropdown />
        ) : (
          <button
            onClick={() => navigate('/Auth')}
            className="bg-amber-500 px-6 py-2 rounded-lg flex items-center gap-2.5 text-black font-bold text-base transition-all duration-200 ease-out shadow-md hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md"
          >
            <User size={20} strokeWidth={2.5} />
            <span className="text-black">Login</span>
          </button>
        )}
      </div>
    </div>
  )
}

// NavBar Component
const NavBar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 py-3.5 px-8 sticky top-[88px] z-40 shadow-sm">
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        {/* Navigation Links - Centered */}
        <div className="flex gap-2 text-gray-600 font-medium">
          <Link
            to="/"
            className="hover:text-green-800 hover:bg-gray-100 px-5 py-2.5 rounded-full transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/MarketPlace"
            className="hover:text-green-800 hover:bg-gray-100 px-5 py-2.5 rounded-full transition-colors duration-200"
          >
            Marketplace
          </Link>
          <Link
            to="/LivePrices"
            className="hover:text-green-800 hover:bg-gray-100 px-5 py-2.5 rounded-full transition-colors duration-200"
          >
            Live Prices
          </Link>
          <Link
            to="/ForFarmers"
            className="hover:text-green-800 hover:bg-gray-100 px-5 py-2.5 rounded-full transition-colors duration-200"
          >
            For Farmers
          </Link>
          <Link
            to="/About"
            className="hover:text-green-800 hover:bg-gray-100 px-5 py-2.5 rounded-full transition-colors duration-200"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}

// Main Header Component
const Header = () => {
  const [search, setSearch] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Replace with actual authentication logic

  return (
    <>
      <TopBar search={search} setSearch={setSearch} isLoggedIn={isLoggedIn} />
      <NavBar />
    </>
  )
}

export default Header