// import { useState } from "react";
// import { motion } from "framer-motion";
// import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

// const LivePricesSection = () => {
//   const [selectedCrop, setSelectedCrop] = useState("tomatoes");

//   const crops = [
//     { id: "tomatoes", name: "Tomatoes", emoji: "🍅", price: 45, change: 5.2, high: 52, low: 38 },
//     { id: "potatoes", name: "Potatoes", emoji: "🥔", price: 28, change: -2.1, high: 32, low: 25 },
//     { id: "onions", name: "Onions", emoji: "🧅", price: 35, change: 8.5, high: 42, low: 28 },
//     { id: "rice", name: "Rice", emoji: "🌾", price: 52, change: 0, high: 55, low: 48 },
//     { id: "wheat", name: "Wheat", emoji: "🌾", price: 38, change: 3.2, high: 42, low: 35 },
//     { id: "carrots", name: "Carrots", emoji: "🥕", price: 40, change: -1.5, high: 45, low: 36 },
//   ];

//   const selectedCropData = crops.find((c) => c.id === selectedCrop);

//   return (
//     <section id="prices" className="py-20 bg-gradient-to-b from-white to-gray-50">
//       <div className="container mx-auto px-4">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-12"
//         >
//           <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-4">
//             <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
//             Live Market Data
//           </span>
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             Real-Time Crop Prices
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Stay informed with live market prices updated every hour
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Price Cards */}
//           <div className="lg:col-span-1 space-y-4">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="font-semibold text-gray-900">Today's Prices</h3>
//               <button className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
//                 <RefreshCw className="w-4 h-4" />
//               </button>
//             </div>
            
//             <div className="space-y-3">
//               {crops.map((crop) => (
//                 <motion.div
//                   key={crop.id}
//                   whileHover={{ scale: 1.02 }}
//                   onClick={() => setSelectedCrop(crop.id)}
//                   className={`p-4 rounded-xl cursor-pointer transition-all ${
//                     selectedCrop === crop.id
//                       ? "bg-orange-500 text-white shadow-lg"
//                       : "bg-white hover:bg-gray-50 shadow-sm border border-gray-200"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <span className="text-2xl">{crop.emoji}</span>
//                       <div>
//                         <h4 className="font-semibold">{crop.name}</h4>
//                         <p className={`text-sm ${selectedCrop === crop.id ? "text-white/70" : "text-gray-600"}`}>
//                           per kg
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-xl font-bold">₹{crop.price}</div>
//                       <div className={`flex items-center gap-1 text-sm ${
//                           crop.change > 0 ? "text-green-600" : crop.change < 0 ? "text-red-600" : "text-gray-600"
//                         }`}>
//                         {crop.change > 0 ? <TrendingUp className="w-4 h-4" /> : crop.change < 0 ? <TrendingDown className="w-4 h-4" /> : null}
//                         {crop.change > 0 ? "+" : ""}{crop.change}%
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* Info Card */}
//           <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="mb-6">
//               <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
//                 <span className="text-2xl">{selectedCropData?.emoji}</span>
//                 {selectedCropData?.name}
//               </h3>
//             </div>

//             <div className="grid grid-cols-3 gap-4">
//               <div className="text-center p-4 bg-gray-50 rounded-lg">
//                 <p className="text-sm text-gray-600">Current Price</p>
//                 <p className="text-3xl font-bold text-orange-500">₹{selectedCropData?.price}</p>
//               </div>
//               <div className="text-center p-4 bg-gray-50 rounded-lg">
//                 <p className="text-sm text-gray-600">Today's High</p>
//                 <p className="text-3xl font-bold text-green-600">₹{selectedCropData?.high}</p>
//               </div>
//               <div className="text-center p-4 bg-gray-50 rounded-lg">
//                 <p className="text-sm text-gray-600">Today's Low</p>
//                 <p className="text-3xl font-bold text-red-600">₹{selectedCropData?.low}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LivePricesSection;
