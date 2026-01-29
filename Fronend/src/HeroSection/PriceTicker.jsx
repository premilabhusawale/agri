import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const PriceTicker = () => {
  const prices = [
    { name: "Tomatoes", price: 45, unit: "kg", change: 5.2, emoji: "🍅" },
    { name: "Potatoes", price: 28, unit: "kg", change: -2.1, emoji: "🥔" },
    { name: "Onions", price: 35, unit: "kg", change: 8.5, emoji: "🧅" },
    { name: "Rice", price: 52, unit: "kg", change: 0, emoji: "🌾" },
    { name: "Wheat", price: 38, unit: "kg", change: 3.2, emoji: "🌾" },
    { name: "Carrots", price: 40, unit: "kg", change: -1.5, emoji: "🥕" },
    { name: "Cabbage", price: 22, unit: "kg", change: 4.8, emoji: "🥬" },
    { name: "Apples", price: 120, unit: "kg", change: -0.8, emoji: "🍎" },
  ];

  const getTrendIcon = (change) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = (change) => {
    if (change > 0) return "text-green-500";
    if (change < 0) return "text-red-500";
    return "text-gray-500";
  };

  // Duplicate for seamless scroll
  const duplicatedPrices = [...prices, ...prices];

  return (
    <section className="bg-[#235C42] py-3 overflow-hidden">
      <style>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
      `}</style>
      
      <div className="flex animate-ticker">
        {duplicatedPrices.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-6 px-8 border-r border-white/20 whitespace-nowrap"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{item.emoji}</span>
              <span className="font-semibold text-white">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">
                ₹{item.price}/{item.unit}
              </span>
              <span className={`flex items-center gap-1 text-sm ${getTrendColor(item.change)}`}>
                {getTrendIcon(item.change)}
                {Math.abs(item.change)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PriceTicker;
