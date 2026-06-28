import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="border-b border-gray-200 bg-gray-50 px-4 py-20 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-revenue-100 px-3 py-1 text-xs font-semibold text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300">
            Get Started
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Start recovering revenue today.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Connect in 30 minutes. See your first Top 5 Actions immediately. Recover $40,000+
            in your first month — or your money back.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Start your trial</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Fill in your details and we'll get you set up within 24 hours.
            </p>

            <form className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500"
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Work email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500"
                  placeholder="jane@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company name
                </label>
                <input
                  type="text"
                  id="company"
                  className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500"
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label htmlFor="revenue" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Annual revenue range
                </label>
                <select
                  id="revenue"
                  className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                >
                  <option value="">Select a range</option>
                  <option value="under-2m">Under $2M</option>
                  <option value="2m-5m">$2M – $5M</option>
                  <option value="5m-10m">$5M – $10M</option>
                  <option value="10m-25m">$10M – $25M</option>
                  <option value="25m-50m">$25M – $50M</option>
                  <option value="over-50m">Over $50M</option>
                </select>
              </div>

              <div>
                <label htmlFor="tools" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tools you currently use
                </label>
                <input
                  type="text"
                  id="tools"
                  className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500"
                  placeholder="Salesforce, Gmail, Google Ads, ..."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Anything else? (optional)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500"
                  placeholder="Tell us about your revenue challenges..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-revenue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-revenue-500/25 transition-all hover:bg-revenue-700 hover:shadow-xl dark:bg-revenue-500 dark:hover:bg-revenue-400"
              >
                Start Your Free Trial
              </button>

              <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                30-day money-back guarantee. No credit card required.
              </p>
            </form>
          </div>

          {/* Info sidebar */}
          <div className="space-y-8 lg:pt-14">
            <div className="rounded-2xl border border-revenue-200 bg-gradient-to-br from-revenue-50 to-white p-8 shadow-lg dark:border-revenue-800 dark:from-revenue-950 dark:to-gray-950">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">What happens next?</h3>
              <ol className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-revenue-600 text-xs font-bold text-white">1</span>
                  <span>We review your submission and reach out within 24 hours.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-revenue-600 text-xs font-bold text-white">2</span>
                  <span>We connect your tools in a 15-minute guided setup call.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-revenue-600 text-xs font-bold text-white">3</span>
                  <span>Within 30 minutes, you receive your first Top 5 Actions report.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-revenue-600 text-xs font-bold text-white">4</span>
                  <span>Start recovering revenue immediately. Cancel anytime within 30 days for a full refund.</span>
                </li>
              </ol>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-950">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Already a customer?</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Log in to your dashboard or contact support.
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <a href="mailto:support@revenueos.com" className="flex items-center gap-2 text-revenue-600 hover:text-revenue-700 dark:text-revenue-400 dark:hover:text-revenue-300">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@revenueos.com
                </a>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  Live chat available 9 AM – 6 PM ET
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-950">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Prefer to talk?</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Book a 15-minute call to see RevenueOS in action and get a custom ROI estimate.
              </p>
              <button className="mt-4 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}