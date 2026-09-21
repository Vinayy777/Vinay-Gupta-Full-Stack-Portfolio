import React, { useState, useEffect } from 'react';
import { DeveloperProfile } from '../types';
import { 
  X, 
  UserCheck, 
  RefreshCw, 
  Sparkles, 
  Check, 
  Sliders, 
  Inbox, 
  Mail, 
  Clock, 
  User, 
  MessageSquare,
  Trash2,
  Lock,
  Unlock,
  Archive,
  ArchiveRestore,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
  Copy
} from 'lucide-react';

interface CustomizeProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: DeveloperProfile;
  onUpdateProfile: (newProfile: DeveloperProfile) => void;
  onResetProfile: () => void;
}

interface StoredMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  formattedDate: string;
  read?: boolean;
  archived?: boolean;
}

export const CustomizeProfileModal: React.FC<CustomizeProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  onResetProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'inbox'>('profile');
  const [formData, setFormData] = useState<DeveloperProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Admin PIN Auth state
  const [adminPin, setAdminPin] = useState(() => sessionStorage.getItem('portfolio_admin_pin') || '');
  const [pinInput, setPinInput] = useState('');
  const [isPinAuthorized, setIsPinAuthorized] = useState(() => Boolean(sessionStorage.getItem('portfolio_admin_pin')));
  const [pinError, setPinError] = useState('');
  const [verifyingPin, setVerifyingPin] = useState(false);

  // Inbox messages & filters
  const [inboxFilter, setInboxFilter] = useState<'unread' | 'all' | 'archived'>('unread');
  const [inboxMessages, setInboxMessages] = useState<StoredMessage[]>([]);
  const [loadingInbox, setLoadingInbox] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [copiedEmailId, setCopiedEmailId] = useState<string | null>(null);

  const handleCopyMsgEmail = (id: string, email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmailId(id);
    setTimeout(() => setCopiedEmailId(null), 2000);
  };

  // Handle Escape key & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Sync form data when profile changes externally
  useEffect(() => {
    if (isOpen) setFormData(profile);
  }, [isOpen, profile]);

  // Fetch contact messages with PIN
  const fetchMessages = async (pinToUse = adminPin) => {
    if (!pinToUse) return;
    setLoadingInbox(true);
    try {
      const res = await fetch('/api/contact', {
        headers: { 'x-admin-pin': pinToUse },
      });
      if (res.status === 401) {
        setIsPinAuthorized(false);
        sessionStorage.removeItem('portfolio_admin_pin');
        setAdminPin('');
        return;
      }
      const data = await res.json();
      if (data.messages && Array.isArray(data.messages)) {
        setInboxMessages(data.messages);
        setUnreadCount(data.unreadCount || 0);
        setIsPinAuthorized(true);
      }
    } catch (err) {
      console.error('Failed to load contact messages:', err);
    } finally {
      setLoadingInbox(false);
    }
  };

  // Verify PIN submission
  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) return;

    setVerifyingPin(true);
    setPinError('');

    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput.trim() }),
      });

      const data = await res.json();
      if (data.authorized) {
        const validPin = pinInput.trim();
        setAdminPin(validPin);
        setIsPinAuthorized(true);
        sessionStorage.setItem('portfolio_admin_pin', validPin);
        setPinInput('');
        fetchMessages(validPin);
      } else {
        setPinError('Incorrect PIN. Please try again.');
      }
    } catch (err) {
      setPinError('Connection error. Please try again.');
    } finally {
      setVerifyingPin(false);
    }
  };

  // Lock / Logout Admin PIN
  const handleLockInbox = () => {
    sessionStorage.removeItem('portfolio_admin_pin');
    setAdminPin('');
    setIsPinAuthorized(false);
    setInboxMessages([]);
  };

  // Toggle Read Status
  const handleToggleRead = async (msgId: string, currentRead: boolean) => {
    try {
      const res = await fetch(`/api/contact/${msgId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': adminPin,
        },
        body: JSON.stringify({ read: !currentRead }),
      });
      if (res.ok) {
        setInboxMessages((prev) =>
          prev.map((m) => (m.id === msgId ? { ...m, read: !currentRead } : m))
        );
      }
    } catch (err) {
      console.error('Failed to update read status:', err);
    }
  };

  // Toggle Archive Status
  const handleToggleArchive = async (msgId: string, currentArchived: boolean) => {
    try {
      const res = await fetch(`/api/contact/${msgId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': adminPin,
        },
        body: JSON.stringify({ archived: !currentArchived, read: true }),
      });
      if (res.ok) {
        setInboxMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, archived: !currentArchived, read: true } : m
          )
        );
      }
    } catch (err) {
      console.error('Failed to update archive status:', err);
    }
  };

  // Delete Message
  const handleDeleteMessage = async (msgId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this message?')) return;

    try {
      const res = await fetch(`/api/contact/${msgId}`, {
        method: 'DELETE',
        headers: { 'x-admin-pin': adminPin },
      });
      if (res.ok) {
        setInboxMessages((prev) => prev.filter((m) => m.id !== msgId));
      }
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  // Load messages when inbox tab is opened if authorized
  useEffect(() => {
    if (isOpen && activeTab === 'inbox' && isPinAuthorized) {
      fetchMessages();
    }
  }, [isOpen, activeTab, isPinAuthorized]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleTechStackChange = (val: string) => {
    const list = val.split(',').map((s) => s.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, primaryTechStack: list }));
  };

  // Filter messages based on active inbox filter
  const filteredMessages = inboxMessages.filter((m) => {
    if (inboxFilter === 'unread') return !m.read && !m.archived;
    if (inboxFilter === 'archived') return m.archived;
    return !m.archived; // 'all' active messages
  });

  const unreadMsgCount = inboxMessages.filter((m) => !m.read && !m.archived).length;
  const archivedMsgCount = inboxMessages.filter((m) => m.archived).length;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 dark:bg-black/80 backdrop-blur-sm p-2 sm:p-4 md:p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="min-h-full flex items-start sm:items-center justify-center py-2 sm:py-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 shadow-2xl border border-slate-200 dark:border-slate-700 relative my-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Admin & Profile Controls</h3>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                  Manage your developer profile & review received visitor inquiries.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs: Profile vs Inbox */}
          <div className="flex items-center space-x-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Edit Profile Details</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('inbox')}
              className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                activeTab === 'inbox'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {isPinAuthorized ? <Unlock className="w-3.5 h-3.5 text-emerald-500" /> : <Lock className="w-3.5 h-3.5" />}
              <span>Admin Inbox</span>
              {isPinAuthorized && unreadMsgCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-mono font-bold animate-pulse">
                  {unreadMsgCount} New
                </span>
              )}
            </button>
          </div>

          {/* Tab 1: Profile Editor */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Developer Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Vinay Gupta"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-400 outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Role Title</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Senior Full-Stack Software Engineer"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-400 outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Hero Headline</label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  placeholder="A compelling headline for recruiters and clients"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-400 outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  2-Sentence Value Proposition
                </label>
                <textarea
                  rows={3}
                  value={formData.valueProposition}
                  onChange={(e) => setFormData({ ...formData, valueProposition: e.target.value })}
                  placeholder="Explain what you build, your primary technologies, and how you deliver value."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-400 outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white leading-relaxed placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Tech Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.primaryTechStack.join(', ')}
                  onChange={(e) => handleTechStackChange(e.target.value)}
                  placeholder="React, Node.js, TypeScript, PostgreSQL, Express, Next.js, Docker, AWS"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-400 outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Experience Level</label>
                  <input
                    type="text"
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                    placeholder="e.g., Senior (5+ Years)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-400 outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Target Audience</label>
                  <input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    placeholder="e.g., Tech Recruiters & Engineering Managers"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-400 outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-400 outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-indigo-600 dark:focus:border-indigo-400 outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onResetProfile();
                    onClose();
                  }}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    {savedSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Applied!</span>
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4" />
                        <span>Apply Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          )}

          {/* Tab 2: Admin Inquiries Inbox */}
          {activeTab === 'inbox' && (
            <div className="space-y-4 text-xs sm:text-sm">
              
              {/* If NOT PIN-Authorized: Show Secure Unlock Screen */}
              {!isPinAuthorized ? (
                <div className="py-8 px-4 text-center space-y-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-xs">
                    <KeyRound className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      Admin Protected Inbox
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      To protect visitor privacy and recruiter inquiries from public viewing, enter your 4-digit Admin PIN.
                    </p>
                  </div>

                  <form onSubmit={handleVerifyPin} className="max-w-xs mx-auto space-y-3">
                    <div>
                      <input
                        type="password"
                        maxLength={8}
                        value={pinInput}
                        onChange={(e) => {
                          setPinInput(e.target.value);
                          setPinError('');
                        }}
                        placeholder="Enter Admin PIN (Default: 1234)"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 focus:border-indigo-600 dark:focus:border-indigo-400 outline-none text-center font-mono text-base tracking-widest bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        autoFocus
                      />
                      {pinError && (
                        <p className="text-xs text-rose-500 dark:text-rose-400 font-semibold mt-1.5">
                          {pinError}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={verifyingPin || !pinInput.trim()}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Unlock className="w-4 h-4" />
                      <span>{verifyingPin ? 'Verifying PIN...' : 'Unlock Inquiries Inbox'}</span>
                    </button>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                      Configured via ADMIN_PIN in your .env file
                    </p>
                  </form>
                </div>
              ) : (
                /* If PIN Authorized: Show Full Interactive Inbox with Read/Unread/Archive filters */
                <div className="space-y-4">
                  
                  {/* Inbox Subheader & Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-700/80">
                    
                    {/* Filter Pills */}
                    <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => setInboxFilter('unread')}
                        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          inboxFilter === 'unread'
                            ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-2xs font-bold'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        Unread {unreadMsgCount > 0 && `(${unreadMsgCount})`}
                      </button>

                      <button
                        type="button"
                        onClick={() => setInboxFilter('all')}
                        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          inboxFilter === 'all'
                            ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-2xs font-bold'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        All ({inboxMessages.filter((m) => !m.archived).length})
                      </button>

                      <button
                        type="button"
                        onClick={() => setInboxFilter('archived')}
                        className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          inboxFilter === 'archived'
                            ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-2xs font-bold'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        Archived {archivedMsgCount > 0 && `(${archivedMsgCount})`}
                      </button>
                    </div>

                    {/* Actions: Refresh & Lock */}
                    <div className="flex items-center space-x-2 text-xs">
                      <button
                        type="button"
                        onClick={() => fetchMessages()}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold flex items-center space-x-1 cursor-pointer"
                        title="Refresh Messages"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${loadingInbox ? 'animate-spin' : ''}`} />
                      </button>

                      <button
                        type="button"
                        onClick={handleLockInbox}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 font-semibold flex items-center space-x-1 border border-slate-200 dark:border-slate-700 cursor-pointer"
                        title="Lock Inbox"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Lock</span>
                      </button>
                    </div>
                  </div>

                  {/* Messages List Area */}
                  {filteredMessages.length === 0 ? (
                    <div className="py-10 text-center space-y-2 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 p-6">
                      <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center mx-auto">
                        <Inbox className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                        {inboxFilter === 'unread'
                          ? 'No Unread Messages — You are all caught up!'
                          : inboxFilter === 'archived'
                          ? 'No Archived Messages'
                          : 'No Messages Found'}
                      </h4>
                      <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                        {inboxFilter === 'unread'
                          ? 'All new inquiries from your portfolio will show up here.'
                          : 'Processed messages can be archived or deleted to keep your inbox organized.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[48vh] overflow-y-auto pr-1">
                      {filteredMessages.map((msg) => {
                        const isUnread = !msg.read && !msg.archived;
                        return (
                          <div
                            key={msg.id}
                            className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                              isUnread
                                ? 'bg-indigo-50/60 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800/60 shadow-xs'
                                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60 opacity-90'
                            }`}
                          >
                            {/* Sender Info & Status Badge */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${
                                    isUnread ? 'bg-indigo-600' : 'bg-slate-500'
                                  }`}
                                >
                                  {msg.name.substring(0, 2).toUpperCase()}
                                </div>
                                <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                                  {msg.name}
                                </span>
                                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono hidden xs:inline">
                                  ({msg.email})
                                </span>
                              </div>

                              <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
                                {isUnread && (
                                  <span className="px-1.5 py-0.5 rounded-full bg-indigo-600 text-white font-bold uppercase text-[9px]">
                                    New
                                  </span>
                                )}
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  <span>{msg.formattedDate}</span>
                                </div>
                              </div>
                            </div>

                            {/* Subject */}
                            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                              Subject: <span className="text-indigo-600 dark:text-indigo-400">{msg.subject}</span>
                            </div>

                            {/* Message Body */}
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700 whitespace-pre-wrap">
                              {msg.message}
                            </p>

                            {/* Card Actions: Read/Unread, Archive, Delete, Email Reply */}
                            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/60 dark:border-slate-700/50">
                              <div className="flex items-center space-x-1.5">
                                {/* Mark Read / Unread Button */}
                                <button
                                  type="button"
                                  onClick={() => handleToggleRead(msg.id, Boolean(msg.read))}
                                  className="px-2 py-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 text-[11px] font-semibold border border-slate-200 dark:border-slate-600 flex items-center space-x-1 cursor-pointer"
                                  title={msg.read ? 'Mark as unread' : 'Mark as read'}
                                >
                                  {msg.read ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3 text-indigo-500" />}
                                  <span>{msg.read ? 'Mark Unread' : 'Mark Read'}</span>
                                </button>

                                {/* Archive / Unarchive Button */}
                                <button
                                  type="button"
                                  onClick={() => handleToggleArchive(msg.id, Boolean(msg.archived))}
                                  className="px-2 py-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 text-[11px] font-semibold border border-slate-200 dark:border-slate-600 flex items-center space-x-1 cursor-pointer"
                                  title={msg.archived ? 'Move to active inbox' : 'Archive message'}
                                >
                                  {msg.archived ? (
                                    <>
                                      <ArchiveRestore className="w-3 h-3 text-indigo-500" />
                                      <span>Unarchive</span>
                                    </>
                                  ) : (
                                    <>
                                      <Archive className="w-3 h-3" />
                                      <span>Archive (Hide)</span>
                                    </>
                                  )}
                                </button>

                                {/* Delete Button */}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMessage(msg.id)}
                                  className="p-1 rounded-lg bg-white dark:bg-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-600 cursor-pointer"
                                  title="Delete Message Permanently"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>

                              {/* Direct Email Actions */}
                              <div className="flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={() => handleCopyMsgEmail(msg.id, msg.email)}
                                  className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-600 transition-colors cursor-pointer"
                                  title="Copy sender email address"
                                >
                                  {copiedEmailId === msg.id ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                                      <span>Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                                      <span>Copy Email</span>
                                    </>
                                  )}
                                </button>

                                <a
                                  href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                  <span>Reply via Email</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              )}

              {/* Bottom Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="text-[10px] text-slate-400 font-mono">
                  {isPinAuthorized ? '🔒 Admin session active' : '🔒 Protected by Admin PIN'}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
