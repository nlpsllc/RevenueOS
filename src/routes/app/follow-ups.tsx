import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/app/follow-ups")({
  component: FollowUpsPage,
});

// ─── Demo Data ───

const overviewStats = [
  { label: "Active Sequences", value: "6", change: "+2", positive: true },
  { label: "Total Contacts", value: "2,847", change: "+342", positive: true },
  { label: "Avg. Response Rate", value: "38.4%", change: "+4.2%", positive: true },
  { label: "Meetings Booked", value: "178", change: "+23", positive: true },
];

const funnelStages = [
  { stage: "Sent", count: 2847, percentage: 100 },
  { stage: "Opened", count: 1892, percentage: 66 },
  { stage: "Replied", count: 1093, percentage: 38 },
  { stage: "Booked", count: 487, percentage: 17 },
  { stage: "Closed", count: 178, percentage: 6 },
];

const todayQueue = [
  { id: 1, name: "James Wilson", company: "Quantum Dynamics", step: "Email #2", time: "9:00 AM", priority: "high" as const },
  { id: 2, name: "Mary Johnson", company: "TechFlow", step: "LinkedIn #1", time: "10:30 AM", priority: "high" as const },
  { id: 3, name: "Robert Brown", company: "Meridian Health", step: "SMS #1", time: "11:00 AM", priority: "medium" as const },
  { id: 4, name: "Patricia Garcia", company: "Apex Solutions", step: "Call #1", time: "1:00 PM", priority: "medium" as const },
  { id: 5, name: "John Miller", company: "Stellar Labs", step: "Email #3", time: "2:30 PM", priority: "low" as const },
  { id: 6, name: "Jennifer Davis", company: "Northstar Systems", step: "LinkedIn #2", time: "3:00 PM", priority: "low" as const },
];

