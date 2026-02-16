import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className={`py-8 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              &copy; {new Date().getFullYear()} Muskan Aggarwal. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={scrollToTop}
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700' 
                  : 'bg-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-300'
              }`}
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;