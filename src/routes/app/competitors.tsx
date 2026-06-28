import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/app/competitors")({
  component: CompetitorsPage,
});

const overviewStats = [
  { label: "Tracked Competitors", value: "8", change: "+1", positive: true },
  { label: "Recent Alerts (30d)", value: "24", change: "+8", positive: false },
  { label: "Features Matched", value: "73%", change: "+5%", positive: true },
  { label: "Market Position", value: "#2", change: "Stable", positive: true },
];

const activityTypes = ["all", "product", "funding", "hiring", "pricing", "partnership", "content"];

const activities = [
  { id: 1, type: "product" as const, competitor: "DataFlow AI", title: "Launched AI-powered lead scoring", detail: "DataFlow released a predictive lead scoring engine with 94% accuracy claims. Directly competes with our Lead Recovery module.", date: "2 hours ago", severity: "high" as const },
  { id: 2, type: "funding" as const, competitor: "InsightGrow", title: "Closed $12M Series A funding", detail: "Led by Sequoia Capital. Funds earmarked for sales AI expansion and customer acquisition.", date: "6 hours ago", severity: "high" as const },
  { id: 3, type: "pricing" as const, competitor: "SalesPulse", title: "Reduced entry-level pricing by 30%", detail: "Their Growth plan dropped from $4,500 to $3,150/month. Likely targeting our mid-market base.", date: "1 day ago", severity: "critical" as const },
  { id: 4, type: "hiring" as const, competitor: "DataFlow AI", title: "Hired VP of Sales from Salesforce", detail: "John Chen hired to lead enterprise sales expansion. Signals push upmarket.", date: "2 days ago", severity: "medium" as const },
  { id: 5, type: "product" as const, competitor: "LeadGenius", title: "Released native review management", detail: "New module directly competes with our Review Management feature. Currently in beta.", date: "3 days ago", severity: "high" as const },
  { id: 6, type: "partnership" as const, competitor: "SalesPulse", title: "Integrated with HubSpot CRM", detail: "Native bi-directional sync with HubSpot. Addresses a key integration gap we have been promoting.", date: "4 days ago", severity: "medium" as const },
  { id: 7, type: "funding" as const, competitor: "LeadGenius", title: "Acquired by Zendesk for $85M", detail: "Zendesk entering the revenue intelligence space. LeadGenius will operate independently.", date: "5 days ago", severity: "critical" as const },
  { id: 8, type: "pricing" as const, competitor: "DataFlow AI", title: "Introduced usage-based pricing tier", detail: "New Pay as You Grow plan starting at $2,000/month. Targets smaller SMBs.", date: "6 days ago", severity: "medium" as const },
  { id: 9, type: "content" as const, competitor: "InsightGrow", title: "Published comparative ROI study", detail: "Claims 40% higher ROI vs competitors. Mentions legacy sales tools aimed at us.", date: "1 week ago", severity: "low" as const },
  { id: 10, type: "hiring" as const, competitor: "SalesPulse", title: "Opened Austin engineering office", detail: "30 new engineering hires planned. Signals major R&D investment.", date: "1 week ago", severity: "low" as const },
  { id: 11, type: "product" as const, competitor: "InsightGrow", title: "Previewed AI-powered email composer", detail: "GPT-4 based email generation for sales sequences. Expected launch Q3.", date: "8 days ago", severity: "medium" as const },
  { id: 12, type: "partnership" as const, competitor: "DataFlow AI", title: "Partnered with Salesforce AppExchange", detail: "Listed as a Featured Partner. Significant distribution channel expansion.", date: "10 days ago", severity: "medium" as const },
  { id: 13, type: "funding" as const, competitor: "SalesPulse", title: "Closed $8M bridge round", detail: "Existing investors participated. Extension likely before a Series B next year.", date: "12 days ago", severity: "low" as const },
  { id: 14, type: "pricing" as const, competitor: "LeadGenius", title: "Bundled review management with base plan", detail: "Previously a $2,000 add-on, now included free. Aggressive bundling strategy.", date: "2 weeks ago", severity: "high" as const },
  { id: 15, type: "product" as const, competitor: "SalesPulse", title: "Launched mobile sales dashboard", detail: "iOS and Android native apps with real-time alerts and deal tracking.", date: "2 weeks ago", severity: "low" as const },
  { id: 16, type: "hiring" as const, competitor: "LeadGenius", title: "Hired 15 new SDRs in Mexico City", detail: "Major sales team expansion in LATAM market. Could signal geographic expansion.", date: "3 weeks ago", severity: "medium" as const },
];

