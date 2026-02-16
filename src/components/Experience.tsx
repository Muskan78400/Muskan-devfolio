import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin } from 'lucide-react';

interface ExperienceProps {
  darkMode: boolean;
}

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string;
}

const experiencesData: ExperienceItem[] = [
  {
    id: 1,
    role: 'Full Stack Development Intern (Ongoing)',
    company: 'Biz Infotechno Pvt. Ltd.',
    location: 'Chandigarh, India',
    duration: '30 July 2025 - Present',
    description: 'Developing responsive front-end components using HTML, CSS, JavaScript, and React.Utilized React Hooks and functional components to build dynamic and reusable UI elements.',
  },
  {
    id: 2,
    role: 'Cybersecurity Intern',
    company: 'Yhills Edutech Pvt. Ltd.',
    location: 'Remote',
    duration: 'Jun 2025 – Jul 2025',
    description: 'Gained practical experience in cybersecurity fundamentals: CIA Triad, threat analysis, and system security.Conducted vulnerability assessments and penetration testing with Wireshark Burp Suite',
  },
  {
    id: 3,
    role: 'Java Intern',
    company: 'Codsoft Company',
    location: 'Remote',
    duration: '2024',
    description: 'Contributed as a Java Developer Intern, building scalable applications using Java and SQL.',
  },
];

const Experience: React.FC<ExperienceProps> = ({ darkMode }) => {
  const experienceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = experienceRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    if (section.getBoundingClientRect().top < window.innerHeight) {
      section.classList.add('animate-fade-in');
      observer.unobserve(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={experienceRef}
      className={`py-16 md:py-24 opacity-0 transition-opacity duration-1000 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {experiencesData.map((exp) => (
            <div
              key={exp.id}
              className={`rounded-xl shadow-lg p-6 transition-all duration-300
                hover:shadow-2xl hover:-translate-y-2
                active:translate-y-1
                ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}
            >
              <h3 className="text-xl font-semibold mb-2">{exp.role}</h3>
              <div className={`text-sm font-medium mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {exp.company}
              </div>
              <div className={`flex items-center text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <MapPin size={16} className="mr-1" />
                <span>{exp.location}</span>
              </div>
              <div className={`flex items-center text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <Calendar size={16} className="mr-1" />
                <span>{exp.duration}</span>
              </div>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;