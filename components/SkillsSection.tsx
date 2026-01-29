
import React, { useEffect, useState, useRef } from 'react';
import { Skill } from '../types';
import Reveal from './Reveal';

interface SkillsSectionProps {
  skills: Skill[];
}

// Map icons to categories
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Network':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      );
    case 'Systems':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      );
    case 'Security':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 'Dev':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
};

const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const [activeSegments, setActiveSegments] = useState(0);
  const totalSegments = 10;
  const targetSegments = Math.round((skill.level / 5) * totalSegments);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let current = 0;
          const interval = setInterval(() => {
            if (current < targetSegments) {
              current++;
              setActiveSegments(current);
            } else {
              clearInterval(interval);
            }
          }, 100 + index * 50);
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetSegments, index]);

  return (
    <div ref={ref} className="group relative p-6 glass rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
      {/* Background Scanning Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h4 className="text-white font-bold text-lg tracking-tight mb-1 group-hover:text-blue-400 transition-colors">{skill.name}</h4>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{skill.category}</p>
          </div>
          <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
            <span className="text-xs font-mono font-bold">{skill.level}/5</span>
          </div>
        </div>

        {/* Segmented Progress Bar */}
        <div className="flex gap-1.5 h-2">
          {Array.from({ length: totalSegments }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 rounded-sm transition-all duration-300 ${
                i < activeSegments 
                  ? 'bg-gradient-to-t from-blue-600 to-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                  : 'bg-white/5'
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            />
          ))}
        </div>
        
        <div className="mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-[9px] font-bold text-blue-500/60 uppercase tracking-tighter">System Stabilized</span>
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const categories = Array.from(new Set(skills.map(s => s.category))) as Skill['category'][];

  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <Reveal>
        <div className="text-center mb-32">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]"></span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tighter uppercase leading-none">
            Technical<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 text-glow">Stack</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            Des technologies combinant développement logiciel, systèmes informatiques et réseaux pour concevoir des solutions complètes, fiables et évolutives.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-20">
        {categories.map((cat, catIdx) => (
          <div key={cat} className="relative">
            {/* Category Header */}
            <Reveal direction="right" delay={catIdx * 100}>
              <div className="flex items-center gap-6 mb-12">
                <div className="w-14 h-14 flex items-center justify-center glass rounded-2xl border border-blue-500/20 text-blue-400 shadow-xl shadow-blue-500/5">
                  {getCategoryIcon(cat)}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">{cat}</h3>
                  <div className="h-1 w-12 bg-blue-600 rounded-full mt-1" />
                </div>
              </div>
            </Reveal>

            {/* Skills Grid for this Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.filter(s => s.category === cat).map((skill, idx) => (
                <Reveal key={skill.id} delay={idx * 50 + catIdx * 100} direction="up">
                  <SkillCard skill={skill} index={idx} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default SkillsSection;
