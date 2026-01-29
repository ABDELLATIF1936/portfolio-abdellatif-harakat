
import React, { useState } from 'react';
import { Project } from '../types';
import Reveal from './Reveal';

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative aspect-[16/10] overflow-hidden group/carousel">
      <img
        src={images[currentIndex]}
        alt={`Project view ${currentIndex + 1}`}
        className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
      />
      
      {images.length > 1 && (
        <>
          <button 
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 glass rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white/20"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 glass rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white/20"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-blue-500 w-4' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <Reveal>
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-xl text-left">
            <div className="inline-block px-4 py-1.5 mb-6 glass rounded-full border border-blue-500/20">
              <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]"></span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-white tracking-tighter uppercase leading-none">
              Projets<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 text-glow">Majeurs</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-md">
              Une immersion dans mes projets techniques mêlant développement logiciel, systèmes informatiques, cloud et bonnes pratiques de sécurité.
            </p>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/ABDELLATIF1936" className="group flex items-center space-x-3 glass px-8 py-4 rounded-full text-white font-bold text-sm hover:bg-white/10 transition-all border border-white/5">
              <span>EXPLORER GITHUB</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {projects.map((project, idx) => (
          <Reveal key={project.id} delay={idx * 150} direction={idx % 2 === 0 ? 'right' : 'left'}>
            <div className="group relative glass rounded-[3rem] overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-blue-600/10 border border-white/5 hover:border-blue-500/20">
              {/* Multi-image Carousel */}
              <ProjectImageCarousel images={project.images} />
              
              <div className="p-10 lg:p-12">
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-blue-500/5 text-blue-400 border border-blue-500/10 rounded-full text-[9px] font-black tracking-widest uppercase">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-blue-400 transition-colors tracking-tight">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 text-base leading-relaxed mb-10 font-medium">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/5">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-white hover:text-blue-500 transition-all flex items-center gap-3 py-2 px-4 rounded-xl glass border border-white/5">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                      Code Source
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-white transition-all flex items-center gap-3 py-2 px-4 rounded-xl glass border border-blue-500/20">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
