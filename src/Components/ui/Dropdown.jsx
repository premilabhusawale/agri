import { useState } from "react";
import { FaUser, FaShoppingBag, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";

const Dropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 flex items-center gap-4 py-2 rounded-lg bg-white/30 text-white"
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNu9uulWIgqP6ax8ikiM4eQUf2cNqGtOMkaQ&s"
          alt=""
          className="w-10 h-10 bg-amber-600 rounded-full"
        />
        <div>
          <p>Welcome</p>
          <p>User Name</p>
        </div>
      </button>

      <div
        className={`
          absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl overflow-hidden
          transition-all duration-200 ease-out
          ${open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"}
        `}
      >
        <button className="w-full px-4 py-2 flex items-center gap-3 text-sm hover:bg-gray-100">
          <FaUser className="text-gray-500" />
          Account
        </button>

        <button className="w-full px-4 py-2 flex items-center gap-3 text-sm hover:bg-gray-100">
          <FaShoppingBag className="text-gray-500" />
          Orders
        </button>

        <button className="w-full px-4 py-2 flex items-center gap-3 text-sm hover:bg-gray-100">
          <MdShoppingCart className="text-gray-500" />
          Cart
        </button>

        <button className="w-full px-4 py-2 flex items-center gap-3 text-sm hover:bg-gray-100">
          <FaHeart className="text-gray-500" />
          Wishlist
        </button>

        <div className="border-t">
          <button className="w-full px-4 py-2 flex items-center gap-3 text-sm text-red-600 hover:bg-red-50">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
