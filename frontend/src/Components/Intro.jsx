import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaSearch, FaHome, FaChartLine, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.jpg';
import { useSelector } from 'react-redux';

const Intro = () => {
  

  return (
  <div className={`min-h-screen flex flex-col bg-slate-900 text-gray-200`}>
    {/* Hero Section */}
    <section className={`relative bg-gradient-to-r from-slate-800 to-slate-900
    py-16 md:py-24 lg:py-32`}>
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 leading-tight">
            Find Your <span className="text-indigo-400">Dream Home</span> Today
          </h1>
          <p className="text-lg md:text-xl text-slate-300">
            Discover properties that match your lifestyle. Our search 
            makes finding your perfect home effortless.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/search" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              Explore Properties <FaArrowRight />
            </Link>
            <Link 
              to="/about" 
              className="border border-slate-600 hover:border-indigo-500 text-slate-300 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              Learn More
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="text-center">
              <span className="block text-2xl font-bold text-indigo-400">50,000+</span>
              <p className="text-slate-400">Properties</p>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-indigo-400">120+</span>
              <p className="text-slate-400">Locations</p>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-indigo-400">98%</span>
              <p className="text-slate-400">Satisfaction</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 relative mt-10 lg:mt-0">
          <div className="bg-slate-800 p-2 rounded-2xl shadow-xl transform rotate-1">
            <img 
              src={logo} 
              alt="Modern Home" 
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
         
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section id="features" className="py-16 md:py-24 lg:py-32 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Why Choose EstatePro</h2>
          <p className="text-lg text-slate-300">
            We make finding your dream home simple and stress-free with our innovative tools and services
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-700 p-8 rounded-xl hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-indigo-700 rounded-full flex items-center justify-center mb-6">
              <FaSearch className="text-indigo-400 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3">Smart Search</h3>
            <p className="text-slate-300">
              Our advanced filters help you find exactly what you're looking for with precision and ease.
            </p>
          </div>
          <div className="bg-slate-700 p-8 rounded-xl hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-indigo-700 rounded-full flex items-center justify-center mb-6">
              <FaHome className="text-indigo-400 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3">Virtual Tours</h3>
            <p className="text-slate-300">
              Explore properties from the comfort of your current home with our immersive 3D tours.
            </p>
          </div>
          <div className="bg-slate-700 p-8 rounded-xl hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-indigo-700 rounded-full flex items-center justify-center mb-6">
              <FaChartLine className="text-indigo-400 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-3">Market Insights</h3>
            <p className="text-slate-300">
              Get real-time data on neighborhood trends, pricing, and investment potential.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-16 md:py-24 bg-indigo-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of happy homeowners who found their perfect match with us.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/search" 
            className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
          >
            Get Started <FaArrowRight />
          </Link>
         
        </div>
      </div>
    </section>

  </div>
);

};

export default Intro;