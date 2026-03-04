import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Search, MessageSquare, ArrowRight, X, Send, ArrowLeft, CheckCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import Dropdown from './ui/Dropdown'
import { api, API_BASE_URL } from '../config/apiConfig'
import { useUnread } from '../App'

const SERVER = API_BASE_URL.replace('/api/v1', '')

// ─── Wheat Logo ────────────────────────────────────────────────────────────────
const WheatLogo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="wheatGradientHeader" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F4D03F" /><stop offset="100%" stopColor="#D4AF37" />
      </linearGradient>
      <linearGradient id="leafGradientHeader" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2D5016" /><stop offset="100%" stopColor="#1A5D1A" />
      </linearGradient>
    </defs>
    <g transform="translate(65, 40)">
      <path d="M 15 140 Q 10 100 8 60 Q 7 30 10 0" stroke="url(#leafGradientHeader)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="6" cy="15" rx="5" ry="8" fill="url(#wheatGradientHeader)" opacity="0.95" />
      <ellipse cx="11" cy="22" rx="5" ry="8" fill="url(#wheatGradientHeader)" opacity="0.95" />
      <ellipse cx="5" cy="30" rx="5" ry="8" fill="url(#wheatGradientHeader)" opacity="0.9" />
      <ellipse cx="10" cy="38" rx="5" ry="8" fill="url(#wheatGradientHeader)" opacity="0.9" />
      <ellipse cx="6" cy="46" rx="5" ry="7" fill="url(#wheatGradientHeader)" opacity="0.85" />
      <ellipse cx="9" cy="54" rx="4.5" ry="7" fill="url(#wheatGradientHeader)" opacity="0.85" />
    </g>
    <g transform="translate(80, 30)">
      <path d="M 10 150 Q 8 110 7 70 Q 6 35 8 0" stroke="url(#leafGradientHeader)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <ellipse cx="5" cy="10" rx="5.5" ry="9" fill="url(#wheatGradientHeader)" />
      <ellipse cx="10" cy="18" rx="5.5" ry="9" fill="url(#wheatGradientHeader)" />
      <ellipse cx="5" cy="27" rx="5.5" ry="9" fill="url(#wheatGradientHeader)" />
      <ellipse cx="9" cy="36" rx="5.5" ry="9" fill="url(#wheatGradientHeader)" />
      <ellipse cx="6" cy="45" rx="5" ry="8" fill="url(#wheatGradientHeader)" opacity="0.95" />
      <ellipse cx="8" cy="54" rx="5" ry="8" fill="url(#wheatGradientHeader)" opacity="0.95" />
      <ellipse cx="7" cy="63" rx="4.5" ry="7" fill="url(#wheatGradientHeader)" opacity="0.9" />
    </g>
    <g transform="translate(95, 20)">
      <path d="M 5 160 Q 4 115 3 70 Q 2 30 5 0" stroke="url(#leafGradientHeader)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="2" cy="8" rx="6" ry="10" fill="url(#wheatGradientHeader)" />
      <ellipse cx="7" cy="17" rx="6" ry="10" fill="url(#wheatGradientHeader)" />
      <ellipse cx="2" cy="27" rx="6" ry="10" fill="url(#wheatGradientHeader)" />
      <ellipse cx="6" cy="37" rx="6" ry="10" fill="url(#wheatGradientHeader)" />
      <ellipse cx="3" cy="47" rx="5.5" ry="9" fill="url(#wheatGradientHeader)" />
      <ellipse cx="5" cy="57" rx="5.5" ry="9" fill="url(#wheatGradientHeader)" />
      <ellipse cx="4" cy="67" rx="5" ry="8" fill="url(#wheatGradientHeader)" opacity="0.95" />
      <ellipse cx="5" cy="77" rx="5" ry="8" fill="url(#wheatGradientHeader)" opacity="0.95" />
    </g>
    <g transform="translate(110, 30)">
      <path d="M 0 150 Q 2 110 3 70 Q 4 35 2 0" stroke="url(#leafGradientHeader)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <ellipse cx="5" cy="10" rx="5.5" ry="9" fill="url(#wheatGradientHeader)" />
      <ellipse cx="0" cy="18" rx="5.5" ry="9" fill="url(#wheatGradientHeader)" />
      <ellipse cx="5" cy="27" rx="5.5" ry="9" fill="url(#wheatGradientHeader)" />
      <ellipse cx="1" cy="36" rx="5.5" ry="9" fill="url(#wheatGradientHeader)" />
      <ellipse cx="4" cy="45" rx="5" ry="8" fill="url(#wheatGradientHeader)" opacity="0.95" />
      <ellipse cx="2" cy="54" rx="5" ry="8" fill="url(#wheatGradientHeader)" opacity="0.95" />
      <ellipse cx="3" cy="63" rx="4.5" ry="7" fill="url(#wheatGradientHeader)" opacity="0.9" />
    </g>
    <g transform="translate(125, 40)">
      <path d="M -5 140 Q 0 100 2 60 Q 3 30 0 0" stroke="url(#leafGradientHeader)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="4" cy="15" rx="5" ry="8" fill="url(#wheatGradientHeader)" opacity="0.95" />
      <ellipse cx="-1" cy="22" rx="5" ry="8" fill="url(#wheatGradientHeader)" opacity="0.95" />
      <ellipse cx="5" cy="30" rx="5" ry="8" fill="url(#wheatGradientHeader)" opacity="0.9" />
      <ellipse cx="0" cy="38" rx="5" ry="8" fill="url(#wheatGradientHeader)" opacity="0.9" />
      <ellipse cx="4" cy="46" rx="5" ry="7" fill="url(#wheatGradientHeader)" opacity="0.85" />
      <ellipse cx="1" cy="54" rx="4.5" ry="7" fill="url(#wheatGradientHeader)" opacity="0.85" />
    </g>
    <g opacity="0.7">
      <path d="M 70 170 Q 60 165 55 155" stroke="url(#leafGradientHeader)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 130 170 Q 140 165 145 155" stroke="url(#leafGradientHeader)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  </svg>
)

// ─── Avatar ─────────────────────────────────────────────────────────────────────
const Avatar = ({ name = '' }) => {
  const colors = ['from-green-400 to-emerald-600', 'from-blue-400 to-blue-600', 'from-amber-400 to-orange-500', 'from-purple-400 to-purple-600', 'from-rose-400 to-pink-600']
  const color = colors[(name?.charCodeAt(0) || 0) % colors.length]
  return (
    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
      {name?.charAt(0)?.toUpperCase() || '?'}
    </div>
  )
}

// ─── Chat Dialog ────────────────────────────────────────────────────────────────
const ChatDialog = ({ isOpen, onClose, currentUser }) => {
  const socketRef = useRef(null)
  const messagesEndRef = useRef(null)

  const [conversations, setConversations] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(false)

  // Load conversations from API when dialog opens
  useEffect(() => {
    if (!isOpen || !currentUser?._id) return
    api.get('/chat/conversations')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : []
        setConversations(data)
      })
      .catch(err => console.error('Failed to load conversations:', err))
  }, [isOpen, currentUser?._id])

  // Connect socket
  useEffect(() => {
    if (!isOpen || !currentUser?._id) return
    socketRef.current = io(SERVER)
    socketRef.current.on('receiveMessage', (msg) => {
      setMessages(prev => [...prev, msg])
    })
    socketRef.current.on('error', (err) => console.error('Socket error:', err.message))
    return () => socketRef.current?.disconnect()
  }, [isOpen, currentUser])

  // Join room + load history + mark as read when user selected
  useEffect(() => {
    if (!selectedUser || !currentUser?._id || !socketRef.current) return
    socketRef.current.emit('joinRoom', { user1: currentUser._id, user2: selectedUser._id })
    loadChatHistory(currentUser._id, selectedUser._id)
    // Mark messages from this person as read
    api.put(`/chat/read/${selectedUser._id}`).catch(() => { })
    // Clear unread count for this person in the list
    setConversations(prev => prev.map(c => c._id === selectedUser._id ? { ...c, unread: 0 } : c))
  }, [selectedUser])

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadChatHistory = async (user1, user2) => {
    setLoadingMessages(true)
    setMessages([])
    try {
      const res = await api.get(`/chat/${user1}/${user2}`)
      const data = res.data
      setMessages(Array.isArray(data) ? data : [])
      // Add to conversations list if not already there
      setConversations(prev => {
        if (prev.find(c => c._id === selectedUser._id)) return prev
        return [{ _id: selectedUser._id, name: selectedUser.name, role: selectedUser.role }, ...prev]
      })
    } catch (err) {
      console.error('Failed to load history:', err)
    }
    setLoadingMessages(false)
  }

  // Search users with debounce
  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return }
    const timeout = setTimeout(async () => {
      setSearching(true)
      try {
        const res = await api.get(`/users?search=${encodeURIComponent(searchQuery)}`)
        const data = res.data
        const users = (Array.isArray(data) ? data : data.users || []).filter(u => u._id !== currentUser?._id)
        setSearchResults(users)
      } catch (err) {
        console.error('User search failed:', err)
      }
      setSearching(false)
    }, 400)
    return () => clearTimeout(timeout)
  }, [searchQuery])

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedUser || !currentUser?._id) return
    socketRef.current?.emit('sendMessage', {
      sender: currentUser._id,
      receiver: selectedUser._id,
      message: newMessage.trim()
    })
    setNewMessage('')
  }

  const formatTime = (date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex"
        style={{ height: '80vh' }}>

        {/* ── Left: Conversations Panel ── */}
        <div className={`flex-shrink-0 border-r border-gray-200 flex flex-col bg-white ${selectedUser ? 'hidden md:flex md:w-72' : 'flex w-full md:w-72'}`}>
          <div className="p-4 bg-[#235C42] flex items-center justify-between">
            <h2 className="text-white font-bold text-lg">Messages</h2>
            <button onClick={onClose} className="text-white/70 hover:text-white transition-colors"><X size={20} /></button>
          </div>

          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input type="text" placeholder="Search users to chat..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {searchQuery.trim() ? (
              <>
                <p className="px-4 py-2 text-xs text-gray-400 font-semibold uppercase tracking-wide">Search Results</p>
                {searching ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full" />
                  </div>
                ) : searchResults.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm py-8">No users found</p>
                ) : (
                  searchResults.map(u => (
                    <button key={u._id} onClick={() => { setSelectedUser(u); setSearchQuery('') }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left">
                      <Avatar name={u.name} />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{u.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{u.role?.toLowerCase()}</p>
                      </div>
                    </button>
                  ))
                )}
              </>
            ) : conversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-3">
                  <MessageSquare className="text-green-600" size={24} />
                </div>
                <p className="text-gray-400 text-sm">Search for a user above to start chatting</p>
              </div>
            ) : (
              conversations.map(conv => (
                <button key={conv._id} onClick={() => { setSelectedUser(conv); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 ${selectedUser?._id === conv._id ? 'bg-green-50 border-l-4 border-l-green-600' : ''}`}>
                  <Avatar name={conv.name} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{conv.name}</p>
                    <p className="text-xs text-gray-400 capitalize truncate">{conv.lastMsg || conv.role?.toLowerCase()}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="ml-1 min-w-[20px] h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1 flex-shrink-0">
                      {conv.unread > 9 ? '9+' : conv.unread}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* ── Right: Chat Area ── */}
        <div className={`flex-1 flex flex-col ${selectedUser ? 'flex' : 'hidden md:flex'}`}>
          {selectedUser ? (
            <>
              <div className="px-4 py-3 bg-[#235C42] flex items-center gap-3">
                <button onClick={() => setSelectedUser(null)} className="md:hidden text-white/70 hover:text-white">
                  <ArrowLeft size={20} />
                </button>
                <Avatar name={selectedUser.name} />
                <div className="flex-1">
                  <p className="text-white font-semibold">{selectedUser.name}</p>
                  <p className="text-white/60 text-xs capitalize">{selectedUser.role?.toLowerCase()}</p>
                </div>
                <button onClick={onClose} className="text-white/70 hover:text-white"><X size={20} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
                style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                {loadingMessages ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400 text-sm">No messages yet. Say hi! 👋</p>
                  </div>
                ) : (
                  messages.map((msg, i) => {
                    const senderId = msg.sender?._id || msg.sender
                    const isOwn = senderId === currentUser?._id
                    return (
                      <div key={msg._id || i} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl shadow-sm text-sm ${isOwn ? 'bg-[#235C42] text-white rounded-br-sm' : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm'
                          }`}>
                          <p className="break-words">{msg.message}</p>
                          <div className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                            <span className={`text-[10px] ${isOwn ? 'text-white/60' : 'text-gray-400'}`}>{formatTime(msg.createdAt)}</span>
                            {isOwn && <CheckCheck size={12} className="text-white/60" />}
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
                <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                <button onClick={sendMessage} disabled={!newMessage.trim()}
                  className="p-2.5 bg-[#235C42] text-white rounded-xl hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gray-50">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <MessageSquare className="text-green-600" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Your Messages</h3>
              <p className="text-gray-400 text-sm max-w-xs">Search for a farmer or buyer on the left to start a conversation</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ─── Messages Button with Unread Badge ──────────────────────────────────────────
const MessagesButton = ({ onOpen }) => {
  const { unreadCount, clearUnread } = useUnread()
  const handleClick = () => {
    clearUnread()
    onOpen()
  }
  return (
    <button onClick={handleClick}
      className="relative px-4 py-2 rounded-lg flex items-center gap-2 text-white font-medium text-base transition-all duration-200 hover:bg-white/10"
      title="Messages">
      <MessageSquare size={20} strokeWidth={2} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-lg animate-pulse">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  )
}

// ─── TopBar ─────────────────────────────────────────────────────────────────────
const TopBar = ({ isLoggedIn, currentUser }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [products, setProducts] = useState([])
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    api.get('/product')
      .then(res => setProducts(Array.isArray(res.data) ? res.data : res.data.products || []))
      .catch(err => console.error('Failed to fetch products:', err))
  }, [])

  const filteredProducts = searchQuery.trim()
    ? products.filter(p =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5)
    : []

  const hasResults = filteredProducts.length > 0

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/MarketPlace?search=${encodeURIComponent(searchQuery.trim())}`)
      setShowSuggestions(false)
      setSearchQuery('')
    }
  }

  const handleProductClick = (id) => {
    navigate(`/ProductDetails/${id}`)
    setShowSuggestions(false)
    setSearchQuery('')
  }

  const handleKeyDown = (e) => {
    if (!showSuggestions || filteredProducts.length === 0) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(p => p < filteredProducts.length - 1 ? p + 1 : p) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(p => p > 0 ? p - 1 : -1) }
    else if (e.key === 'Enter' && selectedIndex >= 0) { e.preventDefault(); handleProductClick(filteredProducts[selectedIndex]._id) }
  }

  return (
    <>
      <div className="bg-[#235C42]/95 backdrop-blur-md py-5 px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <Link to="/" className="text-2xl flex items-center gap-2.5 hover:opacity-90 transition-opacity mr-12">
          <span className="bg-gradient-to-br from-amber-50 to-amber-100 p-3 rounded-full shadow-md border border-amber-200/50">
            <WheatLogo size={32} />
          </span>
          <span className="text-3xl">
            <span className="text-white font-bold">Agri</span>
            <span className="text-amber-400 font-bold">Connect</span>
          </span>
        </Link>

        <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto">
          <input type="text" placeholder={t('searchCropsHeader') || "Search products, categories..."}
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setShowSuggestions(e.target.value.trim().length > 0); setSelectedIndex(-1) }}
            onKeyDown={handleKeyDown}
            onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full pl-10 pr-10 py-2 rounded-lg bg-white/90 border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
          {searchQuery && (
            <button type="button" onClick={() => { setSearchQuery(''); setShowSuggestions(false) }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          )}

          <AnimatePresence>
            {showSuggestions && hasResults && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Products ({filteredProducts.length})</span>
                </div>
                {filteredProducts.map((product, index) => (
                  <div key={product._id} onClick={() => handleProductClick(product._id)}
                    className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${index === selectedIndex ? 'bg-green-50' : 'hover:bg-gray-50'} border-b border-gray-100`}>
                    <img src={product.image} alt={product.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{product.title}</h4>
                      <p className="text-xs text-gray-500">{product.brand} • ₹{product.discountedPrice}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
                <div onClick={handleSearch} className="p-3 bg-gray-50 text-center cursor-pointer hover:bg-gray-100 transition-colors">
                  <span className="text-sm text-green-600 font-semibold flex items-center justify-center gap-2">
                    <Search className="w-4 h-4" />See all results for "{searchQuery}"
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showSuggestions && searchQuery.trim() && !hasResults && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 text-center z-50">
                <p className="text-gray-500 text-sm">No products found for "{searchQuery}"</p>
                <button type="button" onClick={() => navigate('/MarketPlace')} className="mt-2 text-green-600 text-sm font-semibold hover:text-green-700">
                  Browse all products
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="flex gap-3 ml-8">
          {isLoggedIn ? (
            <>
              <MessagesButton onOpen={() => setChatOpen(true)} />
              <Dropdown />
            </>
          ) : (
            <>
              <button onClick={() => navigate('/Auth')}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg flex items-center gap-2 text-white font-medium text-base transition-all duration-200 border border-white/20 hover:border-white/30">
                <MessageSquare size={20} strokeWidth={2} />
              </button>
              <button onClick={() => navigate('/Auth')}
                className="bg-amber-500 px-6 py-2 rounded-lg flex items-center gap-2.5 text-black font-bold text-base transition-all duration-200 shadow-md hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md">
                <User size={20} strokeWidth={2.5} />
                <span className="text-black">{t('login')}</span>
              </button>
            </>
          )}
        </div>
      </div>

      <ChatDialog isOpen={chatOpen} onClose={() => setChatOpen(false)} currentUser={currentUser} />
    </>
  )
}

// ─── NavBar ──────────────────────────────────────────────────────────────────────
const NavBar = () => {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language
  const handleLanguageChange = (lang) => { i18n.changeLanguage(lang); localStorage.setItem('language', lang) }

  return (
    <nav className="bg-white border-b border-gray-200 py-3.5 px-8 sticky top-[88px] z-40 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex gap-2 text-gray-600 font-medium">
          <Link to="/" className="hover:text-green-800 hover:bg-gray-100 px-5 py-2.5 rounded-full transition-colors duration-200">{t('home')}</Link>
          <Link to="/MarketPlace" className="hover:text-green-800 hover:bg-gray-100 px-5 py-2.5 rounded-full transition-colors duration-200">{t('marketplace')}</Link>
          <Link to="/LivePrices" className="hover:text-green-800 hover:bg-gray-100 px-5 py-2.5 rounded-full transition-colors duration-200">{t('livePrices')}</Link>
          <Link to="/ForFarmers" className="hover:text-green-800 hover:bg-gray-100 px-5 py-2.5 rounded-full transition-colors duration-200">{t('forFarmers')}</Link>
          <Link to="/About" className="hover:text-green-800 hover:bg-gray-100 px-5 py-2.5 rounded-full transition-colors duration-200">{t('about')}</Link>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
          <span className="text-sm text-gray-500 mr-1">🌐</span>
          {[{ code: 'en', label: 'EN' }, { code: 'hi', label: 'हि' }, { code: 'mr', label: 'म' }].map((lang) => (
            <button key={lang.code} onClick={() => handleLanguageChange(lang.code)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${currentLang === lang.code ? 'bg-green-700 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}>
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

// ─── Header ──────────────────────────────────────────────────────────────────────
const Header = () => {
  const { user, authRestored } = useSelector((s) => s.auth ?? s.Auth ?? {})
  if (!authRestored) return null
  return (
    <>
      <TopBar isLoggedIn={!!user} currentUser={user} />
      <NavBar />
    </>
  )
}

export default Header