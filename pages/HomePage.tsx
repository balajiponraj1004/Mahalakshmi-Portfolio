
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MousePointer2 } from 'lucide-react';
import { PortfolioData } from '../types';

interface HomePageProps {
  data: PortfolioData;
}

export const HomePage: React.FC<HomePageProps> = ({ data }) => {
  const handleBrowseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="pt-20 overflow-x-hidden">
      {/* Hero Section - Layered Architectural Composition */}
      <section className="relative px-6 lg:px-12 py-12 md:py-20 max-w-7xl mx-auto min-h-[85vh] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Typography & Vision */}
          <div className="lg:col-span-6 z-20">
            <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-serif font-bold leading-[0.9] tracking-tighter mb-8 -ml-1">
              Designing <span className="italic font-normal block md:inline">systems</span> <br className="hidden lg:block"/> that endure.
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-xl mb-12">
              {data.summary}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleBrowseClick}
                className="px-10 py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all cursor-pointer flex items-center gap-3 shadow-2xl"
              >
                Browse Portfolio <MousePointer2 size={14} />
              </button>
              <Link 
                to="/resume"
                className="px-10 py-5 border border-gray-200 text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:border-black transition-all flex items-center gap-3"
              >
                Experience <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Side: Architectural Arch + Info Overlay */}
          <div className="lg:col-span-6 relative flex justify-end items-end">
            <div className="relative w-full max-w-[540px] group">
              
              {/* The Arch Container - Responsive and Contained */}
              <div className="relative z-10 w-full aspect-[4/5] overflow-hidden rounded-t-full bg-gray-100 border-[8px] md:border-[16px] border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200" 
                  alt="Mahalakshmi K - Senior Visual Strategist"
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                />
              </div>

              {/* Layered Info Blocks (Matched to Screenshot) */}
              <div className="absolute bottom-[-10%] left-[-5%] md:left-[-15%] z-30 w-[90%] md:w-[110%] pointer-events-none">
                {/* Black Stats Header */}
                <div className="bg-black text-white p-6 md:p-8 w-[60%] md:w-[280px] shadow-2xl">
                  <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-4">
                    PORTFOLIO V.24
                  </div>
                  <div className="w-8 h-px bg-gray-600 mb-4"></div>
                  <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    ESTABLISHED 2014
                  </div>
                </div>

                {/* White/Bordered Metadata Box */}
                <div className="bg-white/90 backdrop-blur-md border-[3px] border-[#3b82f6] p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-[-1px] shadow-xl">
                  <div className="space-y-1">
                    <div className="text-[9px] uppercase tracking-[0.3em] font-black text-gray-300">Principal</div>
                    <div className="text-sm md:text-base font-bold tracking-tight">Mahalakshmi K</div>
                  </div>
                  <div className="space-y-1 text-left md:text-right">
                    <div className="text-[9px] uppercase tracking-[0.3em] font-black text-gray-300">Base</div>
                    <div className="text-sm md:text-base font-bold tracking-tight">India / Remote Capable</div>
                  </div>
                </div>
              </div>

              {/* Decorative Accent */}
              <div className="absolute -top-10 -right-10 w-40 h-40 border border-gray-100 rounded-full -z-10 hidden lg:block opacity-50"></div>
            </div>
          </div>

        </div>
      </section>

      {/* Categories Grid - Entry into the Core Work */}
      <section id="categories" className="bg-[#050505] text-white px-6 lg:px-12 py-32 md:py-48 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-3xl">
              <span className="text-[10px] uppercase tracking-[0.5em] font-black text-gray-500 block mb-6">Expertise Grid / 01</span>
              <h2 className="text-6xl md:text-9xl font-serif font-bold tracking-tighter leading-none mb-8">Strategic <br className="hidden md:block"/> Disciplines.</h2>
              <p className="text-gray-400 text-xl font-light leading-relaxed max-w-2xl">
                Synthesizing multi-layered business logic into sophisticated visual narratives. Specialized in corporate branding and technical SaaS communication.
              </p>
            </div>
            <div className="text-gray-900 font-serif text-[10rem] leading-none hidden xl:block select-none pointer-events-none italic opacity-30">8+</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800/20 border border-gray-800/20">
            {data.categories.map((cat) => (
              <Link 
                key={cat.id} 
                to={`/category/${cat.id}`}
                className="bg-black p-10 md:p-14 hover:bg-[#111] transition-all group relative overflow-hidden h-[400px] flex flex-col justify-between"
              >
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-8 flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-500">
                    {cat.title}
                    <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-all" />
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed max-w-xs font-light">
                    {cat.shortDescription}
                  </p>
                </div>
                <div className="absolute bottom-0 right-0 p-10 text-[#151515] group-hover:text-gray-900 font-serif text-[9rem] leading-none transition-colors pointer-events-none select-none">
                  {(data.categories.indexOf(cat) + 1).toString().padStart(2, '0')}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA Section */}
      <footer className="border-t border-gray-100 py-32 md:py-48 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
              <div className="lg:col-span-8">
                <h2 className="text-6xl md:text-9xl font-serif font-bold tracking-tighter leading-none mb-12">
                  Ready to evolve <br/> your <span className="italic font-normal">visual narrative</span>?
                </h2>
                <a 
                  href="mailto:mahakasi3108@gmail.com" 
                  className="inline-flex items-center gap-6 px-14 py-7 bg-black text-white text-xs font-bold uppercase tracking-[0.4em] hover:bg-gray-800 transition-all shadow-2xl"
                >
                  Start Collaboration <ArrowRight size={16} />
                </a>
              </div>
              <div className="lg:col-span-4 lg:text-right flex flex-col justify-end space-y-12">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 mb-6">Social Architecture</h4>
                  <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest">
                    <a href="#" className="hover:text-gray-400 transition-colors">LinkedIn / Mahalakshmi-K</a>
                    <a href="#" className="hover:text-gray-400 transition-colors">Behance / Profile</a>
                  </div>
                </div>
              </div>
           </div>
           
           <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[0.5em] text-gray-300">
             <div>© 2024 Mahalakshmi K — Senior Graphic Designer Portfolio</div>
             <div className="flex items-center gap-8">
               <Link to="/" className="hover:text-black">Home</Link>
               <Link to="/resume" className="hover:text-black">Resume</Link>
               <a href="mailto:mahakasi3108@gmail.com" className="hover:text-black">Contact</a>
             </div>
           </div>
        </div>
      </footer>
    </div>
  );
};
