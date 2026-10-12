import React from 'react';
import { DeveloperProfile } from '../types';
import { CheckCircle2, ShieldCheck, Cpu, GitPullRequest, Code2, Sparkles, Terminal, GraduationCap, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutMeSectionProps {
  profile: DeveloperProfile;
}

export const AboutMeSection: React.FC<AboutMeSectionProps> = ({ profile }) => {
  const pillars = [
    {
      title: 'Distributed Microservices & Event-Driven Systems',
      desc: 'Architecting scalable microservices platforms with Orchestrated Sagas, polyglot persistence (MySQL & MongoDB), and real-time WebSockets.',
      icon: Cpu,
    },
    {
      title: 'Enterprise Healthcare Systems (HIS/LIS/EMR)',
      desc: 'Developing and customizing mission-critical healthcare modules using C#, .NET, and MS SQL Server with strict data integrity.',
      icon: ShieldCheck,
    },
    {
      title: 'Full-Stack Delivery & Live Deployments',
      desc: 'Building responsive React/TypeScript frontends, containerized Docker environments, and production backends hosted on cloud and IIS.',
      icon: GitPullRequest,
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4"
        >
          <div className="space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 sm:px-3 py-1 rounded-md border border-indigo-100 dark:border-indigo-800/50">
              <Code2 className="w-3.5 h-3.5" />
              <span>Section 02 — Engineering Identity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              About Me & Professional Background
            </h2>
          </div>

          <div className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 self-start md:self-auto">
            Target Audience: {profile.targetAudience}
          </div>
        </motion.div>

        {/* 2-Paragraph Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
          
          {/* Left Column: 2 Concise Paragraphs (Col 7) */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-base">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs space-y-4"
            >
              <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-400 font-bold text-sm">
                <Terminal className="w-4 h-4" />
                <span>Hands-on Engineering & Domain Focus</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 text-justify">
                {profile.aboutParagraph1}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs space-y-4"
            >
              <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Production Delivery & Real-World Operations</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 text-justify">
                {profile.aboutParagraph2}
              </p>
            </motion.div>

            {/* Education & Academic Card */}
            {profile.education && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-slate-50 dark:from-slate-800/70 dark:to-slate-900 border border-indigo-200/60 dark:border-slate-700/80 shadow-2xs space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-indigo-100 dark:border-slate-700">
                  <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                    <GraduationCap className="w-4 h-4" />
                    <span>Education & Qualifications</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 px-2.5 py-0.5 rounded border border-indigo-200 dark:border-slate-700">
                    BCA Graduate
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {profile.education.map((edu, idx) => (
                    <div key={idx} className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 space-y-1">
                      <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                        {edu.degree}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {edu.institution}
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold">{edu.period}</span>
                        {edu.grade && (
                          <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                            {edu.grade}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {profile.certifications && profile.certifications.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center space-x-1">
                      <Award className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Certifications:</span>
                    </span>
                    {profile.certifications.map((cert, cIdx) => (
                      <span key={cIdx} className="px-2.5 py-1 rounded-lg bg-indigo-100/70 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-200 font-semibold text-xs border border-indigo-200 dark:border-indigo-800/60">
                        {cert}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

          </div>

          {/* Right Column: Core Engineering Pillars (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 pb-1 border-b border-slate-200 dark:border-slate-700">
              Core Engineering Capabilities
            </h3>

            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: idx * 0.12 }}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-2xs hover:border-indigo-300 dark:hover:border-indigo-600/60 hover:shadow-md transition-all space-y-2 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-12">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
};
