
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PortfolioData } from '../types';

interface CaseStudyPageProps {
  data: PortfolioData;
}

// Renders a real image if available, otherwise shows a labelled placeholder
const CaseImage: React.FC<{
  src?: string;
  alt: string;
  placeholderText: string;
  className?: string;
  placeholderClass?: string;
}> = ({ src, alt, placeholderText, className = 'w-full mt-12', placeholderClass = 'mt-12 aspect-video bg-gray-100 flex items-center justify-center text-xs text-gray-400 border border-dashed border-gray-200 uppercase tracking-widest' }) => {
  if (src) {
    return <img src={src} alt={alt} className={className} />;
  }
  return (
    <div className={placeholderClass}>
      {placeholderText}
    </div>
  );
};

export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ data }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Find project across all categories
  const project = data.categories
    .flatMap(c => c.items)
    .find(p => p.id === projectId);

  const handleBackToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('categories');
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  if (!project || !project.caseStudy) {
    return (
      <div className="pt-40 text-center">
        <h1 className="text-2xl font-serif">Case study content pending.</h1>
        <Link to="/" className="text-blue-500 mt-4 block underline">Back to Home</Link>
      </div>
    );
  }

  const { caseStudy } = project;
  const imgs = caseStudy.images ?? [];

  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Hero Header */}
      <section className="px-6 lg:px-12 py-20 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto">
          <a
            href="#categories"
            onClick={handleBackToPortfolio}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-12 hover:-translate-x-2 transition-transform cursor-pointer"
          >
            <ArrowLeft size={14} /> Return to Portfolio
          </a>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400 block mb-6">Branding Case Study</span>
              <h1 className="text-6xl md:text-9xl font-serif font-bold tracking-tighter leading-[1.05] mb-8">
                {project.title}
              </h1>
              <p className="text-2xl text-gray-500 font-light leading-relaxed max-w-2xl">
                {project.description}
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end">
              <div className="space-y-8 border-l-2 border-black pl-8">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Client</div>
                  <div className="text-lg font-bold">{project.client}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Year</div>
                  <div className="text-lg font-bold">{project.date}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Expertise</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map(t => <span key={t} className="text-[9px] font-bold uppercase border border-gray-200 px-2 py-1">{t}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Content */}
      <section className="px-6 lg:px-12 py-32 max-w-5xl mx-auto">
        <div className="space-y-32">

          {/* 01 / Overview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-300 sticky top-32">01 / Overview</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-2xl font-light leading-relaxed text-gray-700">{caseStudy.overview}</p>
              <CaseImage
                src={imgs[0]}
                alt={`${project.title} — brand overview`}
                placeholderText="[ Insert primary brand vision imagery ]"
                placeholderClass="mt-16 aspect-video bg-gray-100 flex items-center justify-center text-xs text-gray-400 border border-dashed border-gray-200 uppercase tracking-widest"
                className="w-full mt-16"
              />
            </div>
          </div>

          {/* 02 / Context */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-300 sticky top-32">02 / Context</h2>
            </div>
            <div className="md:col-span-8 space-y-16">
              <div>
                <h3 className="text-3xl font-serif mb-6 italic">Brand Background</h3>
                <p className="text-lg text-gray-600 leading-relaxed font-light">{caseStudy.background}</p>
              </div>
              <div>
                <h3 className="text-3xl font-serif mb-6 italic">The Challenge</h3>
                <p className="text-lg text-gray-600 leading-relaxed font-light">{caseStudy.challenge}</p>
              </div>
              <CaseImage
                src={imgs[1]}
                alt={`${project.title} — moodboard`}
                placeholderText="[ Insert competitor analysis / moodboard mockup ]"
                placeholderClass="aspect-[4/3] bg-gray-100 flex items-center justify-center text-xs text-gray-400 border border-dashed border-gray-200 uppercase tracking-widest"
                className="w-full"
              />
            </div>
          </div>

          {/* 03 / Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-300 sticky top-32">03 / Strategy</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-2xl font-serif italic leading-relaxed text-black mb-12">"{caseStudy.strategy}"</p>
              <CaseImage
                src={imgs[2]}
                alt={`${project.title} — strategy`}
                placeholderText="[ Insert strategic pillars / concept visualization ]"
                placeholderClass="aspect-video bg-gray-100 flex items-center justify-center text-xs text-gray-400 border border-dashed border-gray-200 uppercase tracking-widest"
                className="w-full"
              />
            </div>
          </div>

          {/* 04 / Visual System */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-300 sticky top-32">04 / Visual System</h2>
            </div>
            <div className="md:col-span-8 space-y-24">
              <div>
                <h3 className="text-3xl font-serif mb-6 italic">The Logo System</h3>
                <p className="text-lg text-gray-600 leading-relaxed font-light">{caseStudy.logoSystem}</p>
                <div className="mt-12 grid grid-cols-2 gap-4">
                  {imgs[3] ? (
                    <img src={imgs[3]} alt={`${project.title} — primary logo`} className="w-full" />
                  ) : (
                    <div className="aspect-square bg-gray-50 flex items-center justify-center text-[10px] text-gray-300 uppercase tracking-widest border border-gray-100">
                      [ Primary Logo ]
                    </div>
                  )}
                  {imgs[4] ? (
                    <img src={imgs[4]} alt={`${project.title} — secondary mark`} className="w-full" />
                  ) : (
                    <div className="aspect-square bg-gray-50 flex items-center justify-center text-[10px] text-gray-300 uppercase tracking-widest border border-gray-100">
                      [ Secondary Mark ]
                    </div>
                  )}
                </div>
                <CaseImage
                  src={imgs[5]}
                  alt={`${project.title} — logo at scale`}
                  placeholderText="[ Logo Construction / Grid Mockup ]"
                  placeholderClass="mt-4 aspect-[21/9] bg-gray-50 flex items-center justify-center text-[10px] text-gray-300 uppercase tracking-widest border border-gray-100"
                  className="w-full mt-4"
                />
              </div>

              <div>
                <h3 className="text-3xl font-serif mb-6 italic">Visual Language</h3>
                <p className="text-lg text-gray-600 leading-relaxed font-light">{caseStudy.visualLanguage}</p>
                <CaseImage
                  src={imgs[6]}
                  alt={`${project.title} — visual language`}
                  placeholderText="[ Insert Typography & Color Palette Grid Mockup ]"
                  placeholderClass="mt-12 h-64 bg-gray-100 flex items-center justify-center text-xs text-gray-400 border border-dashed border-gray-200 uppercase tracking-widest"
                  className="w-full mt-12"
                />
              </div>
            </div>
          </div>

          {/* 05 / Applications */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-300 sticky top-32">05 / Applications</h2>
            </div>
            <div className="md:col-span-8 space-y-8">
              <p className="text-lg text-gray-600 leading-relaxed font-light">{caseStudy.applications}</p>
              <div className="grid grid-cols-1 gap-8">
                <CaseImage
                  src={imgs[7]}
                  alt={`${project.title} — packaging`}
                  placeholderText="[ Insert Packaging Mockup ]"
                  placeholderClass="aspect-video bg-gray-50 flex items-center justify-center text-[10px] text-gray-300 uppercase tracking-widest border border-gray-100"
                  className="w-full"
                />
                <CaseImage
                  src={imgs[8]}
                  alt={`${project.title} — signage`}
                  placeholderText="[ Insert Environmental / Signage Mockup ]"
                  placeholderClass="aspect-[3/4] bg-gray-50 flex items-center justify-center text-[10px] text-gray-300 uppercase tracking-widest border border-gray-100"
                  className="w-full"
                />
                <CaseImage
                  src={imgs[9]}
                  alt={`${project.title} — social media`}
                  placeholderText="[ Insert Social Media Template Grid ]"
                  placeholderClass="aspect-video bg-gray-50 flex items-center justify-center text-[10px] text-gray-300 uppercase tracking-widest border border-gray-100"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* 06 / Outcome */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t-2 border-black pt-20">
            <div className="md:col-span-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-black sticky top-32">06 / Outcome</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-4xl font-serif italic leading-tight text-black mb-12">{caseStudy.outcome}</p>
              <CaseImage
                src={imgs[10]}
                alt={`${project.title} — final outcome`}
                placeholderText="[ Final Hero Montage ]"
                placeholderClass="aspect-video bg-gray-900 flex items-center justify-center text-xs text-gray-600 border border-dashed border-gray-800 uppercase tracking-widest"
                className="w-full"
              />
            </div>
          </div>

          {/* Extra images gallery (index 11+) */}
          {imgs.length > 11 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {imgs.slice(11).map((src, i) => (
                <img key={i} src={src} alt={`${project.title} — detail ${i + 1}`} className="w-full" />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6 lg:px-12 py-40 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-serif italic mb-12">Experience the <span className="font-normal not-italic">Legacy</span>.</h2>
          <a href="mailto:mahakasi3108@gmail.com" className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] bg-white text-black px-12 py-6 hover:bg-gray-200 transition-colors">
            Discuss a similar project <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
};
