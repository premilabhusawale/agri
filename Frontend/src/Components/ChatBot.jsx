import { useState, useRef, useEffect } from "react";

const ChatBot = () => {
  const messageIdRef = useRef(2);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hello! 👋 I'm AgriBot, your farming assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "What's the price of tomatoes?",
    "How to list my produce?",
    "Find organic farms nearby",
    "Payment methods available",
  ];

  /* ─── Fake responses based on keywords ─────────────────── */
  const getFakeResponse = (message) => {
    const msg = message.toLowerCase();

    if (msg.includes("tomato"))
      return "🍅 Current tomato prices:\n• Nashik Market: ₹28/kg\n• Pune APMC: ₹30/kg\n• Aurangabad: ₹25/kg\n\nPrices vary daily based on supply. Check the Live Prices section for real-time data!";

    if (msg.includes("onion"))
      return "🧅 Onion prices today:\n• Lasalgaon APMC: ₹18/kg\n• Nashik: ₹20/kg\n• Solapur: ₹16/kg\n\nLasalgaon is Asia's largest onion market — always a good benchmark!";

    if (msg.includes("potato"))
      return "🥔 Potato prices:\n• Pune Market: ₹22/kg\n• Nagpur APMC: ₹20/kg\n• Mumbai: ₹24/kg\n\nPotato prices are stable this week.";

    if (msg.includes("price") || msg.includes("rate") || msg.includes("mandi"))
      return "📊 You can check live crop prices in the Live Prices section above!\n\nI have data for:\n• Tomatoes 🍅\n• Onions 🧅\n• Potatoes 🥔\n• Garlic 🧄\n• And 10+ more crops\n\nWhich crop are you interested in?";

    if (msg.includes("list") || msg.includes("sell") || msg.includes("produce"))
      return "📋 To list your produce:\n1. Go to your Dashboard\n2. Click 'Add Listing'\n3. Enter crop name, quantity & price\n4. Upload a photo (optional)\n5. Hit 'Publish'\n\nYour listing goes live instantly and buyers in your area can see it! 🚀";

    if (msg.includes("organic"))
      return "🌿 Finding organic farms near you:\n\nThere are 12 certified organic farms within 50km of Nanded.\n\n• Patil Organic Farm – Latur (32km)\n• Green Earth Farms – Osmanabad (41km)\n• Nashik Organics – Nashik (120km)\n\nWant me to show more details for any of these?";

    if (msg.includes("payment") || msg.includes("pay"))
      return "💳 Payment methods available:\n\n• UPI (GPay, PhonePe, Paytm) ✅\n• Bank Transfer (NEFT/IMPS) ✅\n• Cash on Delivery ✅\n• Crop loan settlement ✅\n\nAll transactions are secured and you get instant payment confirmation. 🔒";

    if (msg.includes("weather") || msg.includes("rain") || msg.includes("forecast"))
      return "⛅ Today's farming weather for Maharashtra:\n\n• Temperature: 28–34°C\n• Humidity: 52%\n• Wind: 12 km/h NW\n• Rain chance: 10%\n\nGood conditions for harvesting this week! Best to water crops in the early morning. 🌱";

    if (msg.includes("fertilizer") || msg.includes("pesticide") || msg.includes("spray"))
      return "🌾 Crop care tips:\n\n• Use NPK 19-19-19 for general growth\n• Neem oil spray works well for most pests\n• Best spray time: early morning or after sunset\n• Avoid spraying before rain\n\nAlways follow the dosage on the label. Need advice for a specific crop?";

    if (msg.includes("loan") || msg.includes("kcc") || msg.includes("credit"))
      return "🏦 Farmer loan options:\n\n• Kisan Credit Card (KCC) – up to ₹3 lakh @ 4%\n• PM Kisan Scheme – ₹6,000/year direct benefit\n• State Bank Agri Loan – flexible repayment\n\nVisit your nearest bank branch with Aadhaar + land documents. 📄";

    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("namaste"))
      return "Namaste! 🙏 Great to see you!\n\nI can help you with:\n• 📊 Crop prices\n• 🌿 Farming tips\n• 💳 Payments & loans\n• 🛒 Listing your produce\n\nWhat would you like to know?";

    if (msg.includes("thank"))
      return "You're welcome! Happy farming! 🌾\n\nFeel free to ask anything else. I'm here 24/7 to help you get the best from your farm! 🙏";

    if (msg.includes("help"))
      return "Sure! Here's what I can help with:\n\n🔹 Crop prices (tomato, onion, potato...)\n🔹 How to list & sell your produce\n🔹 Organic farms nearby\n🔹 Payment methods\n🔹 Weather updates\n🔹 Fertilizer & pesticide tips\n🔹 Farmer loans & schemes\n\nJust ask away! 😊";

    // Default fallback
    return "Thanks for your question! 🌱\n\nI'm still learning, but I can help with:\n• Crop prices\n• Selling your produce\n• Farming tips\n• Loans & schemes\n\nCould you rephrase or try one of the quick questions below?";
  };

  /* ─── Send handler ───────────────────────────────────────── */
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: (messageIdRef.current++).toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    // Simulate network delay (600ms – 1.2s)
    await new Promise((res) => setTimeout(res, 600 + Math.random() * 600));

    const botResponse = getFakeResponse(currentInput);
    setIsTyping(false);

    const botMessage = {
      id: (messageIdRef.current++).toString(),
      content: botResponse,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleQuickReply = (reply) => {
    setInput(reply);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse">
            1
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed z-50 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
            isMinimized ? "bottom-6 right-6 w-72 h-16" : "bottom-6 right-6 w-[380px] h-[600px] max-h-[80vh]"
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              {!isMinimized && (
                <div>
                  <h3 className="font-semibold text-white">AgriBot</h3>
                  <p className="text-xs text-white/70">
                    {isTyping ? "Typing..." : "Always here to help"}
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors" onClick={() => setIsMinimized(!isMinimized)}>
                {isMinimized ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                )}
              </button>
              <button className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors" onClick={() => setIsOpen(false)}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${message.sender === "bot" ? "bg-green-100" : "bg-orange-100"}`}>
                      {message.sender === "bot" ? (
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <div className={`max-w-[75%] p-3 rounded-2xl ${message.sender === "bot" ? "bg-white text-gray-800 rounded-tl-none shadow-sm" : "bg-green-600 text-white rounded-tr-none"}`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <span className="text-xs opacity-60 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 2 && (
                <div className="px-4 pb-2 bg-gray-50">
                  <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, index) => (
                      <button key={index} onClick={() => handleQuickReply(reply)}
                        className="px-3 py-1.5 text-xs bg-white hover:bg-gray-100 rounded-full text-gray-700 transition-colors shadow-sm">
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isTyping}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                  />
                  <button type="submit" disabled={isTyping}
                    className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;