const sequences = [
  {
    id: 1, name: "Free Trial Follow-up", contactCount: 847, active: true, openRate: 72, replyRate: 34, meetingRate: 18, optOutRate: 3, avgResponseTime: "8h", revenue: 28400,
    steps: [
      { channel: "email" as const, label: "Email #1", timing: "Day 1", content: "Welcome! Here's how to get started with your free trial..." },
      { channel: "email" as const, label: "Email #2", timing: "Day 3", content: "Check out these key features our power users love..." },
      { channel: "linkedin" as const, label: "LinkedIn #1", timing: "Day 5", content: "Connect on LinkedIn for tips and best practices." },
      { channel: "email" as const, label: "Email #3", timing: "Day 7", content: "Your trial is half over — here's what you've missed..." },
      { channel: "sms" as const, label: "SMS #1", timing: "Day 10", content: "Quick reminder: your trial ends in 4 days! Book a call?" },
      { channel: "call" as const, label: "Call #1", timing: "Day 12", content: "Final outreach call before trial expiration." },
    ],
    contacts: [
      { name: "James Wilson", company: "Quantum Dynamics", currentStep: "Email #2", status: "active" as const, lastAction: "2h ago" },
      { name: "Mary Johnson", company: "TechFlow", currentStep: "LinkedIn #1", status: "active" as const, lastAction: "1d ago" },
      { name: "Robert Brown", company: "Meridian Health", currentStep: "Done", status: "completed" as const, lastAction: "3d ago" },
      { name: "Patricia Garcia", company: "Apex Solutions", currentStep: "Email #3", status: "responded" as const, lastAction: "5h ago" },
      { name: "John Miller", company: "Stellar Labs", currentStep: "Call #1", status: "active" as const, lastAction: "2d ago" },
      { name: "Jennifer Davis", company: "Northstar Systems", currentStep: "Email #1", status: "opted-out" as const, lastAction: "1w ago" },
    ],
  },
  {
    id: 2, name: "Demo Request Nurture", contactCount: 534, active: true, openRate: 68, replyRate: 42, meetingRate: 29, optOutRate: 2, avgResponseTime: "6h", revenue: 45200,
    steps: [
      { channel: "email" as const, label: "Email #1", timing: "Day 1", content: "Thanks for requesting a demo! Here's what we'll cover..." },
      { channel: "call" as const, label: "Call #1", timing: "Day 1", content: "Quick call to confirm your demo time." },
      { channel: "email" as const, label: "Email #2", timing: "Day 2", content: "Demo recap and next steps." },
      { channel: "linkedin" as const, label: "LinkedIn #1", timing: "Day 4", content: "Connect for ongoing updates." },
    ],
    contacts: [
      { name: "Sarah Chen", company: "Pinnacle Group", currentStep: "Email #2", status: "responded" as const, lastAction: "1h ago" },
      { name: "Michael Lee", company: "Crestview Partners", currentStep: "Call #1", status: "active" as const, lastAction: "4h ago" },
      { name: "Emily Davis", company: "Summit Analytics", currentStep: "Done", status: "completed" as const, lastAction: "1w ago" },
    ],
  },
  {
    id: 3, name: "Abandoned Cart Recovery", contactCount: 423, active: true, openRate: 55, replyRate: 22, meetingRate: 12, optOutRate: 5, avgResponseTime: "12h", revenue: 18300,
    steps: [
      { channel: "email" as const, label: "Email #1", timing: "1h", content: "You left something behind! Complete your purchase..." },
      { channel: "sms" as const, label: "SMS #1", timing: "24h", content: "Still thinking about it? Here's 10% off..." },
      { channel: "email" as const, label: "Email #2", timing: "Day 3", content: "Last chance! Your cart expires soon." },
    ],
    contacts: [
      { name: "David Kim", company: "Silverline Tech", currentStep: "SMS #1", status: "active" as const, lastAction: "6h ago" },
      { name: "Lisa Anderson", company: "BridgePoint Consulting", currentStep: "Done", status: "completed" as const, lastAction: "2d ago" },
    ],
  },
  {
    id: 4, name: "Re-engagement Campaign", contactCount: 312, active: false, openRate: 31, replyRate: 12, meetingRate: 7, optOutRate: 8, avgResponseTime: "24h", revenue: 8900,
    steps: [
      { channel: "email" as const, label: "Email #1", timing: "Day 1", content: "We miss you! Here's what's new..." },
      { channel: "linkedin" as const, label: "LinkedIn #1", timing: "Day 3", content: "Thought you might find this article interesting..." },
      { channel: "email" as const, label: "Email #2", timing: "Day 7", content: "Special offer to welcome you back." },
    ],
    contacts: [
      { name: "Tom Harris", company: "Atlas Industries", currentStep: "Email #2", status: "active" as const, lastAction: "4d ago" },
    ],
  },
  {
    id: 5, name: "Post-Purchase Onboarding", contactCount: 731, active: true, openRate: 89, replyRate: 56, meetingRate: 41, optOutRate: 1, avgResponseTime: "3h", revenue: 52100,
    steps: [
      { channel: "email" as const, label: "Email #1", timing: "Day 1", content: "Welcome aboard! Here's your onboarding plan..." },
      { channel: "call" as const, label: "Call #1", timing: "Day 2", content: "Onboarding kickoff call." },
      { channel: "email" as const, label: "Email #2", timing: "Day 5", content: "Pro tip: setting up your first workflow." },
      { channel: "sms" as const, label: "SMS #1", timing: "Day 7", content: "How's onboarding going? Need help?" },
      { channel: "email" as const, label: "Email #3", timing: "Day 14", content: "You're 2 weeks in — here's your progress report." },
    ],
    contacts: [
      { name: "Rachel Green", company: "Pioneer Software", currentStep: "Call #1", status: "active" as const, lastAction: "3h ago" },
      { name: "Chris Martin", company: "Meridian Health", currentStep: "Done", status: "completed" as const, lastAction: "5d ago" },
      { name: "Amy White", company: "NexGen Solutions", currentStep: "Email #2", status: "active" as const, lastAction: "1d ago" },
    ],
  },
  {
    id: 6, name: "Webinar Follow-up", contactCount: 245, active: false, openRate: 63, replyRate: 28, meetingRate: 15, optOutRate: 4, avgResponseTime: "10h", revenue: 12400,
    steps: [
      { channel: "email" as const, label: "Email #1", timing: "Day 1", content: "Thanks for attending! Here's the recording..." },
      { channel: "linkedin" as const, label: "LinkedIn #1", timing: "Day 2", content: "Connect for Q&A follow-up." },
      { channel: "email" as const, label: "Email #2", timing: "Day 5", content: "Resources and next steps from the webinar." },
    ],
    contacts: [],
  },
];

