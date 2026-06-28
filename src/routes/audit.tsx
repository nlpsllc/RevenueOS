import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/audit")({
  component: AuditPage,
});

const deliverables = [
  { number: "01", title: "Comprehensive Revenue Leakage Assessment", desc: "A dollar-by-dollar breakdown of every revenue pocket you're leaving on the table — from ignored leads to missed upsells to silent churn." },
  { number: "02", title: "Detailed Operational Review", desc: "We map your entire revenue operation — CRM, ads, follow-up, support — to find bottlenecks, breakdowns, and blind spots." },
  { number: "03", title: "Revenue Leak Identification", desc: "Every leak categorized by type (lead, ad spend, churn, review, competitive) with estimated monthly impact." },
  { number: "04", title: "Prioritized Action Plan", desc: "Ranked by revenue impact and effort, so you know exactly what to fix first for the fastest return." },
  { number: "05", title: "30–90 Day Quick-Win Recommendations", desc: "Actionable, no-regret moves you can implement immediately — without hiring or major investment." },
  { number: "06", title: "KPI Dashboard", desc: "A live dashboard tracking the metrics that matter: recovery rate, response times, churn signals, and ROAS trends." },
  { number: "07", title: "Implementation Review", desc: "A follow-up session to review what's working, adjust course, and plan next-phase optimizations." },
];

