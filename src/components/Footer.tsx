import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-revenue-600 text-xs font-bold text-white">
                R
              </div>
              <span className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
                Revenue<span className="text-revenue-600 dark:text-revenue-400">OS</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              The AI Chief Revenue Officer for growth-stage businesses. Connect in 30 minutes, recover revenue immediately.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Product</h4>
            <ul className="mt-3 space-y-2">
              {[
                { to: "/features", label: "Features" },
                { to: "/how-it-works", label: "How It Works" },
                { to: "/pricing", label: "Pricing" },
                { to: "/contact", label: "Get Started" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 transition-colors hover:text-revenue-600 dark:text-gray-400 dark:hover:text-revenue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Resources</h4>
            <ul className="mt-3 space-y-2">
              {[
                { to: "/blog", label: "Blog" },
                { to: "/contact", label: "Support" },
                { to: "/contact", label: "Documentation" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 transition-colors hover:text-revenue-600 dark:text-gray-400 dark:hover:text-revenue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Company</h4>
            <ul className="mt-3 space-y-2">
              {[
                { to: "/", label: "About" },
                { to: "/blog", label: "News" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 transition-colors hover:text-revenue-600 dark:text-gray-400 dark:hover:text-revenue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 dark:border-gray-800 sm:flex-row">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} RevenueOS. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}