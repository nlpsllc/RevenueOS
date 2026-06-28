import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl dark:border-gray-800/60 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-revenue-600 text-sm font-bold text-white">
            R
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            Revenue<span className="text-revenue-600 dark:text-revenue-400">OS</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-revenue-50 text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            className="ml-4 rounded-lg bg-revenue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-revenue-700 hover:shadow-md dark:bg-revenue-500 dark:hover:bg-revenue-400"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white px-4 pb-4 pt-2 dark:border-gray-800 dark:bg-gray-950 md:hidden">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-revenue-50 text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block rounded-lg bg-revenue-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}