import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Leaf, User, Search, MessageSquare, ArrowRight, X, Users as UsersIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import products from '../Data/Products'
import Dropdown from './ui/Dropdown'

// TopBar Component
const TopBar = ({ isLoggedIn }) => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  // Get unique farmers from products
  const getFarmers = () => {
    const farmersMap = new Map()
    products.forEach(product => {
      if (product.farmer) {
        if (!farmersMap.has(product.farmer)) {
          farmersMap.set(product.farmer, {
            name: product.farmer,
            location: product.location,
            image: product.image, 
            productCount: 1
          })
        } else {
          const farmer = farmersMap.get(product.farmer)
          farmer.productCount++
        }
      }
    })
    return Array.from(farmersMap.values())
  }

  const farmers = getFarmers()

  // Filter products based on search query
  const filteredProducts = searchQuery.trim()
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 3) // Show max 3 product suggestions
    : []

  // Filter farmers based on search query
  const filteredFarmers = searchQuery.trim()
    ? farmers.filter((farmer) =>
        farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (farmer.location && farmer.location.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 3) // Show max 3 farmer suggestions
    : []

  const hasResults = filteredProducts.length > 0 || filteredFarmers.length > 0
  const totalResults = filteredProducts.length + filteredFarmers.length

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/MarketPlace?search=${encodeURIComponent(searchQuery.trim())}`)
      setShowSuggestions(false)
      setSearchQuery('')
    }
  }

  // Handle product click from suggestions
  const handleProductClick = (productId) => {
    navigate(`/ProductDetails/${productId}`)
    setShowSuggestions(false)
    setSearchQuery('')
  }

  // Handle farmer click from suggestions
  const handleFarmerClick = (farmerName) => {
    navigate(`/MarketPlace?search=${encodeURIComponent(farmerName)}`)
    setShowSuggestions(false)
    setSearchQuery('')
  }

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || totalResults === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => 
        prev < totalResults - 1 ? prev + 1 : prev
      )
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault()
      if (selectedIndex < filteredProducts.length) {
        handleProductClick(filteredProducts[selectedIndex].id)
      } else {
        const farmerIndex = selectedIndex - filteredProducts.length
        handleFarmerClick(filteredFarmers[farmerIndex].name)
      }
    }
  }

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowSuggestions(value.trim().length > 0)
    setSelectedIndex(-1)
  }

  // Clear search
  const handleClear = () => {
    setSearchQuery('')
    setShowSuggestions(false)
    setSelectedIndex(-1)
  }

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

      {/* Search Bar with Autocomplete */}
      <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search crops, farmers..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="w-full pl-10 pr-10 py-2 rounded-lg
                   bg-white/90
                   border border-gray-300
                   text-black placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          size={20}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}

        {/* Autocomplete Suggestions */}
        <AnimatePresence>
          {showSuggestions && hasResults && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
            >
              {/* Products Section */}
              {filteredProducts.length > 0 && (
                <div>
                  <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Products ({filteredProducts.length})
                    </span>
                  </div>
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
                        index === selectedIndex
                          ? "bg-green-50"
                          : "hover:bg-gray-50"
                      } border-b border-gray-100`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {product.farmer} • ₹{product.price}/{product.unit}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              )}

              {/* Farmers Section */}
              {filteredFarmers.length > 0 && (
                <div>
                  <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Farmers ({filteredFarmers.length})
                    </span>
                  </div>
                  {filteredFarmers.map((farmer, index) => {
                    const globalIndex = filteredProducts.length + index
                    return (
                      <div
                        key={farmer.name}
                        onClick={() => handleFarmerClick(farmer.name)}
                        className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
                          globalIndex === selectedIndex
                            ? "bg-green-50"
                            : "hover:bg-gray-50"
                        } border-b border-gray-100`}
                      >
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <UsersIcon className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {farmer.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {farmer.location} • {farmer.productCount} products
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    )
                  })}
                </div>
              )}

              {/* See All Results Footer */}
              <div
                onClick={handleSearch}
                className="p-3 bg-gray-50 text-center cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm text-green-600 font-semibold flex items-center justify-center gap-2">
                  <Search className="w-4 h-4" />
                  See all results for "{searchQuery}"
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results */}
        <AnimatePresence>
          {showSuggestions && searchQuery.trim() && !hasResults && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 text-center z-50"
            >
              <p className="text-gray-500 text-sm">
                No products or farmers found for "{searchQuery}"
              </p>
              <button
                type="button"
                onClick={() => navigate("/MarketPlace")}
                className="mt-2 text-green-600 text-sm font-semibold hover:text-green-700"
              >
                Browse all products
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Authentication Section on Right */}
      <div className="flex gap-3 ml-8">
        {isLoggedIn ? (
          <>
            {/* Messages Button */}
            <button
              onClick={() => navigate('/messages')}
              className=" px-4 py-2 rounded-lg flex items-center gap-2 text-white font-medium text-base transition-all duration-200 ease-out  hover:border-white/30 relative"
              title="Messages"
            >
              <MessageSquare size={20} strokeWidth={2} />
            
            </button>
            
            {/* User Dropdown */}
            <Dropdown />
          </>
        ) : (
          <>
            {/* Messages Button for Non-logged in users - redirects to auth */}
            <button
              onClick={() => navigate('/Auth')}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg flex items-center gap-2 text-white font-medium text-base transition-all duration-200 ease-out border border-white/20 hover:border-white/30"
              title="Login to view messages"
            >
              <MessageSquare size={20} strokeWidth={2} />
            </button>

            {/* Login Button */}
            <button
              onClick={() => navigate('/Auth')}
              className="bg-amber-500 px-6 py-2 rounded-lg flex items-center gap-2.5 text-black font-bold text-base transition-all duration-200 ease-out shadow-md hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md"
            >
              <User size={20} strokeWidth={2.5} />
              <span className="text-black">Login</span>
            </button>
          </>
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
          <Link
            to="/FarmerDashboard"
            className="hover:text-green-800 hover:bg-gray-100 px-5 py-2.5 rounded-full transition-colors duration-200"
          >FarmerDashboard</Link>
        </div>
      </div>
    </nav>
  )
}

// Main Header Component
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Replace with actual authentication logic

  return (
    <>
      <TopBar isLoggedIn={isLoggedIn} />
      <NavBar />
    </>
  )
}

export default Header