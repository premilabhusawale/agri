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
    if (change > 0) return <TrendingUp className="w-3.5 h-3.5" />;
    if (change < 0) return <TrendingDown className="w-3.5 h-3.5" />;
    return <Minus className="w-3.5 h-3.5" />;
  };

  const getTrendColor = (change) => {
    if (change > 0) return "text-emerald-400";
    if (change < 0) return "text-rose-400";
    return "text-gray-400";
  };

  const getTrendBg = (change) => {
    if (change > 0) return "bg-emerald-500/10";
    if (change < 0) return "bg-rose-500/10";
    return "bg-gray-500/10";
  };

  // Duplicate for seamless scroll
  const duplicatedPrices = [...prices, ...prices, ...prices];

  return (
    <section className="bg-[#133928] py-4 border-y border-white/5 relative overflow-hidden backdrop-blur-md">
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-ticker {
          animation: ticker 60s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="flex animate-ticker">
        {duplicatedPrices.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-6 px-10 border-r border-white/5 whitespace-nowrap group hover:bg-white/5 transition-colors duration-300 py-1"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl group-hover:scale-125 transition-transform duration-500">{item.emoji}</span>
              <span className="font-bold text-white/90 tracking-tight uppercase text-xs">{item.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white font-black text-sm">
                ₹{item.price}<span className="text-white/40 text-[10px] ml-1">/{item.unit}</span>
              </span>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getTrendColor(item.change)} ${getTrendBg(item.change)} border border-current/10`}>
                {getTrendIcon(item.change)}
                {Math.abs(item.change)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PriceTicker;
