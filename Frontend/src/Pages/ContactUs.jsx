import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Headphones, Users, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const contactReasons = [
  "General Inquiry",
  "Farmer Registration",
  "Buyer Support",
  "Technical Issue",
  "Partnership",
  "Other",
];

const contactCards = [
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Call Us",
    detail: "+91 1800-123-4567",
    sub: "Toll-free, Mon–Sat 9am–6pm",
    color: "bg-green-50 text-green-700",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Email Us",
    detail: "support@agriconnect.in",
    sub: "We reply within 24 hours",
    color: "bg-amber-50 text-amber-700",
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Live Chat",
    detail: "Chat with our team",
    sub: "Available on the platform",
    color: "bg-blue-50 text-blue-700",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Visit Us",
    detail: "Mumbai, Maharashtra",
    sub: "By appointment only",
    color: "bg-purple-50 text-purple-700",
  },
];

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", reason: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.reason) e.reason = "Please select a reason";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
  };

  const handleChange = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9]">
      {/* Hero */}
      <div className="bg-[#133928] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -right-24 w-96 h-96 border border-white rounded-[4rem]"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-24 -left-24 w-80 h-80 border border-white rounded-[3rem]"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-white/10"
          >
            <Headphones className="w-4 h-4 text-emerald-400" /> We're here to help
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-8 tracking-tight"
          >
            Get in <span className="text-emerald-400">Touch</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-emerald-100/70 max-w-2xl mx-auto leading-relaxed"
          >
            Whether you're a farmer looking to sell or a buyer searching for fresh produce,
            our dedicated team is ready to assist you in every step.
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-8 pb-16">
        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-black/5 border border-gray-100 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${card.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner`}>
                {card.icon}
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">{card.title}</h3>
              <p className="text-sm font-bold text-gray-800 mb-1">{card.detail}</p>
              <p className="text-xs font-medium text-gray-400 leading-relaxed">{card.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Form + Info */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-3 bg-white rounded-[3rem] shadow-2xl shadow-black/5 border border-gray-100 p-10 md:p-14"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <CheckCircle className="w-12 h-12 text-emerald-600" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-4">Message Received!</h3>
                  <p className="text-lg text-gray-500 mb-10 max-w-sm mx-auto">Thanks for connecting with us. Our team will get back to you shortly.</p>
                  <button
                    onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", reason: "", message: "" }); }}
                    className="px-10 py-4 bg-[#133928] text-white rounded-2xl font-bold hover:bg-[#1a4d35] transition-all hover:shadow-xl active:scale-95"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                    <MessageSquare className="w-6 h-6 text-emerald-500" />
                    Send us a message
                  </h2>
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Full Name *</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="E.g. Ramesh Kumar"
                          className={`w-full px-5 py-4 bg-gray-50 border rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all ${errors.name ? "border-red-400 ring-4 ring-red-500/5" : "border-gray-100"}`}
                        />
                        {errors.name && <p className="text-xs font-bold text-red-500 ml-1">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          placeholder="+91 00000 00000"
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="yourname@domain.com"
                        className={`w-full px-5 py-4 bg-gray-50 border rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all ${errors.email ? "border-red-400 ring-4 ring-red-500/5" : "border-gray-100"}`}
                      />
                      {errors.email && <p className="text-xs font-bold text-red-500 ml-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Reason for Contact *</label>
                      <div className="relative">
                        <select
                          value={form.reason}
                          onChange={(e) => handleChange("reason", e.target.value)}
                          className={`w-full px-5 py-4 bg-gray-50 border rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all appearance-none ${errors.reason ? "border-red-400 ring-4 ring-red-500/5" : "border-gray-100"}`}
                        >
                          <option value="">Select a reason...</option>
                          {contactReasons.map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                          <Send className="w-4 h-4 rotate-90" />
                        </div>
                      </div>
                      {errors.reason && <p className="text-xs font-bold text-red-500 ml-1">{errors.reason}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Message *</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        rows={5}
                        placeholder="How can our team help you?"
                        className={`w-full px-5 py-4 bg-gray-50 border rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all resize-none ${errors.message ? "border-red-400 ring-4 ring-red-500/5" : "border-gray-100"}`}
                      />
                      {errors.message && <p className="text-xs font-bold text-red-500 ml-1">{errors.message}</p>}
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={status === "loading"}
                      className="w-full flex items-center justify-center gap-3 py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-emerald-600/20 active:scale-[0.98] group"
                    >
                      {status === "loading" ? (
                        <><RefreshCw className="animate-spin w-5 h-5" /> Sending...</>
                      ) : (
                        <>Send Your Message <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#133928] text-white rounded-2xl p-6">
              <Users className="w-8 h-8 mb-3 text-amber-400" />
              <h3 className="font-bold text-lg mb-2">Farmer Support</h3>
              <p className="text-white/70 text-sm mb-4">
                Special helpline for farmers needing guidance on listings, pricing, and payouts.
              </p>
              <a href="tel:18001234567" className="inline-block px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-sm font-medium transition-colors">
                Call Farmer Helpline
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <Clock className="w-6 h-6 text-[#133928] mb-3" />
              <h3 className="font-bold text-gray-900 mb-3">Support Hours</h3>
              <div className="space-y-2 text-sm">
                {[
                  ["Monday – Friday", "9:00 AM – 6:00 PM"],
                  ["Saturday", "9:00 AM – 2:00 PM"],
                  ["Sunday", "Closed"],
                ].map(([day, time]) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-gray-500">{day}</span>
                    <span className="font-medium text-gray-800">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}