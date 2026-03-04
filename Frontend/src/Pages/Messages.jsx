import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import {
  MessageSquare, Search, Phone, Video, MoreVertical,
  Send, Paperclip, Smile, Image as ImageIcon,
  Check, CheckCheck, ArrowLeft, Info, X
} from 'lucide-react';
import { api, API_BASE_URL } from '../config/apiConfig';


const SERVER = API_BASE_URL.replace('/api/v1', '');

// ─── Avatar ──────────────────────────────────────────────────────────────────
const Avatar = ({ name = '', online = false, size = 'md' }) => {
  const colors = [
    'from-green-400 to-emerald-600',
    'from-blue-400 to-blue-600',
    'from-amber-400 to-orange-500',
    'from-purple-400 to-purple-600',
    'from-rose-400 to-pink-600'
  ];
  const color = colors[(name?.charCodeAt(0) || 0) % colors.length];
  const sz = size === 'sm' ? 'w-8 h-8 text-xs' : size === 'lg' ? 'w-12 h-12 text-lg' : 'w-10 h-10 text-sm';

  return (
    <div className="relative flex-shrink-0">
      <div className={`${sz} rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold`}>
        {name?.charAt(0)?.toUpperCase() || '?'}
      </div>
      {online && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      )}
    </div>
  );
};

