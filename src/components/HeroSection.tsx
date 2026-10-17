import React, { useEffect, useRef, useState } from 'react';
import { DeveloperProfile } from '../types';
import { 
  ArrowRight, 
  Mail, 
  FileText, 
  Sparkles, 
  Zap, 
  MapPin, 
  Code2
} from 'lucide-react';
import { motion } from 'motion/react';

// ========== Animated Counter Hook ==========
function useCountUp(target: string, isVisible: boolean) {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!isVisible) return;

    // Parse the numeric part from strings like "100%", "7.2", "5+", "HIS / LIS"
    const match = target.match(/([-]?)(\d+\.?\d*)/);
    if (!match) {
      setDisplay(target);
      return;
    }

    const sign = match[1];
    const numericStr = match[2];
    const numericValue = parseFloat(numericStr);
    const prefix = target.substring(0, target.indexOf(match[0]));
    const suffix = target.substring(target.indexOf(match[0]) + match[0].length);
    const hasDecimal = numericStr.includes('.');
    const decimalPlaces = hasDecimal ? numericStr.split('.')[1].length : 0;

    let startTime: number | null = null;
    const duration = 1800; // ms

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = numericValue * eased;
      
      const formatted = hasDecimal 
        ? currentValue.toFixed(decimalPlaces)
        : Math.round(currentValue).toString();
      
      setDisplay(`${prefix}${sign}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target]);

  return display;
}

// ========== Stat Card with Counter ==========
const StatCard: React.FC<{ stat: { id: string; label: string; value: string; subtext: string }; index: number }> = ({ stat, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const displayValue = useCountUp(stat.value, isVisible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white dark:bg-slate-800/80 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-600/60 hover:shadow-md transition-all space-y-1 sm:space-y-1.5 group flex flex-col justify-between"
    >
      <div className="flex items-center justify-between gap-1">
        <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 truncate">
          {stat.label}
        </span>
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
      </div>

      <div className="text-lg sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight tabular-nums truncate">
        {displayValue}
      </div>

      <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
        {stat.subtext}
      </p>
    </motion.div>
  );
};

// ========== Main Hero Section ==========
interface HeroSectionProps {
  profile: DeveloperProfile;
  onOpenAssistant: () => void;
  onOpenResume: () => void;
  onExploreProjects: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onOpenAssistant,
  onOpenResume,
  onExploreProjects,
  onContactClick,
}) => {
  return (
    <section id="overview" className="relative pt-6 sm:pt-12 md:pt-16 pb-12 sm:pb-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
      
      {/* Background Accent Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Availability & Location Badges */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center space-x-2 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-[11px] sm:text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block shrink-0" />
            <span className="truncate">{profile.availability}</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 text-[11px] sm:text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>{profile.location}</span>
          </div>
        </motion.div>

        {/* Hero Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Main Hero Copy (Col 7) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-4 sm:space-y-6"
          >
            
            {/* Developer Title Tag & Headline */}
            <div className="space-y-1.5 sm:space-y-2">
              <span className="inline-block text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-md border border-indigo-100 dark:border-indigo-800/50">
                {profile.role}
              </span>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] pt-1">
                {profile.headline}
              </h1>
            </div>

            {/* Value Proposition */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl font-normal text-justify sm:text-left">
              {profile.valueProposition}
            </p>

            {/* Primary Tech Stack Badge Row */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Primary Core Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {profile.primaryTechStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-slate-900 dark:bg-slate-700 text-white text-[11px] sm:text-xs font-mono font-medium shadow-2xs hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 sm:pt-3">
              <button
                onClick={onExploreProjects}
                className="flex items-center justify-center space-x-2 px-5 sm:px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-indigo-200 dark:hover:shadow-indigo-900/40 transition-all cursor-pointer min-h-[44px]"
              >
                <span>{profile.ctaTextPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onContactClick}
                className="flex items-center justify-center space-x-2 px-5 sm:px-6 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer min-h-[44px]"
              >
                <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>{profile.ctaTextSecondary}</span>
              </button>

              <button
                onClick={onOpenResume}
                className="flex items-center justify-center space-x-1.5 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer min-h-[44px]"
              >
                <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                <span>Download CV</span>
              </button>
            </div>

          </motion.div>

          {/* Right Column: Code Architecture Preview Card (Col 5) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="bg-slate-900 dark:bg-slate-800/90 text-slate-100 rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-800 dark:border-slate-700 space-y-3 sm:space-y-4 relative">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-slate-800 dark:border-slate-700">
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500" />
                  <span className="text-[11px] sm:text-xs font-mono text-slate-400 pl-1.5 sm:pl-2">architecture.config.ts</span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono bg-indigo-900/80 text-indigo-300 px-2 py-0.5 rounded">
                  Full-Stack Schema
                </span>
              </div>

              {/* Code Snippet Box */}
              <pre className="font-mono text-[11px] sm:text-xs leading-relaxed text-slate-300 overflow-x-auto p-2.5 sm:p-3.5 bg-slate-950/80 dark:bg-slate-950/60 rounded-xl border border-slate-800/80 dark:border-slate-700/60 max-h-56 sm:max-h-none">
                <code>
<span className="text-indigo-400">export const</span> <span className="text-amber-300">stackArchitecture</span> = &#123;{'\n'}
{'  '}<span className="text-slate-400">// Client Layer</span>{'\n'}
{'  '}frontend: [<span className="text-emerald-300">'Next.js 16'</span>, <span className="text-emerald-300">'React 19'</span>, <span className="text-emerald-300">'TypeScript'</span>, <span className="text-emerald-300">'Tailwind CSS'</span>],{'\n'}
{'  '}<span className="text-slate-400">// Real-Time & Backend Engines</span>{'\n'}
{'  '}backend: [<span className="text-emerald-300">'.NET 9 Web API'</span>, <span className="text-emerald-300">'SignalR WebSockets'</span>, <span className="text-emerald-300">'Node.js & Express'</span>],{'\n'}
{'  '}<span className="text-slate-400">// Polyglot Persistence</span>{'\n'}
{'  '}database: [<span className="text-emerald-300">'MS SQL Server (T-SQL)'</span>, <span className="text-emerald-300">'MySQL 8.0'</span>, <span className="text-emerald-300">'MongoDB'</span>],{'\n'}
{'  '}<span className="text-slate-400">// Architecture & DevOps</span>{'\n'}
{'  '}devops: [<span className="text-emerald-300">'Docker'</span>, <span className="text-emerald-300">'Distributed Saga Pattern'</span>, <span className="text-emerald-300">'IIS & PowerShell'</span>],{'\n'}
{'  '}systems: &#123;{'\n'}
{'    '}realtimeScoring: <span className="text-amber-300">'CricPulse (&lt;50ms Live Turf)'</span>,{'\n'}
{'    '}microservices: <span className="text-indigo-300">'CourierX (6 Services &amp; Saga)'</span>,{'\n'}
{'    '}healthcare: <span className="text-rose-300">'HIS / LIS / EMR Modules'</span>,{'\n'}
{'    '}liveProduction: <span className="text-emerald-300">'Golden Sports Arena'</span>{'\n'}
{'  '}&#125;{'\n'}
&#125;;
                </code>
              </pre>

              {/* Quick AI Trigger Banner inside Hero */}
              <div className="p-2.5 sm:p-3 bg-indigo-950/60 rounded-xl border border-indigo-800/60 flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2 min-w-0">
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                  <p className="text-[11px] sm:text-xs text-indigo-200 truncate">Have questions about Vinay's background?</p>
                </div>
                <button
                  onClick={onOpenAssistant}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] sm:text-[11px] font-bold shrink-0 transition-colors cursor-pointer"
                >
                  Ask AI
                </button>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Quantifiable Metrics 4-Box Strip */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          {profile.stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};