const competitors = [
  { id: 1, name: "DataFlow AI", marketPosition: "#1", share: 28, founded: 2019, funding: "$45M", employees: 280, location: "San Francisco, CA", website: "dataflow.ai", description: "AI-driven sales intelligence platform with strong lead scoring capabilities. Market leader by revenue.", threatLevel: "high" as const, featureOverlap: 85, strengths: ["Lead scoring", "Enterprise sales", "AI accuracy"], weaknesses: ["Higher pricing", "Limited review mgmt", "Weak churn detection"], recentMove: "Launched AI lead scoring -- competitive with our core feature" },
  { id: 2, name: "SalesPulse", marketPosition: "#3", share: 18, founded: 2020, funding: "$28M", employees: 185, location: "Austin, TX", website: "salespulse.io", description: "Full-stack revenue platform with aggressive pricing. Growing fast in mid-market.", threatLevel: "high" as const, featureOverlap: 78, strengths: ["Pricing", "HubSpot integration", "Mobile app"], weaknesses: ["Limited AI", "No churn detection", "Smaller customer base"], recentMove: "Reduced pricing 30% -- targeting our SMB base" },
  { id: 3, name: "LeadGenius", marketPosition: "#4", share: 12, founded: 2021, funding: "$15M", employees: 120, location: "New York, NY", website: "leadgenius.com", description: "Lead-to-revenue platform with strong review management. Recently acquired by Zendesk.", threatLevel: "medium" as const, featureOverlap: 65, strengths: ["Review management", "Zendesk backing", "UX design"], weaknesses: ["Post-acquisition uncertainty", "Limited integrations", "Weak analytics"], recentMove: "Acquired by Zendesk for $85M" },
  { id: 4, name: "InsightGrow", marketPosition: "#5", share: 9, founded: 2022, funding: "$22M", employees: 95, location: "Seattle, WA", website: "insightgrow.com", description: "Rapidly growing AI sales platform. Just closed $12M Series A.", threatLevel: "medium" as const, featureOverlap: 58, strengths: ["Innovation speed", "AI/ML expertise", "Fresh approach"], weaknesses: ["Early stage", "Small team", "Limited track record"], recentMove: "Closed $12M Series A from Sequoia" },
  { id: 5, name: "RevBoost", marketPosition: "#6", share: 6, founded: 2023, funding: "$5M", employees: 45, location: "Denver, CO", website: "revboost.io", description: "Niche player focused on revenue recovery and abandoned cart tracking.", threatLevel: "low" as const, featureOverlap: 35, strengths: ["E-commerce focus", "Cart recovery", "Simple setup"], weaknesses: ["Narrow scope", "No AI features", "Small team"], recentMove: "Launched Shopify native app" },
  { id: 6, name: "GrowthStack", marketPosition: "#7", share: 4, founded: 2022, funding: "$3.5M", employees: 28, location: "Remote-first", website: "growthstack.com", description: "Bootstrapped all-in-one sales platform for very small teams.", threatLevel: "low" as const, featureOverlap: 25, strengths: ["Low price", "All-in-one", "Easy setup"], weaknesses: ["Limited scalability", "No enterprise features", "Small team"], recentMove: "Added basic ad spend tracking" },
  { id: 7, name: "Acquire.io", marketPosition: "#2", share: 22, founded: 2020, funding: "$35M", employees: 220, location: "Chicago, IL", website: "acquire.io", description: "Enterprise revenue intelligence platform with strong competitor monitoring.", threatLevel: "medium" as const, featureOverlap: 72, strengths: ["Enterprise features", "Competitor monitoring", "Analytics"], weaknesses: ["Complex UI", "High price", "Slow innovation"], recentMove: "Redesigned dashboard for mid-market" },
  { id: 8, name: "PipelineAI", marketPosition: "#8", share: 3, founded: 2023, funding: "$2M", employees: 18, location: "Toronto, Canada", website: "pipelineai.co", description: "Early-stage startup focused on predictive pipeline management.", threatLevel: "low" as const, featureOverlap: 20, strengths: ["Predictive AI", "Innovative approach", "Niche focus"], weaknesses: ["Pre-revenue", "Tiny team", "Limited features"], recentMove: "Joined Y Combinator W24 batch" },
];

