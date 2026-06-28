import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/how-it-works")({
  component: HowItWorksPage,
});

const steps = [
  {
    step: "01",
    title: "Connect Your Stack",
    subtitle: "Grant read-only access. We handle the rest.",
    description:
      "You don't need to migrate anything. RevenueOS connects to your existing tools with secure, read-only API access. No data leaves your ecosystem — we analyze it in place.",
    details: [
      "Salesforce, HubSpot, Pipedrive, or any major CRM",
      "Gmail, Outlook, or any email platform",
      "Google Ads, Meta Ads, LinkedIn Campaign Manager",
      "G2, Capterra, Google Business, Trustpilot, and more",
      "Slack, Teams, or email for daily Top 5 delivery",
      "Typically takes 15–25 minutes",
    ],
  },
  {
    step: "02",
    title: "AI Scans & Analyzes",
    subtitle: "We find every dollar you've been leaving behind.",
    description:
      "Our cross-referential AI engine analyzes your entire revenue operation: every lead, every campaign, every follow-up (or lack thereof), every review, every ad dollar, every customer interaction. It identifies patterns, gaps, and revenue opportunities you're missing.",
    details: [
      "Scans lead database for cold, abandoned, or never-contacted leads",
      "Analyzes follow-up cadence vs. industry best practices",
      "Evaluates ad spend efficiency across all platforms",
      "Measures review sentiment and reputation trajectory",
      "Detects churn signals from product usage and support data",
      "Tracks competitor pricing and positioning changes",
    ],
  },
  {
    step: "03",
    title: "Receive Your First Report",
    subtitle: "In under 30 minutes, you get your first Top 5 Actions.",
    description:
      "The system generates your ranked daily action report — not a dashboard full of charts, but five concrete actions, each with an estimated revenue impact. Your AI CRO is now fully operational.",
    details: [
      "Ranked by highest estimated revenue impact",
      "Each action includes context and recommended next step",
      "One-click execution for common actions",
      "Delivered via email, Slack, Teams, or in-app",
      "Re-generated daily based on new data",
      "Self-improving: recommendations get smarter over time",
    ],
  },
];

const integrations = [
  "Salesforce", "HubSpot", "Pipedrive", "Gmail", "Outlook",
  "Google Ads", "Meta Ads", "LinkedIn Ads", "G2", "Capterra",
  "Google Business", "Trustpilot", "Slack", "Microsoft Teams",
];

function HowItWorksPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="border-b border-gray-200 bg-gray-50 px-4 py-20 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-revenue-100 px-3 py-1 text-xs font-semibold text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300">
            How It Works
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            From signup to revenue recovery in under 30 minutes.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            No implementation team. No training sessions. No data migration.
            Just connect, analyze, and act.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="rounded-xl bg-revenue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-revenue-500/25 transition-all hover:bg-revenue-700 hover:shadow-xl dark:bg-revenue-500 dark:hover:bg-revenue-400"
            >
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-24">
            {steps.map((item, idx) => (
              <div key={item.step} className="grid gap-12 lg:grid-cols-2">
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-revenue-600 text-2xl font-bold text-white shadow-lg shadow-revenue-500/20 dark:bg-revenue-500">
                    {item.step}
                  </div>
                  <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-lg font-medium text-revenue-600 dark:text-revenue-400">
                    {item.subtitle}
                  </p>
                  <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>

                  <ul className="mt-6 space-y-2">
                    {item.details.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-revenue-200 bg-gradient-to-br from-revenue-50 to-white shadow-lg dark:border-revenue-800 dark:from-revenue-950 dark:to-gray-950">
                    <div className="text-center p-8">
                      <div className="text-6xl font-bold text-revenue-200 dark:text-revenue-800">
                        0:{idx === 0 ? "25" : idx === 1 ? "15" : "00"}
                      </div>
                      <p className="mt-2 text-sm font-medium text-revenue-600 dark:text-revenue-400">
                        {idx === 0 ? "Estimated time: 15–25 min" : idx === 1 ? "Happens instantly" : "Real-time, ongoing"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="border-y border-gray-200 bg-gray-50 px-4 py-20 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Works with the tools you already use
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
              RevenueOS connects to 50+ revenue tools out of the box. No migration, no
              double-entry, no disruption to your existing workflows.
            </p>
          </div>

          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
            {integrations.map((name) => (
              <span
                key={name}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300"
              >
                {name}
              </span>
            ))}
            <span className="rounded-full border border-revenue-200 bg-revenue-50 px-4 py-2 text-sm font-medium text-revenue-700 dark:border-revenue-800 dark:bg-revenue-950 dark:text-revenue-300">
              + 36 more
            </span>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Dedicated support at every step
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { title: "Onboarding Specialist", desc: "Every customer gets a dedicated specialist who guides you through the first 30 minutes and beyond." },
              { title: "Strategy Sessions", desc: "Regular reviews where we analyze your revenue data and help you prioritize the highest-impact actions." },
              { title: "24/7 Support", desc: "Enterprise customers get around-the-clock support with a 1-hour response SLA. All customers get email and chat." },
            ].map((s) => (
              <div key={s.title} className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="font-semibold text-gray-900 dark:text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 bg-grid px-4 py-20 text-center dark:border-gray-800">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to see what RevenueOS finds in your stack?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600 dark:text-gray-400">
            Most businesses discover $40,000+ in missed revenue in their first scan.
            Find out what you're leaving behind.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="rounded-xl bg-revenue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-revenue-500/25 transition-all hover:bg-revenue-700 hover:shadow-xl dark:bg-revenue-500 dark:hover:bg-revenue-400"
            >
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}