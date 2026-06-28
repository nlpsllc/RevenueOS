import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features")({
  component: FeaturesPage,
});

const modules = [
  {
    id: "lead-recovery",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: "Lead Recovery Engine",
    tagline: "Find every lead your team dropped.",
    description: "Your CRM is full of ghosts — leads that called once, filled a form, or asked a question and never heard back. RevenueOS scans every record daily, identifies cold or abandoned leads, and automatically re-engages them with personalized outreach tailored to their last interaction.",
    capabilities: [
      "Scans Salesforce, HubSpot, Pipedrive, and 20+ CRMs for stale leads",
      "Identifies leads that were never assigned, called, or followed up",
      "Personalized re-engagement email sequences based on lead source and intent",
      "Tracks response rates and escalates hot re-engagements to your team",
      "Recovery revenue attribution — know exactly how much each saved lead is worth",
    ],
    metrics: [
      { label: "Avg. recovery rate", value: "23%" },
      { label: "Avg. revenue per recovered lead", value: "$1,840" },
    ],
  },
  {
    id: "follow-up",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Follow-up Automation",
    tagline: "Persistent sequences that convert.",
    description: "Most sales teams give up after 1—2 attempts. RevenueOS doesn't. It runs multi-channel sequences (email, SMS, LinkedIn) that persist until prospects book a meeting or explicitly opt out. Every step is personalized, timed, and optimized for conversion.",
    capabilities: [
      "Multi-channel sequences: email + SMS + LinkedIn messaging",
      "Smart timing: sends based on when prospects are most likely to engage",
      "A/B tests subject lines, CTAs, and send times automatically",
      "Respects opt-outs and compliance (CAN-SPAM, GDPR, CCPA)",
      "Real-time dashboard showing sequence performance per prospect",
    ],
    metrics: [
      { label: "Avg. follow-up attempts before reply", value: "6" },
      { label: "Conversion lift vs. manual follow-up", value: "3.4x" },
    ],
  },
  {
    id: "reviews",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    title: "Review Management & Sentiment",
    tagline: "Boost your reputation automatically.",
    description: "Online reviews drive trust and buying decisions. RevenueOS monitors every review platform — G2, Capterra, Google Business, Trustpilot — and takes action. It detects new reviews instantly, analyzes sentiment, and automatically reaches out to satisfied customers to request positive reviews.",
    capabilities: [
      "Monitors 8+ review platforms in real-time",
      "Sentiment analysis flags negative reviews before they spread",
      "Auto-requests reviews from happy customers based on positive sentiment signals",
      "Draft response suggestions for negative reviews",
      "Review score trend tracking — see your reputation improve week over week",
    ],
    metrics: [
      { label: "Avg. increase in review volume", value: "4.6x" },
      { label: "Avg. rating improvement", value: "+0.7 stars" },
    ],
  },
  {
    id: "ads",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    title: "Ad Spend Optimizer",
    tagline: "Stop burning budget on underperforming campaigns.",
    description: "Most businesses waste 20–30% of their ad budget. RevenueOS connects to Google Ads, Meta Ads, and LinkedIn Campaign Manager to detect wasteful spend, identify high-ROI channels, and suggest budget reallocations — all without manual analysis.",
    capabilities: [
      "Real-time ROAS tracking across Google, Meta, and LinkedIn",
      "Detects campaigns, keywords, and audiences with negative ROI",
      "Suggests budget reallocations to highest-performing channels",
      "Automated alerts when spend exceeds thresholds without conversion",
      "Weekly ad performance report with actionable recommendations",
    ],
    metrics: [
      { label: "Avg. budget savings identified", value: "24%" },
      { label: "ROAS improvement", value: "2.1x" },
    ],
  },
  {
    id: "churn",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
    title: "Churn Risk & Upsell Detection",
    tagline: "Save accounts before they leave. Grow the ones that stay.",
    description: "Churn is expensive. RevenueOS analyzes product usage, support tickets, login frequency, and sentiment to flag accounts at risk of leaving — weeks before they cancel. At the same time, it identifies customers primed for expansion with specific upsell and cross-sell recommendations.",
    capabilities: [
      "Usage-based churn scoring with 30+ behavioral signals",
      "Real-time alerts: 'Account X is showing churn signals'",
      "Automated retention playbooks: email + offer + call sequences",
      "Upsell detection: customers who hit usage limits or expanded feature adoption",
      "Net Revenue Retention (NRR) tracking and forecasting",
    ],
    metrics: [
      { label: "Churn reduction", value: "58%" },
      { label: "Avg. upsell conversion", value: "31%" },
    ],
  },
  {
    id: "competitor",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    ),
    title: "Competitor Intelligence",
    tagline: "Know every move your competition makes.",
    description: "Your competitors aren't standing still — and you shouldn't be blindsided. RevenueOS tracks competitor pricing changes, new feature launches, marketing campaigns, and positioning shifts. You get concise briefings so you can respond fast.",
    capabilities: [
      "Tracks pricing page changes and new plan launches",
      "Monitors competitor websites, blogs, and product updates",
      "Flags competitive threats: feature parity gaps, market positioning shifts",
      "Weekly competitive landscape brief delivered to your inbox",
      "Alerts when competitors target your keywords or customers",
    ],
    metrics: [
      { label: "Competitive threats flagged", value: "Weekly" },
      { label: "Avg. response time to competitor moves", value: "Same day" },
    ],
  },
  {
    id: "top5",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Top 5 Actions Daily Report",
    tagline: "Every morning, know exactly what to do.",
    description: "The heart of RevenueOS. Every day at 7 AM, you receive a ranked list of the five highest-impact actions you can take — each one with an estimated revenue impact. No dashboard scrolling, no data analysis. Just clear, prioritized direction.",
    capabilities: [
      "AI ranks every possible action by estimated revenue impact",
      "Delivered via email, Slack, Teams, or in-app notification",
      "Each action includes context, recommended next step, and one-click execution",
      "Tracks completion rate and actual revenue realized per action",
      "Learns from your team's decisions to improve recommendations over time",
    ],
    metrics: [
      { label: "Actions completed per week", value: "85%" },
      { label: "Revenue attributed per action", value: "$2,300 avg." },
    ],
  },
];

function FeaturesPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="border-b border-gray-200 bg-gray-50 px-4 py-20 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-revenue-100 px-3 py-1 text-xs font-semibold text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300">
            Features
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Seven modules. One AI CRO.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Every capability your business needs to find, win, and keep revenue — working
            autonomously 24/7, prioritized by revenue impact, and delivered in plain language.
          </p>
        </div>
      </section>

      {/* Modules */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-32">
            {modules.map((mod, idx) => (
              <div
                key={mod.id}
                id={mod.id}
                className={`grid gap-12 items-center ${
                  idx % 2 === 0 ? "lg:grid-cols-2" : "lg:grid-cols-2 lg:direction-rtl"
                }`}
              >
                {/* Text */}
                <div className={idx % 2 === 0 ? "lg:order-1" : "lg:order-2"}>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-revenue-50 text-revenue-600 dark:bg-revenue-950 dark:text-revenue-400">
                    {mod.icon}
                  </div>
                  <span className="rounded-full bg-revenue-100 px-2.5 py-0.5 text-xs font-semibold text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300">
                    Module {idx + 1}
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                    {mod.title}
                  </h2>
                  <p className="mt-1 text-lg font-medium text-revenue-600 dark:text-revenue-400">
                    {mod.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {mod.description}
                  </p>

                  <ul className="mt-6 space-y-2">
                    {mod.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {cap}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex gap-6">
                    {mod.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-xl font-bold text-revenue-600 dark:text-revenue-400">
                          {m.value}
                        </div>
                        <div className="text-xs text-gray-500">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual card */}
                <div className={idx % 2 === 0 ? "lg:order-2" : "lg:order-1"}>
                  <div className="rounded-2xl border border-revenue-200 bg-gradient-to-br from-revenue-50 to-white p-8 shadow-lg dark:border-revenue-800 dark:from-revenue-950 dark:to-gray-950">
                    <div className="aspect-video rounded-xl bg-revenue-100/50 dark:bg-revenue-900/50" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 bg-gray-50 px-4 py-20 text-center dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            All seven modules. One subscription.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600 dark:text-gray-400">
            No per-module pricing, no hidden fees. Every customer gets full access to every capability.
          </p>
          <div className="mt-8">
            <Link
              to="/pricing"
              className="rounded-xl bg-revenue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-revenue-500/25 transition-all hover:bg-revenue-700 hover:shadow-xl dark:bg-revenue-500 dark:hover:bg-revenue-400"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}