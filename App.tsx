
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const CategoryPage = lazy(() => import('./pages/CategoryPage').then(m => ({ default: m.CategoryPage })));
const ResumePage = lazy(() => import('./pages/ResumePage').then(m => ({ default: m.ResumePage })));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage').then(m => ({ default: m.CaseStudyPage })));
const DesignAssistant = lazy(() => import('./components/DesignAssistant').then(m => ({ default: m.DesignAssistant })));
import { PortfolioData } from './types';
import { portfolioData } from './data/portfolio';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [data] = useState<PortfolioData>(portfolioData);

  return (
    <Router>
      <ScrollToTop />
      <div className="antialiased text-gray-900 bg-[#fafafa] selection:bg-black selection:text-white">
        <Navbar />
        <main>
          <Suspense fallback={<div className="p-20 text-center">Loading…</div>}>
            <Routes>
              <Route path="/" element={<HomePage data={data} />} />
              <Route path="/category/:categoryId" element={<CategoryPage data={data} />} />
              <Route path="/resume" element={<ResumePage data={data} />} />
              <Route path="/case-study/:projectId" element={<CaseStudyPage data={data} />} />
              <Route path="*" element={<HomePage data={data} />} />
            </Routes>
            <Suspense fallback={null}>
              <DesignAssistant data={data} />
            </Suspense>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
