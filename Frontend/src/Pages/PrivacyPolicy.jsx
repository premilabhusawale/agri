import { motion, AnimatePresence } from "framer-motion";
import { Shield, ChevronRight, FileText, Eye, Lock, Trash2, Bell, Globe, ArrowRight } from "lucide-react";

const sections = [
  {
    id: "information-we-collect",
    icon: <Eye className="w-6 h-6" />,
    title: "Information We Collect",
    content: `We collect information you provide directly to us when you create an account, make a purchase, list a product, or contact our support team.

**Personal Information:** Name, email address, phone number, delivery address, and Aadhaar number (for seller verification only).

**Financial Information:** Bank account details for farmer payouts and billing information for buyer transactions. We do not store card numbers — these are handled by our PCI-DSS compliant payment processors.

**Usage Data:** Pages visited, search queries, products viewed, and interactions within the platform to improve your experience.

**Location Data:** Approximate location to show nearby farms and relevant market prices. Precise GPS data is only collected with your explicit permission.`,
  },
  {
    id: "how-use",
    icon: <FileText className="w-6 h-6" />,
    title: "How We Use Data",
    content: `We use the information we collect to:

• Process transactions and send order confirmations
• Verify farmer identities and facilitate payouts
• Personalize your marketplace experience and product recommendations
• Send price alerts, market updates, and farming tips (only if subscribed)
• Respond to your inquiries and provide customer support
• Detect and prevent fraudulent activity
• Comply with legal obligations and regulatory requirements
• Improve and develop new platform features

We do not sell your personal information to third parties for their marketing purposes.`,
  },
  {
    id: "data-sharing",
    icon: <Globe className="w-6 h-6" />,
    title: "Data Sharing",
    content: `We share your information only in the following circumstances:

**With Service Providers:** Logistics partners for delivery, payment processors for transactions, and cloud hosting providers. All partners are bound by data processing agreements.

**With Other Users:** When you place an order, your name and delivery address are shared with the relevant farmer/seller for fulfillment. Sellers' farm name, location, and contact details are visible to buyers.

**Legal Requirements:** We may disclose information if required by law, court order, or government authority.

**Business Transfers:** In the event of a merger or acquisition, your data may be transferred as part of business assets, and you will be notified in advance.

We never share your Aadhaar number, bank details, or full financial information with other users.`,
  },
  {
    id: "data-security",
    icon: <Lock className="w-6 h-6" />,
    title: "Data Security",
    content: `We take security seriously and implement industry-standard measures to protect your data:

• **Encryption:** All data is encrypted in transit (TLS 1.3) and at rest (AES-256)
• **Access Controls:** Strict role-based access — only authorised personnel can access sensitive data
• **Payment Security:** Payments processed through RBI-compliant, PCI-DSS certified gateways
• **Regular Audits:** We conduct periodic security audits and vulnerability assessments
• **Two-Factor Authentication:** Available and recommended for all accounts

Despite best efforts, no system is 100% secure. We will notify you promptly in the event of a data breach affecting your information.`,
  },
  {
    id: "your-rights",
    icon: <Shield className="w-6 h-6" />,
    title: "Your Rights",
    content: `Under applicable Indian data protection laws, you have the right to:

**Access:** Request a copy of the personal data we hold about you.

**Correction:** Update or correct inaccurate information through your account settings or by contacting us.

**Deletion:** Request deletion of your account and associated data. Some data may be retained for legal compliance (e.g., transaction records for 7 years as per tax laws).

**Data Portability:** Request your data in a machine-readable format.

**Opt-Out:** Unsubscribe from marketing communications at any time via the unsubscribe link in emails or in account settings.

To exercise any of these rights, email us at privacy@agriconnect.in or write to our Grievance Officer.`,
  },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9]">
      {/* Hero Section */}
      <section className="relative py-24 bg-[#133928] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -right-24 w-96 h-96 border border-white rounded-[4rem]"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-emerald-400 text-xs font-black uppercase tracking-widest mb-8 border border-white/10"
          >
            <Shield className="w-4 h-4" /> Trusted & Secure
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight"
          >
            Privacy <span className="text-emerald-400">Policy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-emerald-100/70 max-w-2xl mx-auto leading-relaxed"
          >
            At AgriConnect, we value your trust. This policy outlines how we handle your data with transparency and security at the forefront.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sticky Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-black/5 border border-gray-100">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">In this policy</p>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-bold transition-all ${activeSection === section.id
                          ? "bg-green-600 text-white shadow-lg shadow-green-600/30 -translate-x-2"
                          : "text-gray-500 hover:bg-gray-50 hover:text-green-600"
                        }`}
                    >
                      <span className="flex-shrink-0">{section.icon}</span>
                      <span className="truncate">{section.title}</span>
                      {activeSection === section.id && <ChevronRight className="ml-auto w-4 h-4" />}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Quick Info */}
              <div className="bg-[#133928] rounded-[2rem] p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-lg font-black mb-4 relative z-10">Data Summary</h3>
                <p className="text-emerald-100/70 text-sm leading-relaxed mb-6 font-medium relative z-10">
                  We collect only necessary data to connect farmers and buyers. No data selling, ever.
                </p>
                <a href="mailto:privacy@agriconnect.in" className="inline-flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-widest hover:text-white transition-colors">
                  Contact Support <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </aside>

          {/* Policy Content */}
          <main className="lg:w-3/4 space-y-12">
            <AnimatePresence mode="wait">
              {sections.map((section) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  onViewportEnter={() => setActiveSection(section.id)}
                  className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-black/5 border border-gray-100 group"
                >
                  <div className="flex items-center gap-5 mb-10">
                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
                      {section.icon}
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">{section.title}</h2>
                  </div>

                  <div className="prose prose-green max-w-none">
                    <div className="text-lg text-gray-500 font-medium leading-relaxed space-y-6">
                      {section.content.split("\n\n").map((para, i) => (
                        <p key={i} className="last:mb-0" dangerouslySetInnerHTML={{
                          __html: para
                            .replace(/\*\*(.+?)\*\*/g, "<strong class='text-gray-900 font-black'>$1</strong>")
                            .replace(/^• /gm, "<span class='text-green-500 mr-2'>•</span>")
                            .split("\n").join("<br/>")
                        }} />
                      ))}
                    </div>
                  </div>
                </motion.section>
              ))}
            </AnimatePresence>

            {/* Final Footer Box */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#133928] to-[#1a4d35] rounded-[3rem] p-10 md:p-16 text-white text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150" />
              </div>

              <h3 className="text-3xl font-black mb-6 tracking-tight relative z-10">Grievance Redressal</h3>
              <p className="text-emerald-100/70 text-lg mb-10 max-w-xl mx-auto font-medium relative z-10">
                If you have any questions or complaints regarding our data practices, please reach out to our Grievance Officer.
              </p>

              <div className="grid md:grid-cols-2 gap-8 text-left relative z-10 bg-black/10 backdrop-blur-md rounded-[2rem] p-8 border border-white/5">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-1">Grievance Officer</p>
                    <p className="font-bold text-lg">Arjun Mehta</p>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-1">Email Address</p>
                    <p className="font-bold text-lg">privacy@agriconnect.in</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-1">Response Guarantee</p>
                    <p className="font-bold text-lg">Within 30 Days</p>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-1">Corporate Address</p>
                    <p className="font-medium text-sm leading-tight text-emerald-100/60">AgriConnect Tech Pvt. Ltd.<br />Mumbai, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
