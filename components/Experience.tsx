
import React from 'react';
import { EXPERIENCES } from '../constants';

const skillIconMap: Record<string, string> = {
  'React': '⚛️',
  'TypeScript': '📘',
  'AWS': '☁️',
  'Kubernetes': '☸️',
  'Vue.js': '🟩',
  'Node.js': '🟢',
  'MongoDB': '🍃',
  'Docker': '🐳',
  'Tailwind CSS': '🎨',
  'Next.js': '🚀',
  'PostgreSQL': '🐘',
  'Redis': '🔴',
  'GraphQL': '📊',
  'GitHub Actions': '🔄',
  'Figma': '✒️'
};

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-white dark:bg-slate-900/20 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-indigo-600 dark:text-indigo-400 font-mono text-sm mb-4">My Journey</h2>
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white">Professional Experience</h3>
        </div>

        <div className="space-y-12">
          {EXPERIENCES.map((exp, index) => (
            <div key={exp.company} className="relative pl-12 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-0 before:w-[2px] before:bg-slate-200 dark:before:bg-slate-800">
              <div className="absolute left-[-6px] top-2 w-3 h-3 rounded-full bg-indigo-500 border-4 border-white dark:border-slate-950 ring-4 ring-indigo-500/10"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h4>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium">{exp.company}</p>
                </div>
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs font-mono rounded-full border border-slate-200 dark:border-slate-800">
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-3 mb-6">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex gap-3">
                    <span className="text-indigo-500 mt-1.5 shrink-0">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map(skill => (
                  <span key={skill} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700/50 hover:border-indigo-500/30 transition-colors cursor-default">
                    <span className="text-sm">{skillIconMap[skill] || '✨'}</span>
                    <span className="font-medium">{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
