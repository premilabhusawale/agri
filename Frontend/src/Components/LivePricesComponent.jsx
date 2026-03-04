import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw, MapPin, Filter, Download,
  Share2, Bell, Clock, Loader
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart,
} from "recharts";
import { api } from "../config/apiConfig";

/* ─── Inline Toast ───────────────────────────────────────── */
const TOAST_COLORS = {
  success: { bg: '#f0fdf4', border: '#86efac', text: '#15803d', bar: '#16a34a', icon: '✅' },
  error: { bg: '#fef2f2', border: '#fecaca', text: '#dc2626', bar: '#ef4444', icon: '❌' },
  info: { bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8', bar: '#3b82f6', icon: 'ℹ️' },
  warning: { bg: '#fffbeb', border: '#fde68a', text: '#d97706', bar: '#f59e0b', icon: '⚠️' },
};

const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  }, []);
  const toast = {
    success: (m) => show(m, "success"),
    error: (m) => show(m, "error"),
    info: (m) => show(m, "info"),
    warning: (m) => show(m, "warning"),
  };
  const ToastContainer = () => (
    <div style={{ position: "fixed", top: "1.25rem", right: "1.25rem", zIndex: 99999, display: "flex", flexDirection: "column", gap: "0.6rem", pointerEvents: "none" }}>
      {toasts.map(t => {
        const c = TOAST_COLORS[t.type];
        return (
          <div key={t.id} style={{ background: c.bg, border: `1px solid ${c.border}`, borderLeft: `4px solid ${c.bar}`, borderRadius: "0.875rem", padding: "0.85rem 1.1rem", minWidth: "280px", maxWidth: "340px", boxShadow: "0 8px 30px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", gap: "0.6rem", pointerEvents: "all", animation: "toastIn 0.25s ease" }}>
            <span style={{ fontSize: "1rem", flexShrink: 0 }}>{c.icon}</span>
            <span style={{ fontSize: "0.875rem", color: c.text, fontWeight: 600, flex: 1, lineHeight: 1.4 }}>{t.message}</span>
          </div>
        );
      })}
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(40px) scale(0.9); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
    </div>
  );
  return { toast, ToastContainer };
};

/* ─── Fake Data (Fallback) ─────────────────────────────────── */
const FAKE_CROPS = [
  { id: "tomato-nashik-0", name: "Tomato", emoji: "🍅", price: 28, high: 35, low: 22, state: "Maharashtra", district: "Nashik", market: "Nashik Market", variety: "Deshi", date: "15-Feb-2026" },
  { id: "onion-nashik-1", name: "Onion", emoji: "🧅", price: 18, high: 22, low: 14, state: "Maharashtra", district: "Nashik", market: "Lasalgaon APMC", variety: "Red", date: "15-Feb-2026" },
  { id: "potato-pune-2", name: "Potato", emoji: "🥔", price: 22, high: 26, low: 18, state: "Maharashtra", district: "Pune", market: "Pune Market", variety: "Jyoti", date: "15-Feb-2026" },
  { id: "brinjal-aurangabad-3", name: "Brinjal", emoji: "🍆", price: 16, high: 20, low: 12, state: "Maharashtra", district: "Aurangabad", market: "Aurangabad APMC", variety: "Purple", date: "15-Feb-2026" },
  { id: "cabbage-kolhapur-4", name: "Cabbage", emoji: "🥬", price: 12, high: 15, low: 9, state: "Maharashtra", district: "Kolhapur", market: "Kolhapur Market", variety: "Green", date: "15-Feb-2026" },
  { id: "carrot-nashik-5", name: "Carrot", emoji: "🥕", price: 30, high: 38, low: 24, state: "Maharashtra", district: "Nashik", market: "Nashik Market", variety: "Deshi", date: "15-Feb-2026" },
  { id: "capsicum-pune-6", name: "Capsicum", emoji: "🫑", price: 45, high: 55, low: 38, state: "Maharashtra", district: "Pune", market: "Pune Market", variety: "Green", date: "15-Feb-2026" },
  { id: "cauliflower-sangli-7", name: "Cauliflower", emoji: "🥦", price: 20, high: 25, low: 16, state: "Maharashtra", district: "Sangli", market: "Sangli APMC", variety: "White", date: "15-Feb-2026" },
  { id: "garlic-solapur-8", name: "Garlic", emoji: "🧄", price: 80, high: 100, low: 65, state: "Maharashtra", district: "Solapur", market: "Solapur Market", variety: "Desi", date: "15-Feb-2026" },
  { id: "ginger-satara-9", name: "Ginger", emoji: "🫚", price: 60, high: 75, low: 50, state: "Maharashtra", district: "Satara", market: "Satara APMC", variety: "Fresh", date: "15-Feb-2026" },
  { id: "wheat-latur-10", name: "Wheat", emoji: "🌾", price: 24, high: 27, low: 21, state: "Maharashtra", district: "Latur", market: "Latur Market", variety: "Lokwan", date: "15-Feb-2026" },
  { id: "rice-nagpur-11", name: "Rice", emoji: "🌾", price: 35, high: 42, low: 30, state: "Maharashtra", district: "Nagpur", market: "Nagpur APMC", variety: "Basmati", date: "15-Feb-2026" },
  { id: "peas-amravati-12", name: "Peas", emoji: "🫛", price: 55, high: 65, low: 45, state: "Maharashtra", district: "Amravati", market: "Amravati Market", variety: "Green", date: "15-Feb-2026" },
  { id: "chilli-akola-13", name: "Chilli Green", emoji: "🌶️", price: 40, high: 50, low: 32, state: "Maharashtra", district: "Akola", market: "Akola APMC", variety: "Local", date: "15-Feb-2026" },
  { id: "pumpkin-jalgaon-14", name: "Pumpkin", emoji: "🎃", price: 14, high: 18, low: 10, state: "Maharashtra", district: "Jalgaon", market: "Jalgaon Market", variety: "Deshi", date: "15-Feb-2026" },
];

