import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/app/churn")({
  component: ChurnPage,
});

// ─── Demo Data ───

const overviewStats = [
  { label: "At-Risk Accounts", value: "18", change: "-3", positive: true },
  { label: "Churn Rate", value: "4.2%", change: "-0.8%", positive: true },
  { label: "Upsell Opportunities", value: "12", change: "+4", positive: true },
  { label: "Net Revenue Retention", value: "108%", change: "+3%", positive: true },
];

const churnTrend = [
  { month: "Jan", atRisk: 24, churnRate: 5.8 },
  { month: "Feb", atRisk: 22, churnRate: 5.2 },
  { month: "Mar", atRisk: 21, churnRate: 4.9 },
  { month: "Apr", atRisk: 19, churnRate: 4.5 },
  { month: "May", atRisk: 20, churnRate: 4.6 },
  { month: "Jun", atRisk: 18, churnRate: 4.2 },
];

const atRiskAccounts = [
  { id: 1, name: "Stellar Labs", plan: "Scale", mrr: 8000, riskScore: 87, riskFactor: "No login in 18 days", lastLogin: "18 days ago", lastTicket: "12 days ago — Billing issue", status: "critical" as const },
  { id: 2, name: "Meridian Health", plan: "Growth", mrr: 5000, riskScore: 76, riskFactor: "Feature usage down 60%", lastLogin: "12 days ago", lastTicket: "5 days ago — Integration problem", status: "critical" as const },
  { id: 3, name: "NexGen Solutions", plan: "Scale", mrr: 8000, riskScore: 72, riskFactor: "Support tickets spiking", lastLogin: "3 days ago", lastTicket: "1 day ago — Multiple issues", status: "high" as const },
  { id: 4, name: "Pinnacle Group", plan: "Growth", mrr: 5000, riskScore: 65, riskFactor: "Contract expiring in 30 days", lastLogin: "7 days ago", lastTicket: "2 days ago — Feature request", status: "high" as const },
  { id: 5, name: "TechFlow Inc", plan: "Enterprise", mrr: 12000, riskScore: 58, riskFactor: "Champion left company", lastLogin: "10 days ago", lastTicket: "8 days ago — Account change", status: "medium" as const },
  { id: 6, name: "Apex Solutions", plan: "Growth", mrr: 5000, riskScore: 52, riskFactor: "Competitor evaluation detected", lastLogin: "6 days ago", lastTicket: "4 days ago — Feature comparison", status: "medium" as const },
  { id: 7, name: "Crestview Partners", plan: "Scale", mrr: 8000, riskScore: 45, riskFactor: "NPS dropped from 8 to 5", lastLogin: "5 days ago", lastTicket: "3 days ago — Onboarding feedback", status: "medium" as const },
  { id: 8, name: "Quantum Dynamics", plan: "Enterprise", mrr: 12000, riskScore: 38, riskFactor: "Team size reduction", lastLogin: "4 days ago", lastTicket: "None", status: "low" as const },
  { id: 9, name: "Silverline Tech", plan: "Growth", mrr: 5000, riskScore: 32, riskFactor: "Feature adoption stalled", lastLogin: "8 days ago", lastTicket: "6 days ago — Training request", status: "low" as const },
  { id: 10, name: "Summit Analytics", plan: "Scale", mrr: 8000, riskScore: 28, riskFactor: "Usage flat for 30 days", lastLogin: "2 days ago", lastTicket: "None", status: "stable" as const },
  { id: 11, name: "Northstar Systems", plan: "Growth", mrr: 5000, riskScore: 22, riskFactor: "Support request pattern change", lastLogin: "1 day ago", lastTicket: "Today — How-to question", status: "stable" as const },
  { id: 12, name: "BridgePoint Consulting", plan: "Enterprise", mrr: 12000, riskScore: 15, riskFactor: "Minimal concern", lastLogin: "Today", lastTicket: "None", status: "stable" as const },
];

