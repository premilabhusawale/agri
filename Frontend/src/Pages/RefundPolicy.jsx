import { useState } from "react";
import { RotateCcw, PackageCheck, AlertCircle, Clock, Truck, RefreshCw, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";

const RefundPolicy = () => {
    const { t } = useTranslation();

    const policies = [
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Reporting Window",
            desc: "Perishable items like vegetables and fruits must be reported within 6 hours of delivery. Non-perishables like grains can be reported within 48 hours."
        },
        {
            icon: <AlertCircle className="w-6 h-6" />,
            title: "Valid Reasons",
            desc: "Damage during transit, quality not matching description, or incorrect items delivered qualify for full refunds or replacements."
        },
        {
            icon: <PackageCheck className="w-6 h-6" />,
            title: "Proof of Quality",
            desc: "Users must provide high-quality photos and videos of the damaged or incorrect produce through the app's support section."
        },
        {
            icon: <Truck className="w-6 h-6" />,
            title: "Return Logistics",
            desc: "In case of a return, our logistics partner will collect the items from your location at no extra cost if the fault lies with the seller."
        }
    ];

    return (
        <div className="min-h-screen bg-[#f7f5f0]">
            {/* Hero */}
            <div className="bg-[#133928] text-white py-16 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
                        <RefreshCw className="w-3 h-3 animate-spin-slow" />
                        Reliable Trading
                    </div>
                    <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Refund & Return Policy</h1>
                    <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
                        We value your trust. Our transparent refund process ensures that you only pay for what you receive in the promised quality.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-16">
                {/* Core Principles Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {policies.map((p, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {p.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{p.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{p.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Process Flow */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 md:p-16">
                    <h2 className="text-2xl font-black text-gray-900 mb-12 text-center">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-12 relative">
                        <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-gray-100 z-0" />

                        {[
                            { step: "01", title: "File a Request", desc: "Go to your orders and click 'Request Refund'." },
                            { step: "02", title: "Review", desc: "Our team and the farmer will review your case within 24h." },
                            { step: "03", title: "Refund Issued", desc: "Money is credited back to your original source in 3-5 days." }
                        ].map((s, i) => (
                            <div key={i} className="relative z-10 text-center">
                                <div className="w-16 h-16 bg-[#133928] text-white rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg font-black text-xl">
                                    {s.step}
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">{s.title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="mt-16 bg-gradient-to-r from-emerald-600 to-green-700 rounded-3xl p-10 text-white text-center shadow-2xl">
                    <Smartphone className="w-10 h-10 mx-auto mb-4 opacity-50" />
                    <h3 className="text-2xl font-bold mb-2">Need help with an order?</h3>
                    <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
                        Our support team is available 24/7 to help resolve any disputes between farmers and buyers.
                    </p>
                    <button className="px-8 py-3 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg">
                        Contact Support
                    </button>
                </div>

                <p className="mt-12 text-center text-gray-400 text-sm">
                    Last updated: February 2026. AgriConnect reserves the right to modify these policies.
                </p>
            </div>

            <style>{`
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
};

export default RefundPolicy;
