import React, { useEffect, useRef } from 'react';
import { Building, Calendar } from 'lucide-react';

interface EducationProps {
  darkMode: boolean;
}

interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
}

const educationData: EducationItem[] = [
  {
    id: 1,
    institution: 'The Technological Institute of Textile & Sciences, Bhiwani',
    degree: 'Bachelor of Technology',
    field: 'Computer Engineering',
    startDate: '2022',
    endDate: '2026',
    description: ' Pursuing B.Tech in Computer Engineering (8.9 CGPA) with a strong foundation in programming, data structures, algorithms, and full stack web development, along with core subjects like Artificial Intelligence, Computer Networks, OOPs, Data Science, Software Engineering, and DBMS.',
    location: 'Bhiwani, Haryana'
  },
  {
    id: 2,
    institution: 'Government Girls Senior Secondary School,Rewari',
    degree: '12th (Non-Medical)',
    field: 'PCM',
    startDate: '2020',
    endDate: '2022',
    description: 'Completed school education (89.6%) with Physics, Chemistry, Mathematics (PCM) .',
    location: 'Bhiwani, Haryana'
  },

];

const Education: React.FC<EducationProps> = ({ darkMode }) => {
  const educationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (educationRef.current) {
      observer.observe(educationRef.current);
    }

    return () => {
      if (educationRef.current) {
        observer.unobserve(educationRef.current);
      }
    };
  }, []);

  return (
    <section
      id="education"
      ref={educationRef}
      className={`py-16 md:py-24 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
        } opacity-0 transition-opacity duration-1000`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div
              className={`absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full ${darkMode ? 'bg-gray-700' : 'bg-gray-300'
                }`}
            ></div>

            {educationData.map((item, index) => (
              <div
                key={item.id}
                className={`mb-12 relative ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  } md:w-1/2 ${index % 2 === 0 ? 'md:ml-0 md:mr-auto' : 'md:ml-auto md:mr-0'
                  }`}
                style={{ marginLeft: index % 2 === 0 ? '0' : 'auto' }}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 md:left-auto ${index % 2 === 0 ? 'md:right-[-8px]' : 'md:left-[-8px]'
                    } top-5 w-4 h-4 rounded-full bg-blue-500 border-4 ${darkMode ? 'border-gray-900' : 'border-gray-50'
                    }`}
                ></div>

                <div
                  className={`p-6 rounded-lg shadow-md transition-transform hover:scale-105 ml-8 md:ml-0 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
                    }`}
                >
                  <h3 className="text-xl font-bold mb-1">{item.degree} in {item.field}</h3>
                <div className="mb-2 text-sm text-blue-500 flex gap-1">
  <Building size={16} className="inline-flex" style={{ verticalAlign: 'top' }} />
  <span className="whitespace-normal">{item.institution}</span>
</div>




                  <div className={`flex items-center mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
                    } gap-1`}>
                    <Calendar size={16} />
                    <span>{item.startDate} - {item.endDate}</span>
                    <span className="mx-2">•</span>
                    <span>{item.location}</span>
                  </div>

                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;