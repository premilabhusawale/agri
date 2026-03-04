import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaShoppingBag, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { logoutUser } from "../../States/Auth/Action";

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Read user from Redux — works on refresh too
  const user = useSelector((s) => s.auth?.user ?? s.Auth?.user ?? null);

  // ✅ Read cart count from Redux
  const cartItems = useSelector((s) => s.cart?.items ?? s.Cart?.items ?? []);
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

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
    dispatch(logoutUser());
    navigate('/');
    setOpen(false);
  };

  const getUserName = () => {
    if (!user) return 'User';
    return user.name || user.full_name || user.email?.split('@')[0] || 'User';
  };

  const getUserPhoto = () => {
    if (user?.photoPreview) return user.photoPreview;
    if (user?.photo) return user.photo;
    if (user?.avatar_url) return user.avatar_url;
    return "https://ui-avatars.com/api/?name=" + encodeURIComponent(getUserName()) + "&background=F59E0B&color=fff";
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative px-4 flex items-center gap-4 py-2 rounded-lg bg-white/30 text-white hover:bg-white/40 transition-colors"
      >
        {/* Cart count badge on the avatar */}
        {cartCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-black text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 shadow-md z-10 leading-none">
            {cartCount > 99 ? '99+' : cartCount}
          </span>
        )}
        <img
          src={getUserPhoto()}
          alt="User profile"
          className="w-10 h-10 bg-amber-600 rounded-full object-cover"
          onError={(e) => {
            e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(getUserName()) + "&background=F59E0B&color=fff";
          }}
        />
        <div className="text-left">
          <p className="text-xs opacity-90">Welcome</p>
          <p className="text-sm font-semibold">{getUserName()}</p>
        </div>
      </button>

      {/* Dropdown Menu */}
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

        {/* Cart with live count badge */}
        <button
          onClick={() => handleNavigation("/Cart")}
          className="w-full px-4 py-3 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left"
        >
          <MdShoppingCart className="text-gray-500" />
          Cart
          {cartCount > 0 && (
            <span className="ml-auto bg-amber-400 text-black text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 leading-none">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
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