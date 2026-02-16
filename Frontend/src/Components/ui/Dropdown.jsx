import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaShoppingBag, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Get user data from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
        console.log('Dropdown - User loaded:', userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    // ✅ FIXED: Clear localStorage properly
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    
    console.log('✅ Logged out successfully');
    console.log('localStorage cleared:', {
      jwt: localStorage.getItem('jwt'),
      user: localStorage.getItem('user')
    });
    
    // Dispatch custom event to update Header
    window.dispatchEvent(new Event('userLoggedIn'));
    
    // Navigate to home or auth page
    navigate('/');
    
    // Reload page to reset all state
    setTimeout(() => {
      window.location.reload();
    }, 100);
    
    setOpen(false);
  };

  // ✅ Get user display name
  const getUserName = () => {
    if (!user) return 'User';
    return user.name || user.full_name || user.email?.split('@')[0] || 'User';
  };

  // ✅ Get user photo
  const getUserPhoto = () => {
    if (user?.photo) return user.photo;
    if (user?.avatar_url) return user.avatar_url;
    // Default avatar
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNu9uulWIgqP6ax8ikiM4eQUf2cNqGtOMkaQ&s";
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 flex items-center gap-4 py-2 rounded-lg bg-white/30 text-white hover:bg-white/40 transition-colors"
      >
        <img
          src={getUserPhoto()}
          alt="User profile"
          className="w-10 h-10 bg-amber-600 rounded-full object-cover"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.src = "https://ui-avatars.com/api/?name=" + getUserName() + "&background=F59E0B&color=fff";
          }}
        />
        <div className="text-left">
          <p className="text-xs opacity-90">Welcome</p>
          <p className="text-sm font-semibold">{getUserName()}</p>
        </div>
      </button>

      <div
        className={`
          absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl overflow-hidden z-50
          transition-all duration-200 ease-out
          ${open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"}
        `}
      >
        <button
          onClick={() => handleNavigation("/Accounts")}
          className="w-full px-4 py-3 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left"
        >
          <FaUser className="text-gray-500" />
          Account
        </button>

        <button
          onClick={() => handleNavigation("/Orders")}
          className="w-full px-4 py-3 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left"
        >
          <FaShoppingBag className="text-gray-500" />
          Orders
        </button>

        <button
          onClick={() => handleNavigation("/Cart")}
          className="w-full px-4 py-3 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left"
        >
          <MdShoppingCart className="text-gray-500" />
          Cart
        </button>

        <button
          onClick={() => handleNavigation("/Wishlist")}
          className="w-full px-4 py-3 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left"
        >
          <FaHeart className="text-gray-500" />
          Wishlist
        </button>
        
        <div className="border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;