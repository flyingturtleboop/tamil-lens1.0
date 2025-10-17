'use client';

import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg shadow-sm z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo/Branding */}
        <a href="#home" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
            Ta
          </div>
          <span className="text-2xl font-bold text-slate-900">Tamil Lens</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-slate-700 hover:text-cyan-600 transition font-medium">
            Home
          </a>
          <a href="#learn" className="text-slate-700 hover:text-cyan-600 transition font-medium">
            Lens & Learn
          </a>
          <a href="#quiz" className="text-slate-700 hover:text-cyan-600 transition font-medium">
            Practice Quiz
          </a>
          <div className="h-6 w-px bg-slate-300"></div>
          <a 
            href="/signin" 
            className="text-slate-700 hover:text-cyan-600 transition font-medium"
          >
            Sign In
          </a>
          <a 
            href="/signup" 
            className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 hover:bg-slate-100 rounded-lg transition"
          aria-label="Menu"
        >
          <span className="w-6 h-0.5 bg-slate-700"></span>
          <span className="w-6 h-0.5 bg-slate-700"></span>
          <span className="w-6 h-0.5 bg-slate-700"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
            <a 
              href="#home" 
              className="text-slate-700 hover:text-cyan-600 transition font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#learn" 
              className="text-slate-700 hover:text-cyan-600 transition font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Lens & Learn
            </a>
            <a 
              href="#quiz" 
              className="text-slate-700 hover:text-cyan-600 transition font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Practice Quiz
            </a>
            <div className="h-px bg-slate-200 my-2"></div>
            <a 
              href="/signin" 
              className="text-slate-700 hover:text-cyan-600 transition font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </a>
            <a 
              href="/signup" 
              className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}