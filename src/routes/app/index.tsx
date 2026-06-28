import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

const metrics = [
  {
    label: "Leads Recovered",
    value: "247",
    change: "+23%",
    positive: true,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  },
  {
    label: "Revenue Attributed",
    value: "$84,320",
    change: "+18%",
    positive: true,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
  },
  {
    label: "Reviews Generated",
    value: "89",
    change: "+42%",
    positive: true,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    color: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
  },
  {
    label: "Churn Prevented",
    value: "12",
    change: "-67%",
    positive: true,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  },
];

const topActions = [
  {
    rank: 1,
    action: "Re-engage 3 stalled opportunities in Acme Corp pipeline",
    impact: "$47,000",
    priority: "High",
    module: "Lead Recovery",
  },
  {
    rank: 2,
    action: "Boost Google Ads budget for 'AI sales' keyword — ROAS is 4.2x above threshold",
    impact: "$23,400",
    priority: "High",
    module: "Ad Spend",
  },
  {
    rank: 3,
    action: "Respond to 2 negative reviews on G2 — sentiment trending down 12% this week",
    impact: "$12,800",
    priority: "Medium",
    module: "Reviews",
  },
  {
    rank: 4,
    action: "Send upsell proposal to Meridian — product usage hit 90% of plan limit",
    impact: "$9,500",
    priority: "Medium",
    module: "Churn",
  },
  {
    rank: 5,
    action: "Flag churn risk: Stellar hasn't logged in for 14 days — trigger re-engagement sequence",
    impact: "$8,400",
    priority: "Medium",
    module: "Follow-ups",
  },
];

function Dashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your revenue overview for today, June 27, 2026
        </p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
          >
            <div className="flex items-start justify-between">
              <div className={`rounded-lg p-2.5 ${m.color}`}>{m.icon}</div>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                  m.positive
                    ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                    : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                }`}
              >
                {m.change}
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">{m.value}</p>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Top 5 Actions */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Top 5 Actions Today</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Ranked by estimated revenue impact</p>
          </div>
          <Link
            to="/app/top-5"
            className="text-sm font-semibold text-revenue-600 hover:text-revenue-700 dark:text-revenue-400 dark:hover:text-revenue-300"
          >
            View all
          </Link>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
          {topActions.map((item) => (
            <div
              key={item.rank}
              className={`flex items-center gap-4 px-5 py-4 ${
                item.rank < topActions.length
                  ? "border-b border-gray-100 dark:border-gray-800"
                  : ""
              }`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-revenue-100 text-sm font-bold text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300">
                {item.rank}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {item.action}
                </p>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{item.module}</p>
              </div>
              <div className="hidden sm:block text-right shrink-0">
                <p className="text-sm font-bold text-green-600 dark:text-green-400">${item.impact}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  item.priority === "High"
                    ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                    : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                }`}
              >
                {item.priority}
              </span>
              <button className="shrink-0 rounded-lg bg-revenue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400">
                Act
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick stats + integration status */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Quick stats */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Quick Stats</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {[
              { label: "Connected Integrations", value: "8 / 14", note: "57% complete" },
              { label: "Active Modules", value: "6 / 7", note: "Churn not configured" },
              { label: "Days Since Setup", value: "47", note: "Started May 11, 2026" },
              { label: "Actions Completed", value: "73%", note: "11 of 15 this week" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Recent Activity</h3>
          <div className="mt-4 space-y-4">
            {[
              { time: "2h ago", text: "Lead recovery sequence sent to 14 cold leads from Q1" },
              { time: "5h ago", text: "New review detected on G2 — 4-star, auto-responded" },
              { time: "1d ago", text: "Ad spend alert: Meta campaign ROAS dropped to 1.2x" },
              { time: "2d ago", text: "Churn risk flagged: Meridian usage dropped 40%" },
              { time: "3d ago", text: "Top 5 Actions delivered — 4 of 5 completed" },
            ].map((activity) => (
              <div key={activity.text} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-revenue-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{activity.text}</p>
                  <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}