const performanceComparison = [
  { metric: "Feature Completeness", us: 92, avg: 74 },
  { metric: "Pricing Competitiveness", us: 75, avg: 78 },
  { metric: "Ease of Integration", us: 88, avg: 65 },
  { metric: "AI Capabilities", us: 95, avg: 60 },
  { metric: "Customer Support", us: 85, avg: 70 },
  { metric: "Time to Value", us: 90, avg: 72 },
  { metric: "Review Management", us: 88, avg: 45 },
  { metric: "Ad Spend Optimization", us: 82, avg: 50 },
];

const marketShareMonths = [
  { month: "Jan", us: 22, avg: 78 },
  { month: "Feb", us: 23, avg: 77 },
  { month: "Mar", us: 24, avg: 76 },
  { month: "Apr", us: 25, avg: 75 },
  { month: "May", us: 25, avg: 75 },
  { month: "Jun", us: 26, avg: 74 },
];

const threatColors: Record<string, string> = {
  critical: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  high: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  medium: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  low: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
};

const severityColors: Record<string, string> = {
  critical: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  high: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  medium: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  low: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
};

const activityIcons: Record<string, string> = {
  product: String.fromCodePoint(0x1F680),
  funding: String.fromCodePoint(0x1F4B0),
  hiring: String.fromCodePoint(0x1F464),
  pricing: String.fromCodePoint(0x1F3F7) + String.fromCodePoint(0xFE0F),
  partnership: String.fromCodePoint(0x1F91D),
  content: String.fromCodePoint(0x1F4DD),
};

