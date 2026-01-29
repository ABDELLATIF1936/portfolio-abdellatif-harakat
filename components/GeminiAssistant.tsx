
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { PortfolioData } from '../types';

interface GeminiAssistantProps {
  data: PortfolioData;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: `Bonjour ! Je suis l'assistant de carrière de ${data.name.split(' ')[0]}. Posez-moi vos questions sur ses compétences techniques, sa formation ou ses projets !` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Fix: Create GoogleGenAI instance with named parameter apiKey from process.env.API_KEY
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Fix: Used double quotes for the fallback string to avoid unescaped single quote issues in "d'avis"
      const systemInstruction = `
        Tu es un assistant de carrière pour ${data.name}, qui est ${data.role}.
        Contexte du Portfolio :
        - À propos : ${data.about}
        - Éducation : ${data.education.map(e => `${e.degree} à ${e.institution}`).join(', ')}
        - Certifications : ${data.certifications?.map(c => `${c.name} (${c.issuer})`).join(', ') || 'Aucune certification listée'}
        - Compétences : ${data.skills.map(s => `${s.name} (${s.category})`).join(', ')}
        - Projets Clés : ${data.projects.map(p => p.title).join(', ')}
        - Avis : ${data.testimonials?.map(t => `${t.name} (${t.role}) : ${t.content}`).join(' | ') || "Pas encore d'avis listés"}
        
        Règles :
        - Réponds exclusivement en français.
        - Sois professionnel, utile et concis.
        - Ne réponds qu'aux questions liées au parcours professionnel et académique de ${data.name}.
        - Si tu ne connais pas la réponse, suggère poliment de contacter ${data.name} par email à ${data.email}.
      `;

      // Fix: Follow @google/genai guidelines for generateContent call
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction,
        },
      });

      // Fix: Access response text via the .text property (not a method)
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "Je rencontre des difficultés à me connecter pour le moment." }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'ai', text: "Désolé, j'ai rencontré une erreur lors du traitement de votre demande." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[500px] bg-[#1F2937] border border-gray-700 rounded-2xl shadow-2xl flex flex-col animate-fadeIn">
          <div className="p-4 bg-blue-600 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-bold text-sm">Assistant Carrière</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-400 px-4 py-2 rounded-2xl text-sm italic">
                  Analyse du portfolio...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-800">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Posez une question..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300"
        >
          <div className="absolute -top-12 right-0 bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
            Demander à l'IA
            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white transform rotate-45"></div>
          </div>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default GeminiAssistant;
