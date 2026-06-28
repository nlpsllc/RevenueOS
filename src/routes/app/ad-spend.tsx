import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/app/ad-spend")({
  component: AdSpendPage,
});

// ─── Demo Data ───

const overviewStats = [
  { label: "Monthly Spend", value: "$128,400", change: "+$12.2K", positive: false },
  { label: "Wasted Spend", value: "$31,200", change: "-$5.4K", positive: true },
  { label: "ROAS", value: "3.2x", change: "+0.4x", positive: true },
  { label: "Budget Reallocated", value: "$18,700", change: "+$3.2K", positive: true },
];

const spendTrend = [
  { month: "Jan", spend: 112000, roas: 2.4 },
  { month: "Feb", spend: 108000, roas: 2.6 },
  { month: "Mar", spend: 115000, roas: 2.5 },
  { month: "Apr", spend: 121000, roas: 2.8 },
  { month: "May", spend: 125000, roas: 3.0 },
  { month: "Jun", spend: 128400, roas: 3.2 },
];

const wasteAlerts = [
  { title: "Google Search — Brand Keywords", waste: "$8,400", desc: "Branded terms are 94% of spend but drive only 12% of new conversions", impact: "High", platform: "Google" },
  { title: "Meta — Retargeting Audience Saturation", waste: "$5,200", desc: "Same audience seeing ads 9+ times — frequency cap recommended", impact: "High", platform: "Meta" },
  { title: "LinkedIn — Sponsored Content", waste: "$3,100", desc: "CPC is 2.3x above LinkedIn benchmark with declining CTR", impact: "Medium", platform: "LinkedIn" },
];

const campaigns = [
  { id: 1, name: "AI Sales — Search", platform: "Google" as const, spend: 28400, impressions: 142000, clicks: 7100, conversions: 284, cpa: 100, roas: 4.2, status: "overperforming" as const },
  { id: 2, name: "Revenue Recovery — Display", platform: "Google" as const, spend: 18300, impressions: 284000, clicks: 4200, conversions: 85, cpa: 215, roas: 1.8, status: "underperforming" as const },
  { id: 3, name: "Free Trial — Social", platform: "Meta" as const, spend: 22400, impressions: 312000, clicks: 8900, conversions: 178, cpa: 126, roas: 3.5, status: "overperforming" as const },
  { id: 4, name: "Retargeting — Website Visitors", platform: "Meta" as const, spend: 15600, impressions: 198000, clicks: 3400, conversions: 52, cpa: 300, roas: 1.4, status: "at-risk" as const },
  { id: 5, name: "Demo Request — Search", platform: "Google" as const, spend: 12400, impressions: 62000, clicks: 3100, conversions: 124, cpa: 100, roas: 3.8, status: "overperforming" as const },
  { id: 6, name: "Enterprise — LinkedIn Ads", platform: "LinkedIn" as const, spend: 14200, impressions: 84000, clicks: 1400, conversions: 28, cpa: 507, roas: 1.6, status: "underperforming" as const },
  { id: 7, name: "Webinar Promotion — Social", platform: "Meta" as const, spend: 9800, impressions: 145000, clicks: 4100, conversions: 62, cpa: 158, roas: 2.8, status: "overperforming" as const },
  { id: 8, name: "Brand Awareness — Video", platform: "Meta" as const, spend: 11200, impressions: 420000, clicks: 5200, conversions: 38, cpa: 295, roas: 1.9, status: "at-risk" as const },
  { id: 9, name: "Lead Gen — LinkedIn", platform: "LinkedIn" as const, spend: 8100, impressions: 38000, clicks: 680, conversions: 24, cpa: 338, roas: 2.1, status: "underperforming" as const },
  { id: 10, name: "Case Study — Display", platform: "Google" as const, spend: 6400, impressions: 95000, clicks: 1900, conversions: 42, cpa: 152, roas: 2.9, status: "overperforming" as const },
];

