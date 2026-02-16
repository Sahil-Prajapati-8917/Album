import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-archive-bg-light dark:bg-archive-bg-dark font-display text-[#111816] transition-colors duration-300">
      {/* Main Layout Container: Fixed non-scrollable screen */}
      <div className="relative flex h-screen w-full flex-col overflow-hidden">
        {/* Centered Content Area */}
        <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="max-w-2xl w-full space-y-8">
            {/* Hero Typography */}
            <div className="relative">
              <h1 className="font-serif-elegant text-[120px] md:text-[220px] leading-none text-[#111816] dark:text-white select-none opacity-90">
                404
              </h1>
            </div>
            {/* Descriptive Section */}
            <div className="space-y-4">
              <h2 className="tracking-[0.4em] text-xs md:text-sm font-bold text-brand-green/60 dark:text-brand-green/80 uppercase">
                The Lost Archive
              </h2>
              <p className="text-lg md:text-xl font-light text-[#111816] dark:text-gray-300 max-w-md mx-auto leading-relaxed">
                The page you are looking for has been moved or archived.
              </p>
            </div>
            {/* CTA */}
            <div className="pt-8">
              <Link
                to="/"
                className="group relative inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase py-3 px-8 transition-all hover:text-brand-green dark:text-white"
              >
                <span className="relative z-10">Return to Sanctuary</span>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
              </Link>
            </div>
          </div>
        </main>

        {/* Minimal Footer Detail */}
        <footer className="absolute bottom-8 w-full text-center px-8">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 dark:text-gray-600 font-medium">
            © {new Date().getFullYear()} Pixfolio Digital Arts Archive
          </p>
        </footer>
      </div>
    </div>
  );
};

export default NotFound;