const upsellOpportunities = [
  { id: 1, name: "Pioneer Software", currentPlan: "Growth", suggestedPlan: "Scale", reason: "Usage hit 92% of Growth limits — 18 team members on a 15-seat plan", uplift: 3000, type: "expansion" as const },
  { id: 2, name: "Atlas Industries", currentPlan: "Scale", suggestedPlan: "Enterprise", reason: "Feature adoption at 85% — requesting SSO and advanced analytics", uplift: 4000, type: "expansion" as const },
  { id: 3, name: "Meridian Health", currentPlan: "Growth", suggestedPlan: "Scale", reason: "Team grew from 8 to 14 — exceeding Growth tier limits", uplift: 3000, type: "expansion" as const },
  { id: 4, name: "Acme Corp", currentPlan: "Scale", suggestedPlan: "Enterprise", reason: "Multi-region expansion requires Enterprise features", uplift: 4000, type: "new-feature" as const },
  { id: 5, name: "TechFlow Inc", currentPlan: "Enterprise", suggestedPlan: "Enterprise + AI Add-on", reason: "Requested AI-driven forecasting module", uplift: 2500, type: "add-on" as const },
  { id: 6, name: "Stellar Labs", currentPlan: "Growth", suggestedPlan: "Scale", reason: "Cross-sell opportunity: Linked follow-up automation and review management", uplift: 3000, type: "cross-sell" as const },
  { id: 7, name: "Quantum Dynamics", currentPlan: "Enterprise", suggestedPlan: "Enterprise + Custom", reason: "Requested custom API integration and dedicated support", uplift: 5000, type: "add-on" as const },
  { id: 8, name: "NexGen Solutions", currentPlan: "Scale", suggestedPlan: "Enterprise", reason: "Usage of advanced features at 90% — time to upgrade", uplift: 4000, type: "expansion" as const },
  { id: 9, name: "Summit Analytics", currentPlan: "Growth", suggestedPlan: "Scale", reason: "14-day trial of Scale features — high engagement signals", uplift: 3000, type: "cross-sell" as const },
  { id: 10, name: "Pinnacle Group", currentPlan: "Growth", suggestedPlan: "Scale", reason: "Adding 6 new team members next quarter", uplift: 3000, type: "expansion" as const },
  { id: 11, name: "Crestview Partners", currentPlan: "Scale", suggestedPlan: "Enterprise", reason: "Requested advanced reporting and BI integrations", uplift: 4000, type: "new-feature" as const },
  { id: 12, name: "Apex Solutions", currentPlan: "Growth", suggestedPlan: "Scale", reason: "Consistently exceeding Growth tier usage for 60 days", uplift: 3000, type: "expansion" as const },
];

const riskSignals = [
  { signal: "No login in 14+ days", accounts: 12, severity: "High" as const, icon: "🔴" },
  { signal: "Feature usage declined >40%", accounts: 8, severity: "High" as const, icon: "🔴" },
  { signal: "Negative support sentiment", accounts: 5, severity: "High" as const, icon: "🔴" },
  { signal: "NPS score dropped significantly", accounts: 6, severity: "Medium" as const, icon: "🟡" },
  { signal: "Contract renewal approaching", accounts: 4, severity: "Medium" as const, icon: "🟡" },
  { signal: "Champion/contact changed", accounts: 3, severity: "Medium" as const, icon: "🟡" },
  { signal: "Competitor evaluation detected", accounts: 2, severity: "Medium" as const, icon: "🟡" },
  { signal: "Support tickets spiking", accounts: 4, severity: "Low" as const, icon: "🟢" },
  { signal: "Billing issues / failed payments", accounts: 3, severity: "Low" as const, icon: "🟢" },
  { signal: "Team size reduction", accounts: 2, severity: "Low" as const, icon: "🟢" },
];

