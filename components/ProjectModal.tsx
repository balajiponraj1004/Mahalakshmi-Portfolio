
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, User, ArrowRight } from 'lucide-react';
import { PortfolioItem } from '../types';

interface ProjectModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ item, onClose }) => {
  const navigate = useNavigate();

  if (!item) return null;

  const handleCaseStudyClick = () => {
    onClose();
    navigate(`/case-study/${item.id}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-none shadow-2xl flex flex-col md:flex-row">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <X size={24} />
        </button>

        <div className="w-full md:w-2/3 bg-gray-100 p-4 md:p-12 flex items-center justify-center">
          <img 
            src={item.imageUrl} 
            alt={item.title}
            className="w-full h-auto max-h-[70vh] object-contain shadow-2xl"
          />
        </div>

        <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="flex gap-2 mb-6">
              {item.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase tracking-widest font-bold text-gray-400 border border-gray-200 px-2 py-1">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-4xl font-serif mb-4 leading-tight">{item.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              {item.description}
            </p>

            <div className="space-y-6 pt-10 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <Calendar size={18} className="text-gray-400" />
                <span className="text-sm font-medium">{item.date}</span>
              </div>
              {item.client && (
                <div className="flex items-center gap-4">
                  <User size={18} className="text-gray-400" />
                  <span className="text-sm font-medium">{item.client}</span>
                </div>
              )}
            </div>
          </div>

          <button 
            onClick={handleCaseStudyClick}
            className="mt-12 group flex items-center gap-4 text-xs font-bold uppercase tracking-widest hover:text-gray-500 transition-colors"
          >
            Full Project Case Study <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
