import React from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Footer = () => {
  const user = useSelector((state)=>state?.user?.User)
 return (
  <footer className="bg-gray-950 text-gray-300 py-10 px-6 md:px-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

      <div>
        <h1 className="text-lg font-bold text-white mb-4">
          MERN <span className="text-blue-500">ESTATE</span>
        </h1>
        <p className="text-sm leading-relaxed text-gray-400">
          This is a modern MERN estate web application. Built with React and Tailwind CSS for smooth UI and best UX.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-green-400 mb-4">Quick Links</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="/" className="hover:underline hover:text-white cursor-pointer">Home</a></li>
          <li><a href="/about" className="hover:underline hover:text-white cursor-pointer">About</a></li>
          {
            !user && <li><a href="/signup" className="hover:underline hover:text-white cursor-pointer">Sign Up</a></li>
          }
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-purple-400 mb-4">Contact</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2">
            <FaLinkedin className="text-blue-500 text-lg" />
            <a
              href="https://www.linkedin.com/in/muhammadfahadashraf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-white cursor-pointer"
            >
              LinkedIn
            </a>
          </li>
          <li className="flex items-center gap-2">
            <FaGithub className="text-gray-300 text-lg" />
            <a
              href="https://github.com/MuhammadFahad27"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-white cursor-pointer"
            >
              GitHub
            </a>
          </li>
          <li className="flex items-center gap-2">
            <FaWhatsapp className="text-green-400 text-lg" />
            <a
              href="https://wa.me/923233323883"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-white cursor-pointer"
            >
              0323 3323883
            </a>
          </li>
          <li className="flex items-center gap-2">
            <FaEnvelope className="text-red-400 text-lg" />
            <a
              href="mailto:muhammadfahadkamboh3@gmail.com"
              className="hover:underline hover:text-white cursor-pointer"
            >
              muhammadfahadkamboh3@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
      © {new Date().getFullYear()} MERN Estate. All rights reserved.
    </div>
  </footer>
);

};

export default Footer;
