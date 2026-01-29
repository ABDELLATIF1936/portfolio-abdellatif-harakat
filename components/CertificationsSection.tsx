
import React from 'react';
import { Certification } from '../types';

interface CertificationsSectionProps {
  certifications: Certification[];
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-12 text-center">Industry Credentials</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {certifications.map(cert => (
          <div key={cert.id} className="flex items-center p-6 bg-[#1F2937] border border-gray-800 rounded-xl hover:border-amber-500/50 transition-all shadow-lg min-w-[300px]">
            <div className="w-16 h-16 rounded-lg bg-amber-500/10 flex items-center justify-center mr-6 border border-amber-500/20">
              <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-1.124 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946 1.124 3.42 3.42 0 014.438 4.438 3.42 3.42 0 001.124 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-1.124 1.946 3.42 3.42 0 01-4.438 4.438 3.42 3.42 0 00-1.946 1.124 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-1.124 3.42 3.42 0 01-4.438-4.438 3.42 3.42 0 00-1.124-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 001.124-1.946 3.42 3.42 0 014.438-4.438z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">{cert.name}</h3>
              <p className="text-gray-400 text-sm">{cert.issuer} • {cert.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsSection;
