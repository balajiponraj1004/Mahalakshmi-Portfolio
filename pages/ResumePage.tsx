import React from 'react';
import { Download, Mail, MapPin, ExternalLink, Award, Globe, Linkedin } from 'lucide-react';
import { PortfolioData } from '../types';

export const ResumePage: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    // Providing a small delay to ensure UI updates finish before print dialog
    setTimeout(() => {
      window.print();
    }, 100);
  };

  if (!data) return <div className="pt-40 text-center">Loading resume data...</div>;

  return (
    <div className="pt-24 min-h-screen bg-white overflow-x-hidden">
      <section className="px-6 lg:px-12 py-12 md:py-20 max-w-7xl mx-auto">
        {/* Resume Header - Architected for perfect containment */}
        <div className="border-b-4 border-black pb-12 mb-20 w-full">
          {/* Section 1: The Name (Fluid and contained) */}
          <div className="mb-12">
            <h1 className="text-[clamp(2.5rem,8vw,9.5rem)] font-serif font-bold tracking-tighter uppercase leading-[0.9] block w-full">
              {data.designerName}
            </h1>
          </div>

          {/* Section 2: Details Row */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 w-full">
            {/* Left Column: Professional Title */}
            <div className="max-w-2xl">
              <p className="text-2xl md:text-4xl text-gray-400 font-light italic tracking-tight uppercase leading-tight">
                {data.role}
              </p>
            </div>

            {/* Right Column: Information Stack & Action */}
            <div className="w-full lg:w-auto flex flex-col items-start lg:items-end text-left lg:text-right space-y-8 no-print shrink-0">
              <div className="space-y-3">
                <a 
                  href="mailto:mahakasi3108@gmail.com" 
                  className="flex items-center justify-start lg:justify-end gap-4 text-[11px] font-black uppercase tracking-[0.25em] hover:text-gray-400 transition-colors group"
                >
                  <span className="border-b border-transparent group-hover:border-gray-200 pb-0.5">mahakasi3108@gmail.com</span>
                  <Mail size={14} className="text-gray-200 group-hover:text-black transition-colors" />
                </a>
                <div className="flex items-center justify-start lg:justify-end gap-4 text-[11px] font-black uppercase tracking-[0.25em]">
                  Mahalakshmi Kasi <Linkedin size={14} className="text-gray-200" />
                </div>
                <div className="flex items-center justify-start lg:justify-end gap-4 text-[11px] font-black uppercase tracking-[0.25em] text-gray-300">
                  India / Remote Capability <MapPin size={14} className="text-gray-200" />
                </div>
              </div>

              <button 
                onClick={handleDownload}
                className="w-full lg:w-auto flex items-center justify-center gap-4 px-12 py-6 bg-black text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gray-800 transition-all shadow-2xl hover:-translate-y-1 active:translate-y-0 no-print"
              >
                Download Executive CV <Download size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-24">
            {/* Experience */}
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 mb-16 flex items-center gap-6">
                <span className="w-12 h-px bg-gray-200"></span> Professional Experience
              </h2>
              <div className="space-y-20">
                {data.resume.experience.map((exp, idx) => (
                  <div key={idx} className="group relative">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                      <div>
                        <h3 className="text-3xl font-bold tracking-tight mb-2 group-hover:text-gray-600 transition-colors">{exp.company}</h3>
                        <p className="text-xl font-serif italic text-gray-400">{exp.role}</p>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300 mt-4 md:mt-2 bg-gray-50 px-3 py-1 shrink-0">{exp.period}</span>
                    </div>
                    <ul className="space-y-6">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="text-gray-700 leading-relaxed max-w-2xl flex gap-6 text-lg font-light">
                          <span className="mt-3 w-1.5 h-1.5 bg-black shrink-0"></span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialized Skillsets */}
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 mb-16 flex items-center gap-6">
                <span className="w-12 h-px bg-gray-200"></span> Core Proficiency
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.resume.awards.map((award, idx) => (
                  <div key={idx} className="p-10 border border-gray-100 flex items-start gap-8 hover:border-black transition-all group bg-[#fafafa]/50">
                    <Award size={28} className="text-gray-200 group-hover:text-black transition-colors shrink-0" />
                    <span className="text-xs font-bold leading-relaxed uppercase tracking-[0.2em]">{award}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-20">
            {/* Skills */}
            <div className="bg-[#fafafa] p-10 border border-gray-100">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-10 flex items-center gap-4">
                 Design Expertise <span className="flex-1 h-px bg-gray-200"></span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.resume.skills.design.map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white text-[9px] font-bold uppercase tracking-widest border border-gray-100 hover:border-black transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-10 border border-gray-100">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-10 flex items-center gap-4">
                 Technical Stack <span className="flex-1 h-px bg-gray-200"></span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.resume.skills.technical.map(skill => (
                  <span key={skill} className="px-4 py-2 bg-black text-white text-[9px] font-bold uppercase tracking-widest border border-black hover:bg-white hover:text-black transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="px-10">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-10 flex items-center gap-4">
                 Academic <span className="flex-1 h-px bg-gray-200"></span>
              </h2>
              <div className="space-y-10">
                {data.resume.education.map((edu, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-xl leading-tight mb-2 tracking-tight">{edu.school}</h3>
                    <p className="text-md text-gray-500 font-serif italic mb-3">{edu.degree}</p>
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-300 border-l-2 border-gray-100 pl-4 block">Class of {edu.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-black text-white p-12 shadow-2xl no-print">
              <h3 className="text-3xl font-serif mb-8 italic tracking-tight">Inquiries & Strategic Partnerships</h3>
              <p className="text-gray-400 text-sm mb-10 leading-relaxed font-light">
                Currently open to selective creative directorship opportunities and senior-level design consultations for enterprise clients.
              </p>
              <a href="mailto:mahakasi3108@gmail.com" className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] group border-b border-gray-800 pb-4 hover:border-white transition-all">
                Initiate Conversation <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};