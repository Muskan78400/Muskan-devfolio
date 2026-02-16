import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? `${darkMode ? 'bg-gray-900/95 shadow-gray-900/20' : 'bg-white/95 shadow-gray-200/20'} backdrop-blur-md shadow-lg`
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex-shrink-0">
            <a 
              href="#hero" 
              className={`text-xl font-bold transition-colors ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Portfolio
            </a>
          </div>
          
          <div className="hidden md:block">
            <nav className="ml-10 flex items-center space-x-8">
              {['About', 'Education', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                    darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                darkMode 
                  ? 'text-yellow-300 hover:bg-gray-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              className="md:hidden p-2 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X 
                  size={24} 
                  className={darkMode ? 'text-white' : 'text-gray-900'} 
                />
              ) : (
                <Menu 
                  size={24} 
                  className={darkMode ? 'text-white' : 'text-gray-900'} 
                />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div 
          className={`md:hidden fixed inset-0 top-16 z-40 transition-all duration-300 ease-in-out ${
            darkMode ? 'bg-gray-900' : 'bg-white'
          }`}
        >
          <nav className="flex flex-col space-y-4 p-4">
            {['About', 'Education', 'Projects', 'Experience', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`py-3 px-4 text-lg font-medium rounded-md transition-colors ${
                  darkMode 
                    ? 'text-white hover:bg-gray-800' 
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;