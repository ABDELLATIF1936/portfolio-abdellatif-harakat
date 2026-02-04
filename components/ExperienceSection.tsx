
import React from 'react';
import { Experience } from '../types';
import Reveal from './Reveal';

interface ExperienceSectionProps {
  experience: Experience[];
}

const ExperienceCard: React.FC<{ exp: Experience; index: number }> = ({ exp, index }) => {
  return (
    <div className="relative pl-12 pb-16 last:pb-0 group">
      {/* Timeline Line Connector */}
      <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-600/50 via-blue-600/20 to-transparent group-last:bg-gradient-to-b group-last:from-blue-600/50 group-last:to-transparent" />
      
      {/* Timeline Node Icon */}
      <div className="absolute left-0 top-2 w-6 h-6 rounded-full glass border border-blue-500/50 flex items-center justify-center z-10 group-hover:scale-125 transition-transform duration-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
      </div>

      <Reveal direction="up" delay={index * 100}>
        <div className="relative glass p-8 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3">
                <span className="text-blue-400 text-[9px] font-black uppercase tracking-widest">{exp.period}</span>
              </div>
              <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors tracking-tight">
                {exp.role}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                <h4 className="text-slate-400 font-bold text-sm uppercase tracking-tighter">{exp.company}</h4>
              </div>
            </div>
            
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-blue-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Description Points */}
          <ul className="space-y-4">
            {exp.description.map((item, idx) => (
              <li key={idx} className="flex items-start gap-4 group/item">
                <div className="mt-1.5 flex-shrink-0 w-2 h-2 bg-blue-500/20 rounded-sm border border-blue-500/40 group-hover/item:bg-blue-500 group-hover/item:shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all" />
                <p className="text-slate-400 text-sm leading-relaxed font-medium group-hover/item:text-slate-200 transition-colors">
                  {item}
                </p>
              </li>
            ))}
          </ul>

          {/* Decorative Technical Overlay */}
          <div className="absolute bottom-4 right-6 opacity-5 pointer-events-none">
            <span className="font-mono text-[60px] font-black italic select-none">0x{index + 1}</span>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <Reveal>
        <div className="text-center mb-24">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]"></span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-white tracking-tighter uppercase leading-none">
            Work &<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 text-glow">Research</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
            Parcours professionnel axé sur l'administration système et l'ingénierie réseaux.
          </p>
        </div>
      </Reveal>

      <div className="mt-16">
        {experience.map((exp, idx) => (
          <ExperienceCard key={exp.id} exp={exp} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
