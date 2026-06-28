import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/onboarding")({
  component: OnboardingPage,
});

const steps = [
  {
    step: 1,
    title: "Connect Your CRM",
    description: "Grant read-only access to your CRM so RevenueOS can analyze your leads and pipeline.",
    tools: [
      { name: "Salesforce", icon: "SF" },
      { name: "HubSpot", icon: "HS" },
      { name: "Pipedrive", icon: "PD" },
      { name: "Close", icon: "CL" },
    ],
  },
  {
    step: 2,
    title: "Connect Your Email",
    description: "Allow RevenueOS to analyze follow-up patterns and send sequences on your behalf.",
    tools: [
      { name: "Gmail / Google Workspace", icon: "GM" },
      { name: "Microsoft 365 / Outlook", icon: "OL" },
      { name: "SendGrid", icon: "SG" },
      { name: "Mailchimp", icon: "MC" },
    ],
  },
  {
    step: 3,
    title: "Connect Ad Platforms",
    description: "Let RevenueOS detect wasted spend and optimize your ad budget allocation.",
    tools: [
      { name: "Google Ads", icon: "GA" },
      { name: "Meta Ads", icon: "MA" },
      { name: "LinkedIn Ads", icon: "LI" },
    ],
  },
  {
    step: 4,
    title: "Set Your Preferences",
    description: "Choose how you receive your daily Top 5 Actions and configure notification settings.",
    tools: [
      { name: "Email Daily", icon: "📧" },
      { name: "Slack", icon: "💬" },
      { name: "Microsoft Teams", icon: "💼" },
      { name: "In-App", icon: "🖥️" },
    ],
  },
];

function OnboardingPage() {
  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-revenue-600 text-2xl font-bold text-white shadow-lg shadow-revenue-500/20 dark:bg-revenue-500">
          R
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Set up RevenueOS</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Connect your tools and start recovering revenue in under 30 minutes.
        </p>
      </div>

      {/* Progress indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  s <= 1
                    ? "bg-revenue-600 text-white"
                    : "border border-gray-300 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-500"
                }`}
              >
                {s}
              </div>
              <p className={`mt-1 text-xs ${s <= 1 ? "font-medium text-revenue-600 dark:text-revenue-400" : "text-gray-400"}`}>
                {s === 1 ? "CRM" : s === 2 ? "Email" : s === 3 ? "Ads" : "Preferences"}
              </p>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="h-1 rounded-full bg-gray-200 dark:bg-gray-700">
            <div className="h-1 w-1/4 rounded-full bg-revenue-500" />
          </div>
        </div>
      </div>

      {/* Current step */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-950">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Step 1: {steps[0].title}</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{steps[0].description}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {steps[0].tools.map((tool) => (
            <button
              key={tool.name}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:border-revenue-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-950 dark:hover:border-revenue-700"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-revenue-100 text-sm font-bold text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300">
                {tool.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{tool.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Connect</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900">
            Skip this step
          </button>
          <button className="rounded-lg bg-revenue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400">
            Continue
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
        Your data is read-only and encrypted. We never modify your tool data without explicit permission.
      </p>
    </div>
  );
}