
import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LivePrices = () => {
  const [selectedCrop, setSelectedCrop] = useState("tomatoes");

  const crops = [
    { id: "tomatoes", name: "Tomatoes", emoji: "🍅", price: 45, change: 5.2, high: 52, low: 38 },
    { id: "potatoes", name: "Potatoes", emoji: "🥔", price: 28, change: -2.1, high: 32, low: 25 },
    { id: "onions", name: "Onions", emoji: "🧅", price: 35, change: 8.5, high: 42, low: 28 },
    { id: "rice", name: "Rice", emoji: "🌾", price: 52, change: 0, high: 55, low: 48 },
    { id: "wheat", name: "Wheat", emoji: "🌾", price: 38, change: 3.2, high: 42, low: 35 },
    { id: "carrots", name: "Carrots", emoji: "🥕", price: 40, change: -1.5, high: 45, low: 36 },
  ];

  const chartData = [
    { day: "Mon", price: 42 },
    { day: "Tue", price: 38 },
    { day: "Wed", price: 45 },
    { day: "Thu", price: 41 },
    { day: "Fri", price: 48 },
    { day: "Sat", price: 44 },
    { day: "Today", price: 45 },
  ];

  const selectedCropData = crops.find((c) => c.id === selectedCrop);

  return (
    <section id="prices" className="py-20 bg-gradient-to-b from-[#EBF1ED] to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-[#14f18e] text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-[#235C42] animate-pulse" />
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Price Cards Grid */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Today's Prices</h3>
              <button className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {crops.map((crop) => (
                <motion.div
                  key={crop.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCrop(crop.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedCrop === crop.id
                      ? "bg-[#235C42] text-white shadow-lg"
                      : "bg-white hover:bg-gray-50 shadow-sm border border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{crop.emoji}</span>
                      <div>
                        <h4 className="font-semibold">{crop.name}</h4>
                        <p className={`text-sm ${selectedCrop === crop.id ? "text-white/70" : "text-gray-600"}`}>
                          per kg
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
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                  <span className="text-2xl">{selectedCropData?.emoji}</span>
                  {selectedCropData?.name} Price Trend
                </h3>
                <p className="text-sm text-gray-600 mt-1">Last 7 days</p>
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

            {/* Chart */}
            <div className="h-[300px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="day"
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => `₹${value}`}
                  />
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
                    stroke="#f97316"
                    strokeWidth={3}
                    dot={{ fill: "#f97316", strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: "#f97316" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Today's High</p>
                <p className="text-2xl font-bold text-green-600">₹{selectedCropData?.high}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Today's Low</p>
                <p className="text-2xl font-bold text-red-600">₹{selectedCropData?.low}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">7-Day Avg</p>
                <p className="text-2xl font-bold text-gray-900">₹{Math.round(((selectedCropData?.high ?? 0) + (selectedCropData?.low ?? 0)) / 2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



export default LivePrices