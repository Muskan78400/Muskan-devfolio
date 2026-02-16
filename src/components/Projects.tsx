import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Globe } from 'lucide-react';
import voyage from '../Assets/voyage.png';
import empl from '../Assets/empl.png';



interface ProjectsProps {
  darkMode: boolean;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    demo?: string;
    github?: string;
    live?: string;
  };
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Receipe Maker',
    description: 'Developed a responsive web-based Recipe Maker application that allows users to create, view, edit, and delete receipes',
    image: voyage,
    tags: ['HTML', 'CSS', 'Javascript'],
    links: {
      demo: 'https://muskan78400.github.io/Reciepe-Maker/',
      github: 'https://github.com/Muskan78400/Reciepe-Maker',
    }
  },
  {
    id: 2,
    title: 'Adventure Game',
    description: 'Built an interactive browser-based Adventure Game where users navigate through story levels with choices and outcomes.',
    image: empl,
    tags: ['HTML','CSS' ,'Javascript'],
    links: {
      live: 'http://127.0.0.1:5500/Adventure%20Game/files/index.html',
    }
  },

];
const Projects: React.FC<ProjectsProps> = ({ darkMode }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectsData);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

  // Get unique tags
  const allTags = ['all', ...Array.from(new Set(projectsData.flatMap(project => project.tags)))];

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(projectsData.filter(project => project.tags.includes(filter)));
    }
  };

  const renderProjectCards = (data: Project[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((project) => (
        <div
          key={project.id}
          className={`rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 ${
            darkMode ? 'bg-gray-700' : 'bg-white'
          }`}
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`text-xs px-2 py-1 rounded-full ${
                    darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Github size={20} />
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Globe size={20} />
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section
      id="projects"
      ref={projectsRef}
      className={`py-16 md:py-24 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} opacity-0 transition-opacity duration-1000`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Projects */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-8"></div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleFilterChange(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === tag
                    ? 'bg-blue-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </div>
          {renderProjectCards(filteredProjects)}
        </div>

        {/* Other / Client Projects */}
        
      </div>
    </section>
  );
};

export default Projects;