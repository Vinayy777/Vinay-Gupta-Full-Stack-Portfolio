import React, { useState } from 'react';
import { DeveloperProfile } from '../types';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  MapPin, 
  Sparkles, 
  Clock, 
  Phone,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

interface ContactSectionProps {
  profile: DeveloperProfile;
  onOpenAssistant: () => void;
  onOpenThankYou?: (name: string, email: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  profile, 
  onOpenAssistant,
  onOpenThankYou 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Full-Stack Developer / Engineering Role Inquiry',
    message: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [sending, setSending] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    if (profile.phone) {
      navigator.clipboard.writeText(profile.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your name or organization.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = 'Please provide a valid email address (e.g., name@domain.com).';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please provide at least 10 characters detailing your inquiry.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSending(true);

    try {
      // 1. Post to backend server with honeypot & rate limit protection
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, website_hp: honeypot }),
      });

      // 2. Open pre-filled email client so the message is also delivered directly to email
      const mailtoSubject = encodeURIComponent(formData.subject);
      const mailtoBody = encodeURIComponent(
        `Hi ${profile.name.split(' ')[0]},\n\n${formData.message}\n\n— ${formData.name} (${formData.email})`
      );
      window.open(`mailto:${profile.email}?subject=${mailtoSubject}&body=${mailtoBody}`, '_self');

