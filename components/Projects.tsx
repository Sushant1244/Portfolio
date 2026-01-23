
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const ParallaxImage: React.FC<{ src: string; alt: string; liveUrl?: string; githubUrl?: string; isFeatured?: boolean }> = ({ src, alt, liveUrl, githubUrl, isFeatured }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imageRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top < viewportHeight && rect.bottom > 0) {
        const totalDist = viewportHeight + rect.height;
        const progress = (viewportHeight - rect.top) / totalDist;
        const movement = (progress - 0.5) * 40;
        imageRef.current.style.transform = `scale(1.15) translateY(${movement}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${isFeatured ? 'aspect-video md:aspect-[21/9]' : 'aspect-video'}`}>
      <img 
        ref={imageRef}
        src={src} 
        alt={alt} 
        className="object-cover w-full h-full transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: 'scale(1.15)' }}
      />
      
      {isFeatured && (
        <div className="absolute top-4 left-4 z-20">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest shadow-lg border border-indigo-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            Featured
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 z-10">
        <div className="flex gap-4">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-slate-950 rounded-full hover:bg-indigo-500 hover:text-white transition-colors" title="Live Demo">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors" title="GitHub Repository">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    tagsSet.add('All');
    PROJECTS.forEach(project => {
      project.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort((a, b) => {
      if (a === 'All') return -1;
      if (b === 'All') return 1;
      return a.localeCompare(b);
    });
  }, []);

  const filteredProjects = useMemo(() => {
    const list = activeFilter === 'All' 
      ? PROJECTS 
      : PROJECTS.filter(project => project.tags.includes(activeFilter));
    
    return {
      featured: list.filter(p => p.featured),
      regular: list.filter(p => !p.featured)
    };
  }, [activeFilter]);

  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const openProject = (project: Project) => setActiveProject(project);
  const closeProject = () => setActiveProject(null);

  const ProjectCard = ({ id, project, isFeatured }: { id?: string, project: Project, isFeatured?: boolean }) => (
    <div 
      className={`group bg-white dark:bg-slate-900 border ${isFeatured ? 'border-indigo-500/30 dark:border-indigo-500/40 shadow-indigo-500/5' : 'border-slate-200 dark:border-slate-800'} rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-2 flex flex-col shadow-sm animate-in fade-in slide-in-from-bottom-4 ${isFeatured ? 'md:col-span-2 lg:col-span-2' : ''}`}
    >
      <ParallaxImage 
        src={project.image} 
        alt={project.title} 
        liveUrl={project.liveUrl} 
        githubUrl={project.githubUrl} 
        isFeatured={isFeatured}
      />
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex gap-2 flex-wrap mb-4">
          {project.tags.slice(0, 4).map(tag => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              {tag}
            </span>
          ))}
        </div>
        <h4 className={`${isFeatured ? 'text-2xl' : 'text-xl'} font-bold text-slate-900 dark:text-white mb-2`}>{project.title}</h4>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1">
          {project.description}
        </p>
        <div className="mt-8 flex items-center justify-between gap-4">
          <button onClick={() => openProject(project)} className="text-slate-900 dark:text-white text-sm font-bold flex items-center gap-2 group/btn hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Learn more
            <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
          
          {project.liveUrl && project.liveUrl !== '#' && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center gap-2"
            >
              Live Demo
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
    <section id="projects" className="py-24 bg-slate-50/50 dark:bg-slate-900/30 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-indigo-600 dark:text-indigo-400 font-mono text-sm mb-4">Case Studies</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">Featured Projects</h3>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">
            A selection of my recent works involving large-scale applications and modern technologies.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-12 items-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Filter by:</span>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                activeFilter === tag
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-500/50 hover:text-indigo-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="space-y-16">
          {/* Featured Section */}
          {filteredProjects.featured.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">Featured Highlights</h4>
                <div className="flex-1 h-[1px] bg-indigo-500/10 dark:bg-indigo-500/20"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {filteredProjects.featured.map(project => (
                  <ProjectCard key={project.id} id={project.id} project={project} isFeatured={true} />
                ))}
              </div>
            </div>
          )}

          {/* Regular Section */}
          {filteredProjects.regular.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">More Projects</h4>
                <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.regular.map(project => (
                  <ProjectCard key={project.id} id={project.id} project={project} />
                ))}
              </div>
            </div>
          )}

          {filteredProjects.featured.length === 0 && filteredProjects.regular.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-lg">No projects found for the selected filter.</p>
              <button 
                onClick={() => setActiveFilter('All')}
                className="mt-4 text-indigo-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
    
  {activeProject && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full p-6 mx-4">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{activeProject.title}</h3>
            <button onClick={closeProject} className="text-slate-500 hover:text-slate-800 dark:hover:text-white">Close</button>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <img src={activeProject.image} alt={activeProject.title} className="w-full h-48 object-cover rounded-lg" />
            <div>
              <p className="text-slate-600 dark:text-slate-400">{activeProject.longDescription}</p>
              <div className="mt-4 flex gap-3">
                {activeProject.githubUrl && (
                  <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded bg-slate-900 text-white">View Repo</a>
                )}
                {activeProject.liveUrl && (
                  <a href={activeProject.liveUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded bg-indigo-600 text-white">Live / Details</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Projects;
