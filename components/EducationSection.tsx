
import React from 'react';
import { Education } from '../types';
import Reveal from './Reveal';

interface EducationSectionProps {
  education: Education[];
}

const EducationCard: React.FC<{ edu: Education; index: number }> = ({ edu, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-center justify-between mb-16 w-full ${isEven ? 'flex-row-reverse' : ''}`}>
      {/* Spacer for desktop layout */}
      <div className="hidden md:block w-[45%]" />

      {/* Central Connector Dot */}
      <div className="absolute left-0 md:left-1/2 w-10 h-10 -translate-x-1/2 flex items-center justify-center z-10">
        <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse" />
        <div className="absolute w-8 h-8 border border-blue-500/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
      </div>

      {/* Content Card */}
      <div className="w-full md:w-[45%] pl-10 md:pl-0">
        <Reveal direction={isEven ? 'left' : 'right'} delay={index * 100}>
          <div className="group p-8 glass rounded-[2rem] border border-white/5 hover:border-blue-500/40 transition-all duration-500 relative overflow-hidden">
            {/* Hover glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                  {edu.period}
                </span>
                <svg className="w-5 h-5 text-slate-600 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {edu.degree}
              </h3>
              <h4 className="text-slate-400 font-medium mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                {edu.institution}
              </h4>

              <div className="flex flex-wrap gap-2">
                {edu.courses.map(course => (
                  <span key={course} className="px-3 py-1 bg-white/5 text-slate-500 rounded-lg text-[11px] font-medium border border-white/5 group-hover:border-blue-500/10 transition-all">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  return (
    <section className="py-20 relative">
      <Reveal>
        <div className="text-center mb-24">
          <h2 className="text-5xl font-black mb-6 text-white tracking-tighter uppercase">Parcours Académique</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-8" />
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Une fondation solide en ingénierie des systèmes et architectures réseaux distribuées.
          </p>
        </div>
      </Reveal>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Central Vertical Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-blue-500/30 to-transparent transform -translate-x-1/2" />

        <div className="relative">
          {education.map((edu, index) => (
            <EducationCard key={edu.id} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