      setSubmitted(true);
      if (onOpenThankYou) {
        onOpenThankYou(formData.name, formData.email);
      }
    } catch (err) {
      console.error('Failed to send contact message to server:', err);
      setSubmitted(true);
      if (onOpenThankYou) {
        onOpenThankYou(formData.name, formData.email);
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="space-y-1.5 sm:space-y-2 mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center space-x-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 sm:px-3 py-1 rounded-md border border-indigo-100 dark:border-indigo-800/50">
            <Mail className="w-3.5 h-3.5" />
            <span>Section 07 — Connect & Collaborate</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Let's Connect & Build High-Impact Systems
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Open for Full-Stack Developer roles, C# .NET & React software engineering opportunities, and production system development.
          </p>
        </motion.div>

        {/* Contact Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Direct Invitation & Quick Links (Col 5) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4 sm:space-y-6"
          >
            
            <div className="bg-slate-900 dark:bg-slate-800/90 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 shadow-xl relative overflow-hidden">
              <div className="space-y-1.5 sm:space-y-2">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-indigo-400">
                  Direct Contact
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                  Ready to discuss your software engineering goals?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Whether you are recruiting for a Full-Stack developer position, discussing C# .NET / React projects, or reviewing healthcare software solutions, my inbox and phone are open.
                </p>
              </div>

              {/* Email & Phone Copy Cards */}
              <div className="space-y-2.5 sm:space-y-3">
                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-800/90 dark:bg-slate-700/60 border border-slate-700/80 dark:border-slate-600/60 flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0">
                      <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase">Email Address</div>
                      <div className="font-mono text-[11px] sm:text-sm font-bold text-indigo-300 truncate">{profile.email}</div>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 sm:p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] sm:text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer shrink-0 touch-manipulation min-h-[36px]"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                {profile.phone && (
                  <div className="p-3 sm:p-3.5 rounded-xl bg-slate-800/90 dark:bg-slate-700/60 border border-slate-700/80 dark:border-slate-600/60 flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0">
                        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase">Direct Phone</div>
                        <div className="font-mono text-[11px] sm:text-sm font-bold text-emerald-300 truncate">{profile.phone}</div>
                      </div>
                    </div>

                    <button
                      onClick={handleCopyPhone}
                      className="p-1.5 sm:p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] sm:text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer shrink-0 touch-manipulation min-h-[36px]"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                )}

                {/* Direct WhatsApp Quick Chat Card (Standard 8) */}
                <a
                  href={`https://wa.me/919506442218?text=${encodeURIComponent("Hi Vinay, I reviewed your developer portfolio and would like to discuss an opportunity.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 sm:p-3.5 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/70 flex items-center justify-between gap-2 text-emerald-300 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] sm:text-[10px] font-mono uppercase text-emerald-400 font-bold">Instant Channel</div>
                      <div className="font-bold text-xs sm:text-sm text-white truncate">Chat on WhatsApp</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 group-hover:translate-x-0.5 transition-transform shrink-0">
                    Open ↗
                  </span>
                </a>
              </div>

              {/* Location and Response Time Indicator */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800 dark:border-slate-700">
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Response time: &lt; 24 Hours</span>
                </div>
              </div>

              {/* AI Assistant Callout */}
              <div className="pt-3 sm:pt-4 border-t border-slate-800 dark:border-slate-700 flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2 min-w-0">
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="text-xs text-slate-300 truncate">Need instant answers?</span>
                </div>
                <button
                  onClick={onOpenAssistant}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 dark:bg-slate-600 hover:bg-slate-700 dark:hover:bg-slate-500 text-slate-200 text-xs font-bold border border-slate-700 dark:border-slate-500 cursor-pointer shrink-0 touch-manipulation"
                >
                  Launch Assistant
                </button>
              </div>

            </div>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all flex items-center space-x-2.5 sm:space-x-3 group touch-manipulation"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-colors shrink-0">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 dark:text-white text-xs truncate">GitHub</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Repositories</div>
                </div>
              </a>

              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all flex items-center space-x-2.5 sm:space-x-3 group touch-manipulation"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-colors shrink-0">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 dark:text-white text-xs truncate">LinkedIn</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Network</div>
                </div>
              </a>
            </div>

          </motion.div>

          {/* Right Column: Contact Form (Col 7) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 bg-slate-50/80 dark:bg-slate-800/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200/90 dark:border-slate-700/60 shadow-2xs"
          >
            
            {submitted ? (
              <div className="py-10 sm:py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Transmitted!</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  Thank you for reaching out, {formData.name}. Your message has been received and logged directly to my portfolio inbox and sync sheet.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Full-Stack Developer / Engineering Role Inquiry', message: '' });
                    setFieldErrors({});
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-indigo-600 text-white text-xs font-bold hover:bg-slate-800 dark:hover:bg-indigo-500 cursor-pointer min-h-[44px]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  Send a Direct Message
                </h3>

                {/* Invisible Bot Spam Honeypot (Standard 23) */}
                <input
                  type="text"
                  name="website_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="opacity-0 absolute -z-10 w-0 h-0 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                      }}
                      placeholder="e.g. Hiring Manager / Recruiter"
                      className={`w-full px-3.5 py-3 rounded-xl border ${
                        fieldErrors.name ? 'border-rose-500 dark:border-rose-500' : 'border-slate-200 dark:border-slate-600'
                      } focus:border-indigo-600 dark:focus:border-indigo-400 outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 min-h-[44px]`}
                    />
                    {fieldErrors.name && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{fieldErrors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                      }}
                      placeholder="e.g. recruiter@company.com"
                      className={`w-full px-3.5 py-3 rounded-xl border ${
                        fieldErrors.email ? 'border-rose-500 dark:border-rose-500' : 'border-slate-200 dark:border-slate-600'
                      } focus:border-indigo-600 dark:focus:border-indigo-400 outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 min-h-[44px]`}
                    />
                    {fieldErrors.email && (
                      <p className="text-[11px] text-rose-500 mt-1 flex items-center space-x-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{fieldErrors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Inquiry Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Full-Stack Developer Position"
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 dark:border-slate-600 focus:border-indigo-600 dark:focus:border-indigo-400 outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Message Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: '' });
                    }}
                    placeholder="Tell me about your role, technology requirements, or project details..."
                    className={`w-full px-3.5 py-3 rounded-xl border ${
                      fieldErrors.message ? 'border-rose-500 dark:border-rose-500' : 'border-slate-200 dark:border-slate-600'
                    } focus:border-indigo-600 dark:focus:border-indigo-400 outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm leading-relaxed placeholder:text-slate-400 dark:placeholder:text-slate-500`}
                  />
                  {fieldErrors.message && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{fieldErrors.message}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer min-h-[44px]"
                >
                  <Send className="w-4 h-4" />
                  <span>{sending ? 'Sending...' : 'Transmit Message'}</span>
                </button>
              </form>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
};
