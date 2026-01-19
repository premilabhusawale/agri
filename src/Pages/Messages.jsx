import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Messages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef(null);
  
  // Mock auth context - replace with your actual auth implementation
  const [profile, setProfile] = useState({ id: 'user1', role: 'buyer' });
  const [user, setUser] = useState({ id: 'user1' });
  const [loading, setLoading] = useState(false);
  
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (profile?.id) {
      fetchConversations();
      
      const farmerId = location.state?.farmerId;
      if (farmerId && farmerId !== profile.id) {
        startOrSelectConversation(farmerId);
      }
    }
  }, [profile, location.state]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages();
    }
  }, [selectedConversation, profile]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchConversations = async () => {
    // Mock implementation - replace with your actual API call
    setConversations([
      {
        id: '1',
        farmer_id: 'farmer1',
        buyer_id: 'buyer1',
        last_message_at: new Date().toISOString(),
        other_user: {
          id: 'farmer1',
          full_name: 'John Farmer',
          avatar_url: '',
          farm_name: 'Green Valley Farm'
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
      other_user: {
        id: farmerId,
        full_name: 'New Contact',
        avatar_url: '',
      }
    };
    
    setConversations(prev => [conv, ...prev]);
    setSelectedConversation(conv);
  };

  const fetchMessages = async () => {
    if (!selectedConversation || !profile) return;
    
    // Mock implementation - replace with your actual API call
    setMessages([
      {
        id: '1',
        sender_id: 'farmer1',
        receiver_id: profile.id,
        content: 'Hello! I have fresh produce available.',
        is_read: true,
        created_at: new Date().toISOString()
      }
    ]);
  };

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

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="text-green-600">💬</span>
          Messages
        </h1>

        <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-240px)]">
          {/* Conversations List */}
          <div className="md:col-span-1 bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold">Conversations</h2>
            </div>
            <div className="overflow-y-auto h-full">
              {conversations.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No conversations yet</p>
              ) : (
                conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-gray-100 transition-colors border-b border-gray-200 ${
                      selectedConversation?.id === conv.id ? 'bg-gray-100' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      {conv.other_user.avatar_url ? (
                        <img src={conv.other_user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-green-600">👤</span>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium truncate">
                        {conv.other_user.farm_name || conv.other_user.full_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(conv.last_message_at).toLocaleDateString()}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedConversation(null)}
                      className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                    >
                      ←
                    </button>
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      {selectedConversation.other_user.avatar_url ? (
                        <img src={selectedConversation.other_user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-green-600">👤</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {selectedConversation.other_user.farm_name || selectedConversation.other_user.full_name}
                      </p>
                      <p className="text-xs text-green-500">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg" title="Voice Call (Coming Soon)">
                      📞
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg" title="Video Call (Coming Soon)">
                      📹
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender_id === profile?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                          msg.sender_id === profile?.id
                            ? 'bg-green-600 text-white rounded-br-md'
                            : 'bg-gray-200 text-gray-900 rounded-bl-md'
                        }`}
                      >
                        <p>{msg.content}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender_id === profile?.id ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    <button 
                      onClick={sendMessage} 
                      disabled={!newMessage.trim()}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ➤
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div>
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                  <p className="text-gray-500">
                    Choose a conversation from the list to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;