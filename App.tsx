
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EducationSection from './components/EducationSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactForm from './components/ContactForm';
import GeminiAssistant from './components/GeminiAssistant';
import Reveal from './components/Reveal';
import Footer from './components/Footer';
import { PortfolioData } from './types';
import { INITIAL_DATA } from './constants';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('portfolio_data');
    // Merge saved data with INITIAL_DATA to ensure all properties exist
    return saved ? { ...INITIAL_DATA, ...JSON.parse(saved) } : INITIAL_DATA;
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          projectsRes, 
          skillsRes, 
          testimonialsRes, 
          profileRes, 
          educationRes, 
          experienceRes
                ] = await Promise.all([
          fetch('/projects.json'),
          fetch('/skills.json'),
          fetch('/testimonials.json'),
          fetch('/profile.json'),
          fetch('/education.json'),
          fetch('/experience.json')
        ]);

        const fetchedData: Partial<PortfolioData> = {};

        if (projectsRes.ok) fetchedData.projects = await projectsRes.json();
        if (skillsRes.ok) fetchedData.skills = await skillsRes.json();
        if (testimonialsRes.ok) fetchedData.testimonials = await testimonialsRes.json();
        if (educationRes.ok) fetchedData.education = await educationRes.json();
        if (experienceRes.ok) fetchedData.experience = await experienceRes.json();
        
        if (profileRes.ok) {
          const profile = await profileRes.json();
          // Merge profile fields directly into the data object
          Object.assign(fetchedData, profile);
        }

        setData(prev => ({ ...prev, ...fetchedData }));
      } catch (error) {
        console.error("Critical error during data acquisition:", error);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    if (data.name !== "Loading...") {
      localStorage.setItem('portfolio_data', JSON.stringify(data));
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-[#05070A] text-slate-200 selection:bg-blue-500/30">
      <Navbar />
      
      <main className="pt-16">
        <Hero 
          name={data.name} 
          role={data.role} 
          about={data.about} 
          github={data.github} 
          linkedin={data.linkedin} 
        />
        
        <div id="education" className="container mx-auto px-6 py-32 border-b border-white/5">
          <Reveal>
            <EducationSection education={data.education} />
          </Reveal>
        </div>
        <div id="skills" className="py-32">
          <div className="container mx-auto px-6">
            <Reveal>
              <SkillsSection skills={data.skills} />
            </Reveal>
          </div>
        </div>
        
        <div id="projects" className="container mx-auto px-6 py-32">
          <Reveal>
            <ProjectsSection projects={data.projects} />
          </Reveal>
        </div>
        
        <div id="experience" className="bg-[#080A0F] py-32 border-y border-white/5">
          <div className="container mx-auto px-6">
            <Reveal>
              <ExperienceSection experience={data.experience} />
            </Reveal>
          </div>
        </div>
        
        <div id="testimonials" className="container mx-auto px-6 py-32">
          <Reveal>
            <TestimonialsSection testimonials={data.testimonials} />
          </Reveal>
        </div>
        
        <div id="contact" className="bg-[#080A0F] py-32">
          <div className="container mx-auto px-6">
            <Reveal>
              <ContactForm email={data.email} />
            </Reveal>
          </div>
        </div>
        
        <Footer name={data.name} />
        
        <GeminiAssistant data={data} />
      </main>
    </div>
  );
};

export default App;
