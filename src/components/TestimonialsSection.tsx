import React from 'react';
import { TESTIMONIALS } from '../data/portfolioData';
import { Quote, Star, MessageSquareQuote } from 'lucide-react';
import { motion } from 'motion/react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
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
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Section 06 — Professional Endorsements</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What Leaders & Clients Say
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Testimonials from technical leads, freelance clients, and mentors who have worked alongside me.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {TESTIMONIALS.map((testimonial, index) => {
            const initials = testimonial.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase();

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-600/60 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4">
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-100 dark:text-indigo-900/50 group-hover:text-indigo-200 dark:group-hover:text-indigo-800/50 transition-colors" />
                </div>

                <div>
                  {/* Stars */}
                  <div className="flex items-center space-x-0.5 mb-3 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-3 pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-700/60">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center font-bold text-xs shadow-md shrink-0">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate">
                      {testimonial.name}
                    </div>
                    <div className="text-[11px] sm:text-xs text-indigo-600 dark:text-indigo-400 font-semibold truncate">
                      {testimonial.role} — {testimonial.company}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-500 font-mono truncate">
                      {testimonial.relationship}
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