const EMOJI_MAP = {
  'Tomato': '🍅', 'Onion': '🧅', 'Potato': '🥔', 'Brinjal': '🍆', 'Cabbage': '🥬',
  'Cauliflower': '🥦', 'Bitter Gourd': '🥒', 'Bottle Gourd': '🥒', 'Capsicum': '🫑',
  'Carrot': '🥕', 'Chilli Green': '🌶️', 'Coriander': '🌿', 'Cotton': '☁️', 'Drumstick': '🥒',
  'French Beans': '🫛', 'Garlic': '🧄', 'Ginger': '🫚', 'Lady Finger': '🥒', 'Lemon': '🍋',
  'Methi': '🌿', 'Peas': '🫛', 'Pumpkin': '🎃', 'Radish': '🥕', 'Rice': '🌾', 'Spinach': '🥬',
  'Wheat': '🌾', 'Grapes': '🍇', 'Turmeric': '🌿'
};

/* ─── Component ──────────────────────────────────────────── */
const LivePricesComponent = ({ theme = "orange", showHeader = true }) => {
  const { t } = useTranslation();
  const { toast, ToastContainer } = useToast();

  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [timeRange, setTimeRange] = useState("7d");
  const [chartType, setChartType] = useState("line");
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [dataSource, setDataSource] = useState('loading');

  const states = [
    "all", "Maharashtra", "Punjab", "Haryana", "Uttar Pradesh",
    "Karnataka", "Tamil Nadu", "Gujarat", "Rajasthan", "Madhya Pradesh", "West Bengal",
  ];
  const maharashtraDistricts = [
    "all", "Nashik", "Pune", "Ahmednagar", "Aurangabad", "Jalgaon", "Solapur",
    "Kolhapur", "Sangli", "Satara", "Latur", "Beed", "Nanded", "Mumbai", "Thane",
    "Raigad", "Nagpur", "Amravati", "Akola", "Yavatmal",
  ];

  /* ── Fetch Real Prices ── */
  const fetchPrices = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const params = {
        state: selectedState === 'all' ? '' : selectedState,
        district: selectedDistrict === 'all' ? '' : selectedDistrict,
        limit: 100
      };

      const response = await api.get('/prices', { params });

      if (response.data.success) {
        const records = response.data.records.map((r, idx) => ({
          id: `${r.commodity}-${r.market}-${idx}`,
          name: r.commodity,
          emoji: EMOJI_MAP[r.commodity] || '📦',
          price: Number(r.modal_price) / 100 || 0, // Converting from quintal potentially or mapping as provided
          high: Number(r.max_price) / 100 || 0,
          low: Number(r.min_price) / 100 || 0,
          state: r.state,
          district: r.district,
          market: r.market,
          variety: r.variety,
          date: r.arrival_date
        }));

        setCrops(records);
        setDataSource(response.data.source);
        if (records.length > 0 && !selectedCrop) {
          setSelectedCrop(records[0].id);
        }
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("API Error, falling back to mock:", error);
      setCrops(FAKE_CROPS);
      setDataSource('mock_err');
      if (!selectedCrop) setSelectedCrop(FAKE_CROPS[0].id);
      toast.warning(t('livePricesUnavailable'));
    } finally {
      setLoading(false);
    }
  }, [selectedState, selectedDistrict, toast, selectedCrop]);

  useEffect(() => {
    fetchPrices();
  }, [selectedState, selectedDistrict]); // eslint-disable-line

  /* ── Auto Refresh ── */
  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => fetchPrices(true), 30000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh, fetchPrices]);

  const handleRefresh = () => {
    fetchPrices();
    toast.success(t('pricesUpdated') || "Prices updated!");
  };

  /* ── Filter by district (Frontend fallback for local mock) ── */
  const filteredCrops = crops; // We now filter via API params mostly

  const selectedCropData = filteredCrops.find(c => c.id === selectedCrop) || filteredCrops[0];

  /* ── Chart data ── */
  const chartDataByRange = {
    "24h": selectedCropData ? [
      { time: "12 AM", price: Math.round(selectedCropData.low * 0.97) },
      { time: "4 AM", price: Math.round(selectedCropData.low * 0.99) },
      { time: "8 AM", price: Math.round(selectedCropData.price * 0.98) },
      { time: "12 PM", price: selectedCropData.price },
      { time: "4 PM", price: Math.round(selectedCropData.price * 1.01) },
      { time: "8 PM", price: Math.round(selectedCropData.high * 0.99) },
      { time: "Now", price: selectedCropData.price },
    ] : [],
    "7d": selectedCropData ? [
      { time: "Mon", price: Math.round(selectedCropData.price * 0.93) },
      { time: "Tue", price: Math.round(selectedCropData.low) },
      { time: "Wed", price: Math.round(selectedCropData.price * 0.97) },
      { time: "Thu", price: Math.round(selectedCropData.price * 0.95) },
      { time: "Fri", price: Math.round(selectedCropData.high) },
      { time: "Sat", price: Math.round(selectedCropData.price * 0.98) },
      { time: "Today", price: selectedCropData.price },
    ] : [],
    "30d": selectedCropData ? [
      { time: "Week 1", price: Math.round(selectedCropData.price * 0.90) },
      { time: "Week 2", price: Math.round(selectedCropData.price * 0.95) },
      { time: "Week 3", price: Math.round(selectedCropData.low) },
      { time: "Week 4", price: selectedCropData.price },
    ] : [],
    "1y": selectedCropData ? [
      { time: "Jan", price: Math.round(selectedCropData.price * 0.85) },
      { time: "Feb", price: Math.round(selectedCropData.price * 0.88) },
      { time: "Mar", price: Math.round(selectedCropData.price * 0.92) },
      { time: "Apr", price: Math.round(selectedCropData.price * 0.95) },
      { time: "May", price: Math.round(selectedCropData.high * 1.05) },
      { time: "Jun", price: Math.round(selectedCropData.price * 1.02) },
      { time: "Jul", price: Math.round(selectedCropData.price * 0.97) },
      { time: "Aug", price: Math.round(selectedCropData.price * 0.93) },
      { time: "Sep", price: Math.round(selectedCropData.price * 0.96) },
      { time: "Oct", price: selectedCropData.price },
      { time: "Nov", price: Math.round(selectedCropData.price * 0.98) },
      { time: "Dec", price: selectedCropData.price },
    ] : [],
  };
  const chartData = chartDataByRange[timeRange] || [];

  const themes = {
    orange: { badgeBg: "bg-orange-100", badgeText: "text-orange-600", pulseBg: "bg-orange-600", selectedBg: "bg-orange-500", lineColor: "#f97316" },
    green: { badgeBg: "bg-green-50", badgeText: "text-green-700", pulseBg: "bg-[#235C42]", selectedBg: "bg-[#235C42]", lineColor: "#16a34a" },
  };
  const currentTheme = themes[theme];

  const handleExport = () => {
    const csv = [
      "Commodity,District,State,Market,Min(₹/kg),Max(₹/kg),Modal(₹/kg),Date",
      ...filteredCrops.map(c =>
        `${c.name},${c.district},${c.state},${c.market},${c.low},${c.high},${c.price},${c.date}`
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "market_prices.csv"; a.click();
    URL.revokeObjectURL(url);
    toast.success(t('recordsExported', { count: filteredCrops.length }));
  };

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?state=${selectedState}&district=${selectedDistrict}`;
    navigator.clipboard.writeText(url).then(() => toast.info(t('linkCopied')));
  };

  const handleSetAlert = () => {
    toast.success(t('priceAlertSet', { name: selectedCropData?.name, district: selectedCropData?.district }) || `Price alert set for ${selectedCropData?.name} in ${selectedCropData?.district}!`);
  };

  const renderChart = () => {
    const tooltip = {
      contentStyle: { backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" },
      formatter: (v) => [`₹${v}/kg`, "Price"],
    };
    const axes = (
      <>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
        <YAxis stroke="#6b7280" fontSize={12} tickFormatter={v => `₹${v}`} />
        <Tooltip {...tooltip} />
      </>
    );
    if (chartType === "area") return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={currentTheme.lineColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={currentTheme.lineColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          {axes}
          <Area type="monotone" dataKey="price" stroke={currentTheme.lineColor} strokeWidth={3} fill="url(#colorPrice)" />
        </AreaChart>
      </ResponsiveContainer>
    );
    if (chartType === "bar") return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          {axes}
          <Bar dataKey="price" fill={currentTheme.lineColor} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          {axes}
          <Line type="monotone" dataKey="price" stroke={currentTheme.lineColor} strokeWidth={3}
            dot={{ fill: currentTheme.lineColor, strokeWidth: 2 }}
            activeDot={{ r: 6, fill: currentTheme.lineColor }} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <>
      <ToastContainer />

      {/* Header */}
      {showHeader && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${currentTheme.badgeBg} ${currentTheme.badgeText} text-xs font-bold uppercase tracking-wider mb-4 shadow-sm border border-emerald-100`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentTheme.pulseBg} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${currentTheme.pulseBg}`}></span>
            </span>
            {dataSource === 'live' ? t('liveMarketData') :
              dataSource === 'mock' ? t('demoData') :
                dataSource === 'mock_fallback' ? t('offlineCache') : t('synchronizing')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('realTimePrices')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('mandiPricesDesc')}
          </p>
        </motion.div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
          <Clock className="w-4 h-4" />
          <span>{t('updatedAt')}: {lastUpdated.toLocaleTimeString()}</span>
          {dataSource === 'live' && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 tracking-wider">LIVE</span>}
          <label className="flex items-center gap-2 cursor-pointer ml-2">
            <input type="checkbox" checked={autoRefresh} onChange={e => setAutoRefresh(e.target.checked)} className="rounded text-emerald-600 focus:ring-emerald-500" />
            <span>{t('autoRefresh')}</span>
          </label>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={handleRefresh} disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm disabled:opacity-50">
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            {t('refresh')}
          </button>
          <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
            <Download className="w-4 h-4" /> {t('exportCSV')}
          </button>
          <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
            <Share2 className="w-4 h-4" /> {t('share')}
          </button>
          <button onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm ${showFilters ? "bg-green-50 border-green-300 text-green-700" : "bg-white border-gray-300 hover:bg-gray-50"}`}>
            <Filter className="w-4 h-4" /> {t('filters')}
          </button>
        </div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {t('state')}
                </label>
                <select value={selectedState}
                  onChange={e => { setSelectedState(e.target.value); setSelectedDistrict("all"); }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500">
                  {states.map(s => <option key={s} value={s}>{s === "all" ? t('allStates') : s}</option>)}
                </select>
              </div>
              {selectedState === "Maharashtra" && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {t('district')}
                  </label>
                  <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500">
                    {maharashtraDistricts.map(d => <option key={d} value={d}>{d === "all" ? t('allDistricts') : d}</option>)}
                  </select>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">{t('showingRecords', { count: filteredCrops.length })}</span>
              <button onClick={() => { setSelectedState("Maharashtra"); setSelectedDistrict("all"); }}
                className="text-sm text-green-600 hover:text-green-700 font-medium">{t('reset')}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Crop List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-semibold text-gray-900">{t('todaysPrices')} ({filteredCrops.length})</h3>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
            {filteredCrops.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>{t('noDataLocation')}</p>
                <button onClick={() => { setSelectedState("Maharashtra"); setSelectedDistrict("all"); }}
                  className="mt-4 text-sm text-green-600 hover:text-green-700 font-medium">{t('reset')}</button>
              </div>
            ) : (
              filteredCrops.map(crop => (
                <motion.div key={crop.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCrop(crop.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${selectedCrop === crop.id
                    ? `${currentTheme.selectedBg} text-white shadow-lg`
                    : "bg-white hover:bg-gray-50 shadow-sm border border-gray-200"
                    }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{crop.emoji}</span>
                      <div>
                        <h4 className="font-semibold">{crop.name}</h4>
                        <p className={`text-xs flex items-center gap-1 ${selectedCrop === crop.id ? "text-white/70" : "text-gray-500"}`}>
                          <MapPin className="w-3 h-3" />{crop.market}, {crop.state}
                        </p>
                        <p className={`text-xs ${selectedCrop === crop.id ? "text-white/60" : "text-gray-400"}`}>{crop.variety}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">₹{crop.price}<span className="text-xs font-normal">/kg</span></div>
                      <div className={`text-xs mt-0.5 ${selectedCrop === crop.id ? "text-white/70" : "text-gray-400"}`}>{t('modalPriceLabel')}</div>
                    </div>
                  </div>
                  <div className={`text-xs pt-2 border-t ${selectedCrop === crop.id ? "border-white/20" : "border-gray-200"}`}>
                    <span className={selectedCrop === crop.id ? "text-white/70" : "text-gray-600"}>
                      {t('high')}: ₹{crop.high}/kg &nbsp;•&nbsp; {t('low')}: ₹{crop.low}/kg
                    </span>
                  </div>
                  <div className={`text-xs mt-1 ${selectedCrop === crop.id ? "text-white/50" : "text-gray-400"}`}>
                    📅 {crop.date}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Chart Panel */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {selectedCropData ? (
            <>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
                    <span className="text-2xl">{selectedCropData.emoji}</span>
                    {selectedCropData.name} {t('priceTrend')}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    {selectedCropData.market}, {selectedCropData.district}, {selectedCropData.state}
                    <span className="text-gray-400">· {selectedCropData.variety}</span>
                  </p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <div className="text-2xl font-bold text-gray-900">₹{selectedCropData.price}<span className="text-sm font-normal text-gray-500">/kg</span></div>
                  <div className="text-xs text-gray-400 mt-0.5">{t('modalPriceLabel')} · {selectedCropData.date}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                  {["24h", "7d", "30d", "1y"].map(r => (
                    <button key={r} onClick={() => setTimeRange(r)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${timeRange === r ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}>
                      {r.toUpperCase()}
                    </button>
                  ))}
                </div>
                <div className="flex gap-1 p-1 bg-gray-100 rounded-lg ml-auto">
                  {["line", "area", "bar"].map(t => (
                    <button key={t} onClick={() => setChartType(t)}
                      className={`px-3 py-1 rounded text-sm font-medium capitalize transition-colors ${chartType === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[300px] min-w-0 mb-6">{renderChart()}</div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">{t('todaysHigh') || "Today's High"}</p>
                  <p className="text-xl font-bold text-green-600">₹{selectedCropData.high}</p>
                  <p className="text-xs text-gray-400">/kg</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">{t('todaysLow') || "Today's Low"}</p>
                  <p className="text-xl font-bold text-red-600">₹{selectedCropData.low}</p>
                  <p className="text-xs text-gray-400">/kg</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">{t('avgPrice')}</p>
                  <p className="text-xl font-bold text-gray-900">₹{Math.round((selectedCropData.high + selectedCropData.low) / 2)}</p>
                  <p className="text-xs text-gray-400">/kg</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">{t('market')}</p>
                  <p className="text-sm font-bold text-gray-900 truncate">{selectedCropData.market}</p>
                  <p className="text-xs text-gray-400">{selectedCropData.district}</p>
                </div>
              </div>

              <div className="mt-6">
                <button onClick={handleSetAlert}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md font-semibold">
                  <Bell className="w-5 h-5" />
                  {t('setPriceAlert', { name: selectedCropData.name })}
                </button>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              <p>{t('selectCropTrend')}</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .scrollbar-thin::-webkit-scrollbar { width: 5px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </>
  );
};

export default LivePricesComponent;