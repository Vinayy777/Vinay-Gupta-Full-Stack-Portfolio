import React, { useState } from 'react';
import { TECH_STACK_CATEGORIES } from '../data/portfolioData';
import { 
  Layout, 
  Server, 
  Database, 
  Wrench, 
  Code2, 
  FileCode, 
  Globe, 
  Palette, 
  Layers, 
  CheckCircle, 
  Cpu, 
  Share2, 
  Shield, 
  Workflow, 
  Box, 
  Cloud, 
  Zap, 
  GitBranch, 
  GitCommit, 
  TestTube, 
  Terminal, 
  Sliders
} from 'lucide-react';
import { motion } from 'motion/react';

export const TechStackSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Icon map lookup helper
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Code2': return <Code2 className="w-4 h-4" />;
      case 'FileCode': return <FileCode className="w-4 h-4" />;
      case 'Globe': return <Globe className="w-4 h-4" />;
      case 'Palette': return <Palette className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Server': return <Server className="w-4 h-4" />;
      case 'Share2': return <Share2 className="w-4 h-4" />;
      case 'Shield': return <Shield className="w-4 h-4" />;
      case 'Workflow': return <Workflow className="w-4 h-4" />;
      case 'Database': return <Database className="w-4 h-4" />;
      case 'Box': return <Box className="w-4 h-4" />;
      case 'Cloud': return <Cloud className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'GitBranch': return <GitBranch className="w-4 h-4" />;
      case 'GitCommit': return <GitCommit className="w-4 h-4" />;
      case 'TestTube': return <TestTube className="w-4 h-4" />;
      case 'Terminal': return <Terminal className="w-4 h-4" />;
      case 'Sliders': return <Sliders className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const categories = ['All', 'Frontend', 'Backend', 'Database & DevOps', 'Tools & Architecture'];

  const filteredCategories = selectedCategory === 'All'
    ? TECH_STACK_CATEGORIES
    : TECH_STACK_CATEGORIES.filter((c) => c.category === selectedCategory);

  return (
    <section id="techstack" className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4"
        >
          <div className="space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 sm:px-3 py-1 rounded-md border border-indigo-100 dark:border-indigo-800/50">
              <Server className="w-3.5 h-3.5" />
              <span>Section 03 — Technical Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Tech Stack & Skill Breakdown
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Categorized technologies across frontend engineering, C# .NET healthcare modules, database systems, and server deployment.
            </p>
          </div>

          {/* Category Filter Pills (Scrollable on small mobile) */}
          <div className="flex overflow-x-auto no-scrollbar gap-1.5 bg-white dark:bg-slate-800 p-1 sm:p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Cards Grid */}
        <div className="space-y-6 sm:space-y-8">
          {filteredCategories.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
              className="bg-white dark:bg-slate-900/80 rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4 sm:space-y-6"
            >
              {/* Category Title Header */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
                <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
                    {group.category === 'Frontend' && <Layout className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {group.category === 'Backend' && <Server className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {group.category === 'Database & DevOps' && <Database className="w-4 h-4 sm:w-5 sm:h-5" />}
                    {group.category === 'Tools & Architecture' && <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white truncate">{group.category}</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium truncate">{group.summary}</p>
                  </div>
                </div>

                <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 sm:px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 shrink-0">
                  {group.skills.length} Skills
                </span>
              </div>

              {/* Skill Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {group.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: skillIdx * 0.04 }}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                      skill.highlight
                        ? 'bg-indigo-50/40 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800/50 hover:border-indigo-400 dark:hover:border-indigo-600/60'
                        : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2 gap-2">
                      <div className="flex items-center space-x-2 min-w-0">
                        <div className={`p-1.5 rounded-lg shrink-0 ${skill.highlight ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                          {renderIcon(skill.iconName)}
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate">{skill.name}</span>
                      </div>

                      <div className="flex items-center space-x-1 shrink-0">
                        <span className="text-[9px] sm:text-[10px] font-mono font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950/50 px-1.5 sm:px-2 py-0.5 rounded">
                          {skill.level}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-200/70 dark:bg-slate-700 px-1.5 py-0.5 rounded">
                          {skill.years}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {skill.description}
                    </p>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
