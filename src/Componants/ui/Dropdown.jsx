import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, ShoppingCart, Heart, Package, LogOut } from "lucide-react";

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/Auth");
  };

  return (
    <div className="relative inline-block">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="px-4  flex items-center gap-4 py-2 rounded-lg bg-white/30 text-white"
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNu9uulWIgqP6ax8ikiM4eQUf2cNqGtOMkaQ&s"
          alt=""
          className="w-10 h-10 bg-amber-600 rounded-4xl"
        />
        <div className="">
          <p>Welcome</p>
          <p>User Name</p>
        </div>
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl overflow-hidden
          transition-all duration-200 ease-out
          ${open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"}
        `}
      >
        <button
          onClick={() => navigate("/Account")}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-gray-700 font-medium rounded-t-lg"
        >
          <User size={18} />
          Account
        </button>
        <button
          onClick={() => navigate("/Cart")}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-gray-700 font-medium"
        >
          <ShoppingCart size={18} />
          Cart
        </button>
        <button
          onClick={() => navigate("/Wishlist")}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-gray-700 font-medium"
        >
          <Heart size={18} />
          Wishlist
        </button>
        <button
          onClick={() => navigate("/Orders")}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-gray-700 font-medium"
        >
          <Package size={18} />
          Orders
        </button>
        <hr className="my-2" />
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-100 text-red-600 font-medium rounded-b-lg"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dropdown;