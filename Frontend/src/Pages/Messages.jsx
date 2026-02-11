import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  MessageSquare, 
  Search, 
  Phone, 
  Video, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Smile, 
  Image as ImageIcon,
  Check,
  CheckCheck,
  ArrowLeft,
  Archive,
  Trash2,
  Star,
  Info
} from 'lucide-react';

const Messages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef(null);
  
  // Mock auth context - replace with your actual auth implementation
  const [profile] = useState({ id: 'user1', role: 'buyer' });
  const [user] = useState({ id: 'user1' });
  const [loading] = useState(false);
  
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [pageLoading, setPageLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping] = useState(false);

  const fetchConversations = async () => {
    // Mock implementation - replace with your actual API call
    setConversations([
      {
        id: '1',
        farmer_id: 'farmer1',
        buyer_id: 'buyer1',
        last_message_at: new Date().toISOString(),
        last_message: 'Hello! I have fresh produce available.',
        unread_count: 2,
        other_user: {
          id: 'farmer1',
          full_name: 'John Farmer',
          avatar_url: '',
          farm_name: 'Green Valley Farm',
          online: true
        }
      },
      {
        id: '2',
        farmer_id: 'farmer2',
        buyer_id: 'buyer1',
        last_message_at: new Date(Date.now() - 86400000).toISOString(),
        last_message: 'Thanks for your order!',
        unread_count: 0,
        other_user: {
          id: 'farmer2',
          full_name: 'Sarah Green',
          avatar_url: '',
          farm_name: 'Organic Harvest',
          online: false
        }
      }
    ]);
    setPageLoading(false);
  };

  const startOrSelectConversation = async (farmerId) => {
    const existing = conversations.find(
      c => c.farmer_id === farmerId || c.buyer_id === farmerId
    );
    
    if (existing) {
      setSelectedConversation(existing);
      return;
    }

    // Mock new conversation creation
    const conv = {
      id: Date.now().toString(),
      farmer_id: farmerId,
      buyer_id: profile?.id,
      last_message_at: new Date().toISOString(),
      last_message: '',
      unread_count: 0,
      other_user: {
        id: farmerId,
        full_name: 'New Farmer',
        avatar_url: '',
        farm_name: 'New Farm',
        online: true
      }
    };
    setConversations(prev => [conv, ...prev]);
    setSelectedConversation(conv);
  };

  const fetchMessages = async () => {
    if (!selectedConversation || !profile) return;

    // Mock messages - replace with actual API call
    setMessages([
      {
        id: '1',
        conversation_id: selectedConversation.id,
        sender_id: selectedConversation.farmer_id,
        content: 'Hello! I have fresh tomatoes available. Are you interested?',
        created_at: new Date(Date.now() - 300000).toISOString(),
        read: true
      },
      {
        id: '2',
        conversation_id: selectedConversation.id,
        sender_id: profile.id,
        content: 'Yes, I am interested. What is the price per kg?',
        created_at: new Date(Date.now() - 240000).toISOString(),
        read: true
      },
      {
        id: '3',
        conversation_id: selectedConversation.id,
        sender_id: selectedConversation.farmer_id,
        content: '₹50 per kg. I can deliver tomorrow.',
        created_at: new Date(Date.now() - 180000).toISOString(),
        read: false
      }
    ]);
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    if (profile?.id) {
      fetchConversations();
      
      const farmerId = location.state?.farmerId;
      if (farmerId && farmerId !== profile.id) {
        startOrSelectConversation(farmerId);
      }
    }
  }, [profile, location.state]); // eslint-disable-line react-hooks/exhaustive-deps

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    if (selectedConversation) {
      fetchMessages();
    }
  }, [selectedConversation, profile]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !profile) return;

    const messageData = {
      id: Date.now().toString(),
      sender_id: profile.id,
      receiver_id: selectedConversation.other_user.id,
      content: newMessage.trim(),
      is_read: false,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, messageData]);
    setNewMessage('');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.other_user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.other_user.farm_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 140px)' }}>
          <div className="grid md:grid-cols-3 gap-0 h-full">
            {/* Conversations List */}
            <div className={`md:col-span-1 border-r border-gray-200 flex flex-col ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
              {/* Sidebar Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">Messages</h1>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No conversations yet</p>
                  </div>
                ) : (
                  filteredConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                        selectedConversation?.id === conv.id ? 'bg-green-50 border-l-4 border-l-green-600' : ''
                      }`}
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold text-lg">
                          {conv.other_user.avatar_url ? (
                            <img src={conv.other_user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                          ) : (
                            conv.other_user.full_name?.charAt(0) || '?'
                          )}
                        </div>
                        {conv.other_user.online && (
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-gray-900 truncate">
                            {conv.other_user.farm_name || conv.other_user.full_name}
                          </p>
                          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                            {formatTime(conv.last_message_at)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">
                            {conv.last_message || 'Start a conversation'}
                          </p>
                          {conv.unread_count > 0 && (
                            <span className="flex-shrink-0 ml-2 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                              {conv.unread_count}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className={`md:col-span-2 flex flex-col ${selectedConversation ? 'flex' : 'hidden md:flex'}`}>
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedConversation(null)}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold">
                          {selectedConversation.other_user.avatar_url ? (
                            <img src={selectedConversation.other_user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                          ) : (
                            selectedConversation.other_user.full_name?.charAt(0) || '?'
                          )}
                        </div>
                        {selectedConversation.other_user.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {selectedConversation.other_user.farm_name || selectedConversation.other_user.full_name}
                        </p>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          {selectedConversation.other_user.online ? (
                            <>
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              Active now
                            </>
                          ) : (
                            'Offline'
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors" 
                        title="Voice Call"
                      >
                        <Phone className="w-5 h-5 text-gray-600" />
                      </button>
                      <button 
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors" 
                        title="Video Call"
                      >
                        <Video className="w-5 h-5 text-gray-600" />
                      </button>
                      <button 
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors" 
                        title="Info"
                      >
                        <Info className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.02) 10px, rgba(0,0,0,.02) 20px)' }}>
                    <div className="space-y-4 max-w-4xl mx-auto">
                      {messages.map((msg, index) => {
                        const isOwn = msg.sender_id === profile?.id;
                        const showAvatar = index === messages.length - 1 || messages[index + 1]?.sender_id !== msg.sender_id;
                        
                        return (
                          <div
                            key={msg.id}
                            className={`flex items-end gap-2 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}
                          >
                            {!isOwn && (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                                {showAvatar ? (selectedConversation.other_user.full_name?.charAt(0) || '?') : ''}
                              </div>
                            )}
                            <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
                              <div
                                className={`px-4 py-2.5 rounded-2xl shadow-sm ${
                                  isOwn
                                    ? 'bg-green-600 text-white rounded-br-md'
                                    : 'bg-white text-gray-900 rounded-bl-md border border-gray-200'
                                }`}
                              >
                                <p className="break-words">{msg.content}</p>
                              </div>
                              <div className="flex items-center gap-1 mt-1 px-2">
                                <span className="text-xs text-gray-500">
                                  {formatTime(msg.created_at)}
                                </span>
                                {isOwn && (
                                  msg.is_read ? (
                                    <CheckCheck className="w-3.5 h-3.5 text-green-600" />
                                  ) : (
                                    <Check className="w-3.5 h-3.5 text-gray-400" />
                                  )
                                )}
                              </div>
                            </div>
                            {isOwn && <div className="w-8"></div>}
                          </div>
                        );
                      })}
                      {isTyping && (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-semibold">
                            {selectedConversation.other_user.full_name?.charAt(0) || '?'}
                          </div>
                          <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md border border-gray-200">
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Message Input */}
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
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                          <Smile className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                      <button 
                        onClick={sendMessage} 
                        disabled={!newMessage.trim()}
                        className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                      >
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
                    <p className="text-gray-500 max-w-sm">
                      Select a conversation from the list to start chatting with farmers and buyers
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