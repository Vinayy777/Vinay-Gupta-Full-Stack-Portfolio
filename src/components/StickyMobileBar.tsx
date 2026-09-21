import React, { useState, useEffect } from 'react';
import { Bot, FileText, Send, Phone, MessageCircle } from 'lucide-react';

interface StickyMobileBarProps {
  onOpenAssistant: () => void;
  onOpenResume: () => void;
  onContactClick: () => void;
  phone?: string;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  onOpenAssistant,
  onOpenResume,
  onContactClick,
  phone = '+919506442218'
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only when scrolled past the top hero section
      if (window.scrollY > 380) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hi Vinay, I reviewed your developer portfolio and would like to connect.")}`;

  return (
    <aside aria-label="Quick Mobile Actions" className="fixed bottom-0 inset-x-0 z-40 md:hidden p-2.5 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-800 shadow-2xl transition-all duration-300 print:hidden">
      <div className="flex items-center justify-between gap-1.5 max-w-md mx-auto">
        
        {/* 1. Ask AI Assistant */}
        <button
          onClick={onOpenAssistant}
          className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-2 rounded-xl bg-indigo-600 active:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer touch-manipulation min-h-[44px]"
        >
          <Bot className="w-4 h-4" />
          <span>Ask AI</span>
        </button>

        {/* 2. Direct WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-2 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer touch-manipulation min-h-[44px]"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        {/* 3. Resume Modal */}
        <button
          onClick={onOpenResume}
          className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-2 rounded-xl bg-slate-800 active:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors cursor-pointer touch-manipulation min-h-[44px]"
        >
          <FileText className="w-4 h-4 text-indigo-400" />
          <span>Resume</span>
        </button>

        {/* 4. Quick Inquire */}
        <button
          onClick={onContactClick}
          className="flex items-center justify-center p-2.5 rounded-xl bg-slate-800 active:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer touch-manipulation min-h-[44px] min-w-[44px]"
          title="Jump to Contact Form"
        >
          <Send className="w-4 h-4 text-indigo-400" />
        </button>

      </div>
    </aside>
  );
};