// ─── Messages Page ────────────────────────────────────────────────────────────
const Messages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // ── Auth from Redux ──
  const { user, authRestored } = useSelector((s) => s.auth ?? s.Auth ?? {});

  // ── State ──
  const [conversations, setConversations] = useState([]);   // [{_id, name, role, lastMsg, unread}]
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingConversations, setLoadingConversations] = useState(false);

  // ── Redirect if not logged in ──
  useEffect(() => {
    if (authRestored && !user) navigate('/Auth');
  }, [user, authRestored, navigate]);

  // ── Load conversations list on mount ──
  useEffect(() => {
    if (!user?._id) return;
    setLoadingConversations(true);
    api.get('/chat/conversations')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setConversations(data);
      })
      .catch(err => console.error('Failed to load conversations:', err))
      .finally(() => setLoadingConversations(false));
  }, [user?._id]);

  // ── Connect socket ──
  useEffect(() => {
    if (!user?._id) return;

    socketRef.current = io(SERVER);

    // Register so server can send targeted notifications
    socketRef.current.on('connect', () => {
      socketRef.current.emit('registerUser', user._id);
    });

    socketRef.current.on('receiveMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
      // Update last message in conversations list
      const senderId = msg.sender?._id || msg.sender;
      const otherId = senderId === user._id ? (msg.receiver?._id || msg.receiver) : senderId;
      setConversations(prev =>
        prev.map(c => c._id === otherId ? { ...c, lastMsg: msg.message } : c)
      );
    });

    socketRef.current.on('error', (err) => console.error('Socket error:', err.message));

    return () => socketRef.current?.disconnect();
  }, [user]);

  // ── Join room when user selected ──
  useEffect(() => {
    if (!selectedUser || !user?._id || !socketRef.current) return;
    socketRef.current.emit('joinRoom', { user1: user._id, user2: selectedUser._id });
    loadChatHistory(user._id, selectedUser._id);
    // Mark messages from this sender as read
    api.put(`/chat/read/${selectedUser._id}`).catch(() => { });
    // Clear unread count for this conversation in the sidebar
    setConversations(prev => prev.map(c => c._id === selectedUser._id ? { ...c, unread: 0 } : c));
  }, [selectedUser]);

  // ── Open conversation from location state (e.g. from product page) ──
  useEffect(() => {
    const farmerData = location.state?.farmer;
    if (farmerData && user?._id) {
      setSelectedUser(farmerData);
      addToConversations(farmerData);
    }
  }, [location.state, user]);

  // ── Auto scroll ──
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Load chat history ──
  const loadChatHistory = async (user1, user2) => {
    setLoadingMessages(true);
    setMessages([]);
    try {
      const res = await api.get(`/chat/${user1}/${user2}`);
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to load chat history:', err);
    }
    setLoadingMessages(false);
  };

  // ── Add user to conversations list ──
  const addToConversations = (u, lastMsg = '') => {
    setConversations(prev => {
      if (prev.find(c => c._id === u._id)) return prev;
      return [{ _id: u._id, name: u.name, role: u.role, lastMsg }, ...prev];
    });
  };

  // ── Search users with debounce ──
  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    const timeout = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await api.get(`/users?search=${encodeURIComponent(searchQuery)}`);
        const users = (Array.isArray(res.data) ? res.data : res.data.users || []).filter(u => u._id !== user?._id);
        setSearchResults(users);
      } catch (err) {
        console.error('User search failed:', err);
      }
      setSearching(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // ── Send message ──
  const sendMessage = () => {
    if (!newMessage.trim() || !selectedUser || !user?._id) return;
    socketRef.current?.emit('sendMessage', {
      sender: user._id,
      receiver: selectedUser._id,
      message: newMessage.trim()
    });
    // Update last message in list
    setConversations(prev =>
      prev.map(c => c._id === selectedUser._id ? { ...c, lastMsg: newMessage.trim() } : c)
    );
    setNewMessage('');
  };

  const handleSelectUser = (u) => {
    setSelectedUser(u);
    addToConversations(u);
    setSearchQuery('');
    setSearchResults([]);
  };

  const formatTime = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (days === 1) return 'Yesterday';
    if (days < 7) return d.toLocaleDateString([], { weekday: 'short' });
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  if (!authRestored) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 140px)' }}>
          <div className="grid md:grid-cols-3 gap-0 h-full">

            {/* ── Conversations Sidebar ── */}
            <div className={`md:col-span-1 border-r border-gray-200 flex flex-col ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
              {/* Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#235C42] flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">Messages</h1>
                  </div>
                </div>
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users to chat..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                  {searchQuery && (
                    <button onClick={() => { setSearchQuery(''); setSearchResults([]); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto">
                {/* Search results */}
                {searchQuery.trim() ? (
                  searching ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full" />
                    </div>
                  ) : searchResults.length === 0 ? (
                    <p className="text-center text-gray-400 text-sm py-8">No users found</p>
                  ) : (
                    <>
                      <p className="px-4 py-2 text-xs text-gray-400 font-semibold uppercase tracking-wide">Results</p>
                      {searchResults.map(u => (
                        <button key={u._id} onClick={() => handleSelectUser(u)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100">
                          <Avatar name={u.name} />
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{u.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{u.role?.toLowerCase()}</p>
                          </div>
                        </button>
                      ))}
                    </>
                  )
                ) : conversations.length === 0 ? (
                  <div className="text-center py-12 px-6">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">Search for a farmer or buyer above to start chatting</p>
                  </div>
                ) : (
                  conversations.map((conv) => (
                    <button key={conv._id} onClick={() => handleSelectUser(conv)}
                      className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${selectedUser?._id === conv._id ? 'bg-green-50 border-l-4 border-l-green-600' : ''
                        }`}>
                      <Avatar name={conv.name} />
                      <div className="flex-1 text-left min-w-0">
                        <p className={`text-sm truncate ${conv.unread > 0 ? 'font-bold text-gray-900' : 'font-semibold text-gray-900'}`}>{conv.name}</p>
                        <p className="text-xs text-gray-500 truncate">{conv.lastMsg || 'Start a conversation'}</p>
                      </div>
                      {conv.unread > 0 && (
                        <span className="flex-shrink-0 min-w-[20px] h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1">
                          {conv.unread > 9 ? '9+' : conv.unread}
                        </span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* ── Chat Area ── */}
            <div className={`md:col-span-2 flex flex-col ${selectedUser ? 'flex' : 'hidden md:flex'}`}>
              {selectedUser ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setSelectedUser(null)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <Avatar name={selectedUser.name} />
                      <div>
                        <p className="font-semibold text-gray-900">{selectedUser.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{selectedUser.role?.toLowerCase()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Voice Call">
                        <Phone className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Video Call">
                        <Video className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Info">
                        <Info className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50"
                    style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.02) 10px, rgba(0,0,0,.02) 20px)' }}>
                    {loadingMessages ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full" />
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <p className="text-gray-400 text-sm">No messages yet. Say hi! 👋</p>
                      </div>
                    ) : (
                      <div className="space-y-4 max-w-4xl mx-auto">
                        {messages.map((msg, index) => {
                          const senderId = msg.sender?._id || msg.sender;
                          const isOwn = senderId === user?._id;
                          return (
                            <div key={msg._id || index} className={`flex items-end gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                              {!isOwn && <Avatar name={selectedUser.name} size="sm" />}
                              <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
                                <div className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm ${isOwn
                                  ? 'bg-[#235C42] text-white rounded-br-md'
                                  : 'bg-white text-gray-900 rounded-bl-md border border-gray-200'
                                  }`}>
                                  <p className="break-words">{msg.message}</p>
                                </div>
                                <div className="flex items-center gap-1 mt-1 px-2">
                                  <span className="text-xs text-gray-400">{formatTime(msg.createdAt)}</span>
                                  {isOwn && <CheckCheck className="w-3.5 h-3.5 text-gray-400" />}
                                </div>
                              </div>
                              {isOwn && <div className="w-8" />}
                            </div>
                          );
                        })}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex items-end gap-2 max-w-4xl mx-auto">
                      <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                        <Paperclip className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                        <ImageIcon className="w-5 h-5 text-gray-600" />
                      </button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-lg">
                          <Smile className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                      <button onClick={sendMessage} disabled={!newMessage.trim()}
                        className="p-3 bg-[#235C42] text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0">
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center p-8 bg-gray-50">
                  <div>
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Messages</h3>
                    <p className="text-gray-500 max-w-sm text-sm">
                      Select a conversation or search for a user to start chatting
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;