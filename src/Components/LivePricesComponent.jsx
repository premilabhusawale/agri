import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, RefreshCw, MapPin, Filter, Download, Share2, Bell, Clock } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const LivePricesComponent = ({ 
  theme = "orange",
  showHeader = true 
}) => {
  const [selectedCrop, setSelectedCrop] = useState("tomatoes");
  const [timeRange, setTimeRange] = useState("7d");
  const [chartType, setChartType] = useState("line");
  const [selectedMarket, setSelectedMarket] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const crops = [
    { id: "tomatoes", name: "Tomatoes", emoji: "🍅", price: 45, change: 5.2, high: 52, low: 38, volume: "2.5k tons", market: "Nashik" },
    { id: "potatoes", name: "Potatoes", emoji: "🥔", price: 28, change: -2.1, high: 32, low: 25, volume: "5.2k tons", market: "Agra" },
    { id: "onions", name: "Onions", emoji: "🧅", price: 35, change: 8.5, high: 42, low: 28, volume: "3.8k tons", market: "Lasalgaon" },
    { id: "rice", name: "Rice", emoji: "🌾", price: 52, change: 0, high: 55, low: 48, volume: "8.1k tons", market: "Karnal" },
    { id: "wheat", name: "Wheat", emoji: "🌾", price: 38, change: 3.2, high: 42, low: 35, volume: "6.5k tons", market: "Punjab" },
    { id: "carrots", name: "Carrots", emoji: "🥕", price: 40, change: -1.5, high: 45, low: 36, volume: "1.9k tons", market: "Ooty" },
    { id: "cabbage", name: "Cabbage", emoji: "🥬", price: 25, change: 4.8, high: 28, low: 22, volume: "2.1k tons", market: "Shimla" },
    { id: "apples", name: "Apples", emoji: "🍎", price: 120, change: -3.2, high: 130, low: 110, volume: "1.2k tons", market: "Kashmir" },
  ];

  const markets = ["all", "Nashik", "Agra", "Lasalgaon", "Karnal", "Punjab", "Ooty", "Shimla", "Kashmir"];

  const chartDataByRange = {
    "24h": [
      { time: "12 AM", price: 43 },
      { time: "4 AM", price: 42 },
      { time: "8 AM", price: 44 },
      { time: "12 PM", price: 46 },
      { time: "4 PM", price: 45 },
      { time: "8 PM", price: 47 },
      { time: "Now", price: 45 },
    ],
    "7d": [
      { time: "Mon", price: 42 },
      { time: "Tue", price: 38 },
      { time: "Wed", price: 45 },
      { time: "Thu", price: 41 },
      { time: "Fri", price: 48 },
      { time: "Sat", price: 44 },
      { time: "Today", price: 45 },
    ],
    "30d": [
      { time: "Week 1", price: 40 },
      { time: "Week 2", price: 42 },
      { time: "Week 3", price: 38 },
      { time: "Week 4", price: 45 },
    ],
    "1y": [
      { time: "Jan", price: 38 },
      { time: "Feb", price: 40 },
      { time: "Mar", price: 42 },
      { time: "Apr", price: 45 },
      { time: "May", price: 48 },
      { time: "Jun", price: 46 },
      { time: "Jul", price: 44 },
      { time: "Aug", price: 43 },
      { time: "Sep", price: 45 },
      { time: "Oct", price: 47 },
      { time: "Nov", price: 46 },
      { time: "Dec", price: 45 },
    ],
  };

  const selectedCropData = crops.find((c) => c.id === selectedCrop);
  const chartData = chartDataByRange[timeRange];

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const filteredCrops = selectedMarket === "all" 
    ? crops 
    : crops.filter(c => c.market === selectedMarket);

  const themes = {
    orange: {
      badgeBg: "bg-orange-100",
      badgeText: "text-orange-600",
      pulseBg: "bg-orange-600",
      selectedBg: "bg-orange-500",
      lineColor: "#f97316",
    },
    green: {
      badgeBg: "bg-green-50",
      badgeText: "text-green-700",
      pulseBg: "bg-[#235C42]",
      selectedBg: "bg-[#235C42]",
      lineColor: "#16a34a",
    }
  };

  const currentTheme = themes[theme];

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  const handleExport = () => {
    alert("Data exported successfully!");
  };

  const handleShare = () => {
    alert("Share link copied to clipboard!");
  };

  const handleSetAlert = () => {
    alert(`Price alert set for ${selectedCropData?.name}!`);
  };

  const renderChart = () => {
    const commonProps = {
      width: "100%",
      height: "100%",
    };

    switch (chartType) {
      case "area":
        return (
          <ResponsiveContainer {...commonProps}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={currentTheme.lineColor} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={currentTheme.lineColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => `₹${value}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
                formatter={(value) => [`₹${value}`, "Price"]}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={currentTheme.lineColor}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer {...commonProps}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => `₹${value}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
                formatter={(value) => [`₹${value}`, "Price"]}
              />
              <Bar dataKey="price" fill={currentTheme.lineColor} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer {...commonProps}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => `₹${value}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
                formatter={(value) => [`₹${value}`, "Price"]}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={currentTheme.lineColor}
                strokeWidth={3}
                dot={{ fill: currentTheme.lineColor, strokeWidth: 2 }}
                activeDot={{ r: 6, fill: currentTheme.lineColor }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <>
      {showHeader && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${currentTheme.badgeBg} ${currentTheme.badgeText} text-sm font-medium mb-4`}>
            <span className={`w-2 h-2 rounded-full ${currentTheme.pulseBg} animate-pulse`} />
            Live Market Data
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real-Time Crop Prices
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed with live market prices updated every hour from major agricultural markets
            across the country.
          </p>
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded text-green-600 focus:ring-green-500"
            />
            <span className="text-sm">Auto-refresh</span>
          </label>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm"
          >
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <select
                  value={selectedMarket}
                  onChange={(e) => setSelectedMarket(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                >
                  {markets.map(market => (
                    <option key={market} value={market}>
                      {market === "all" ? "All Markets" : market}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              Today's Prices ({filteredCrops.length})
            </h3>
          </div>
          
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
            {filteredCrops.map((crop) => (
              <motion.div
                key={crop.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCrop(crop.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedCrop === crop.id
                    ? `${currentTheme.selectedBg} text-white shadow-lg`
                    : "bg-white hover:bg-gray-50 shadow-sm border border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{crop.emoji}</span>
                    <div>
                      <h4 className="font-semibold">{crop.name}</h4>
                      <p className={`text-xs ${selectedCrop === crop.id ? "text-white/70" : "text-gray-500"}`}>
                        {crop.market} • {crop.volume}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">₹{crop.price}</div>
                    <div
                      className={`flex items-center gap-1 text-sm ${
                        crop.change > 0
                          ? selectedCrop === crop.id ? "text-green-300" : "text-green-600"
                          : crop.change < 0
                          ? "text-red-600"
                          : selectedCrop === crop.id ? "text-white/70" : "text-gray-600"
                      }`}
                    >
                      {crop.change > 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : crop.change < 0 ? (
                        <TrendingDown className="w-4 h-4" />
                      ) : null}
                      {crop.change > 0 ? "+" : ""}
                      {crop.change}%
                    </div>
                  </div>
                </div>
                <div className={`text-xs pt-2 border-t ${selectedCrop === crop.id ? "border-white/20" : "border-gray-200"}`}>
                  <span className={selectedCrop === crop.id ? "text-white/70" : "text-gray-600"}>
                    High: ₹{crop.high} • Low: ₹{crop.low}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                <span className="text-2xl">{selectedCropData?.emoji}</span>
                {selectedCropData?.name} Price Trend
              </h3>
              <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                {selectedCropData?.market} Market
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-left md:text-right">
              <div className="text-2xl font-bold text-gray-900">
                ₹{selectedCropData?.price}
              </div>
              <div
                className={`flex items-center md:justify-end gap-1 text-sm ${
                  (selectedCropData?.change ?? 0) > 0
                    ? "text-green-600"
                    : (selectedCropData?.change ?? 0) < 0
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {(selectedCropData?.change ?? 0) > 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (selectedCropData?.change ?? 0) < 0 ? (
                  <TrendingDown className="w-4 h-4" />
                ) : null}
                {(selectedCropData?.change ?? 0) > 0 ? "+" : ""}
                {selectedCropData?.change}% today
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
              {["24h", "7d", "30d", "1y"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    timeRange === range
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {range === "24h" ? "24H" : range === "7d" ? "7D" : range === "30d" ? "30D" : "1Y"}
                </button>
              ))}
            </div>

            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg ml-auto">
              <button
                onClick={() => setChartType("line")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  chartType === "line"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Line
              </button>
              <button
                onClick={() => setChartType("area")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  chartType === "area"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Area
              </button>
              <button
                onClick={() => setChartType("bar")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  chartType === "bar"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Bar
              </button>
            </div>
          </div>

          <div className="h-[300px] mb-6">
            {renderChart()}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Today's High</p>
              <p className="text-xl font-bold text-green-600">₹{selectedCropData?.high}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Today's Low</p>
              <p className="text-xl font-bold text-red-600">₹{selectedCropData?.low}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">7-Day Avg</p>
              <p className="text-xl font-bold text-gray-900">
                ₹{Math.round(((selectedCropData?.high ?? 0) + (selectedCropData?.low ?? 0)) / 2)}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">Volume</p>
              <p className="text-xl font-bold text-gray-900">{selectedCropData?.volume}</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSetAlert}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md font-semibold"
            >
              <Bell className="w-5 h-5" />
              Set Price Alert for {selectedCropData?.name}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </>
  );
};

export default LivePricesComponent;