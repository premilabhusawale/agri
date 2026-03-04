import { useState } from "react";
import { Scale, ShieldCheck, UserCheck, AlertTriangle, FileText, Globe, Gavel, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const TermsOfService = () => {
    const { t } = useTranslation();
    const [activeSection, setActiveSection] = useState("acceptance");

    const sections = [
        {
            id: "acceptance",
            icon: <CheckCircle className="w-5 h-5" />,
            title: "Acceptance of Terms",
            content: `By accessing or using AgriConnect, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our platform. These terms apply to all visitors, users, and anyone who accesses the service.`
        },
        {
            id: "user-roles",
            icon: <UserCheck className="w-5 h-5" />,
            title: "User Roles & Responsibilities",
            content: `**For Farmers:** You are responsible for the accuracy of your listings, the quality of produce, and timely fulfillment of orders. You must be a verified agricultural producer.
      
      **For Customers:** You are responsible for providing correct delivery information and completing payments on time. You agree to use the platform for personal or legitimate business procurement only.`
        },
        {
            id: "marketplace-conduct",
            icon: <Globe className="w-5 h-5" />,
            title: "Marketplace Conduct",
            content: `Users must engage in fair and honest trade. Manipulation of prices, fraudulent listings, or abusive behavior towards other users will result in immediate suspension. We reserve the right to moderate all content and transactions.`
        },
        {
            id: "payments-fees",
            icon: <Scale className="w-5 h-5" />,
            title: "Payments & Fees",
            content: `Payments are processed through secure gateways. AgriConnect may charge service fees for facilitating transactions, which will be clearly disclosed at checkout or in farmer payout summaries.`
        },
        {
            id: "liability",
            icon: <AlertTriangle className="w-5 h-5" />,
            title: "Limitation of Liability",
            content: `AgriConnect is a marketplace connector. While we verify users, we are not directly liable for the quality of agricultural produce or delivery delays caused by logistics partners, though we will assist in dispute resolution.`
        },
        {
            id: "governing-law",
            icon: <Gavel className="w-5 h-5" />,
            title: "Governing Law",
            content: `These terms are governed by the laws of India. Any disputes arising from the use of this platform shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.`
        }
    ];

    return (
        <div className="min-h-screen bg-[#f7f5f0]">
            {/* Hero */}
            <div className="bg-[#133928] text-white py-14 px-4">
                <div className="max-w-4xl mx-auto flex items-center gap-6">
                    <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md hidden md:block">
                        <Scale className="w-12 h-12 text-amber-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
                        <p className="text-white/70 max-w-2xl">
                            Understand the rules and guidelines that govern the AgriConnect marketplace for both farmers and buyers.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Navigation */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Agreement Sections</h3>
                            <nav className="space-y-2">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeSection === section.id
                                            ? "bg-[#133928] text-white shadow-lg translate-x-1"
                                            : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                    >
                                        <span className={activeSection === section.id ? "text-amber-400" : "text-gray-400"}>
                                            {section.icon}
                                        </span>
                                        <span className="font-semibold">{section.title}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-8 space-y-6">
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                className={`bg-white rounded-2xl shadow-sm border ${activeSection === section.id ? "border-emerald-500 scale-[1.01]" : "border-gray-100 opacity-80"
                                    } p-8 transition-all duration-300`}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 bg-[#133928]/10 text-[#133928] rounded-xl flex items-center justify-center">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                                </div>
                                <div className="text-gray-600 leading-relaxed whitespace-pre-line space-y-4">
                                    {section.content.split("\n\n").map((para, i) => (
                                        <p key={i} dangerouslySetInnerHTML={{
                                            __html: para.replace(/\*\*(.+?)\*\*/g, "<strong class='text-gray-900'>$1</strong>")
                                        }} />
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="p-8 bg-gray-900 text-white rounded-2xl shadow-xl">
                            <div className="flex items-center gap-3 mb-4 text-amber-400">
                                <ShieldCheck className="w-6 h-6" />
                                <h3 className="text-lg font-bold">User Protection Guarantee</h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                AgriConnect is committed to providing a safe trading environment. If you encounter any suspicious activity or violations of these terms, please report it immediately to our support team.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default TermsOfService;
