import React, { useEffect, useRef } from 'react';
import { Code, GraduationCap, Briefcase, Award } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={aboutRef}
      className={`py-16 md:py-24 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } opacity-0 transition-opacity duration-1000`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <p className={`text-lg leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
           I’m Muskan, a Computer Engineering student specializing in Frontend Development with a strong foundation in Web Development and Data Structures & Algorithms (DSA). I have built multiple projects that highlight my ability to design responsive, interactive, and user-friendly interfaces.
          </p>

          <p className={`text-lg leading-relaxed mb-12 ${darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
            Today, I focus on creating clean, efficient code and intuitive user experiences.
            I'm constantly learning new technologies and methodologies to stay at the forefront
            of this rapidly evolving field.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              
              {
                icon: <GraduationCap size={32} className="text-blue-500" />,
                title: 'Programming Languges',
                description: 'Basics of C++ and C, Java, SQL, HTML, CSS, JavaScript, React Js.'
              },
              {
                icon: <Code size={32} className="text-blue-500" />,
                title: 'Tools',
                description: 'Dev C++, VS Code, GitHub, Jupyter Notebook, MySQL Workbench,Eclipse.'
              },
              {
                icon: <Briefcase size={32} className="text-blue-500" />,
                title: 'Problem Solving',
                description: 'Finding solutions through a strong foundation in Data Structures and Algorithms'
              },
              {
                icon: <Award size={32} className="text-blue-500" />,
                title: 'Quality Focus',
                description: 'Emphasis on clean code, testing, and maintainability'
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg text-center transition-transform hover:scale-105 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
              >
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;