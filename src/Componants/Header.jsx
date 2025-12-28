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
          <Link to="/" className="hover:text-green-800">Home</Link>
          <Link to="/MarketPlace" className="hover:text-green-800 ">Marketplace</Link>
          <Link to="/LivePrices" className="hover:text-green-800">Live prices</Link>
          <Link to="/ForFarmers" className="hover:text-green-800">For Farmers</Link>
          <Link to="/About" className="hover:text-green-800">About</Link>

        </nav>

        {/* SEARCH */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-4 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>

        {/* RIGHT BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowPopup(true)}
            className="hover:bg-gray-200 px-4 py-2 rounded-md flex items-center gap-2 text-black font-medium"
          >
            <User size={18} />
            Login
          </button>

          <button className="bg-green-800 text-white px-3 py-2 font-semibold rounded-lg hover:-translate-y-0.5 transition">
            Get started
          </button>
        </div>
      </header>

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 text-center">
            <h2 className="text-xl font-bold mb-4">Who are you?</h2>

            <div className="flex flex-col gap-3">
              <button className="bg-green-800 text-white py-2 rounded-lg hover:bg-green-700">
                Farmer
              </button>

              <button className="bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700">
                Buyer
              </button>
            </div>

            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 text-sm text-gray-500 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
