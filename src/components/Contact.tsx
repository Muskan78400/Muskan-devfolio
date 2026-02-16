import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';


interface ContactProps {
  darkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: 'muskansingal113@gmail.com',
      link: 'mailto:muskansingal113@gmail.com'
    },
    {
      icon: <Phone size={20} />,
      label: 'Phone',
      value: '+91 9466053075',
      link: 'tel:+919466053075'
    },
    {
      icon: <MapPin size={20} />,
      label: 'Location',
      value: 'Chiranjeev colony, Bhiwani-127021, Haryana, India',
      link: null
    }
  ];

  return (
    <section
      id="contact"
      ref={contactRef}
      className={`py-16 md:py-24 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } opacity-0 transition-opacity duration-1000`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            I'm always open to new opportunities and collaborations. 
            Feel free to reach out if you have a question or just want to connect.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className={`p-6 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`mr-3 mt-1 p-2 rounded-full ${
                        darkMode ? 'bg-gray-600 text-blue-400' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {info.icon}
                      </div>
                      <div>
                        <p className={`text-sm ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {info.label}
                        </p>
                        {info.link ? (
                          <a 
                            href={info.link} 
                            className={`font-medium hover:underline ${
                              darkMode ? 'text-blue-400' : 'text-blue-600'
                            }`}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-medium mb-4">Follow Me</h4>
                  <div className="flex space-x-4">
                    {[ { url: 'https://github.com/Muskan78400', icon: 'fab fa-github' },
      { url: 'https://linkedin.com/in/muskan-aggarwal-29213a324', icon: 'fab fa-linkedin' },
      { url: 'mailto:muskansingal113@gmail.com', icon: 'fas fa-envelope' },
      { url: '#', icon: 'fas fa-globe' },].map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full transition-colors ${
                          darkMode 
                            ? 'bg-gray-600 text-white hover:bg-blue-500' 
                            : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
                        }`}
                        aria-label={`Social media link ${index + 1}`}
                      >
                        {/* Social media icon would go here */}
                        <i className={`${link.icon} w-5 h-5`}></i>

                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <form 
                onSubmit={handleSubmit}
                className={`p-6 rounded-lg shadow-md ${
                  darkMode ? 'bg-gray-700' : 'bg-white'
                }`}
              >
                <h3 className="text-xl font-bold mb-6">Send a Message</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label 
                      htmlFor="name" 
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2 rounded-lg ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-400' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                      } border focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="email" 
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2 rounded-lg ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-400' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                      } border focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label 
                    htmlFor="subject" 
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                </div>
                
                <div className="mb-6">
                  <label 
                    htmlFor="message" 
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-2 rounded-lg ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-400' 
                        : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                    } border focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                </div>
                
                {submitStatus === 'success' && (
                  <div className="mb-6 p-3 rounded-lg bg-green-100 text-green-800">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mb-6 p-3 rounded-lg bg-red-100 text-red-800">
                    There was an error sending your message. Please try again.
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 rounded-lg flex items-center justify-center transition-colors ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  } ${
                    darkMode 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;