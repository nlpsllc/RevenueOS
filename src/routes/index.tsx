import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      {/* ─── Hero Section ─── */}
      <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-grid px-4 pt-20">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[600px] rounded-full bg-revenue-500/10 blur-[120px] dark:bg-revenue-500/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-revenue-200 bg-revenue-50 px-4 py-1.5 text-sm font-medium text-revenue-700 dark:border-revenue-800 dark:bg-revenue-950 dark:text-revenue-300">
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            Under 30 minutes to first revenue insight
          </div>

          {/* Headline */}
          <h1 className="animate-slide-up text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Your{" "}
            <span className="gradient-text">AI Chief Revenue Officer</span>
            <br />
            is ready in 30 minutes.
          </h1>

          {/* Subheadline */}
          <p className="delay-2 mx-auto mt-6 max-w-2xl animate-fade-in text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl">
            RevenueOS connects to your existing tools — CRM, email, ads — and continuously recovers
            missed leads, follows up until they buy, optimizes ad spend, and delivers a daily
            "Top 5 Actions" report ranked by revenue impact.
          </p>

          {/* CTAs */}
          <div className="delay-3 mt-10 flex animate-fade-in flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="rounded-xl bg-revenue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-revenue-500/25 transition-all hover:bg-revenue-700 hover:shadow-xl hover:shadow-revenue-500/30 dark:bg-revenue-500 dark:hover:bg-revenue-400"
            >
              Start Your Free Trial
            </Link>
            <Link
              to="/how-it-works"
              className="rounded-xl border border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
            >
              See How It Works
            </Link>
          </div>

          {/* Trust bar */}
          <div className="delay-4 mt-16 animate-fade-in">
            <p className="mb-6 text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Trusted by revenue teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-50 grayscale">
              {["Acme Corp", "TechFlow", "Meridian", "Stellar", "Nexus"].map((name) => (
                <span
                  key={name}
                  className="text-lg font-bold text-gray-500 dark:text-gray-400"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Section ─── */}
      <section className="border-y border-gray-200 bg-gray-50 px-4 py-16 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "$2.4M+", label: "Revenue Recovered" },
              { value: "12,000+", label: "Leads Re-engaged" },
              { value: "4.8x", label: "Avg. Follow-up Rate" },
              { value: "98.7%", label: "Uptime SLA" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-revenue-600 dark:text-revenue-400">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Feature Highlights ─── */}
      <section className="px-4 py-24" id="features">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-revenue-100 px-3 py-1 text-xs font-semibold text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300">
              Everything you need
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Your full-time CRO, reimagined as software.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Seven powerful modules that work 24/7 to find, win, and keep revenue.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                ),
                title: "Lead Recovery",
                desc: "Scans your CRM daily for leads that went cold or were never followed up. Automatically re-engages them with personalized outreach.",
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                title: "Follow-up Automation",
                desc: "Multi-channel sequences (email, SMS, LinkedIn) that persist until prospects book a meeting or clearly opt out — no lead left behind.",
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ),
                title: "Review Management",
                desc: "Monitors review platforms, detects new reviews instantly, and automatically requests satisfied customers to leave positive reviews.",
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                  </svg>
                ),
                title: "Ad Spend Optimization",
                desc: "Detects wasted spend across Google, Meta, and LinkedIn. Suggests reallocations that improve ROAS without manual analysis.",
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                ),
                title: "Churn Risk Detection",
                desc: "Analyzes usage patterns, sentiment, and engagement to flag at-risk accounts before they leave. Surfaces upsell opportunities in existing customers.",
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                ),
                title: "Competitor Monitoring",
                desc: "Tracks competitor pricing changes, new features, and positioning. Alerts you to threats and opportunities in real-time.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-revenue-200 hover:shadow-lg hover:shadow-revenue-500/5 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-revenue-800"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-revenue-50 text-revenue-600 dark:bg-revenue-950 dark:text-revenue-400">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/features"
              className="inline-flex items-center gap-1 text-sm font-semibold text-revenue-600 hover:text-revenue-700 dark:text-revenue-400 dark:hover:text-revenue-300"
            >
              Explore all features
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── How it works snapshot ─── */}
      <section className="bg-gray-50 px-4 py-24 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-revenue-100 px-3 py-1 text-xs font-semibold text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300">
              Get started in 30 minutes
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps to revenue recovery.
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Connect Your Stack",
                desc: "Grant read-only API access to your CRM, email platform, and ad accounts. No complex setup — we handle the integration.",
              },
              {
                step: "02",
                title: "AI Analyzes Everything",
                desc: "Our engine cross-references leads, campaigns, reviews, and engagement. It surfaces every pocket of missed revenue.",
              },
              {
                step: "03",
                title: "Get Your First Actions",
                desc: "Within 30 minutes, you receive your first Top 5 Actions report — ranked by estimated revenue impact. Start recovering revenue immediately.",
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-revenue-600 text-2xl font-bold text-white shadow-lg shadow-revenue-500/20 dark:bg-revenue-500">
                  {item.step}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Top 5 Actions Preview ─── */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-revenue-200 bg-gradient-to-br from-revenue-50 to-white p-8 shadow-lg dark:border-revenue-800 dark:from-revenue-950 dark:to-gray-950 sm:p-12">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-revenue-600 text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Your Daily Top 5 Actions
                </h3>
                <p className="text-sm text-revenue-600 dark:text-revenue-400">
                  Ranked by estimated revenue impact
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {[
                { rank: "1", action: "Re-engage 3 stalled opportunities in Acme Corp pipeline (est. \$47,000)", impact: "High" },
                { rank: "2", action: "Boost Google Ads budget for \"AI sales\" keyword — ROAS is 4.2x above threshold", impact: "High" },
                { rank: "3", action: "Respond to 2 negative reviews on G2 — sentiment trending down 12% this week", impact: "Medium" },
                { rank: "4", action: "Send upsell proposal to Meridian — product usage hit 90% of plan limit", impact: "Medium" },
                { rank: "5", action: "Flag churn risk: Stellar hasn't logged in for 14 days — trigger re-engagement sequence", impact: "Medium" },
              ].map((item) => (
                <div
                  key={item.rank}
                  className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-revenue-100 text-xs font-bold text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300">
                    {item.rank}
                  </span>
                  <p className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                    {item.action}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      item.impact === "High"
                        ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                    }`}
                  >
                    {item.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to stop leaving money on the table?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600 dark:text-gray-400">
            Join growth-stage businesses that recover an average of $40,000+ in their first month.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="rounded-xl bg-revenue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-revenue-500/25 transition-all hover:bg-revenue-700 hover:shadow-xl dark:bg-revenue-500 dark:hover:bg-revenue-400"
            >
              Start Your Free Trial
            </Link>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              30-day money-back guarantee. No risk.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}