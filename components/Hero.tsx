
import React from 'react';
import { PORTFOLIO_DATA } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white dark:bg-slate-950">
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-violet-600/10 dark:bg-violet-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-4xl mx-auto px-6 text-center z-10">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
          👋 Available for new opportunities
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white">
          I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">digital experiences</span> that matter.
        </h1>
        
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
          I'm {PORTFOLIO_DATA.name}, a {PORTFOLIO_DATA.role} dedicated to crafting 
          exceptional user interfaces and scalable back-end systems.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#projects" 
            className="px-8 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all text-lg shadow-xl shadow-indigo-500/10"
          >
            View Projects
          </a>
          <a 
            href="#about" 
            className="px-8 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-transparent text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-all font-bold text-lg"
          >
            About Me
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40 text-slate-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
