import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/app/integrations")({
  component: IntegrationsPage,
});

const categories = [
  {
    name: "CRM",
    integrations: [
      { name: "Salesforce", icon: "SF", status: "connected" as const },
      { name: "HubSpot", icon: "HS", status: "connected" as const },
      { name: "Pipedrive", icon: "PD", status: "available" as const },
      { name: "Close", icon: "CL", status: "available" as const },
      { name: "Zoho CRM", icon: "ZC", status: "available" as const },
      { name: "Freshsales", icon: "FS", status: "available" as const },
    ],
  },
  {
    name: "Email",
    integrations: [
      { name: "Gmail / Google Workspace", icon: "GM", status: "connected" as const },
      { name: "Microsoft 365 / Outlook", icon: "OL", status: "connected" as const },
      { name: "SendGrid", icon: "SG", status: "available" as const },
      { name: "Mailchimp", icon: "MC", status: "available" as const },
    ],
  },
  {
    name: "Ad Platforms",
    integrations: [
      { name: "Google Ads", icon: "GA", status: "connected" as const },
      { name: "Meta Ads", icon: "MA", status: "available" as const },
      { name: "LinkedIn Ads", icon: "LI", status: "available" as const },
      { name: "TikTok Ads", icon: "TT", status: "available" as const },
    ],
  },
  {
    name: "Reviews",
    integrations: [
      { name: "G2", icon: "G2", status: "connected" as const },
      { name: "Capterra", icon: "CA", status: "available" as const },
      { name: "Google Business", icon: "GB", status: "available" as const },
      { name: "Trustpilot", icon: "TP", status: "available" as const },
    ],
  },
  {
    name: "Communication",
    integrations: [
      { name: "Slack", icon: "SL", status: "connected" as const },
      { name: "Microsoft Teams", icon: "MT", status: "available" as const },
      { name: "Twilio (SMS)", icon: "TW", status: "available" as const },
      { name: "LinkedIn", icon: "LI", status: "available" as const },
    ],
  },
];

function IntegrationsPage() {
  const [search, setSearch] = useState("");

  const filtered = categories
    .map((cat) => ({
      ...cat,
      integrations: cat.integrations.filter(
        (i) =>
          i.name.toLowerCase().includes(search.toLowerCase()) ||
          cat.name.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.integrations.length > 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Integrations</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Connect your tools to give RevenueOS read-only access. Connected: 6 of 22
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search integrations..."
          className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500"
        />
      </div>

      {/* Categories */}
      <div className="space-y-8">
        {filtered.map((cat) => (
          <div key={cat.name}>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {cat.name}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cat.integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-sm dark:border-gray-800 dark:bg-gray-950"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                        integration.status === "connected"
                          ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {integration.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{integration.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {integration.status === "connected" ? "Connected" : "Available"}
                      </p>
                    </div>
                  </div>
                  <button
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                      integration.status === "connected"
                        ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900"
                        : "bg-revenue-600 text-white hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400"
                    }`}
                  >
                    {integration.status === "connected" ? "Disconnect" : "Connect"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Coming soon banner */}
      <div className="mt-10 rounded-xl border border-dashed border-revenue-300 bg-revenue-50 p-6 text-center dark:border-revenue-800 dark:bg-revenue-950">
        <p className="text-sm font-medium text-revenue-800 dark:text-revenue-200">
          Need an integration not listed here?
        </p>
        <p className="mt-1 text-xs text-revenue-600 dark:text-revenue-400">
          Enterprise plans include custom API integrations and webhooks.
        </p>
      </div>
    </div>
  );
}