import { useState, useRef, useEffect } from "react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
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

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return "Current market prices:\n🍅 Tomatoes: ₹45/kg (+5.2%)\n🥔 Potatoes: ₹28/kg (-2.1%)\n🧅 Onions: ₹35/kg (+8.5%)\n\nCheck our Live Prices section for real-time updates!";
    }
    if (lowerMessage.includes("list") || lowerMessage.includes("sell")) {
      return "To list your produce:\n1. Create a farmer account\n2. Go to 'My Listings'\n3. Click 'Add New Product'\n4. Upload photos and set price\n5. Publish!\n\nWant me to guide you through registration?";
    }
    if (lowerMessage.includes("organic") || lowerMessage.includes("farm")) {
      return "We have 500+ verified organic farms! You can filter by:\n• Location (use your GPS)\n• Certification type\n• Produce category\n\nVisit our Marketplace and select 'Organic' filter! 🌿";
    }
    if (lowerMessage.includes("payment")) {
      return "We support multiple payment methods:\n💳 UPI (GPay, PhonePe, Paytm)\n💰 Net Banking\n🏦 Cash on Delivery\n📱 Wallet Balance\n\nAll payments are secure and instant!";
    }
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! Great to see you here. I can help you with:\n• Current crop prices\n• Finding products\n• Selling your produce\n• Delivery tracking\n\nWhat would you like to know?";
    }

    return "I'm here to help! You can ask me about:\n• Current market prices 📊\n• How to sell your produce 🌾\n• Finding organic products 🌿\n• Payment & delivery info 📦\n\nWhat would you like to know?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot typing
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
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
        <div
          className={`fixed z-50 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
            isMinimized
              ? "bottom-6 right-6 w-72 h-16"
              : "bottom-6 right-6 w-[380px] h-[600px] max-h-[80vh]"
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
                  <p className="text-xs text-white/70">Always here to help</p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                onClick={() => setIsMinimized(!isMinimized)}
              >
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
              <button
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
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
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                        message.sender === "bot"
                          ? "bg-green-100"
                          : "bg-orange-100"
                      }`}
                    >
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
                    <div
                      className={`max-w-[75%] p-3 rounded-2xl ${
                        message.sender === "bot"
                          ? "bg-white text-gray-800 rounded-tl-none shadow-sm"
                          : "bg-green-600 text-white rounded-tr-none"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <span className="text-xs opacity-60 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 2 && (
                <div className="px-4 pb-2 bg-gray-50">
                  <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className="px-3 py-1.5 text-xs bg-white hover:bg-gray-100 rounded-full text-gray-700 transition-colors shadow-sm"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                  >
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