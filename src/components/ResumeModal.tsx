import React, { useEffect, useState } from 'react';
import { DeveloperProfile } from '../types';
import { WORK_EXPERIENCES, FEATURED_PROJECTS, RESUME_SKILLS } from '../data/portfolioData';
import { 
  X, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Award, 
  Briefcase, 
  Code2, 
  Layers, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  ArrowUp, 
  GraduationCap,
  Download
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: DeveloperProfile;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Handle Escape key & lock background scroll
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

  if (!isOpen) return null;

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `${profile.name.replace(/\s+/g, '_')}_Resume`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

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

  const scrollToModalTop = () => {
    const modalContainer = document.getElementById('resume-modal-container');
    if (modalContainer) {
      modalContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      id="resume-modal-container"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 dark:bg-black/85 backdrop-blur-sm p-1.5 sm:p-4 md:p-6 lg:p-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Centering wrapper that allows safe top-to-bottom scrolling without cropping */}
      <div className="min-h-full flex items-start justify-center py-1 sm:py-4">
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl max-w-4xl w-full p-3.5 sm:p-6 md:p-10 shadow-2xl border border-slate-200 dark:border-slate-700 relative text-slate-800 dark:text-slate-200 transition-all">
          
          {/* Action Sticky Header (Hidden during print) */}
          <div className="sticky -top-3.5 sm:-top-6 md:-top-10 z-30 -mx-3.5 sm:-mx-6 md:-mx-10 px-3.5 sm:px-6 md:px-10 py-2.5 sm:py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/80 rounded-t-2xl sm:rounded-t-3xl flex items-center justify-between gap-2 mb-4 sm:mb-6 print:hidden shadow-xs">
            <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2 sm:px-3 py-1 rounded-lg border border-indigo-200/80 dark:border-indigo-800/60 shrink-0">
                Curriculum Vitae
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium hidden xs:inline truncate">
                Print / PDF Ready
              </span>
            </div>

            <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
              <button
                onClick={handlePrint}
                className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] sm:text-xs font-bold shadow-xs transition-colors cursor-pointer touch-manipulation min-h-[36px]"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print / Save PDF</span>
                <span className="sm:hidden">Print</span>
              </button>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer touch-manipulation min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Resume Sheet Document Body */}
          <div className="space-y-5 sm:space-y-8 font-sans text-xs sm:text-sm">
            
            {/* Header Identity */}
            <div className="border-b border-slate-200 dark:border-slate-700/80 pb-4 sm:pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
              <div className="space-y-1">
                <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                  {profile.name}
                </h1>
                <p className="text-xs sm:text-base font-bold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">
                  {profile.role}
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed font-normal">
                  {profile.tagline}
                </p>
              </div>

              {/* Contact and Links */}
              <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-slate-600 dark:text-slate-300">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-300 transition-colors group cursor-pointer"
                  title="Click to copy email"
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="truncate">{profile.email}</span>
                  {copiedEmail ? (
                    <Check className="w-3 h-3 text-emerald-500 ml-1 shrink-0" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity ml-1 shrink-0" />
                  )}
                </button>

                {profile.phone && (
                  <button
                    onClick={handleCopyPhone}
                    className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-300 transition-colors group cursor-pointer"
                    title="Click to copy phone"
                  >
                    <Phone className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span>{profile.phone}</span>
                    {copiedPhone ? (
                      <Check className="w-3 h-3 text-emerald-500 ml-1 shrink-0" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity ml-1 shrink-0" />
                    )}
                  </button>
                )}

                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>{profile.location}</span>
                </div>

                <div className="flex items-center space-x-2 pt-0.5 print:hidden">
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-[11px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <span>•</span>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-[11px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Profile / Executive Summary */}
            <div className="space-y-1.5 sm:space-y-2">
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center space-x-2 pb-1 border-b border-slate-200 dark:border-slate-800">
                <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Profile</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                {profile.aboutParagraph1}
              </p>
            </div>

            {/* Professional Experience */}
            <div className="space-y-3 sm:space-y-5">
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center space-x-2 pb-1 border-b border-slate-200 dark:border-slate-800">
                <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Professional Experience</span>
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {WORK_EXPERIENCES.map((exp) => (
                  <div 
                    key={exp.id} 
                    className="p-3.5 sm:p-5 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h3 className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-base">
                          {exp.role} <span className="text-slate-400 dark:text-slate-500 font-normal">|</span> <span className="text-indigo-600 dark:text-indigo-400 font-bold">{exp.company}</span>
                        </h3>
                        <div className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {exp.type}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-1 sm:space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {exp.quantifiableResults.map((res, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{res}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Stack tags */}
                    <div className="pt-1.5 sm:pt-2 flex flex-wrap items-center gap-1">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase text-slate-400 mr-1">Stack:</span>
                      {exp.technologies.map((t) => (
                        <span 
                          key={t}
                          className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-mono text-[9px] sm:text-[10px] border border-slate-200 dark:border-slate-600"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center space-x-2 pb-1 border-b border-slate-200 dark:border-slate-800">
                <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Projects</span>
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {/* Project 1 */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                        Golden Sports Arena — Turf Booking & Management System
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        Live Site ↗
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                      Freelance | Live
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono text-indigo-600 dark:text-indigo-400 font-medium">
                    React, Redux Toolkit, C#, ASP.NET Core, ADO.NET, SQL Server, IIS Hosting
                  </div>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        Built and deployed a live, production turf-booking and admin management platform for a real sports-arena business — frontend in React with Redux Toolkit, backend in ASP.NET Core with ADO.NET against SQL Server, deployed and hosted independently on IIS as a freelance engagement.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Project 2 */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                      Myntra Clone
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                      Jan 2025
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono text-indigo-600 dark:text-indigo-400 font-medium">
                    React, Node.js, Redux, React Router, HTML, CSS, JavaScript
                  </div>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        Built a full-featured e-commerce clone replicating product listings, filtering, and user authentication.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Project 3 */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                      Employee Management System
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                      Jan 2025
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono text-indigo-600 dark:text-indigo-400 font-medium">
                    HTML, CSS, PHP
                  </div>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        Built a PHP-based platform enabling admins and employees to manage tasks with role-based access, status/priority filtering, and deadline tracking.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Core Technical Skills */}
            <div className="space-y-2.5 sm:space-y-3">
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center space-x-2 pb-1 border-b border-slate-200 dark:border-slate-800">
                <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Technical Skills</span>
              </h2>
              
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden divide-y divide-slate-200 dark:divide-slate-700">
                {RESUME_SKILLS.map((item) => (
                  <div 
                    key={item.category}
                    className="p-2.5 sm:p-3 bg-slate-50/70 dark:bg-slate-800/60 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 text-xs"
                  >
                    <div className="w-32 sm:w-36 font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono text-[11px] shrink-0">
                      {item.category}
                    </div>
                    <div className="font-mono text-slate-700 dark:text-slate-300">
                      {item.skills}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="space-y-2.5 sm:space-y-3">
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center space-x-2 pb-1 border-b border-slate-200 dark:border-slate-800">
                <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Education & Certification</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                      Bachelor of Computer Applications (BCA)
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-1.5 sm:px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800 shrink-0">
                      CGPA: 7.2
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono">
                    2021 – 2024
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate">
                      12th — St. Joseph's School, Varanasi
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-1.5 sm:px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800 shrink-0">
                      CGPA: 7.2
                    </span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono">
                    2019 – 2020
                  </div>
                </div>
              </div>

              {/* Certification */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2 min-w-0">
                  <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="text-[11px] sm:text-xs font-bold text-indigo-950 dark:text-indigo-200 truncate">
                    Certification: English Speaking Course
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                  Verified
                </span>
              </div>
            </div>

          </div>

          {/* Modal Bottom Actions & Footer (Hidden during print) */}
          <div className="pt-4 sm:pt-6 mt-6 sm:mt-8 border-t border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 print:hidden">
            <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-mono text-center sm:text-left">
              Generated from {profile.name}'s Verified Portfolio.
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto justify-center">
              <button
                onClick={scrollToModalTop}
                className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer touch-manipulation min-h-[40px]"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Top</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer touch-manipulation min-h-[40px]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download / Print PDF</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white text-xs font-bold transition-colors cursor-pointer touch-manipulation min-h-[40px]"
              >
                Close
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
