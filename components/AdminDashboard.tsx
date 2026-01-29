
import React, { useState } from 'react';
import { PortfolioData, Project, Testimonial } from '../types';

interface AdminDashboardProps {
  data: PortfolioData;
  updateData: (data: PortfolioData) => void;
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ data, updateData, onExit }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'projects' | 'testimonials'>('info');

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateData({ ...data, [name]: value });
  };

  const addTestimonial = () => {
    const newT: Testimonial = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'New Person',
      role: 'Student',
      content: 'Feedback content here...',
      projectContext: 'Project Name'
    };
    updateData({ ...data, testimonials: [newT, ...(data.testimonials || [])] });
  };

  return (
    <div className="container mx-auto px-6 py-20 min-h-screen">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-white">Portfolio Control Panel</h1>
        <button onClick={onExit} className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all">
          Exit Dashboard
        </button>
      </div>

      <div className="flex space-x-4 mb-8">
        {(['info', 'projects', 'testimonials'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-[#1F2937] text-gray-400 hover:text-white'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-[#1F2937] p-8 rounded-2xl border border-gray-800">
        {activeTab === 'info' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                <input name="name" value={data.name} onChange={handleInfoChange} className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-2 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input name="email" value={data.email} onChange={handleInfoChange} className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-2 text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Role/Headline</label>
              <input name="role" value={data.role} onChange={handleInfoChange} className="w-full bg-[#0D1117] border border-gray-700 rounded-lg px-4 py-2 text-white" />
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <button onClick={addTestimonial} className="w-full py-4 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:text-blue-500 transition-all">
              + Add New Testimonial
            </button>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {(data.testimonials || []).map(t => (
                <div key={t.id} className="p-4 bg-[#0D1117] border border-gray-800 rounded-xl">
                  <h3 className="font-bold text-white">{t.name} ({t.role})</h3>
                  <p className="text-sm text-gray-500 italic mt-2">"{t.content}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
