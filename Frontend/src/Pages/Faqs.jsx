import { useState } from "react";
import { ChevronDown, Search, HelpCircle } from "lucide-react";

const faqData = [
  {
    category: "For Buyers",
    emoji: "🛒",
    faqs: [
      {
        q: "How do I place an order on AgriConnect?",
        a: "Browse the marketplace, add products to your cart, and proceed to checkout. You can pay via UPI, net banking, credit/debit card, or Cash on Delivery for eligible pin codes.",
      },
      {
        q: "Are the products really farm-fresh?",
        a: "Yes. Every seller on AgriConnect is a verified farmer or registered agricultural cooperative. We conduct periodic quality checks and rely on buyer ratings to maintain standards.",
      },
      {
        q: "How long does delivery take?",
        a: "Most orders are delivered within 1–3 business days depending on your location. Perishable products are delivered within 24–48 hours using cold-chain logistics.",
      },
      {
        q: "What if I receive a damaged or incorrect product?",
        a: "You can raise a return or refund request within 24 hours of delivery through the Orders section. We process refunds within 5–7 business days to your original payment method.",
      },
      {
        q: "Is there a minimum order quantity?",
        a: "Minimum order quantities vary by product. Some bulk items like grains may have a minimum of 5 kg, while vegetables and fruits can be ordered in smaller quantities. Each product listing clearly states this.",
      },
    ],
  },
  {
    category: "For Farmers",
    emoji: "🌾",
    faqs: [
      {
        q: "How do I register as a seller on AgriConnect?",
        a: "Click on 'Sell Your Produce' and fill in your details including Aadhaar number, farm registration certificate (if applicable), and bank account details for payouts. Verification takes 2–3 business days.",
      },
      {
        q: "What commission does AgriConnect charge?",
        a: "We charge a flat 5% commission on each successful sale. There are no listing fees or monthly charges. You only pay when you sell.",
      },
      {
        q: "How and when do I receive my payments?",
        a: "Payments are transferred to your registered bank account every Monday for all orders delivered and confirmed in the previous week. You can track earnings in real-time on your seller dashboard.",
      },
      {
        q: "Can I set my own prices?",
        a: "Yes, you have full control over pricing. We also show you real-time market prices from nearby mandis to help you price competitively.",
      },
      {
        q: "What kind of support do farmers get?",
        a: "We offer a dedicated farmer helpline, access to agri-experts for crop advice, logistics assistance, and promotional features like 'Featured Farm' spots to boost your visibility.",
      },
    ],
  },
  {
    category: "Payments & Refunds",
    emoji: "💳",
    faqs: [
      {
        q: "What payment methods are accepted?",
        a: "We accept UPI (GPay, PhonePe, Paytm), net banking, credit/debit cards (Visa, Mastercard, RuPay), and Cash on Delivery for eligible locations.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes. All transactions are processed through PCI-DSS compliant payment gateways. We never store your card details on our servers.",
      },
      {
        q: "How do I get a refund?",
        a: "Raise a refund request from your Orders page within 24 hours of delivery. Once approved, refunds are credited within 5–7 business days to your original payment method.",
      },
    ],
  },
  {
    category: "Account & Settings",
    emoji: "⚙️",
    faqs: [
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot Password' on the login screen and enter your registered email or phone number. You'll receive an OTP to reset your password.",
      },
      {
        q: "Can I have both a buyer and seller account?",
        a: "Yes! You can switch between buyer and seller modes from your profile settings without creating separate accounts.",
      },
      {
        q: "How do I delete my account?",
        a: "Go to Settings → Account → Delete Account. Note that this action is irreversible and all your data, order history, and listings will be permanently removed after a 30-day grace period.",
      },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border border-gray-200 rounded-xl overflow-hidden transition-all ${open ? "shadow-sm" : ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left px-5 py-4 bg-white hover:bg-gray-50 transition-colors gap-4"
      >
        <span className="font-medium text-gray-900 text-sm">{q}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 bg-white">
          <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQs() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...faqData.map((d) => d.category)];

  const filtered = faqData
    .filter((section) => activeCategory === "All" || section.category === activeCategory)
    .map((section) => ({
      ...section,
      faqs: section.faqs.filter(
        (f) =>
          !search ||
          f.q.toLowerCase().includes(search.toLowerCase()) ||
          f.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((s) => s.faqs.length > 0);

  const totalResults = filtered.reduce((sum, s) => sum + s.faqs.length, 0);

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      {/* Hero */}
      <div className="bg-[#133928] text-white py-16 px-4 text-center">
        <HelpCircle className="w-10 h-10 mx-auto mb-3 text-amber-400" />
        <h1 className="text-4xl font-bold mb-3">Frequently Asked Questions</h1>
        <p className="text-white/70 mb-8 max-w-md mx-auto">
          Everything you need to know about AgriConnect — for buyers and farmers alike.
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-white/50"
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#133928] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
          {search && (
            <span className="ml-auto text-sm text-gray-500 self-center">
              {totalResults} result{totalResults !== 1 ? "s" : ""} found
            </span>
          )}
        </div>

        {/* FAQ Sections */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">🤔</p>
            <p className="font-medium">No matching questions found</p>
            <p className="text-sm mt-1">Try different keywords or browse all categories</p>
          </div>
        ) : (
          <div className="space-y-10">
            {filtered.map((section) => (
              <div key={section.category}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{section.emoji}</span>
                  <h2 className="text-lg font-bold text-gray-900">{section.category}</h2>
                </div>
                <div className="space-y-3">
                  {section.faqs.map((faq) => (
                    <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Still need help */}
        <div className="mt-14 bg-[#133928] text-white rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-white/70 mb-5 text-sm">Our support team is available Mon–Sat, 9am to 6pm</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/support/contact" className="px-6 py-2.5 bg-white text-[#133928] rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">
              Contact Us
            </a>
            <a href="tel:18001234567" className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 rounded-lg font-medium transition-colors text-sm">
              Call 1800-123-4567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}