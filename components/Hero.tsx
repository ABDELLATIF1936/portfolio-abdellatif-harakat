
import React, { useEffect, useState } from 'react';

interface HeroProps {
  name: string;
  role: string;
  about: string;
  github: string;
  linkedin: string;
}

const Hero: React.FC<HeroProps> = ({ name, role, about, github, linkedin }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className={`transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          
            
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none text-white">
              {name.split(' ')[0]}<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 text-glow">
                {name.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            
            <h2 className="text-xl md:text-2xl text-slate-400 font-medium mb-8 leading-relaxed border-l-4 border-blue-600 pl-6">
              {role}
            </h2>

            <p className="text-slate-500 text-lg mb-10 max-w-xl leading-relaxed">
              {about}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a href="#projects" className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-600/20">
                Explorer les Projets
              </a>
              <div className="flex items-center space-x-4">
                <a href={github} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-slate-400 hover:text-white transition-all hover:scale-110">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-slate-400 hover:text-white transition-all hover:scale-110">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className={`relative transition-all duration-1000 delay-300 transform ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative z-10 mx-auto w-full max-w-[450px]">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse"></div>
                                          
              <div className="relative aspect-square glass rounded-[2.5rem] overflow-hidden border border-white/10 p-3">
                <img
                  src="./profil.png"
                  alt={name}
                  className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
              </div>

              <div className="absolute -top-6 -right-6 glass p-4 rounded-2xl border border-white/10 shadow-2xl animate-bounce" style={{ animationDuration: '3s' }}>
                <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1">Architecture</p>
                <p className="text-white font-mono font-bold">SDN / CLOUD</p>
              </div>
              <div className="absolute -bottom-6 -left-6 glass p-4 rounded-2xl border border-white/10 shadow-2xl animate-bounce" style={{ animationDuration: '4s' }}>
                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-1">Sécurité</p>
                <p className="text-white font-mono font-bold">IDS / IPS</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