const activityTypeColors: Record<string, string> = {
  product: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  funding: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  hiring: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  pricing: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  partnership: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  content: "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

const bgColors = ["bg-blue-600", "bg-emerald-600", "bg-purple-600", "bg-amber-600", "bg-rose-600", "bg-teal-600", "bg-indigo-600", "bg-cyan-600"];


function CompetitorsPage() {
  const [activityFilter, setActivityFilter] = useState("all");
  const [selectedCompetitor, setSelectedCompetitor] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [alertSettings, setAlertSettings] = useState({
    competitorLaunches: true,
    fundingEvents: true,
    pricingChanges: true,
    partnershipAlerts: true,
    hiringSpikes: false,
    contentMentions: false,
    emailDigest: "daily",
  });
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredActivities = useMemo(() => {
    if (activityFilter === "all") return activities;
    return activities.filter((a) => a.type === activityFilter);
  }, [activityFilter]);

  const filteredCompetitors = useMemo(() => {
    if (!searchQuery) return competitors;
    const q = searchQuery.toLowerCase();
    return competitors.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const selectedComp = selectedCompetitor
    ? competitors.find((c) => c.id === selectedCompetitor)
    : null;

  const maxMarketShare = Math.max(...marketShareMonths.map((m) => Math.max(m.us, m.avg)));

  function getThreatLevel(c: { threatLevel: string; featureOverlap: number }): string {
    if (c.threatLevel === "high" && c.featureOverlap > 80) return "critical";
    if (c.threatLevel === "high") return "high";
    if (c.threatLevel === "medium") return "medium";
    return "low";
  }

  function getThreatClass(c: { threatLevel: string; featureOverlap: number }): string {
    return threatColors[getThreatLevel(c)] || threatColors.low;
  }

  function getThreatLabel(c: { threatLevel: string; featureOverlap: number }): string {
    const level = getThreatLevel(c);
    return level.charAt(0).toUpperCase() + level.slice(1);
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Competitor Intelligence</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monitor competitor activity, track market shifts, and stay ahead of the competition.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAlertModal(true)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900"
          >
            Alert Preferences
          </button>
          <button className="rounded-lg bg-revenue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400">
            Configure Monitoring
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-start justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${s.positive ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"}`}>{s.change}</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Market Position + Feature Comparison */}
      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Market Share Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2 dark:border-gray-800 dark:bg-gray-950">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">Market Share Trend</h3>
          <p className="mb-4 text-xs text-gray-500">Our share vs competitor average</p>
          <div className="flex items-end justify-between gap-2" style={{ height: 120 }}>
            {marketShareMonths.map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex w-full flex-col items-center gap-0.5">
                  <div className="w-3/4 rounded-t-sm bg-revenue-400" style={{ height: String((m.us / maxMarketShare) * 110) + "px" }} />
                  <div className="w-3/4 rounded-t-sm bg-gray-300 dark:bg-gray-600" style={{ height: String((m.avg / maxMarketShare) * 90) + "px" }} />
                </div>
                <span className="text-[10px] text-gray-500">{m.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-sm bg-revenue-400" /> Our Share</div>
            <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-sm bg-gray-300 dark:bg-gray-600" /> Competitor Avg</div>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-3 dark:border-gray-800 dark:bg-gray-950">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">Feature Comparison</h3>
          <p className="mb-4 text-xs text-gray-500">RevenueOS vs competitor average</p>
          <div className="space-y-2">
            {performanceComparison.map((p) => (
              <div key={p.metric} className="flex items-center gap-3">
                <span className="w-40 shrink-0 text-xs text-gray-600 dark:text-gray-400">{p.metric}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <div className="h-2 flex-1 rounded-full bg-gray-100 dark:bg-gray-800">
                      <div className="h-2 rounded-full bg-revenue-500" style={{ width: p.us + "%" }} />
                    </div>
                    <span className="w-7 text-right text-[10px] font-medium text-revenue-600 dark:text-revenue-400">{p.us}%</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="h-1.5 flex-1 rounded-full bg-gray-100 dark:bg-gray-800">
                      <div className="h-1.5 rounded-full bg-gray-400 dark:bg-gray-600" style={{ width: p.avg + "%" }} />
                    </div>
                    <span className="w-7 text-right text-[10px] text-gray-400">{p.avg}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Competitor Cards Grid */}
      <div className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Tracked Competitors
            <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">{competitors.length}</span>
          </h2>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Search competitors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm placeholder-gray-400 focus:border-revenue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filteredCompetitors.map((c, i) => (
            <div
              key={c.id}
              className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-5 transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
              onClick={() => { setSelectedCompetitor(c.id); setShowDetailModal(true); }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={"flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-white " + bgColors[i % bgColors.length]}>{c.name.charAt(0)}</div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.location}</p>
                  </div>
                </div>
                <span className={"shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold " + getThreatClass(c)}>{getThreatLabel(c)}</span>
              </div>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{c.description}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                <span>{String.fromCodePoint(0x1F4B0)} {c.funding}</span>
                <span>{String.fromCodePoint(0x1F465)} {c.employees}</span>
                <span>{String.fromCodePoint(0x1F4C5)} {c.founded}</span>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-500">Feature overlap</span>
                  <span className={"font-semibold " + (c.featureOverlap > 70 ? "text-red-600" : c.featureOverlap > 40 ? "text-amber-600" : "text-green-600")}>{c.featureOverlap}%</span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className={"h-1.5 rounded-full " + (c.featureOverlap > 70 ? "bg-red-500" : c.featureOverlap > 40 ? "bg-amber-500" : "bg-green-500")} style={{ width: c.featureOverlap + "%" }} />
                </div>
              </div>
              <div className="mt-3 rounded-lg bg-gray-50 p-2 dark:bg-gray-900">
                <p className="text-[10px] text-gray-500">Latest move</p>
                <p className="text-[11px] font-medium text-gray-700 dark:text-gray-300 line-clamp-2">{c.recentMove}</p>
              </div>
              <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-revenue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-revenue-400">
                <span>View details</span>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Activity Feed</h2>
          <div className="flex flex-wrap gap-1">
            {activityTypes.map((f) => (
              <button key={f} onClick={() => setActivityFilter(f)} className={"rounded-lg px-2.5 py-1.5 text-xs font-medium capitalize " + (activityFilter === f ? "bg-revenue-100 text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300" : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800")}>
                {f === "all" ? "All" : f}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {filteredActivities.map((a) => (
            <div key={a.id} className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="flex items-start gap-4">
                <div className="relative flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm dark:bg-gray-800">
                    {activityIcons[a.type]}
                  </div>
                  <div className="mt-1 h-full w-px bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{a.title}</p>
                        <span className={"rounded-full px-2 py-0.5 text-[10px] font-semibold " + severityColors[a.severity]}>{a.severity}</span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-2">
                        <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">{a.competitor}</span>
                        <span className={"rounded px-1.5 py-0.5 text-[10px] font-medium " + activityTypeColors[a.type]}>{a.type}</span>
                      </div>
                    </div>
                    <span className="shrink-0 text-[11px] text-gray-400">{a.date}</span>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{a.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Detail Modal */}
      {showDetailModal && selectedComp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowDetailModal(false)}>
          <div className="mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between border-b border-gray-100 p-6 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <div className={"flex h-14 w-14 items-center justify-center rounded-xl text-2xl font-bold text-white " + bgColors[competitors.indexOf(selectedComp) % bgColors.length]}>
                  {selectedComp.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedComp.name}</h2>
                    <span className={"rounded-full px-2 py-0.5 text-xs font-semibold " + getThreatClass(selectedComp)}>{getThreatLabel(selectedComp)}</span>
                  </div>
                  <p className="text-sm text-gray-500">{selectedComp.location} &middot; Founded {selectedComp.founded}</p>
                </div>
              </div>
              <button onClick={() => setShowDetailModal(false)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{selectedComp.description}</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                  <p className="text-[10px] text-gray-500">Funding</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedComp.funding}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                  <p className="text-[10px] text-gray-500">Employees</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedComp.employees}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                  <p className="text-[10px] text-gray-500">Market Share</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{selectedComp.share}%</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Strengths</h4>
                  <div className="space-y-1.5">
                    {selectedComp.strengths.map((s) => (
                      <div key={s} className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700 dark:bg-green-950 dark:text-green-300">
                        <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Weaknesses</h4>
                  <div className="space-y-1.5">
                    {selectedComp.weaknesses.map((w) => (
                      <div key={w} className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-950 dark:text-red-300">
                        <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        {w}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="mb-3 text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Recent Activity</h4>
                <div className="space-y-2">
                  {activities.filter((a) => a.competitor === selectedComp.name).slice(0, 4).map((a) => (
                    <div key={a.id} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900">
                      <span className="text-base">{activityIcons[a.type]}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-medium text-gray-900 dark:text-white">{a.title}</p>
                          <span className={"rounded px-1.5 py-0.5 text-[9px] font-medium " + activityTypeColors[a.type]}>{a.type}</span>
                        </div>
                        <p className="mt-0.5 text-[11px] text-gray-500">{a.detail}</p>
                        <p className="mt-0.5 text-[10px] text-gray-400">{a.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 rounded-lg bg-revenue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400">
                  Run Competitive Analysis
                </button>
                <button className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900">
                  Compare Features
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alert Preferences Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowAlertModal(false)}>
          <div className="mx-4 w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-950" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-gray-100 p-5 dark:border-gray-800">
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Alert Preferences</h2>
              <button onClick={() => setShowAlertModal(false)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-5 space-y-5">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Notify me when</p>
                {[
                  { key: "competitorLaunches" as const, label: "Competitor launches new product/feature" },
                  { key: "fundingEvents" as const, label: "Competitor raises funding or gets acquired" },
                  { key: "pricingChanges" as const, label: "Competitor changes pricing" },
                  { key: "partnershipAlerts" as const, label: "Competitor forms strategic partnership" },
                  { key: "hiringSpikes" as const, label: "Competitor has major hiring spike" },
                  { key: "contentMentions" as const, label: "Competitor mentions us in content" },
                ].map((t) => (
                  <div key={t.key} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 dark:bg-gray-900">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{t.label}</span>
                    <button
                      onClick={() => setAlertSettings({ ...alertSettings, [t.key]: !alertSettings[t.key] })}
                      className={"relative h-5 w-9 shrink-0 rounded-full transition-colors " + (alertSettings[t.key] ? "bg-revenue-500" : "bg-gray-300 dark:bg-gray-600")}
                    >
                      <span className={"absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform " + (alertSettings[t.key] ? "translate-x-4" : "")} />
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Digest Frequency</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "real-time", label: "Real-time" },
                    { value: "daily", label: "Daily" },
                    { value: "weekly", label: "Weekly" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setAlertSettings({ ...alertSettings, emailDigest: opt.value })}
                      className={"rounded-lg px-3 py-2 text-xs font-medium transition-colors " + (alertSettings.emailDigest === opt.value ? "bg-revenue-100 text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300" : "bg-gray-50 text-gray-500 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800")}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setShowAlertModal(false)} className="w-full rounded-lg bg-revenue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