const channelColors: Record<string, string> = {
  email: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  sms: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  linkedin: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  call: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  wait: "bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-400",
};

const statusColors: Record<string, string> = {
  active: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  responded: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  completed: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  "opted-out": "bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-400",
};

// ─── Component ───

function FollowUpsPage() {
  const [expandedSeq, setExpandedSeq] = useState<number | null>(null);
  const [showBuilder, setShowBuilder] = useState(false);
  const [builderName, setBuilderName] = useState("New Sequence");
  const [builderSteps, setBuilderSteps] = useState<{ channel: string; timing: string; content: string }[]>([]);
  const [activeSeqTab, setActiveSeqTab] = useState<string>("steps");

  const toggleSeq = (id: number) => setExpandedSeq(expandedSeq === id ? null : id);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Follow-up Automation</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Multi-channel sequences that persist until prospects respond.
          </p>
        </div>
        <button
          onClick={() => { setShowBuilder(true); setBuilderName("New Sequence"); setBuilderSteps([]); }}
          className="rounded-lg bg-revenue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400"
        >
          <span className="hidden sm:inline">+ Create Sequence</span>
          <span className="sm:hidden">+ New</span>
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

      {/* Conversion Funnel + Today's Queue */}
      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Funnel Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 lg:col-span-2 dark:border-gray-800 dark:bg-gray-950">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Conversion Funnel</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">From sent to closed</p>
          <div className="mt-6 space-y-3">
            {funnelStages.map((f, i) => (
              <div key={f.stage}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{f.stage}</span>
                  <span className="text-gray-500 dark:text-gray-400">{f.count.toLocaleString()} ({f.percentage}%)</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div
                    className={`h-2.5 rounded-full ${
                      f.percentage >= 50 ? "bg-revenue-500" : f.percentage >= 17 ? "bg-revenue-400" : "bg-revenue-300"
                    }`}
                    style={{ width: `${f.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Queue */}
        <div className="rounded-xl border border-gray-200 bg-white lg:col-span-3 dark:border-gray-800 dark:bg-gray-950">
          <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Today's Queue</h3>
            <p className="text-xs text-gray-500">{todayQueue.length} contacts scheduled today</p>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {todayQueue.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-revenue-100 text-xs font-bold text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300">
                  {item.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.company} · {item.step}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                  item.priority === "high"
                    ? "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                    : item.priority === "medium"
                    ? "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                    : "bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-400"
                }`}>{item.time}</span>
                <button className="shrink-0 rounded-lg bg-revenue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400">Send</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sequences List */}
      <div className="mt-8 space-y-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Sequences</h2>

        {sequences.map((seq) => (
          <div key={seq.id} className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            {/* Sequence Header */}
            <div className="flex items-center justify-between px-5 py-4 cursor-pointer" onClick={() => toggleSeq(seq.id)}>
              <div className="flex items-center gap-3">
                <svg className={`h-5 w-5 text-gray-400 transition-transform ${expandedSeq === seq.id ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{seq.name}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${seq.active ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-gray-50 text-gray-500 dark:bg-gray-900 dark:text-gray-400"}`}>
                      {seq.active ? "Active" : "Paused"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{seq.contactCount} contacts · {seq.steps.length} steps</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="hidden sm:flex items-center gap-3 text-xs">
                  <span className="text-gray-500">Open: <strong className="text-gray-900 dark:text-white">{seq.openRate}%</strong></span>
                  <span className="text-gray-500">Reply: <strong className="text-gray-900 dark:text-white">{seq.replyRate}%</strong></span>
                  <span className="text-gray-500">Revenue: <strong className="text-green-600">${seq.revenue.toLocaleString()}</strong></span>
                </div>
                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                  <button className="rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900">{seq.active ? "Pause" : "Activate"}</button>
                  <button className="rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900">Edit</button>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedSeq === seq.id && (
              <div className="border-t border-gray-100 px-5 py-4 dark:border-gray-800">
                {/* Tabs */}
                <div className="flex gap-4 border-b border-gray-100 pb-3 dark:border-gray-800">
                  {["steps", "contacts", "performance"].map((tab) => (
                    <button key={tab} onClick={() => setActiveSeqTab(tab)} className={`text-xs font-semibold pb-1 border-b-2 transition-colors ${activeSeqTab === tab ? "border-revenue-500 text-revenue-600 dark:text-revenue-400" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                      {tab === "steps" ? "Steps" : tab === "contacts" ? "Contacts" : "Performance"}
                    </button>
                  ))}
                </div>

                {/* Steps Tab */}
                {activeSeqTab === "steps" && (
                  <div className="mt-4">
                    <div className="relative">
                      {seq.steps.map((step, i) => (
                        <div key={i} className="flex gap-4 pb-6 last:pb-0">
                          <div className="flex flex-col items-center">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${channelColors[step.channel] || channelColors.wait}`}>
                              {step.channel === "email" ? "📧" : step.channel === "sms" ? "💬" : step.channel === "linkedin" ? "🔗" : step.channel === "call" ? "📞" : "⏳"}
                            </div>
                            {i < seq.steps.length - 1 && <div className="mt-1 w-0.5 flex-1 bg-gray-200 dark:bg-gray-700" />}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">{step.label}</span>
                              <span className="text-xs text-gray-400">{step.timing}</span>
                              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${channelColors[step.channel]}`}>{step.channel}</span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{step.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contacts Tab */}
                {activeSeqTab === "contacts" && (
                  <div className="mt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-100 dark:border-gray-800 text-xs text-gray-500">
                            <th className="px-3 py-2 text-left font-semibold">Name</th>
                            <th className="px-3 py-2 text-left font-semibold">Company</th>
                            <th className="px-3 py-2 text-left font-semibold">Current Step</th>
                            <th className="px-3 py-2 text-left font-semibold">Status</th>
                            <th className="px-3 py-2 text-left font-semibold">Last Action</th>
                            <th className="px-3 py-2 text-right font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                          {(seq.contacts.length > 0 ? seq.contacts : [{ name: "No contacts yet", company: "", currentStep: "", status: "opted-out" as const, lastAction: "" }]).map((c, i) => (
                            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                              <td className="px-3 py-2.5 font-medium text-gray-900 dark:text-white">{c.name}</td>
                              <td className="px-3 py-2.5 text-gray-500 dark:text-gray-400">{c.company}</td>
                              <td className="px-3 py-2.5 text-gray-600 dark:text-gray-400">{c.currentStep}</td>
                              <td className="px-3 py-2.5">
                                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[c.status] || "bg-gray-50 text-gray-500"}`}>
                                  {c.status === "opted-out" ? "Opted Out" : c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-3 py-2.5 text-gray-500">{c.lastAction}</td>
                              <td className="px-3 py-2.5 text-right">
                                {c.status !== "opted-out" && c.status !== "completed" && c.name !== "No contacts yet" ? (
                                  <button className="rounded-lg border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900">Pause</button>
                                ) : null}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Performance Tab */}
                {activeSeqTab === "performance" && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[
                      { label: "Open Rate", value: `${seq.openRate}%`, color: "text-blue-600" },
                      { label: "Reply Rate", value: `${seq.replyRate}%`, color: "text-green-600" },
                      { label: "Meeting Rate", value: `${seq.meetingRate}%`, color: "text-purple-600" },
                      { label: "Opt-out Rate", value: `${seq.optOutRate}%`, color: "text-red-600" },
                      { label: "Avg Response", value: seq.avgResponseTime, color: "text-amber-600" },
                      { label: "Revenue", value: `$${seq.revenue.toLocaleString()}`, color: "text-green-600" },
                    ].map((m) => (
                      <div key={m.label} className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-center dark:border-gray-800 dark:bg-gray-900">
                        <p className="text-xs text-gray-500">{m.label}</p>
                        <p className={`mt-1 text-lg font-bold ${m.color} dark:opacity-90`}>{m.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ─── Sequence Builder Modal ─── */}
      {showBuilder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Create Sequence</h2>
              <button onClick={() => setShowBuilder(false)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="space-y-5 px-6 py-5">
              {/* Sequence Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sequence name</label>
                <input type="text" value={builderName} onChange={(e) => setBuilderName(e.target.value)} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white" />
              </div>

              {/* Steps */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Steps</label>
                {builderSteps.length === 0 && (
                  <div className="rounded-lg border-2 border-dashed border-gray-200 p-8 text-center dark:border-gray-700">
                    <p className="text-sm text-gray-400">No steps yet. Add your first step below.</p>
                  </div>
                )}
                {builderSteps.map((step, i) => (
                  <div key={i} className="mb-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-500 uppercase">Step {i + 1}</span>
                      <button onClick={() => setBuilderSteps(builderSteps.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:text-red-600">Remove</button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <select value={step.channel} onChange={(e) => { const s = [...builderSteps]; s[i].channel = e.target.value; setBuilderSteps(s); }} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-revenue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-white">
                        <option value="email">Email</option><option value="sms">SMS</option><option value="linkedin">LinkedIn</option><option value="call">Call</option><option value="wait">Wait</option>
                      </select>
                      <input type="text" value={step.timing} onChange={(e) => { const s = [...builderSteps]; s[i].timing = e.target.value; setBuilderSteps(s); }} placeholder="Day 1 / 24h" className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-revenue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-white" />
                    </div>
                    {step.channel !== "wait" && (
                      <textarea value={step.content} onChange={(e) => { const s = [...builderSteps]; s[i].content = e.target.value; setBuilderSteps(s); }} placeholder="Message content..." rows={2} className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-revenue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500" />
                    )}
                  </div>
                ))}

                {/* Add Step Buttons */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {["email", "sms", "linkedin", "call", "wait"].map((ch) => (
                    <button key={ch} onClick={() => setBuilderSteps([...builderSteps, { channel: ch, timing: "", content: "" }])} className={`rounded-lg border px-3 py-2 text-xs font-medium capitalize transition-colors ${channelColors[ch]} border-transparent hover:opacity-80`}>
                      + {ch === "wait" ? "Wait" : ch}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline Preview */}
              {builderSteps.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timeline preview</label>
                  <div className="flex flex-wrap gap-2">
                    {builderSteps.map((step, i) => (
                      <div key={i} className="flex items-center gap-1.5 rounded-full bg-revenue-50 px-3 py-1.5 text-xs font-medium text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300">
                        <span className="capitalize">{step.channel === "wait" ? "⏳ Wait" : step.channel === "email" ? "📧" : step.channel === "sms" ? "💬" : step.channel === "linkedin" ? "🔗" : "📞"}</span>
                        {step.timing && <span className="text-revenue-500">({step.timing})</span>}
                        {i < builderSteps.length - 1 && <span className="text-revenue-300">→</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Conditional Logic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Conditional logic</label>
                <div className="space-y-2">
                  {[
                    { label: "Stop sequence if prospect replies", checked: true },
                    { label: "Skip remaining if meeting booked", checked: true },
                    { label: "Auto-opt-out after 3 bounces", checked: false },
                  ].map((opt) => (
                    <label key={opt.label} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <input type="checkbox" defaultChecked={opt.checked} className="rounded border-gray-300 text-revenue-600 focus:ring-revenue-500 dark:border-gray-700" />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4 dark:border-gray-800">
              <p className="text-xs text-gray-400">{builderSteps.length} step{builderSteps.length !== 1 ? "s" : ""}</p>
              <div className="flex gap-2">
                <button onClick={() => setShowBuilder(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900">Cancel</button>
                <button onClick={() => setShowBuilder(false)} className="rounded-lg bg-revenue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400">Save Sequence</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}