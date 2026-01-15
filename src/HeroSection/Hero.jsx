import { motion } from "framer-motion";
import { Search, TrendingUp, Users, Leaf, ArrowRight } from "lucide-react";
import HeroCarousel from "./HeroCarousel";

const Hero = () => {
  const stats = [
    { icon: Users, value: "10K+", label: "Active Farmers" },
    { icon: TrendingUp, value: "₹50L+", label: "Daily Trades" },
    { icon: Leaf, value: "200+", label: "Crop Varieties" },
  ];

  return (
    <section className="relative min-h-screen flex   overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <HeroCarousel />

      </div>

      {/* Content */}
      <div className="w-full px-4 relative z-10 py-15 bg-linear-to-tr from-slate-900/90 via-slate-900/70 to-transparent  p-8 lg:p-16">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              Live Market Prices Updated Every Hour
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Empowering Farmers with{" "}
            <span className="text-orange-400">Real-Time Prices</span> &{" "}
            <span className="text-orange-400">Direct Market Access</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white text-lg md:text-xl mb-8 max-w-2xl"
          >
            Connect directly with buyers, get fair prices for your harvest, and access live market
            data. No middlemen, just pure farm-to-table commerce.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search for tomatoes, wheat, rice..."
                className="w-full pl-12 pr-4 h-14 text-base bg-white border-0 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button className="h-14 px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors">
              Search Crops
              <ArrowRight className="w-5 h-5" />
            </button>
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
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/80">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-10 right-10 hidden lg:block"
      >
        <div className="w-32 h-32 rounded-full bg-orange-500/20 blur-3xl" />
      </motion.div>
    </section>
  );
};

export default Hero;