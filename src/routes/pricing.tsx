import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

const plans = [
  {
    name: "Growth",
    price: "$5,000",
    period: "/month",
    description: "For businesses ready to stop leaving revenue on the table.",
    revenue: "Companies up to $10M revenue",
    popular: false,
    features: [
      "AI Lead Recovery Engine",
      "Follow-up Automation (email + SMS)",
      "Review Management & Sentiment Analysis",
      "Top 5 Actions Daily Report",
      "Up to 3 integrated tools",
      "Email & chat support",
      "Monthly strategy review",
    ],
  },
  {
    name: "Scale",
    price: "$8,000",
    period: "/month",
    description: "For growing teams maximizing every revenue opportunity.",
    revenue: "Companies $10M–$25M revenue",
    popular: true,
    features: [
      "Everything in Growth, plus:",
      "Ad Spend Optimizer (Google, Meta, LinkedIn)",
      "Churn Risk & Upsell Detection",
      "Competitor Intelligence Monitoring",
      "Up to 8 integrated tools",
      "Priority email, chat & phone support",
      "Bi-weekly strategy review",
      "Dedicated onboarding specialist",
    ],
  },
  {
    name: "Enterprise",
    price: "$12,000",
    period: "/month",
    description: "For established businesses with complex revenue operations.",
    revenue: "Companies $25M–$50M+ revenue",
    popular: false,
    features: [
      "Everything in Scale, plus:",
      "Custom API integrations & webhooks",
      "Unlimited integrated tools",
      "Multi-brand / multi-region support",
      "SSO & advanced role-based access",
      "24/7 priority support with 1-hour SLA",
      "Weekly executive strategy session",
      "Custom AI training on your data",
      "99.99% uptime SLA with credits",
    ],
  },
];

const guarantees = [
  {
    title: "30-Day Money-Back Guarantee",
    desc: "If you don't see measurable revenue impact in your first month, we'll refund every penny. No questions asked.",
  },
  {
    title: "Annual Contracts Preferred",
    desc: "Lock in your rate for 12 months and save 15% vs. monthly billing. All plans available monthly or annually.",
  },
  {
    title: "No Hidden Fees",
    desc: "Everything in your plan tier is included. No per-seat charges, no module add-ons, no surprise overages.",
  },
];

const comparison = [
  { feature: "Lead Recovery", growth: true, scale: true, enterprise: true },
  { feature: "Follow-up Automation", growth: true, scale: true, enterprise: true },
  { feature: "Review Management & Sentiment", growth: true, scale: true, enterprise: true },
  { feature: "Top 5 Actions Daily Report", growth: true, scale: true, enterprise: true },
  { feature: "Ad Spend Optimizer", growth: false, scale: true, enterprise: true },
  { feature: "Churn Risk & Upsell Detection", growth: false, scale: true, enterprise: true },
  { feature: "Competitor Intelligence", growth: false, scale: true, enterprise: true },
  { feature: "Custom Integrations & Webhooks", growth: false, false: false, enterprise: true },
  { feature: "SSO & Advanced Access Control", growth: false, false: false, enterprise: true },
  { feature: "Dedicated Strategy Sessions", growth: false, false: false, enterprise: true },
];

function PricingPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="border-b border-gray-200 bg-gray-50 px-4 py-20 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-revenue-100 px-3 py-1 text-xs font-semibold text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300">
            Pricing
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            One AI CRO. Three ways to grow.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Plans start at $5,000/month — a fraction of what a full-time CRO costs.
            Scale as your revenue grows.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border-2 p-8 transition-all hover:shadow-xl ${
                  plan.popular
                    ? "border-revenue-500 bg-white shadow-lg shadow-revenue-500/10 dark:border-revenue-400 dark:bg-gray-900"
                    : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
                }`}
              >
                {plan.popular && (
                  <div className="-top-3.5 absolute left-1/2 -translate-x-1/2 rounded-full bg-revenue-600 px-4 py-1 text-xs font-semibold text-white dark:bg-revenue-500">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{plan.revenue}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{plan.description}</p>
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={
                    plan.name === "Growth"
                      ? "https://buy.stripe.com/3cI3cvf3ffI2cex6E04Ni00"
                      : plan.name === "Scale"
                      ? "https://buy.stripe.com/8x214nbR367sdiBd2o4Ni01"
                      : "https://buy.stripe.com/dRm8wP8ER8fA92le6s4Ni02"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 block rounded-xl px-6 py-3 text-center text-sm font-semibold shadow-sm transition-all ${
                    plan.popular
                      ? "bg-revenue-600 text-white hover:bg-revenue-700 hover:shadow-lg dark:bg-revenue-500 dark:hover:bg-revenue-400"
                      : "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                  }`}
                >
                  Subscribe Now
                </a>
              </div>
            ))}
          </div>

          {/* Annual discount callout */}
          <div className="mt-12 rounded-2xl border border-revenue-200 bg-revenue-50 p-6 text-center dark:border-revenue-800 dark:bg-revenue-950">
            <p className="text-sm font-medium text-revenue-800 dark:text-revenue-200">
              Save 15% with annual billing. All plans available monthly or yearly.{" "}
              <Link to="/contact" className="underline font-semibold hover:text-revenue-600">
                Contact us for a custom quote
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="border-y border-gray-200 bg-white px-4 py-20 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Risk-free commitment
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {guarantees.map((g) => (
              <div key={g.title} className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
                <h3 className="font-semibold text-gray-900 dark:text-white">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Full feature comparison
          </h2>
          <div className="mt-12 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                  <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">Growth</th>
                  <th className="px-6 py-4 text-center font-semibold text-revenue-600 dark:text-revenue-400">Scale</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {row.growth ? <Check /> : <Cross />}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.scale ? <Check /> : <Cross />}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.enterprise ? <Check /> : <Cross />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Not sure which plan fits?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600 dark:text-gray-400">
            We'll help you choose. Every plan includes a 30-day money-back guarantee.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="rounded-xl bg-revenue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-revenue-500/25 transition-all hover:bg-revenue-700 hover:shadow-xl dark:bg-revenue-500 dark:hover:bg-revenue-400"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Check() {
  return (
    <svg className="mx-auto h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Cross() {
  return (
    <svg className="mx-auto h-5 w-5 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}