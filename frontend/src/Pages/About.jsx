import React from 'react';
import { Link } from 'react-router-dom';
import me from '../assets/me.jpg';

import { FaSearchLocation, FaChartLine, FaShieldAlt, FaUniversity, FaCode, FaTools } from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';

const About = () => {
return (
  <div className="max-w-7xl mx-auto px-4 py-12">

    {/* About the App */}
    <section className="mb-20">
      <h1 className="text-4xl font-bold text-indigo-400 mb-6">MERN ESTATE</h1>
      <p className="text-lg text-gray-300 mb-12 max-w-3xl">
        MERN ESTATE is a real estate platform designed to simplify property search 
        with smart filters, virtual tours, and real-time market insights.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-slate-800 p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="text-indigo-400 text-3xl mb-4">
            <FaSearchLocation />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">Smart Search</h3>
          <p className="text-gray-400">Find properties matching your exact needs with our AI-driven recommendation engine.</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="text-indigo-400 text-3xl mb-4">
            <FaChartLine />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">Data-Driven</h3>
          <p className="text-gray-400">Get pricing trends, neighborhood stats, and investment potential with real-time analytics.</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="text-indigo-400 text-3xl mb-4">
            <FaShieldAlt />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">Trusted</h3>
          <p className="text-gray-400">Trusted by 10,000+ happy clients since 2023 with a 98% satisfaction rate.</p>
        </div>
      </div>
    </section>

    {/* Developer Section */}
    <section className="bg-slate-900 rounded-2xl p-10 mb-20 shadow-inner">
      <h2 className="text-3xl font-bold text-center text-gray-100 mb-10">Meet the Developer</h2>

      <div className="flex flex-col lg:flex-row items-center gap-10">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img 
            src={me} 
            alt="Muhammad Fahad Ashraf" 
            className="w-64 h-64 object-cover rounded-full border-4 border-indigo-700 shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Muhammad Fahad Ashraf</h3>
          <p className="text-gray-300">
            A full-stack developer from Karachi, Pakistan, with a passion for building user-focused web apps that make life easier.
          </p>

          <div>
            <h4 className="flex items-center gap-2 text-xl font-semibold text-gray-200">
              <FaUniversity /> Education
            </h4>
            <p className="text-gray-400 mt-1">
              Bachelor's in Computer Science from Dawood University of Engineering and Technology (DUET).
            </p>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-xl font-semibold text-gray-200">
              <FaCode /> Technical Skills
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                'MERN Stack', 'MongoDB', 'Express.js', 'React', 'Node.js',
                'Tailwind CSS', 'HTML/CSS', 'MySQL', 'C++', 'Java', 'Python'
              ].map(skill => (
                <span key={skill} className="bg-slate-800 border border-gray-600 px-3 py-1 rounded-full text-sm text-gray-300 shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-xl font-semibold text-gray-200">
              <FaTools /> Tools
            </h4>
            <p className="text-gray-400 mt-1">Postman (REST APIs), Git, VS Code</p>
          </div>

          <p className="text-gray-300 italic pt-2">
            “EstatePro was born from my own struggles in finding the perfect home. 
            I combined my technical skills with real estate passion to create this platform.”
          </p>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="text-center">
      <Link 
        to="/search" 
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-md transition"
      >
        Explore Properties <HiArrowNarrowRight className="w-5 h-5" />
      </Link>
    </section>
  </div>
);

}

export default About;
