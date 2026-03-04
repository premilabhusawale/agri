import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { api } from "../config/apiConfig";

const SERVER = 'http://localhost:8585';

const ChatBot = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "initial",
      content: t('botIntro'),
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Connect socket and load history
  useEffect(() => {
    if (!user?._id) return;

    socketRef.current = io(SERVER);

    socketRef.current.on('botReply', (data) => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now(),
        content: data.answer,
        sender: "bot",
        timestamp: new Date()
      }]);
    });

    socketRef.current.on('botError', (err) => {
      setIsTyping(false);
      console.error("Bot Error:", err.message);
    });

    // Load initial history from API
    const loadHistory = async () => {
      try {
        const res = await api.get(`/chatbot/history/${user._id}`);
        if (res.data.success && res.data.history.length > 0) {
          const mappedHistory = res.data.history.flatMap(h => [
            { id: h._id + '_q', content: h.question, sender: 'user', timestamp: h.createdAt },
            { id: h._id + '_a', content: h.answer, sender: 'bot', timestamp: h.createdAt }
          ]);
          setMessages(prev => [...prev, ...mappedHistory]);
        }
      } catch (err) {
        console.error("Failed to load bot history:", err);
      }
    };

    loadHistory();

    return () => socketRef.current?.disconnect();
  }, [user]);

  const quickReplies = [
    t("quickReply1"),
    t("quickReply2"),
    t("quickReply3"),
    t("quickReply4"),
  ];

  const handleSend = () => {
    if (!input.trim() || !user?._id) return;

    const userMsg = {
      id: Date.now(),
      content: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    socketRef.current?.emit('askBot', {
      userId: user._id,
      question: input.trim()
    });

    setInput("");
  };

  const handleQuickReply = (reply) => {
    if (!user?._id) return;
    setInput(reply);
    // Use a small timeout to let state update or just call with value
    const userMsg = { id: Date.now(), content: reply, sender: "user", timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    socketRef.current?.emit('askBot', { userId: user._id, question: reply });
    setInput("");
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
        >
          <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-25 group-hover:hidden" />
          <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed z-50 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ease-in-out border border-slate-200 ${isMinimized ? "bottom-6 right-6 w-80 h-16" : "bottom-6 right-6 w-[400px] h-[650px] max-h-[85vh] scale-100"
          }`}
        >
          {/* Header */}
          <div className="bg-linear-to-r from-emerald-600 to-teal-700 p-5 flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              {!isMinimized && (
                <div>
                  <h3 className="font-black text-white text-lg tracking-tight">{t('botIntelligence')}</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-sm shadow-emerald-400" />
                    <p className="text-[10px] font-black text-white/70 uppercase tracking-widest leading-none">
                      {isTyping ? t("synthesizing") : t("systemActive")}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5 relative z-10">
              <button
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                  </svg>
                )}
              </button>
              <button
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50/30 custom-scrollbar">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3.5 ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-9 h-9 rounded-2xl flex-shrink-0 flex items-center justify-center border shadow-sm ${message.sender === "bot"
                      ? "bg-white border-slate-100 text-emerald-600"
                      : "bg-slate-900 border-slate-800 text-white"
                      }`}>
                      {message.sender === "bot" ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <div className={`max-w-[78%] group flex flex-col ${message.sender === "user" ? "items-end" : "items-start"}`}>
                      <div className={`p-4 rounded-[1.5rem] shadow-sm transition-all hover:shadow-md ${message.sender === "bot"
                        ? "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                        : "bg-emerald-600 text-white rounded-tr-none"
                        }`}>
                        <p className="text-sm font-medium leading-relaxed whitespace-pre-line">{message.content}</p>
                      </div>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-2 px-1">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3.5">
                    <div className="w-9 h-9 rounded-2xl bg-white border border-slate-100 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-sm animate-pulse">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="bg-white p-4 rounded-[1.2rem] rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 3 && (
                <div className="px-5 pb-4 bg-slate-50/30 border-t border-slate-50 pt-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{t('trendingQueries')}</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className="px-4 py-2 text-xs font-bold bg-white hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200 rounded-xl text-slate-600 transition-all shadow-sm active:scale-95"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-5 border-t border-slate-100 bg-white">
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex gap-3"
                >
                  <input
                    type="text"
                    placeholder={t('inquireWithBot')}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isTyping}
                    className="flex-1 px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-[1.2rem] focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all font-bold text-slate-700 disabled:opacity-50 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={isTyping || !input.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-[1.2rem] transition-all disabled:opacity-50 active:scale-90 shadow-lg shadow-emerald-500/20"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
                {/* Security Badge */}
                <div className="flex items-center justify-center gap-1.5 mt-4 opacity-30">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm9.496 3.551a1 1 0 00-1.414-1.414l-3 3a1 1 0 001.414 1.414l3-3z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[10px] font-black uppercase tracking-widest">{t('endToEndIntelligence')}</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;