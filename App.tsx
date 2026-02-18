
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ResumePage } from './pages/ResumePage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { DesignAssistant } from './components/DesignAssistant';
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
          <Routes>
            <Route path="/" element={<HomePage data={data} />} />
            <Route path="/category/:categoryId" element={<CategoryPage data={data} />} />
            <Route path="/resume" element={<ResumePage data={data} />} />
            <Route path="/case-study/:projectId" element={<CaseStudyPage data={data} />} />
            <Route path="*" element={<HomePage data={data} />} />
          </Routes>
        </main>
        <DesignAssistant data={data} />
      </div>
    </Router>
  );
};

export default App;