const problemItems = [
  { icon: "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z", title: "Ignored Leads", desc: "70% of web leads never get a second follow-up. That's revenue sitting in your CRM, cold." },
  { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "Ad Waste", desc: "Campaigns that spend thousands but never convert. The bottom 20% often burns 40% of your budget." },
  { icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "Silent Churn", desc: "Customers stop using your product weeks before they cancel. By the time you know, it's too late." },
  { icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z", title: "Review Gaps", desc: "Happy customers who want to vouch for you, but were never asked. Leaving reviews — and trust — on the table." },
];

const auditSteps = [
  { step: 1, title: "Scan Your CRM", desc: "Identify cold leads that are ripe for automated re-engagement." },
  { step: 2, title: "Analyze Your Ad Spend", desc: "Highlight the bottom 20% of campaigns that are burning budget." },
  { step: 3, title: "Audit Your Follow-up", desc: "Map your current response times against industry benchmarks." },
  { step: 4, title: "Detect Churn Signals", desc: "Surface the top 5 accounts currently at risk of leaving." },
];

function AuditPage() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    revenue: "",
    crm: "",
    tools: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead = { ...formData, id: Date.now(), timestamp: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("revenueos_leads") || "[]");
    existing.push(newLead);
    localStorage.setItem("revenueos_leads", JSON.stringify(existing));
    setLeads(existing);
    setSubmitted(true);
  };

  const nextStep = () => {
    if (formStep < 3) setFormStep(formStep + 1);
  };

  const prevStep = () => {
    if (formStep > 1) setFormStep(formStep - 1);
  };

  const canProceed = () => {
    if (formStep === 1) return formData.name && formData.email;
    if (formStep === 2) return formData.company && formData.revenue;
    return true;
  };

  return (
    <div className="pt-20">
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-revenue-950 via-gray-950 to-gray-900 px-4 py-24">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[500px] w-[500px] rounded-full bg-revenue-500/10 blur-[120px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-revenue-800 bg-revenue-950/50 px-4 py-1.5 text-sm font-medium text-revenue-300">
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            Free — No credit card required
          </div>

          {/* Headline */}
          <h1 className="animate-slide-up text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Stop Guessing Where Your{" "}
            <span className="text-revenue-400">Revenue Is Leaking</span>
            <br />
            Get a Free 30-Minute Recovery Audit
          </h1>

          {/* Subheadline */}
          <p className="delay-2 mx-auto mt-6 max-w-3xl animate-fade-in text-lg leading-relaxed text-gray-300 sm:text-xl">
            We'll connect to your existing CRM and marketing tools to identify exactly how much money
            you're leaving on the table — and show you how to recover it. All in under 30 minutes.
          </p>

          {/* CTAs */}
          <div className="delay-3 mt-10 flex animate-fade-in flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#form"
              className="rounded-xl bg-revenue-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-revenue-500/25 transition-all hover:bg-revenue-400 hover:shadow-xl hover:shadow-revenue-500/30"
            >
              Get My Free Audit
            </a>
            <a
              href="#how-it-works"
              className="rounded-xl border border-gray-600 bg-white/10 px-8 py-4 text-base font-semibold text-white shadow-sm backdrop-blur-sm transition-all hover:bg-white/20"
            >
              See What You Get
            </a>
          </div>

          {/* Stats */}
          <div className="delay-4 mt-16 animate-fade-in grid gap-6 border-t border-gray-800 pt-12 sm:grid-cols-3">
            <div>
              <p className="text-3xl font-bold text-revenue-400">30 min</p>
              <p className="mt-1 text-sm text-gray-400">Connection to insight</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-revenue-400">7 deliverables</p>
              <p className="mt-1 text-sm text-gray-400">In every audit report</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-revenue-400">10:1</p>
              <p className="mt-1 text-sm text-gray-400">Value guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Problem Section ─── */}
      <section className="border-b border-gray-200 bg-gray-50 px-4 py-24 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-950 dark:text-red-300">The Hidden Revenue Gap</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              You're "Data Rich" but <span className="text-red-600">Insight Poor</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              You have the leads, the ad budget, and the customers. But without a dedicated CRO,
              revenue is leaking through cracks you can't see.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {problemItems.map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                </div>
                <h3 className="mt-4 text-sm font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works Section ─── */}
      <section id="how-it-works" className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-revenue-100 px-3 py-1 text-xs font-semibold text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300">The RevenueOS Audit</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              What Our AI CRO Analyzes
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              In just 30 minutes, we scan your entire revenue stack to find every pocket of missed revenue.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {auditSteps.map((step) => (
              <div key={step.step} className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-revenue-600 text-lg font-bold text-white">{step.step}</div>
                <h3 className="mt-4 text-sm font-bold text-gray-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Deliverables Section ─── */}
      <section className="border-y border-gray-200 bg-gray-50 px-4 py-24 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950 dark:text-green-300">What You'll Get</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Your Custom Revenue Recovery Plan
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              A dollar estimate of your current revenue leakage and a step-by-step plan to recover it.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((d) => (
              <div key={d.number} className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
                <span className="text-3xl font-bold text-revenue-200 dark:text-revenue-800">{d.number}</span>
                <h3 className="mt-2 text-sm font-bold text-gray-900 dark:text-white">{d.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Form Section ─── */}
      <section id="form" className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center dark:border-green-800 dark:bg-green-950">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="mt-6 text-2xl font-bold text-green-800 dark:text-green-200">You're on the list!</h2>
                  <p className="mt-3 text-green-700 dark:text-green-300">
                    We'll review your submission and reach out within 24 hours to schedule your free audit.
                    Check your inbox for a confirmation email.
                  </p>
                  <p className="mt-6 text-sm text-green-600 dark:text-green-400">
                    In the meantime, <a href="/how-it-works" className="underline hover:no-underline">see how RevenueOS works</a>.
                  </p>

                  {/* Pricing upsell */}
                  <div className="mt-10 border-t border-green-200 pt-8 dark:border-green-700">
                    <h3 className="text-lg font-bold text-green-800 dark:text-green-200">Don't wait — start recovering revenue now</h3>
                    <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                      Choose the plan that fits your business and get immediate access to your AI CRO dashboard.
                    </p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      <a
                        href="https://buy.stripe.com/3cI3cvf3ffI2cex6E04Ni00"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl border border-green-300 bg-white p-5 text-left transition-all hover:shadow-md hover:border-green-400 dark:border-green-600 dark:bg-green-900/50"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">Growth</p>
                        <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">$5,000<span className="text-xs font-normal text-gray-500">/mo</span></p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Up to $10M revenue</p>
                      </a>
                      <a
                        href="https://buy.stripe.com/8x214nbR367sdiBd2o4Ni01"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl border border-revenue-400 bg-revenue-600 p-5 text-left text-white shadow-lg transition-all hover:shadow-xl hover:bg-revenue-700"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wider text-revenue-200">Scale</p>
                        <p className="mt-1 text-xl font-bold">$8,000<span className="text-xs font-normal text-revenue-200">/mo</span></p>
                        <p className="mt-1 text-xs text-revenue-200">$10M–$25M revenue</p>
                        <span className="mt-2 inline-block rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">Most Popular</span>
                      </a>
                      <a
                        href="https://buy.stripe.com/dRm8wP8ER8fA92le6s4Ni02"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl border border-green-300 bg-white p-5 text-left transition-all hover:shadow-md hover:border-green-400 dark:border-green-600 dark:bg-green-900/50"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">Enterprise</p>
                        <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">$12,000<span className="text-xs font-normal text-gray-500">/mo</span></p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">$25M–$50M+ revenue</p>
                      </a>
                    </div>
                    <p className="mt-4 text-xs text-green-600 dark:text-green-400">30-day money-back guarantee on all plans</p>
                  </div>
                </div>
              ) : (
                <div>
                  <span className="inline-block rounded-full bg-revenue-100 px-3 py-1 text-xs font-semibold text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300">Ready to plug the leaks?</span>
                  <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Get Your Free Audit</h2>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Fill in your details and we'll prepare your custom Revenue Leakage Assessment.
                  </p>

                  {/* Step indicator */}
                  <div className="mt-8 flex items-center gap-2">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${formStep >= s ? "bg-revenue-600 text-white" : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600"}`}>{s}</div>
                        <span className={`text-xs font-medium ${formStep === s ? "text-revenue-600 dark:text-revenue-400" : "text-gray-400"}`}>
                          {s === 1 ? "Your Info" : s === 2 ? "Company" : "Tools"}
                        </span>
                        {s < 3 && <div className={`h-px w-8 transition-colors ${formStep > s ? "bg-revenue-600" : "bg-gray-200 dark:bg-gray-700"}`} />}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {/* Step 1: Personal Info */}
                    {formStep === 1 && (
                      <div className="animate-fade-in space-y-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full name</label>
                          <input type="text" id="name" value={formData.name} onChange={(e) => updateField("name", e.target.value)} className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500" placeholder="Jane Smith" required />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Work email</label>
                          <input type="email" id="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500" placeholder="jane@company.com" required />
                        </div>
                        <button type="button" onClick={nextStep} disabled={!canProceed()} className="w-full rounded-xl bg-revenue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-revenue-500/25 transition-all hover:bg-revenue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 dark:bg-revenue-500 dark:hover:bg-revenue-400">Continue</button>
                      </div>
                    )}

                    {/* Step 2: Company */}
                    {formStep === 2 && (
                      <div className="animate-fade-in space-y-5">
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company name</label>
                          <input type="text" id="company" value={formData.company} onChange={(e) => updateField("company", e.target.value)} className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500" placeholder="Acme Corp" required />
                        </div>
                        <div>
                          <label htmlFor="revenue" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Annual revenue range</label>
                          <select id="revenue" value={formData.revenue} onChange={(e) => updateField("revenue", e.target.value)} className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white" required>
                            <option value="">Select a range</option>
                            <option value="under-2m">Under $2M</option>
                            <option value="2m-5m">$2M – $5M</option>
                            <option value="5m-10m">$5M – $10M</option>
                            <option value="10m-25m">$10M – $25M</option>
                            <option value="25m-50m">$25M – $50M</option>
                            <option value="over-50m">Over $50M</option>
                          </select>
                        </div>
                        <div className="flex gap-3">
                          <button type="button" onClick={prevStep} className="flex-1 rounded-xl border border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">Back</button>
                          <button type="button" onClick={nextStep} disabled={!canProceed()} className="flex-1 rounded-xl bg-revenue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-revenue-500/25 transition-all hover:bg-revenue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 dark:bg-revenue-500 dark:hover:bg-revenue-400">Continue</button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Tools */}
                    {formStep === 3 && (
                      <div className="animate-fade-in space-y-5">
                        <div>
                          <label htmlFor="crm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Primary CRM</label>
                          <select id="crm" value={formData.crm} onChange={(e) => updateField("crm", e.target.value)} className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white">
                            <option value="">Select your CRM</option>
                            <option value="hubspot">HubSpot</option>
                            <option value="salesforce">Salesforce</option>
                            <option value="pipedrive">Pipedrive</option>
                            <option value="zoho">Zoho CRM</option>
                            <option value="close">Close</option>
                            <option value="other">Other</option>
                            <option value="none">None yet</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="tools" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Other tools you use</label>
                          <input type="text" id="tools" value={formData.tools} onChange={(e) => updateField("tools", e.target.value)} className="mt-1 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500" placeholder="Google Ads, Mailchimp, Google Analytics, ..." />
                        </div>
                        <div className="flex gap-3">
                          <button type="button" onClick={prevStep} className="flex-1 rounded-xl border border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800">Back</button>
                          <button type="submit" className="flex-1 rounded-xl bg-revenue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-revenue-500/25 transition-all hover:bg-revenue-700 hover:shadow-xl dark:bg-revenue-500 dark:hover:bg-revenue-400">
                            Get My Free Audit
                          </button>
                        </div>
                      </div>
                    )}
                  </form>

                  <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
                    No credit card required. Connects securely via OAuth. We never store your lead data.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:col-span-2 lg:pt-12">
              {/* Testimonial */}
              <div className="rounded-2xl border border-revenue-200 bg-gradient-to-br from-revenue-50 to-white p-8 shadow-lg dark:border-revenue-800 dark:from-revenue-950 dark:to-gray-950">
                <svg className="h-8 w-8 text-revenue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" /></svg>
                <p className="mt-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  "RevenueOS found $14k in missed expansion opportunities within 20 minutes of connecting
                  our HubSpot. The audit alone was worth more than a year of most SaaS tools."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-revenue-600 text-sm font-bold text-white">SJ</div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Sarah J.</p>
                    <p className="text-xs text-gray-500">VP of Sales, GrowthStream</p>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-950">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Why RevenueOS?</h3>
                <div className="mt-4 space-y-4">
                  {[
                    { label: "Time to first insight", value: "< 30 minutes" },
                    { label: "Average revenue recovered", value: "$40,000+ / month" },
                    { label: "Integration time", value: "2 minutes (OAuth)" },
                    { label: "Client satisfaction", value: "98% would recommend" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0 dark:border-gray-800">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
                      <span className="text-sm font-bold text-revenue-600 dark:text-revenue-400">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust badges */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-950">
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  <span>No credit card required</span>
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  <span>Secure OAuth — we never store your data</span>
                </div>
                <div className="mt-3 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" /></svg>
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="bg-gradient-to-br from-revenue-600 to-revenue-800 px-4 py-20 text-center dark:from-revenue-700 dark:to-revenue-900">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Start recovering revenue today.</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-revenue-100">
            Connect in 30 minutes. See your first Top 5 Actions immediately. Recover $40,000+
            in your first month — or your money back.
          </p>
          <a
            href="#form"
            className="mt-8 inline-flex rounded-xl bg-white px-8 py-4 text-base font-semibold text-revenue-700 shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
          >
            Get My Free Audit
          </a>
          <p className="mt-4 text-sm text-revenue-200">No credit card. 30-day guarantee.</p>
        </div>
      </section>
    </div>
  );
}