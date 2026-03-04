import React, { useState, useEffect, Suspense, createContext, useContext, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ChatBot from "./Components/ChatBot";
import SplashScreen from "./Components/SpashScreen";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import AdminRoutes from "./Admin/Routes/AdminRoutes";

import Home from "./Pages/Home";
import LivePrices from "./Pages/LivePrices";
import MarketPlace from "./Pages/MarketPlace";
import ForFarmers from "./Pages/ForFarmers";
import About from "./Pages/About";
import Auth from "./Pages/Auth";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Orders from "./Pages/Orders";
import Accounts from "./Pages/Accounts";
import Messages from "./Pages/Messages";
import CheckOut from "./Pages/CheckOut";
import ForgotPassword from "./Pages/Forgotpassword";
import LivePricesSection from "./HeroSection/LivePriceSection";
import ContactUs from "./Pages/Contactus";
import FAQs from "./Pages/Faqs";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import CookiePolicy from "./Pages/CookiePolicy";
import TermsOfService from "./Pages/TermsOfService";
import RefundPolicy from "./Pages/RefundPolicy";

import AdminLayout from "./Admin/Layout";
import Dashboard from "./Admin/Dashboard/Dashboard";

import { restoreAuth } from "./States/Auth/Action";
import Crop from "./Admin/Crop/Crop";
import { API_BASE_URL } from "./config/apiConfig";

const SERVER = API_BASE_URL.replace("/api/v1", "");

// ── Global Unread Context ──────────────────────────────────────────────────────
export const UnreadContext = createContext({ unreadCount: 0, clearUnread: () => { } });
export const useUnread = () => useContext(UnreadContext);

// ── AppContent ─────────────────────────────────────────────────────────────────
const AppContent = () => {
  const location = useLocation();
  const { user } = useSelector((s) => s.auth ?? s.Auth ?? {});
  const socketRef = useRef(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const hideLayout =
    location.pathname === "/Auth" ||
    location.pathname === "/Accounts" ||
    location.pathname === "/admin" ||
    location.pathname.startsWith("/admin");

  // Clear unread badge when user visits Messages page
  useEffect(() => {
    if (location.pathname === "/Messages") {
      setUnreadCount(0);
    }
  }, [location.pathname]);

  // Global socket: connect when logged in, listen for notifications from anywhere
  useEffect(() => {
    if (!user?._id) {
      socketRef.current?.disconnect();
      socketRef.current = null;
      return;
    }

    if (socketRef.current) return; // already connected

    const socket = io(SERVER);
    socketRef.current = socket;

    // Register this user so server can target them by userId room
    socket.on("connect", () => {
      socket.emit("registerUser", user._id);
    });

    // Receive notification when someone sends us a message
    socket.on("newMessageNotification", (data) => {
      // Only increment badge if user is NOT already on the Messages page
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user?._id]);

  const clearUnread = () => setUnreadCount(0);

  return (
    <UnreadContext.Provider value={{ unreadCount, clearUnread }}>
      {!hideLayout && <Header />}

      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Routes>
          {/* ── Public Routes ── */}
          <Route path="/" element={<Home />} />
          <Route path="/LivePrices" element={<LivePrices />} />
          <Route path="/MarketPlace" element={<MarketPlace />} />
          <Route path="/ForFarmers" element={<ForFarmers />} />
          <Route path="/About" element={<About />} />
          <Route path="/LivePriceSection" element={<LivePricesSection />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/ForgotPassword/:resetToken" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<ForgotPassword />} />
          <Route path="/ProductDetails/:id" element={<ProductDetails />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/FAQs" element={<FAQs />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/CookiePolicy" element={<CookiePolicy />} />
          <Route path="/TermsOfService" element={<TermsOfService />} />
          <Route path="/RefundPolicy" element={<RefundPolicy />} />

          {/* ── Protected User Routes ── */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Accounts" element={<Accounts />} />
            <Route path="/Messages" element={<Messages />} />
            <Route path="/CheckOut" element={<CheckOut />} />
          </Route>

          {/* ── Protected Admin Routes ── */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* ── Fallback ── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      {!hideLayout && <Footer />}

      <ChatBot />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </UnreadContext.Provider>
  );
};

// ── App ────────────────────────────────────────────────────────────────────────
const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <AppContent />
      )}
    </Router>
  );
};

export default App;