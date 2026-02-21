import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen w-full bg-[#EBEBEB] dark:bg-[#121212] flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans transition-colors duration-300">
      {/* Main Card Container */}
      <div className="w-full max-w-[1440px] h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)] md:h-[calc(100vh-4rem)] bg-white dark:bg-[#1E1E1E] rounded-[30px] sm:rounded-[40px] shadow-sm flex flex-col relative overflow-hidden transition-colors duration-300">

        {/* Top Navbar */}
        <div className="flex items-center justify-between px-6 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 shrink-0">
          {/* Logo Area */}
          <Link to="/" className="flex flex-col group">
            <span className="font-bold text-lg sm:text-xl md:text-2xl leading-tight uppercase text-black dark:text-white tracking-widest group-hover:opacity-80 transition-opacity">
              PIXFOLIO
            </span>
            <span className="text-[10px] md:text-xs text-black dark:text-gray-400 font-medium tracking-wide lowercase mt-0.5">
              digital arts archive
            </span>
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 flex flex-col lg:flex-row px-6 sm:px-8 md:px-12 pb-2 sm:pb-4 md:pb-8 lg:pb-12 gap-6 sm:gap-10 lg:gap-16 xl:gap-24 overflow-y-auto lg:overflow-hidden">

          {/* Left Column Text Area */}
          <div className="flex-1 flex flex-col justify-center py-4 lg:py-0 relative min-h-[220px] sm:min-h-[300px] lg:min-h-0 shrink-0">
            <div className="max-w-xl">
              {/* 404 Typography */}
              <h1 className="text-[110px] sm:text-[140px] md:text-[180px] lg:text-[220px] xl:text-[280px] font-bold leading-none text-[#E8E8E8] dark:text-[#2A2A2A] tracking-tighter select-none -ml-1 sm:-ml-2 md:-ml-4">
                404
              </h1>
              {/* Description text */}
              <p className="text-sm md:text-base text-[#666666] dark:text-gray-400 mt-2 sm:mt-4 md:mt-8 max-w-[280px] sm:max-w-sm font-medium leading-relaxed">
                The page you are looking for was moved, removed, renamed or might never existed.
              </p>
            </div>

            {/* Copyright (Desktop) */}
            <div className="hidden lg:block absolute bottom-0 left-0">
              <p className="text-[11px] text-[#999999] dark:text-gray-500 font-medium whitespace-nowrap">
                Copyright by Pixfolio {new Date().getFullYear()}. All rights reserved.
              </p>
            </div>
          </div>

          {/* Right Column Image Area */}
          <div className="flex-1 relative w-full min-h-[350px] sm:min-h-[400px] lg:min-h-0 h-full rounded-[24px] sm:rounded-[30px] overflow-hidden group shrink-0 mb-6 lg:mb-0">
            {/* Using a high-quality Unsplash portrait to match the Dribbble vibe */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1400&auto=format&fit=crop"
              alt="Not Found Illustration"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
            {/* Overlay Gradient for contrast */}
            <div className="absolute inset-0 bg-black/5 dark:bg-black/20"></div>

            {/* Back to Home CTA overlayed on the image */}
            <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 z-10">
              <Link
                to="/"
                className="bg-white hover:bg-gray-50 text-black px-6 py-3.5 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-full font-bold text-sm md:text-base shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center transform hover:-translate-y-1 whitespace-nowrap"
              >
                Back to Home
              </Link>
            </div>
          </div>

        </div>

        {/* Copyright (Mobile) */}
        <div className="lg:hidden text-center pb-5 sm:pb-6 px-6 sm:px-8 shrink-0 bg-white dark:bg-[#1E1E1E] pt-2 mt-auto">
          <p className="text-[10px] sm:text-[11px] text-[#999999] dark:text-gray-500 font-medium">
            Copyright by Pixfolio {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
