'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function Header() {
  const [activeSection, setActiveSection] = useState('');

  // Scroll Event Listener
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects'];
      let currentSection = '';

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='flex flex-col justify-between items-center p-6 px-10 fixed bg-transparent backdrop-blur-md'>
      <div className='flex items-center'>
        <h1 className='text-3xl font-bold text-white'>Raj Kumar</h1>
        <h2 className='ml-4 text-slate-300'>Front End Developer</h2>
      </div>

      <div className='flex flex-col gap-10'>
        {['about', 'experience', 'projects'].map((section) => (
          <Link key={section} href={`#${section}`}>
            <li
              className={`text-slate-100 flex items-center gap-2 hover:text-red-400 cursor-pointer ${
                activeSection === section ? 'text-red-400' : ''
              }`}
            >
              <div
                className={`w-6 h-0.5 ${
                  activeSection === section ? 'bg-red-400' : 'bg-slate-100'
                } hover:w-8`}
              ></div>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </li>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Header;
