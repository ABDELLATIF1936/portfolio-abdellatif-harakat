import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

interface ContactFormProps {
  email: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ email }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Envoi via EmailJS
    emailjs.send(
      'service_54f7ioe', 
      'template_e4picvh', 
      {
        name: formData.name,
        email: formData.email,
        message: formData.message
      },
      'DAZgBhWmFQf_wifh5'     
    )
    .then(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    })
    .catch(() => {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    });
  };

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
      <div>
        <h2 className="text-4xl font-bold mb-6">Restons Connectés</h2>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          Que vous ayez une question sur mon travail, que vous souhaitiez échanger autour de projets de développement ou simplement dire bonjour, n’hésitez pas à me contacter.
        </p>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">M'écrire par email</p>
              <a href={`mailto:${email}`} className="text-lg text-white font-medium hover:text-blue-400 transition-colors">{email}</a>
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 bg-[#0D1117] border border-gray-800 rounded-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Nom Complet</label>
          <input
            required
            type="text"
            className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Harakat abdellatif"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Adresse Email</label>
          <input
            required
            type="email"
            className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="abdellatifharakat50@gmail.com"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
          <textarea
            required
            rows={4}
            className="w-full bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Parlez-moi de votre projet..."
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
        </div>
        
        <button
          disabled={status === 'sending'}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center space-x-2"
        >
          {status === 'sending' ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Transmission en cours...</span>
            </>
          ) : status === 'success' ? (
            <span>Message envoyé avec succès !</span>
          ) : status === 'error' ? (
            <span>Erreur lors de l'envoi !</span>
          ) : (
            <span>Envoyer le Message</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
