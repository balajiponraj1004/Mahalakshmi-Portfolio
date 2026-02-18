import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handlePortfolioClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation and mount before scrolling
      setTimeout(() => {
        const element = document.getElementById('categories');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('categories');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '#categories', onClick: handlePortfolioClick },
    { name: 'Resume', path: '/resume' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 no-print">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity">
            MAHA<span className="text-gray-400">LAKSHMI</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              link.onClick ? (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={link.onClick}
                  className="text-sm font-medium tracking-wide text-gray-500 hover:text-black transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide hover:text-black transition-colors ${
                    isActive(link.path) ? 'text-black' : 'text-gray-500'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
            <a
              href="mailto:mahakasi3108@gmail.com"
              className="px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center gap-2"
            >
              Contact Me <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-8 space-y-6 absolute w-full shadow-xl">
          {navLinks.map((link) => (
            link.onClick ? (
              <a
                key={link.name}
                href={link.path}
                onClick={link.onClick}
                className="block text-2xl font-bold"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className="block text-2xl font-bold"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            )
          ))}
          <a
            href="mailto:mahakasi3108@gmail.com"
            className="block py-4 border-t border-gray-100 text-lg font-medium"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};