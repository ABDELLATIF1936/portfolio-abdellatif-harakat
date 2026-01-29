
import React from 'react';
import { Testimonial } from '../types';
import Reveal from './Reveal';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const RoleBadge: React.FC<{ role: Testimonial['role'] }> = ({ role }) => {
  const colors = {
    'Professor': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    'Student': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    'Project Lead': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    'Peer': 'text-purple-400 bg-purple-500/10 border-purple-500/20'
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${colors[role]}`}>
      {role}
    </span>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  return (
    <Reveal delay={index * 100} direction="up">
      <div className="group relative glass p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all duration-500 h-full flex flex-col justify-between">
        {/* Decorative Quote Icon */}
        <div className="absolute top-6 right-8 text-blue-500/10 group-hover:text-blue-500/20 transition-colors">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11M14.017 21H11.017V11H14.017M3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H4.017C3.46472 8 3.017 8.44772 3.017 9V11M3.017 21H0.017V11H3.017" />
          </svg>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl glass border border-blue-500/20 flex items-center justify-center font-black text-blue-500 text-xl group-hover:scale-110 transition-transform">
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-white font-bold tracking-tight">{testimonial.name}</h4>
              <RoleBadge role={testimonial.role} />
            </div>
          </div>

          <p className="text-slate-400 text-base leading-relaxed italic font-medium mb-8">
            "{testimonial.content}"
          </p>
        </div>

        <div className="pt-6 border-t border-white/5 mt-auto">
          <div className="flex flex-col gap-1">
            {testimonial.institution && (
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                {testimonial.institution}
              </span>
            )}
            <span className="text-[10px] font-black text-blue-500/80 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-1 bg-blue-500 rounded-full" />
              {testimonial.projectContext}
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
      <Reveal>
        <div className="text-center mb-24">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Endorsements</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tighter uppercase leading-none">
            Peer & Academic<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 text-glow">Validation</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            Témoignages de collaborateurs, pairs et mentors avec qui j'ai eu le privilège de bâtir des infrastructures.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.id} testimonial={t} index={i} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
