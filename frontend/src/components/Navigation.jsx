import { Link as Linklogo } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full py-3 px-6 md:px-12 lg:px-24 ">
      <div className="flex items-center justify-between">
        <div style={{ filter: 'blur(0px)', opacity: 1, transform: 'none' }}>
          <Link to="/" className="flex items-center gap-3">
            <div
              className="flex aspect-square size-8 items-center border justify-center rounded-lg">
              <Linklogo className="h-5 w-5  "/>
            </div>
            <span className="text-xl text-black font-semibold">Pixfolio</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
          <Link to="/demo" className="text-gray-600 hover:text-gray-900  transition-colors">Demo</Link>
          <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
          <Link to="/login" className="text-gray-900 hover:text-gray-700 font-medium transition-colors">Sign In</Link>
          <Link to="/signup" className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">Get Started</Link>
        </div>
        <div className="md:hidden">
          <button 
            className="text-gray-900 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 py-4">
          <div className="flex flex-col gap-4 text-sm">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/demo" 
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Demo
            </Link>
            <Link 
              to="/pricing" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/login" 
              className="text-gray-900 hover:text-gray-700 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