const summaryCards = [
  { count: "8", label: "accounts flagged this week", change: "-3", positive: true },
  { count: "12", label: "upsell opportunities worth $38,500", change: "+$8,200", positive: true },
  { count: "3", label: "retention campaigns active", change: "+1", positive: true },
];

// ─── Colors ───
const riskColors: Record<string, string> = {
  critical: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  high: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  medium: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  low: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  stable: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
};

const riskBarColors: Record<string, string> = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-amber-500",
  low: "bg-yellow-500",
  stable: "bg-green-500",
};

const upsellTypeIcons: Record<string, string> = {
  expansion: "📈",
  "add-on": "🧩",
  "cross-sell": "🔄",
  "new-feature": "✨",
};

const severityColors: Record<string, string> = {
  High: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  Medium: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Low: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
};

// ─── Component ───

function ChurnPage() {
  const [riskFilter, setRiskFilter] = useState("all");
  const [upsellTypeFilter, setUpsellTypeFilter] = useState("all");
  const [expandedAccount, setExpandedAccount] = useState<number | null>(null);
  const [autoRetention, setAutoRetention] = useState(true);

  const filteredAccounts = useMemo(() => {
    if (riskFilter === "all") return atRiskAccounts;
    return atRiskAccounts.filter((a) => a.status === riskFilter);
  }, [riskFilter]);

  const filteredUpsells = useMemo(() => {
    if (upsellTypeFilter === "all") return upsellOpportunities;
    return upsellOpportunities.filter((u) => u.type === upsellTypeFilter);
  }, [upsellTypeFilter]);

  const maxAtRisk = Math.max(...churnTrend.map((m) => m.atRisk));

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Churn Risk & Upsell</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Detect at-risk accounts, prevent churn, and identify expansion opportunities.
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

      {/* Summary Cards + Chart */}
      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Summary Cards */}
        <div className="space-y-3 lg:col-span-2">
          {summaryCards.map((card) => (
            <div key={card.label} className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.count}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${card.positive ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"}`}>{card.change}</span>
              </div>
            </div>
          ))}

          {/* Churn Trend Chart */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Churn Trend</h3>
            <p className="text-xs text-gray-500 mb-4">At-risk accounts over time</p>
            <div className="flex items-end justify-between gap-2" style={{ height: 100 }}>
              {churnTrend.map((m) => (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                  <div className="w-full rounded-t-md bg-gradient-to-t from-red-400 to-red-300" style={{ height: `${(m.atRisk / maxAtRisk) * 80}px` }} />
                  <span className="text-[10px] text-gray-500">{m.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>Churn rate: 4.2%</span>
              <span className="text-green-600">↓ 1.6% from Jan</span>
            </div>
          </div>
        </div>

        {/* At-Risk Accounts Table */}
        <div className="rounded-xl border border-gray-200 bg-white lg:col-span-3 dark:border-gray-800 dark:bg-gray-950">
          <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">At-Risk Accounts</h3>
              <div className="flex flex-wrap gap-1">
                {["all", "critical", "high", "medium", "low", "stable"].map((f) => (
                  <button key={f} onClick={() => setRiskFilter(f)} className={`rounded-lg px-2.5 py-1.5 text-xs font-medium capitalize ${riskFilter === f ? "bg-revenue-100 text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300" : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"}`}>{f === "all" ? "All" : f}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900 text-xs text-gray-500">
                  <th className="px-4 py-3 text-left font-semibold">Account</th>
                  <th className="px-4 py-3 text-left font-semibold">Plan / MRR</th>
                  <th className="px-4 py-3 text-left font-semibold">Risk Score</th>
                  <th className="px-4 py-3 text-left font-semibold">Top Risk Factor</th>
                  <th className="px-4 py-3 text-left font-semibold">Last Login</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredAccounts.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{a.name}</td>
                    <td className="px-4 py-3">
                      <span className="text-gray-700 dark:text-gray-300">{a.plan}</span>
                      <span className="text-gray-400 dark:text-gray-500"> · ${a.mrr.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-16 rounded-full bg-gray-100 dark:bg-gray-800`}>
                          <div className={`h-2 rounded-full ${riskBarColors[a.status]}`} style={{ width: `${a.riskScore}%` }} />
                        </div>
                        <span className={`text-xs font-bold ${a.riskScore >= 60 ? "text-red-600" : a.riskScore >= 30 ? "text-amber-600" : "text-green-600"}`}>{a.riskScore}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 max-w-[180px] truncate">{a.riskFactor}</td>
                    <td className="px-4 py-3 text-gray-500">{a.lastLogin}</td>
                    <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${riskColors[a.status]}`}>{a.status}</span></td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-1 justify-end">
                        <button className="rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900">View</button>
                        <button className="rounded-lg bg-revenue-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400">Retain</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Risk Factors & Signals */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Risk Factors & Signals</h3>
          <p className="text-xs text-gray-500">Detected across {atRiskAccounts.length} accounts</p>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
          {riskSignals.map((signal) => (
            <div key={signal.signal} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900">
              <span className="text-lg shrink-0">{signal.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{signal.signal}</p>
                <p className="text-xs text-gray-500 mt-0.5">{signal.accounts} account{signal.accounts !== 1 ? "s" : ""} affected</p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${severityColors[signal.severity]}`}>{signal.severity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upsell Opportunities */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Upsell Opportunities</h2>
          <div className="flex gap-1">
            {["all", "expansion", "add-on", "cross-sell", "new-feature"].map((f) => (
              <button key={f} onClick={() => setUpsellTypeFilter(f)} className={`rounded-lg px-2.5 py-1.5 text-xs font-medium capitalize ${upsellTypeFilter === f ? "bg-revenue-100 text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300" : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"}`}>{f === "all" ? "All" : f.replace("-", " ")}</button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredUpsells.map((u) => (
            <div key={u.id} className="rounded-xl border border-gray-200 bg-white p-5 transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{upsellTypeIcons[u.type]}</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{u.name}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600 dark:bg-gray-800 dark:text-gray-400">{u.currentPlan}</span>
                    <span className="text-gray-400">→</span>
                    <span className="rounded-full bg-green-50 px-2 py-0.5 font-medium text-green-700 dark:bg-green-950 dark:text-green-300">{u.suggestedPlan}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-green-600 dark:text-green-400">+${u.uplift.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">/mo uplift</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{u.reason}</p>
              <button className="mt-3 w-full rounded-lg bg-revenue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400">Create Proposal</button>
            </div>
          ))}
        </div>
      </div>

      {/* Retention Playbook */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-gray-900 dark:text-white">
            Retention Playbook
            <svg className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </summary>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
              <div><p className="text-sm font-medium text-gray-900 dark:text-white">Auto-retention campaigns</p><p className="text-xs text-gray-500">Automatically trigger retention sequences for high-risk accounts</p></div>
              <button onClick={() => setAutoRetention(!autoRetention)} className={`relative h-6 w-11 rounded-full transition-colors ${autoRetention ? "bg-revenue-500" : "bg-gray-300 dark:bg-gray-600"}`}><span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${autoRetention ? "translate-x-5" : ""}`} /></button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { action: "Send re-engagement email", desc: "Personalized email to dormant accounts", enabled: true },
                { action: "Offer retention discount", desc: "10-20% discount for at-risk enterprise accounts", enabled: true },
                { action: "Schedule check-in call", desc: "CSM calls high-risk accounts within 48h", enabled: false },
                { action: "Escalate to account manager", desc: "AM intervention for critical accounts", enabled: true },
              ].map((play) => (
                <div key={play.action} className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-950">
                  <div className="flex items-start justify-between">
                    <p className="text-xs font-medium text-gray-900 dark:text-white">{play.action}</p>
                    <span className={`ml-2 h-2 w-2 shrink-0 rounded-full ${play.enabled ? "bg-green-500" : "bg-gray-300"}`} />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{play.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}