import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import {
    Search,
    Send,
    MessageSquare,
    User as UserIcon,
    Phone,
    Video,
    Info,
    Paperclip,
    Smile,
    ImageIcon,
    CheckCheck,
    ChevronRight,
    MoreVertical
} from 'lucide-react';
import { api, API_BASE_URL } from '../../config/apiConfig';
import { toast } from 'react-toastify';

const SERVER = API_BASE_URL.replace('/api/v1', '');

const Avatar = ({ name = '', photo = null, online = false, size = 'md' }) => {
    const colors = [
        'from-emerald-400 to-teal-600',
        'from-blue-400 to-indigo-600',
        'from-violet-400 to-purple-600',
        'from-rose-400 to-pink-600',
        'from-amber-400 to-orange-500'
    ];
    const color = colors[(name?.charCodeAt(0) || 0) % colors.length];
    const sz = size === 'sm' ? 'w-8 h-8 text-[10px]' : size === 'lg' ? 'w-12 h-12 text-lg' : 'w-10 h-10 text-sm';

    return (
        <div className="relative shrink-0 group">
            <div className={`${sz} rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-black shadow-sm overflow-hidden border border-white/20 transition-transform group-hover:scale-105`}>
                {photo ? (
                    <img src={photo} alt={name} className="w-full h-full object-cover" />
                ) : (
                    name?.charAt(0)?.toUpperCase() || '?'
                )}
            </div>
            {online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full ring-2 ring-emerald-500/20" />
            )}
        </div>
    );
};

