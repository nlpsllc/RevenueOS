import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/app/lead-recovery")({
  component: LeadRecoveryPage,
});

// ─── Demo Data ───

const statsCards = [
  { label: "Leads Scanned", value: "12,847", change: "+1,203", positive: true },
  { label: "Recovered This Month", value: "247", change: "+23%", positive: true },
  { label: "Recovery Rate", value: "23.4%", change: "+4.1%", positive: true },
  { label: "Revenue Recovered", value: "$84,320", change: "+$12,400", positive: true },
];

const recoveryTimeline = [
  { id: 1, name: "Acme Corp", contact: "Sarah K.", value: 12000, date: "2h ago", status: "Deal Closed" as const, channel: "Email" as const },
  { id: 2, name: "TechFlow Inc", contact: "Mike R.", value: 8500, date: "5h ago", status: "Meeting Booked" as const, channel: "LinkedIn" as const },
  { id: 3, name: "Meridian Health", contact: "Jessica L.", value: 15000, date: "1d ago", status: "Responded" as const, channel: "Email" as const },
  { id: 4, name: "Stellar Labs", contact: "Anna M.", value: 22000, date: "2d ago", status: "Meeting Booked" as const, channel: "Call" as const },
  { id: 5, name: "NexGen Solutions", contact: "Tom W.", value: 6500, date: "3d ago", status: "Still Waiting" as const, channel: "Email" as const },
  { id: 6, name: "Pinnacle Group", contact: "Lisa P.", value: 9500, date: "4d ago", status: "Responded" as const, channel: "LinkedIn" as const },
];

const recoveryTrend = [
  { month: "Jan", recovered: 142, revenue: 32000 },
  { month: "Feb", recovered: 168, revenue: 41000 },
  { month: "Mar", recovered: 155, revenue: 38000 },
  { month: "Apr", recovered: 198, revenue: 52000 },
  { month: "May", recovered: 224, revenue: 68000 },
  { month: "Jun", recovered: 247, revenue: 84320 },
];

