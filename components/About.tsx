
import React from 'react';
import { PORTFOLIO_DATA, SKILLS } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-950 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 dark:from-indigo-500/20 dark:to-violet-500/20 blur-2xl rounded-[2rem]"></div>
            <img 
              src="https://picsum.photos/seed/alex/600/700" 
              alt="Profile" 
              className="relative rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-2xl transition-all duration-700"
            />
            <div className="absolute bottom-8 right-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-slate-700 max-w-[200px] shadow-xl">
              <p className="text-3xl font-bold text-indigo-600 dark:text-white mb-1">8+</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Years of Professional Experience</p>
            </div>
          </div>

          <div>
            <h2 className="text-indigo-600 dark:text-indigo-400 font-mono text-sm mb-4">The Person Behind</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8">Passionate about solving complex problems.</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              {PORTFOLIO_DATA.bio}
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Based in {PORTFOLIO_DATA.location}, I've worked with startups and scale-ups 
              across the globe to build robust architectures that stand the test of time. 
              My approach focuses on clean code, performance, and accessibility.
            </p>

            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-indigo-500"></span>
                My Toolkit
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {SKILLS.map(skill => (
                  <div key={skill.name} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500/30 transition-colors">
                    <span className="text-xl">{skill.icon}</span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
