import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, Lock, Globe } from 'lucide-react';

interface LegalModalsProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
  developerName?: string;
  email?: string;
  location?: string;
}

export const LegalModals: React.FC<LegalModalsProps> = ({
  type,
  onClose,
  developerName = 'Vinay Gupta',
  email = 'vinaygupta8166@gmail.com',
  location = 'Varanasi, India',
}) => {
  useEffect(() => {
    if (!type) return;

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
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 dark:bg-black/85 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-5 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 relative my-auto max-h-[90vh] flex flex-col text-slate-800 dark:text-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              {type === 'privacy' ? <ShieldCheck className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                Last updated: September 2026 • {developerName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto space-y-4 text-xs sm:text-sm leading-relaxed pr-1 text-slate-600 dark:text-slate-300">
          {type === 'privacy' ? (
            <>
              <section className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">1. Data Collection & Purpose</h4>
                <p>
                  This portfolio collects information voluntarily submitted through the contact form (name, email, subject, message) solely to respond to recruitment, contract, or technical inquiries. No information is sold, rented, or shared with unauthorized third parties.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">2. Local Storage & Preferences</h4>
                <p>
                  We utilize browser local storage to persist dark mode preferences, session state, and cookie consent choices. These files contain no personally identifiable data and can be cleared at any time via your browser settings.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">3. Third-Party Integrations</h4>
                <p>
                  Inquiries may be processed via secure webhook pipelines (such as Google Sheets integration) with standard encryption. The AI Career Assistant operates on Google Gemini API endpoints without retaining private user data for training.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">4. Contact & Data Rights</h4>
                <p>
                  To request the deletion of any inquiry you have previously submitted, please email <a href={`mailto:${email}`} className="text-indigo-600 dark:text-indigo-400 font-bold">{email}</a> directly.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">1. Intellectual Property</h4>
                <p>
                  All project code architectures, design assets, and content featured on this site are the intellectual property of {developerName} and respective project clients/employers. Source code repositories linked are subject to their respective open-source licenses.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">2. Live Demonstrations & Availability</h4>
                <p>
                  Production demos and external links are provided for evaluation and portfolio demonstration purposes. While high uptime is maintained, external sandbox environments may experience periodic maintenance.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">3. Professional Inquiries</h4>
                <p>
                  Communication submitted through this portal constitutes a professional inquiry. {developerName} reserves the right to decline unauthorized commercial solicitations or spam submissions.
                </p>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">4. Governing Jurisdiction</h4>
                <p>
                  These terms are governed in accordance with the laws of {location}.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            {developerName} • {location}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
