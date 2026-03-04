import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, TrendingUp, Users, Leaf, ArrowRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { api } from "../config/apiConfig";
import HeroCarousel from "./HeroCarousel";

const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/product")
      .then(res => setProducts(Array.isArray(res.data) ? res.data : res.data.products || []))
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const stats = [
    { icon: Users, value: "10K+", label: t('statFarmers') },
    { icon: TrendingUp, value: "₹50L+", label: t('statTrades') },
    { icon: Leaf, value: "200+", label: t('statVarieties') },
  ];

  const filteredProducts = searchQuery.trim()
    ? products.filter((product) => {
      const q = searchQuery.toLowerCase();
      return (
        (product.title?.toLowerCase() ?? "").includes(q) ||
        (product.category?.toLowerCase() ?? "").includes(q)
      );
    }).slice(0, 5)
    : [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/MarketPlace?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setSearchQuery("");
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/ProductDetails/${productId}`);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || filteredProducts.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredProducts.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleProductClick(filteredProducts[selectedIndex]._id);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.trim().length > 0);
    setSelectedIndex(-1);
  };

  const handleClear = () => {
    setSearchQuery("");
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  return (
    <section className="relative min-h-screen flex">
      {/* Background Carousel */}
      <div className="absolute inset-0 overflow-hidden">
        <HeroCarousel />
      </div>

      {/* Content */}
      <div className="w-full px-4 relative z-10 py-16 bg-gradient-to-tr from-slate-900/90 via-slate-900/70 to-transparent p-8 lg:p-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              {t('heroBadge')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            {t('heroTitle')}{" "}
            <span className="text-orange-400">{t('heroPriceSpan')}</span> {t('heroAnd')}{" "}
            <span className="text-orange-400">{t('heroMarketSpan')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white text-lg md:text-xl mb-8 max-w-2xl"
          >
            {t('heroDescription')}
          </motion.p>

          {/* Search Bar with Autocomplete */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10"
          >
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
                <input
                  type="text"
                  placeholder={t('searchCropsHeader')}
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                  className="w-full pl-12 pr-10 h-14 text-base bg-white border-0 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}

                {/* Autocomplete Suggestions */}
                <AnimatePresence>
                  {showSuggestions && filteredProducts.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
                    >
                      {filteredProducts.map((product, index) => (
                        <div
                          key={product.id}
                          onClick={() => handleProductClick(product._id)}
                          className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${index === selectedIndex ? "bg-orange-50" : "hover:bg-gray-50"
                            } ${index !== 0 ? "border-t border-gray-100" : ""}`}
                        >
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm">{product.title}</h4>
                            <p className="text-xs text-gray-500">
                              {product.brand} • ₹{product.discountedPrice}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      ))}
                      <div
                        onClick={handleSearch}
                        className="p-3 bg-gray-50 border-t border-gray-200 text-center cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-sm text-orange-600 font-semibold flex items-center justify-center gap-2">
                          <Search className="w-4 h-4" />
                          {t('seeMore')} "{searchQuery}"
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* No Results */}
                <AnimatePresence>
                  {showSuggestions && searchQuery.trim() && filteredProducts.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 text-center z-50"
                    >
                      <p className="text-gray-500 text-sm">{t('noResults')} "{searchQuery}"</p>
                      <button
                        type="button"
                        onClick={() => navigate("/MarketPlace")}
                        className="mt-2 text-orange-600 text-sm font-semibold hover:text-orange-700"
                      >
                        {t('marketplace')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                type="submit"
                className="h-14 px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors"
              >
                {t('searchCropsBtn')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-6 md:gap-10"
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -20, 0],
        }}
        transition={{
          opacity: { duration: 1, delay: 0.5 },
          scale: { duration: 1, delay: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-20 right-20 hidden lg:block"
      >
        <div className="w-48 h-48 rounded-full bg-orange-500/10 blur-3xl border border-orange-500/20" />
      </motion.div>

      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 right-1/4 w-2 h-2 bg-orange-400 rounded-full opacity-40"
      />
    </section>
  );
};

export default Hero;
