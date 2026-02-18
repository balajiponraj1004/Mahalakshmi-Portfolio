
import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Grid, 
  Layout, 
  Columns, 
  Search, 
  ArrowLeft,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { PortfolioData, ViewMode, PortfolioItem } from '../types';
import { ProjectModal } from '../components/ProjectModal';

interface CategoryPageProps {
  data: PortfolioData;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ data }) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('masonry');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const category = data.categories.find(c => c.id === categoryId);

  const filteredItems = useMemo(() => {
    if (!category) return [];
    return category.items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [category, searchQuery]);

  const handleBackToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    // Scroll to the categories section after navigation
    setTimeout(() => {
      const element = document.getElementById('categories');
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  if (!category) return <div>Category not found.</div>;

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 lg:px-12 py-16 md:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <a 
            href="#categories"
            onClick={handleBackToPortfolio}
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold mb-12 hover:translate-x-[-8px] transition-transform cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </a>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 tracking-tight">
                {category.title}
              </h1>
              <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl">
                {category.longDescription}
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <span className="text-sm font-medium text-gray-400">Total Projects</span>
              <div className="text-5xl font-serif mt-1">{category.items.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 py-4 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search in this category..."
              className="w-full bg-gray-50 border-none pl-12 pr-4 py-3 text-sm focus:ring-1 focus:ring-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* View Switcher */}
          <div className="flex items-center gap-2 bg-gray-50 p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
              title="Grid View"
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('masonry')}
              className={`p-2 transition-all ${viewMode === 'masonry' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
              title="Masonry View"
            >
              <Layout size={18} />
            </button>
            <button 
              onClick={() => setViewMode('large')}
              className={`p-2 transition-all ${viewMode === 'large' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
              title="Large View"
            >
              <Columns size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="py-20 text-center text-gray-400 font-serif text-2xl italic">
              No matches found for "{searchQuery}"
            </div>
          ) : (
            <>
              {viewMode === 'masonry' && (
                <div className="masonry-grid">
                  {filteredItems.map(item => (
                    <div 
                      key={item.id} 
                      className="masonry-item group cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="relative overflow-hidden bg-gray-100">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                      </div>
                      <div className="mt-4 flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold tracking-tight">{item.title}</h4>
                          <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                            {item.tags.join(', ')}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-gray-300">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredItems.map(item => (
                    <div 
                      key={item.id} 
                      className="group cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="aspect-square relative overflow-hidden bg-gray-100">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="mt-6">
                        <h4 className="text-xl font-bold tracking-tight">{item.title}</h4>
                        <div className="flex gap-2 mt-2">
                           {item.tags.slice(0, 2).map(tag => (
                             <span key={tag} className="text-[9px] uppercase tracking-widest font-bold px-2 py-1 border border-gray-100">{tag}</span>
                           ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {viewMode === 'large' && (
                <div className="space-y-32">
                  {filteredItems.map(item => (
                    <div 
                      key={item.id} 
                      className="group flex flex-col items-center cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="w-full max-w-5xl aspect-video overflow-hidden bg-gray-100 shadow-xl">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                        />
                      </div>
                      <div className="mt-12 text-center max-w-2xl">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">{item.tags.join(' / ')}</span>
                        <h4 className="text-4xl md:text-5xl font-serif mt-4 mb-6">{item.title}</h4>
                        <p className="text-gray-500 leading-relaxed italic">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Load More Mockup */}
          {filteredItems.length > 0 && (
            <div className="mt-32 pb-20 text-center">
              <button className="px-10 py-5 border border-gray-200 text-xs font-bold uppercase tracking-widest hover:border-black transition-colors">
                Load More Work
              </button>
            </div>
          )}
        </div>
      </div>

      <ProjectModal 
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