const sampleLeads = Array.from({ length: 48 }, (_, i) => {
  const firstNames = ["James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "David", "Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Christopher", "Karen"];
  const lastNames = ["Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee"];
  const companies = ["Acme Corp", "TechFlow", "Meridian Health", "Stellar Labs", "NexGen", "Pinnacle Group", "Quantum Dynamics", "Apex Solutions", "Crestview Partners", "Northstar Systems", "Silverline Tech", "BridgePoint Consulting", "Atlas Industries", "Summit Analytics", "Pioneer Software"];
  const sources = ["Website Form", "Phone Call", "Live Chat", "Referral", "LinkedIn", "Trade Show", "Webinar"];
  const statuses = ["cold", "cold", "cold", "warm", "warm", "hot"] as const;
  const daysCold = [15, 22, 8, 45, 90, 120, 35, 67, 150, 12, 55, 80, 3, 200, 40, 75, 110, 18, 130, 60];

  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[i % lastNames.length];
  const isResponded = i < 15 && i > 7;
  const isBooked = i < 7;

  return {
    id: i + 1,
    name: `${firstName} ${lastName}`,
    company: companies[i % companies.length],
    source: sources[i % sources.length],
    originalDate: `2026-${String((i % 6) + 1).padStart(2, "0")}-${String(10 + (i % 15)).padStart(2, "0")}`,
    daysCold: daysCold[i % daysCold.length],
    value: Math.floor(Math.random() * 45000 + 5000),
    status: isBooked ? "booked" as const : isResponded ? "responded" as const : statuses[i % statuses.length],
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${companies[i % companies.length].toLowerCase().replace(/\s+/g, "")}.com`,
    phone: `(${Math.floor(Math.random() * 900 + 100)}) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
  };
});

// ─── Types ───
type SortKey = "name" | "company" | "daysCold" | "value" | "status" | "source";
type SortDir = "asc" | "desc";
type FilterStatus = "all" | "cold" | "warm" | "hot" | "responded" | "booked";

// ─── Helpers ───
const statusLabel: Record<string, string> = {
  cold: "Cold (<30d)", warm: "Warm (30-60d)", hot: "Hot (60+ d)", responded: "Responded", booked: "Booked / Closed",
};
const statusColors: Record<string, string> = {
  cold: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  warm: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  hot: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  responded: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  booked: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
};

// ─── Component ───

function LeadRecoveryPage() {
  const [sortKey, setSortKey] = useState<SortKey>("daysCold");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showReengageModal, setShowReengageModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<typeof sampleLeads[0] | null>(null);
  const [reengageChannel, setReengageChannel] = useState<"email" | "call" | "linkedin">("email");
  const [sentConfirm, setSentConfirm] = useState<string | null>(null);
  const [autoReengage, setAutoReengage] = useState(true);
  const [sequenceLength, setSequenceLength] = useState(4);
  const [channelPref, setChannelPref] = useState<"email-only" | "email-linkedin" | "all">("email-linkedin");
  const [coldThreshold, setColdThreshold] = useState(30);

  const perPage = 20;

  const filtered = useMemo(() => {
    let data = sampleLeads;
    if (filterStatus !== "all") {
      if (filterStatus === "cold") data = data.filter((l) => l.status === "cold" && l.daysCold < 30);
      else if (filterStatus === "warm") data = data.filter((l) => l.status === "warm" || (l.status === "cold" && l.daysCold >= 30 && l.daysCold < 60));
      else if (filterStatus === "hot") data = data.filter((l) => l.daysCold >= 60);
      else data = data.filter((l) => l.status === filterStatus);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((l) => l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q));
    }
    data.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "company") cmp = a.company.localeCompare(b.company);
      else if (sortKey === "daysCold") cmp = a.daysCold - b.daysCold;
      else if (sortKey === "value") cmp = a.value - b.value;
      else if (sortKey === "status") cmp = a.status.localeCompare(b.status);
      else if (sortKey === "source") cmp = a.source.localeCompare(b.source);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return data;
  }, [filterStatus, search, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <span className="ml-1 text-gray-300">↕</span>;
    return <span className="ml-1 text-revenue-600">{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  const handleSendReengage = () => {
    if (!selectedLead) return;
    setSentConfirm(`${selectedLead.name} at ${selectedLead.company}`);
    setShowReengageModal(false);
    setSelectedLead(null);
    setTimeout(() => setSentConfirm(null), 2500);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lead Recovery Engine</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Scan, identify, and re-engage cold leads automatically. Recovered revenue: <strong className="text-green-600 dark:text-green-400">$84,320</strong>
          </p>
        </div>
        <button className="rounded-lg bg-revenue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400">
          <span className="hidden sm:inline">Run Scan Now</span>
          <span className="sm:hidden">Scan</span>
        </button>
      </div>

      {/* Success toast */}
      {sentConfirm && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
          <svg className="h-5 w-5 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Re-engagement sent to {sentConfirm}!
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        {statsCards.map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-start justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${s.positive ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"}`}>{s.change}</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Chart + Timeline Row */}
      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Recovery Trend Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 lg:col-span-2 dark:border-gray-800 dark:bg-gray-950">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Recovery Trend</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Leads recovered per month</p>
          <div className="mt-6">
            <div className="flex items-end justify-between gap-2" style={{ height: 150 }}>
              {recoveryTrend.map((m) => (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                  <div className="w-full rounded-t-md bg-gradient-to-t from-revenue-500 to-revenue-400 transition-all hover:from-revenue-600 hover:to-revenue-500" style={{ height: `${(m.recovered / 247) * 130}px` }} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">{m.recovered}</span>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{m.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-revenue-400" /><span>Leads recovered</span></div>
              <div className="flex items-center gap-1"><span className="font-medium text-revenue-600">$84.3K</span><span>total revenue</span></div>
            </div>
          </div>
        </div>

        {/* Recent Recoveries */}
        <div className="rounded-xl border border-gray-200 bg-white lg:col-span-3 dark:border-gray-800 dark:bg-gray-950">
          <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Recent Recoveries</h3>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {recoveryTimeline.map((r) => (
              <div key={r.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-revenue-100 text-xs font-bold text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300">
                  {r.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{r.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{r.contact} · {r.channel} · {r.date}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  r.status === "Deal Closed" ? "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                  : r.status === "Meeting Booked" ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                  : r.status === "Responded" ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  : "bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-400"
                }`}>{r.status}</span>
                <span className="shrink-0 text-sm font-bold text-gray-900 dark:text-white">${r.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        {/* Table Header with Filters */}
        <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">All Leads</h3>
            <div className="flex flex-wrap items-center gap-2">
              {/* Search */}
              <div className="relative">
                <svg className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search leads..." className="w-48 rounded-lg border border-gray-300 bg-white py-1.5 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500" />
              </div>
              {/* Filter buttons */}
              {(["all", "cold", "warm", "hot", "responded", "booked"] as const).map((f) => (
                <button key={f} onClick={() => { setFilterStatus(f); setPage(1); }} className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${filterStatus === f ? "bg-revenue-100 text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300" : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"}`}>
                  {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                {[
                  { key: "name" as SortKey, label: "Lead Name" },
                  { key: "company" as SortKey, label: "Company" },
                  { key: "source" as SortKey, label: "Source" },
                  { key: "daysCold" as SortKey, label: "Days Cold" },
                  { key: "status" as SortKey, label: "Status" },
                  { key: "value" as SortKey, label: "Est. Value" },
                ].map((col) => (
                  <th key={col.key} onClick={() => handleSort(col.key)} className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-xs font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    {col.label}<SortIcon col={col.key} />
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {paged.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-400">No leads match your filters.</td></tr>
              ) : (
                paged.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 dark:text-white">{lead.name}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{lead.company}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{lead.source}</td>
                    <td className="px-4 py-3">
                      <span className={`font-medium ${lead.daysCold >= 60 ? "text-red-600 dark:text-red-400" : lead.daysCold >= 30 ? "text-amber-600 dark:text-amber-400" : "text-gray-600 dark:text-gray-400"}`}>
                        {lead.daysCold}d
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[lead.status]}`}>
                        {statusLabel[lead.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">${lead.value.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">
                      {lead.status !== "booked" && lead.status !== "responded" ? (
                        <button
                          onClick={() => { setSelectedLead(lead); setShowReengageModal(true); }}
                          className="rounded-lg bg-revenue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400"
                        >
                          Re-engage
                        </button>
                      ) : (
                        <span className="text-xs text-green-600 dark:text-green-400">
                          {lead.status === "booked" ? "Closed" : "Active"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filtered.length > perPage && (
          <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3 dark:border-gray-800">
            <p className="text-xs text-gray-500">Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</p>
            <div className="flex gap-1">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900">Prev</button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const start = Math.max(1, page - 2);
                const p = start + i;
                if (p > totalPages) return null;
                return (
                  <button key={p} onClick={() => setPage(p)} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${page === p ? "bg-revenue-600 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"}`}>
                    {p}
                  </button>
                );
              })}
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Settings Section */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-gray-900 dark:text-white">
            Automation Rules
            <svg className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="mt-4 space-y-5">
            {/* Auto re-engage toggle */}
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Auto re-engage cold leads</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Automatically send re-engagement sequences to leads cold for more than {coldThreshold} days</p>
              </div>
              <button
                onClick={() => setAutoReengage(!autoReengage)}
                className={`relative h-6 w-11 rounded-full transition-colors ${autoReengage ? "bg-revenue-500" : "bg-gray-300 dark:bg-gray-600"}`}
              >
                <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${autoReengage ? "translate-x-5" : ""}`} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cold threshold (days)</label>
                <input type="number" value={coldThreshold} onChange={(e) => setColdThreshold(Number(e.target.value))} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white" min={7} max={180} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sequence touches</label>
                <select value={sequenceLength} onChange={(e) => setSequenceLength(Number(e.target.value))} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white">
                  {[2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} touches</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Channel preference</label>
                <select value={channelPref} onChange={(e) => setChannelPref(e.target.value as typeof channelPref)} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white">
                  <option value="email-only">Email only</option>
                  <option value="email-linkedin">Email + LinkedIn</option>
                  <option value="all">All channels</option>
                </select>
              </div>
            </div>
          </div>
        </details>
      </div>

      {/* ─── Re-engage Modal ─── */}
      {showReengageModal && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Re-engage Lead</h2>
              <button onClick={() => { setShowReengageModal(false); setSelectedLead(null); }} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="space-y-5 px-6 py-5">
              {/* Lead info */}
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-gray-500">Name:</span> <span className="font-medium text-gray-900 dark:text-white">{selectedLead.name}</span></div>
                  <div><span className="text-gray-500">Company:</span> <span className="font-medium text-gray-900 dark:text-white">{selectedLead.company}</span></div>
                  <div><span className="text-gray-500">Source:</span> <span className="text-gray-700 dark:text-gray-300">{selectedLead.source}</span></div>
                  <div><span className="text-gray-500">Days cold:</span> <span className="font-medium text-amber-600">{selectedLead.daysCold}d</span></div>
                  <div><span className="text-gray-500">Email:</span> <span className="text-gray-600 dark:text-gray-400 text-xs break-all">{selectedLead.email}</span></div>
                  <div><span className="text-gray-500">Phone:</span> <span className="text-gray-600 dark:text-gray-400">{selectedLead.phone}</span></div>
                </div>
              </div>

              {/* Channel selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Channel</label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(["email", "call", "linkedin"] as const).map((ch) => (
                    <button key={ch} onClick={() => setReengageChannel(ch)} className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-all capitalize ${
                      reengageChannel === ch
                        ? "border-revenue-500 bg-revenue-50 text-revenue-700 dark:border-revenue-400 dark:bg-revenue-950 dark:text-revenue-300"
                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-400 dark:hover:bg-gray-900"
                    }`}>
                      {ch === "linkedin" ? "LinkedIn" : ch}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message preview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message preview</label>
                <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    Hi <strong>{selectedLead.name.split(" ")[0]}</strong>,<br /><br />
                    I noticed you reached out to us back in{" "}
                    {new Date(selectedLead.originalDate).toLocaleString("default", { month: "long", year: "numeric" })}{" "}
                    via <strong>{selectedLead.source}</strong> — and I wanted to make sure we didn't drop the ball.
                    <br /><br />
                    We've launched some new features since then, and I'd love to show you what's changed.
                    Would you be open to a quick 15-minute call this week?
                    <br /><br />
                    Best,<br />
                    The RevenueOS Team
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4 dark:border-gray-800">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Est. value: <strong className="text-green-600">${selectedLead.value.toLocaleString()}</strong>
              </p>
              <div className="flex gap-2">
                <button onClick={() => { setShowReengageModal(false); setSelectedLead(null); }} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900">Cancel</button>
                <button onClick={handleSendReengage} className="rounded-lg bg-revenue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400">
                  Send Re-engagement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}