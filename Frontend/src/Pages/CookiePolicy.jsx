import { useState } from "react";
import { Cookie, Eye, Settings, Globe, Bell } from "lucide-react";
import { useTranslation } from "react-i18next";

const CookiePolicy = () => {
    const { t } = useTranslation();
    const [activeSection, setActiveSection] = useState("what-are-cookies");

    const sections = [
        {
            id: "what-are-cookies",
            icon: <Cookie className="w-5 h-5" />,
            title: "What are Cookies?",
            content: `Cookies are small text files that are stored on your device when you visit a website. They help us recognize your device and store some information about your preferences or past actions.`
        },
        {
            id: "how-we-use",
            icon: <Eye className="w-5 h-5" />,
            title: "How We Use Cookies",
            content: `We use cookies to:
      • Keep you signed in
      • Remember your language and location preferences
      • Understand how you use our platform
      • Improve our search results and recommendations
      • Facilitate secure transactions`
        },
        {
            id: "types-of-cookies",
            icon: <Settings className="w-5 h-5" />,
            title: "Types of Cookies We Use",
            content: `**Essential Cookies:** These are necessary for the website to function. They include cookies for authentication, security, and cart management.
      
      **Analytics Cookies:** These help us analyze platform traffic and user behavior to improve our services.
      
      **Preference Cookies:** These store your settings like theme, language, and market filters.`
        },
        {
            id: "managing-cookies",
            icon: <Globe className="w-5 h-5" />,
            title: "Managing Cookies",
            content: `You can control and manage cookies through your browser settings. Most browsers allow you to block or delete cookies, but doing so may affect certain features of AgriConnect.`
        }
    ];

    return (
        <div className="min-h-screen bg-[#f7f5f0]">
            {/* Hero */}
            <div className="bg-[#133928] text-white py-14 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-center items-center gap-3 mb-3">
                        <Cookie className="w-8 h-8 text-amber-400" />
                        <h1 className="text-3xl font-bold">Cookie Policy</h1>
                    </div>
                    <p className="text-white/70 max-w-2xl mx-auto">
                        Learn how we use cookies to provide you with a better and more secure experience on AgriConnect.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid md:grid-cols-4">
                        {/* Sidebar */}
                        <div className="md:col-span-1 border-r border-gray-100 p-4 bg-gray-50/30">
                            <nav className="space-y-1">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${activeSection === section.id
                                            ? "bg-[#133928] text-white shadow-md transform scale-[1.02]"
                                            : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                    >
                                        {section.icon}
                                        <span className="font-medium">{section.title}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Content */}
                        <div className="md:col-span-3 p-8">
                            {sections.map((section) => (
                                <div
                                    key={section.id}
                                    className={activeSection === section.id ? "block animate-in fade-in slide-in-from-bottom-2" : "hidden"}
                                >
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                                            {section.icon}
                                        </div>
                                        {section.title}
                                    </h2>
                                    <div className="text-gray-600 leading-relaxed whitespace-pre-line space-y-4">
                                        {section.content.split("\n\n").map((para, i) => (
                                            <p key={i} dangerouslySetInnerHTML={{
                                                __html: para.replace(/\*\*(.+?)\*\*/g, "<strong class='text-gray-900'>$1</strong>")
                                            }} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6 flex items-start gap-4">
                    <Bell className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                    <div>
                        <h3 className="font-bold text-amber-900 mb-1">Updates to this Policy</h3>
                        <p className="text-sm text-amber-800/80">
                            We may update this Cookie Policy from time to time. We recommend checking this page periodically to stay informed about our use of cookies.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