const platformBreakdown = [
  { name: "Google Ads", icon: "GA", spend: 65500, budget: 75000, roas: 3.1, campaigns: 4, color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400" },
  { name: "Meta Ads", icon: "MA", spend: 59000, budget: 65000, roas: 2.6, campaigns: 4, color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400" },
  { name: "LinkedIn Ads", icon: "LI", spend: 22300, budget: 30000, roas: 1.8, campaigns: 2, color: "bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400" },
];

const suggestions = [
  { campaign: "Revenue Recovery — Display", action: "Reduce budget by 30%", reason: "ROAS is 1.8x — well below 2.5x target", impact: "$5,490 saved", confidence: "High", platform: "Google" },
  { campaign: "AI Sales — Search", action: "Increase budget by 20%", reason: "ROAS is 4.2x, well above 2.5x target — scaling opportunity", impact: "+$23,800 revenue", confidence: "High", platform: "Google" },
  { campaign: "Retargeting — Website Visitors", action: "Pause campaign", reason: "ROAS of 1.4x with frequency at 9x — audience saturated", impact: "$15,600 saved", confidence: "Medium", platform: "Meta" },
  { campaign: "Enterprise — LinkedIn Ads", action: "Reduce budget by 40%", reason: "CPA of $507 is 2x above acceptable threshold", impact: "$5,680 saved", confidence: "Medium", platform: "LinkedIn" },
];

// ─── Colors ───
const performanceColors: Record<string, string> = {
  overperforming: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  underperforming: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  "at-risk": "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
};

const platformColors: Record<string, string> = {
  Google: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Meta: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  LinkedIn: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
};

// ─── Component ───

function AdSpendPage() {
  const [platformFilter, setPlatformFilter] = useState("all");
  const [perfFilter, setPerfFilter] = useState("all");
  const [sortKey, setSortKey] = useState<string>("spend");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [showConfirm, setShowConfirm] = useState<typeof suggestions[0] | null>(null);
  const [targetRoas, setTargetRoas] = useState(2.5);
  const [autoPause, setAutoPause] = useState(false);
  const [dailyCap, setDailyCap] = useState(true);

  const filtered = useMemo(() => {
    let data = [...campaigns];
    if (platformFilter !== "all") data = data.filter((c) => c.platform === platformFilter);
    if (perfFilter !== "all") data = data.filter((c) => c.status === perfFilter);
    data.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "spend") cmp = a.spend - b.spend;
      else if (sortKey === "roas") cmp = a.roas - b.roas;
      else if (sortKey === "cpa") cmp = a.cpa - b.cpa;
      else if (sortKey === "conversions") cmp = a.conversions - b.conversions;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return data;
  }, [platformFilter, perfFilter, sortKey, sortDir]);

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  };

  const SortIcon = ({ col }: { col: string }) => {
    if (sortKey !== col) return <span className="ml-1 text-gray-300">↕</span>;
    return <span className="ml-1 text-revenue-600">{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  const maxSpend = Math.max(...spendTrend.map((m) => m.spend));
  const maxRoas = 5;

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ad Spend Optimizer</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Detect waste, optimize budgets, improve ROAS across all platforms.
          </p>
        </div>
        <button className="rounded-lg bg-revenue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400">
          Run Analysis
        </button>
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

      {/* Chart + Waste Alerts */}
      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Spend vs ROAS Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 lg:col-span-3 dark:border-gray-800 dark:bg-gray-950">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Spend vs. ROAS</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Monthly trend — bars: spend, line: ROAS</p>
          <div className="mt-6">
            <div className="flex items-end justify-between gap-3" style={{ height: 160 }}>
              {spendTrend.map((m) => {
                const barH = (m.spend / maxSpend) * 130;
                const roasPct = (m.roas / maxRoas) * 100;
                return (
                  <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                    {/* ROAS dot */}
                    <div className="relative" style={{ marginBottom: `${Math.max(0, 130 - barH - roasPct * 1.3)}px` }}>
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-950" />
                    </div>
                    {/* Spend bar */}
                    <div className="w-full rounded-t-md bg-gradient-to-t from-revenue-500 to-revenue-400" style={{ height: `${barH}px` }} />
                    <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400">{m.month}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1"><div className="h-2.5 w-2.5 rounded bg-revenue-400" /><span>Monthly spend</span></div>
              <div className="flex items-center gap-1"><div className="h-2.5 w-2.5 rounded-full bg-green-500" /><span>ROAS</span></div>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">Target ROAS: <strong className="text-gray-700 dark:text-gray-300">{targetRoas}x</strong></span>
            </div>
          </div>
        </div>

        {/* Waste Alerts */}
        <div className="rounded-xl border border-gray-200 bg-white lg:col-span-2 dark:border-gray-800 dark:bg-gray-950">
          <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Waste Alerts</h3>
            <p className="text-xs text-gray-500">${(8400 + 5200 + 3100).toLocaleString()} identified this month</p>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {wasteAlerts.map((alert) => (
              <div key={alert.title} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${platformColors[alert.platform]}`}>{alert.platform}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${alert.impact === "High" ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300" : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"}`}>{alert.impact} Impact</span>
                    </div>
                    <p className="mt-1.5 text-sm font-medium text-gray-900 dark:text-white">{alert.title}</p>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{alert.desc}</p>
                  </div>
                  <span className="shrink-0 text-sm font-bold text-red-600 dark:text-red-400">${alert.waste}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {platformBreakdown.map((p) => (
          <div key={p.name} className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${p.color}`}>{p.icon}</div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{p.name}</p>
                <p className="text-xs text-gray-500">{p.campaigns} active campaigns</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs"><span className="text-gray-500">Budget used</span><span className="font-medium text-gray-900 dark:text-white">${p.spend.toLocaleString()} / ${p.budget.toLocaleString()}</span></div>
              <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800"><div className="h-2 rounded-full bg-revenue-500" style={{ width: `${(p.spend / p.budget) * 100}%` }} /></div>
              <div className="flex justify-between text-xs"><span className="text-gray-500">ROAS</span><span className={`font-bold ${p.roas >= 2.5 ? "text-green-600" : "text-red-600"}`}>{p.roas}x</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Campaigns</h3>
            <div className="flex flex-wrap items-center gap-2">
              {["all", "Google", "Meta", "LinkedIn"].map((f) => (
                <button key={f} onClick={() => setPlatformFilter(f)} className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ${platformFilter === f ? "bg-revenue-100 text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300" : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"}`}>{f === "all" ? "All" : f}</button>
              ))}
              <span className="text-gray-200 dark:text-gray-700">|</span>
              {["all", "overperforming", "underperforming", "at-risk"].map((f) => (
                <button key={f} onClick={() => setPerfFilter(f)} className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ${perfFilter === f ? "bg-revenue-100 text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300" : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"}`}>{f === "all" ? "All" : f === "overperforming" ? "✅ Over" : f === "underperforming" ? "⚠️ Under" : "🔴 At Risk"}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                {[
                  { key: "name", label: "Campaign" },
                  { key: "spend", label: "Spend" },
                  { key: "conversions", label: "Conversions" },
                  { key: "cpa", label: "CPA" },
                  { key: "roas", label: "ROAS" },
                ].map((col) => (
                  <th key={col.key} onClick={() => handleSort(col.key)} className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-xs font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    {col.label}<SortIcon col={col.key} />
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Platform</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{c.name}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">${c.spend.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{c.conversions}</td>
                  <td className="px-4 py-3 font-medium">${c.cpa}</td>
                  <td className={`px-4 py-3 font-bold ${c.roas >= 2.5 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{c.roas}x</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${platformColors[c.platform]}`}>{c.platform}</span></td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${performanceColors[c.status]}`}>{c.status === "overperforming" ? "✅ Over" : c.status === "underperforming" ? "⚠️ Under" : "🔴 At Risk"}</span></td>
                  <td className="px-4 py-3 text-right">
                    {c.status !== "overperforming" ? (
                      <button className="rounded-lg bg-revenue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400">Optimize</button>
                    ) : (
                      <span className="text-xs text-green-600 dark:text-green-400">Scaling</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Optimization Suggestions */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Optimization Suggestions</h2>
        <div className="grid gap-4">
          {suggestions.map((s, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${platformColors[s.platform]}`}>{s.platform}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${s.confidence === "High" ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"}`}>{s.confidence} confidence</span>
                </div>
                <p className="mt-1.5 text-sm font-medium text-gray-900 dark:text-white">{s.campaign}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5"><strong className="text-revenue-600">{s.action}</strong> — {s.reason}</p>
              </div>
              <div className="shrink-0 text-right ml-4">
                <p className="text-sm font-bold text-green-600 dark:text-green-400">{s.impact}</p>
                <button
                  onClick={() => setShowConfirm(s)}
                  className="mt-1.5 rounded-lg bg-revenue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-gray-900 dark:text-white">
            Rules & Settings
            <svg className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </summary>
          <div className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Target ROAS</label>
                <input type="number" value={targetRoas} onChange={(e) => setTargetRoas(Number(e.target.value))} step={0.1} min={1} max={10} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white" />
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <div><p className="text-sm font-medium text-gray-900 dark:text-white">Auto-pause below threshold</p><p className="text-xs text-gray-500">Pause campaigns below target ROAS</p></div>
                <button onClick={() => setAutoPause(!autoPause)} className={`relative h-6 w-11 rounded-full transition-colors ${autoPause ? "bg-revenue-500" : "bg-gray-300 dark:bg-gray-600"}`}><span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${autoPause ? "translate-x-5" : ""}`} /></button>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <div><p className="text-sm font-medium text-gray-900 dark:text-white">Daily budget cap</p><p className="text-xs text-gray-500">Enforce daily budget limits</p></div>
                <button onClick={() => setDailyCap(!dailyCap)} className={`relative h-6 w-11 rounded-full transition-colors ${dailyCap ? "bg-revenue-500" : "bg-gray-300 dark:bg-gray-600"}`}><span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${dailyCap ? "translate-x-5" : ""}`} /></button>
              </div>
            </div>
          </div>
        </details>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950">
            <div className="px-6 py-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg></div>
                <div><h2 className="text-lg font-bold text-gray-900 dark:text-white">Apply Suggestion</h2><p className="text-sm text-gray-500">{showConfirm.action} on <strong>{showConfirm.campaign}</strong></p></div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900"><div className="flex justify-between text-sm"><span className="text-gray-600 dark:text-gray-400">Estimated impact</span><span className="font-bold text-green-600">{showConfirm.impact}</span></div><div className="flex justify-between text-sm mt-2"><span className="text-gray-600 dark:text-gray-400">Confidence</span><span className="font-medium">{showConfirm.confidence}</span></div></div>
              <div className="mt-5 flex gap-2 justify-end">
                <button onClick={() => setShowConfirm(null)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900">Cancel</button>
                <button onClick={() => setShowConfirm(null)} className="rounded-lg bg-revenue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}