const AdminMessages = () => {
    const scrollRef = useRef(null);
    const socketRef = useRef(null);
    const { user } = useSelector((state) => state.auth);

    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user?._id) return;
        socketRef.current = io(SERVER);

        socketRef.current.on('receiveMessage', (msg) => {
            setMessages(prev => [...prev, msg]);
            // Update last message in conversation list
            const otherId = msg.sender === user._id ? msg.receiver : msg.sender;
            setConversations(prev => prev.map(c =>
                c._id === otherId ? { ...c, lastMsg: msg.message, updatedAt: new Date() } : c
            ));
        });

        // Fetch initial conversations (we'll use all users for now or previous chats)
        fetchConversations();

        return () => socketRef.current?.disconnect();
    }, [user]);

    const fetchConversations = async () => {
        try {
            // In a real app, you'd have an endpoint for specific conversations
            // Here we'll just list users who might have chatted or all users
            const res = await api.get('/all-users');
            const filtered = res.data.filter(u => u._id !== user._id);
            setConversations(filtered);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (selectedUser && user?._id) {
            socketRef.current?.emit('joinRoom', { user1: user._id, user2: selectedUser._id });
            fetchChatHistory(user._id, selectedUser._id);
        }
    }, [selectedUser]);

    const fetchChatHistory = async (u1, u2) => {
        setLoading(true);
        try {
            const res = await api.get(`/chat/${u1}/${u2}`);
            setMessages(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            toast.error("Failed to load chat history");
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedUser || !user?._id) return;

        const data = {
            sender: user._id,
            receiver: selectedUser._id,
            message: newMessage.trim()
        };

        socketRef.current?.emit('sendMessage', data);
        setConversations(prev => prev.map(c =>
            c._id === selectedUser._id ? { ...c, lastMsg: newMessage.trim(), updatedAt: new Date() } : c
        ));
        setNewMessage('');
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const filteredConversations = conversations.filter(c => {
        const fullName = `${c.name || ''} ${c.surname || ''}`.toLowerCase();
        const role = (c.role || '').toLowerCase();
        const search = searchTerm.toLowerCase();
        return fullName.includes(search) || role.includes(search);
    });

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Support Center</h1>
                    <p className="text-slate-500 text-sm font-medium">Real-time communication with platform users.</p>
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Sidebar - Users List */}
                <div className="w-80 flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-50 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search customers..."
                                className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium bg-slate-50/50"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {filteredConversations.length > 0 ? filteredConversations.map((conv) => (
                            <button
                                key={conv._id}
                                onClick={() => setSelectedUser(conv)}
                                className={`w-full flex items-center gap-3 p-4 transition-all border-b border-slate-50/50 ${selectedUser?._id === conv._id ? 'bg-emerald-50/50' : 'hover:bg-slate-50/50'
                                    }`}
                            >
                                <Avatar name={conv.name} photo={conv.photo} online={false} />
                                <div className="flex-1 text-left min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="text-sm font-bold text-slate-800 truncate">{conv.name} {conv.surname}</span>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">12:30 PM</span>
                                    </div>
                                    <p className="text-xs text-slate-400 truncate font-medium">
                                        {conv.lastMsg || 'Start a new conversation...'}
                                    </p>
                                </div>
                                {selectedUser?._id === conv._id && (
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" />
                                )}
                            </button>
                        )) : (
                            <div className="flex flex-col items-center justify-center p-8 text-center">
                                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-300 mb-2">
                                    <Search size={24} />
                                </div>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">No chats available</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
                    {selectedUser ? (
                        <>
                            {/* Chat Header */}
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                                <div className="flex items-center gap-4">
                                    <Avatar name={selectedUser.name} photo={selectedUser.photo} online={true} size="md" />
                                    <div>
                                        <h3 className="text-sm font-black text-slate-800">{selectedUser.name} {selectedUser.surname}</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Now</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"><Phone size={18} /></button>
                                    <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"><Video size={18} /></button>
                                    <button className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all"><MoreVertical size={18} /></button>
                                </div>
                            </div>

                            {/* Messages List */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/20 custom-scrollbar">
                                {loading ? (
                                    <div className="h-full flex items-center justify-center">
                                        <div className="w-8 h-8 border-3 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin" />
                                    </div>
                                ) : messages.length > 0 ? messages.map((msg, idx) => {
                                    const isOwn = (msg.sender?._id || msg.sender) === user._id;
                                    return (
                                        <div key={idx} className={`flex items-end gap-2.5 ${isOwn ? 'flex-row-reverse' : ''}`}>
                                            <Avatar name={isOwn ? user.name : selectedUser.name} photo={isOwn ? user.photo : selectedUser.photo} size="sm" />
                                            <div className={`max-w-[70%] group ${isOwn ? 'items-end' : 'items-start'} flex flex-col gap-1.5`}>
                                                <div className={`px-4 py-3 rounded-2xl text-sm font-medium shadow-sm transition-all ${isOwn
                                                    ? 'bg-emerald-600 text-white rounded-br-none'
                                                    : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'
                                                    }`}>
                                                    {msg.message}
                                                </div>
                                                <div className={`flex items-center gap-1.5 px-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    {isOwn && <CheckCheck size={12} className="text-emerald-500" />}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                        <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mb-4">
                                            <MessageSquare size={32} />
                                        </div>
                                        <h4 className="text-lg font-black text-slate-800">Fresh Connection</h4>
                                        <p className="text-slate-400 text-sm max-w-xs mt-1">Start a conversation with {selectedUser.name}. Good vibes only! ✨</p>
                                    </div>
                                )}
                                <div ref={scrollRef} />
                            </div>

                            {/* Message Input */}
                            <div className="p-6 bg-white border-t border-slate-100">
                                <div className="flex items-end gap-3">
                                    <div className="hidden sm:flex gap-1.5 pb-1">
                                        <button className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"><Paperclip size={20} /></button>
                                        <button className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"><ImageIcon size={20} /></button>
                                    </div>
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            placeholder="Write your message..."
                                            className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all font-medium text-sm"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        />
                                        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-emerald-500 transition-all">
                                            <Smile size={20} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!newMessage.trim()}
                                        className="p-3.5 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 disabled:opacity-50 disabled:scale-100 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                                    >
                                        <Send size={20} />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-slate-50/30">
                            <div className="relative mb-6">
                                <div className="w-24 h-24 bg-linear-to-br from-emerald-500 to-teal-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20 rotate-12 transition-transform hover:rotate-0 duration-500">
                                    <MessageSquare size={44} strokeWidth={2.5} />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-3xl flex items-center justify-center shadow-lg border border-slate-50">
                                    <span className="flex h-3 w-3 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
                                    </span>
                                </div>
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Select a conversation</h2>
                            <p className="text-slate-500 text-sm max-w-sm mt-2 font-medium">Connect with your community. Respond to inquiries, support farmers, and grow together.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminMessages;
