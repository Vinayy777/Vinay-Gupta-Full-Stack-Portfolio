import React from 'react';
import { WORK_EXPERIENCES } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
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
            <Briefcase className="w-3.5 h-3.5" />
            <span>Section 05 — Professional Track Record</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Work Experience & Domain Delivery
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Hands-on software development across healthcare systems (HIS/LIS/EMR), data analytics, and process workflows.
          </p>
        </motion.div>

        {/* Experience Timeline Loop */}
        <div className="space-y-6 sm:space-y-8 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-6 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {WORK_EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-7 sm:pl-14 group"
            >
              
              {/* Timeline Dot */}
              <div className="absolute left-3.5 sm:left-6 top-1.5 -translate-x-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white dark:bg-slate-950 border-4 border-indigo-600 group-hover:scale-125 transition-transform" />

              {/* Main Card */}
              <div className="bg-white dark:bg-slate-900/80 rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-indigo-300 dark:hover:border-indigo-600/50 transition-all space-y-3 sm:space-y-4">
                
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 pb-2.5 sm:pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="text-xs sm:text-sm font-bold text-indigo-700 dark:text-indigo-400">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-slate-200 dark:border-slate-700">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-slate-200 dark:border-slate-700">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Role Summary */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {exp.summary}
                </p>

                {/* Quantifiable Bullet Points */}
                <div className="space-y-2 pt-1 sm:pt-2">
                  <h4 className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Key Responsibilities & Deliverables</span>
                  </h4>

                  <ul className="space-y-2">
                    {exp.quantifiableResults.map((result, rIdx) => (
                      <li key={rIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Badge Row */}
                <div className="pt-2.5 sm:pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1">
                    Stack:
                  </span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px] sm:text-[11px] font-semibold border border-slate-200/60 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
