import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useRef, useEffect } from "react";

export const Route = createFileRoute("/app/reviews")({
  component: ReviewsPage,
});

// ─── Demo Data ───

const overviewStats = [
  { label: "Total Reviews", value: "247", change: "+12%", positive: true },
  { label: "Average Rating", value: "4.3", change: "+0.4", positive: true },
  { label: "Reviews This Month", value: "18", change: "+6", positive: true },
  { label: "Sentiment Score", value: "86%", change: "+3%", positive: true },
];

const platforms = [
  { name: "Google Business", icon: "G", rating: 4.5, reviewCount: 94, trend: "up" as const, color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400", connected: true },
  { name: "G2", icon: "G2", rating: 4.2, reviewCount: 67, trend: "up" as const, color: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400", connected: true },
  { name: "Capterra", icon: "CA", rating: 4.1, reviewCount: 52, trend: "stable" as const, color: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400", connected: true },
  { name: "Trustpilot", icon: "TP", rating: 3.9, reviewCount: 34, trend: "down" as const, color: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400", connected: true },
  { name: "Facebook Reviews", icon: "FB", rating: 4.6, reviewCount: 41, trend: "up" as const, color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400", connected: false },
  { name: "Yelp", icon: "YL", rating: 3.8, reviewCount: 22, trend: "stable" as const, color: "bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-400", connected: false },
];

// Platform name lookup for the modal preview
const platformNames: Record<string, string> = {
  google: "Google Business",
  g2: "G2",
  capterra: "Capterra",
  trustpilot: "Trustpilot",
};

const recentReviews = [
  { id: 1, author: "Sarah K.", platform: "Google Business", rating: 5, date: "2 hours ago", text: "Excellent service! The team went above and beyond to help us with our implementation. Highly recommend for any business looking to scale.", sentiment: "positive" as const, responded: true },
  { id: 2, author: "Michael T.", platform: "G2", rating: 4, date: "1 day ago", text: "Good platform overall. Solid feature set and the AI recommendations are actually useful. Would like to see deeper Salesforce integration.", sentiment: "positive" as const, responded: false },
  { id: 3, author: "Jessica L.", platform: "Capterra", rating: 3, date: "2 days ago", text: "Decent tool but onboarding took longer than expected. The lead recovery feature works well but the UI could be more intuitive.", sentiment: "neutral" as const, responded: false },
  { id: 4, author: "David R.", platform: "Trustpilot", rating: 2, date: "4 days ago", text: "Had issues with the integration setup. Support was helpful but it took multiple calls to resolve. Not as seamless as advertised.", sentiment: "negative" as const, responded: false },
  { id: 5, author: "Anna M.", platform: "Google Business", rating: 5, date: "5 days ago", text: "RevenueOS has transformed our sales process. We've recovered over $50k in lost leads in the first month alone. Incredible ROI.", sentiment: "positive" as const, responded: true },
  { id: 6, author: "Tom W.", platform: "G2", rating: 4, date: "1 week ago", text: "The Top 5 Actions feature is a game-changer. Every morning I know exactly what to prioritize.", sentiment: "positive" as const, responded: false },
  { id: 7, author: "Rachel G.", platform: "Google Business", rating: 1, date: "1 week ago", text: "Very disappointed with the customer support. Took 5 days to get a response to a critical issue.", sentiment: "negative" as const, responded: false },
  { id: 8, author: "Chris P.", platform: "Capterra", rating: 4, date: "2 weeks ago", text: "Solid platform with great potential. The daily Top 5 Actions keep our team focused on what matters.", sentiment: "positive" as const, responded: false },
];

const sentimentOverTime = [
  { month: "Jan", score: 78 },
  { month: "Feb", score: 81 },
  { month: "Mar", score: 79 },
  { month: "Apr", score: 84 },
  { month: "May", score: 82 },
  { month: "Jun", score: 86 },
];

const satisfiedCustomers = [
  { name: "Acme Corp", contact: "sarah@acme.com", score: 92, lastPurchase: "2 weeks ago" },
  { name: "TechFlow Inc", contact: "mike@techflow.io", score: 88, lastPurchase: "1 month ago" },
  { name: "Meridian Health", contact: "jessica@meridian.com", score: 85, lastPurchase: "3 weeks ago" },
  { name: "Stellar Labs", contact: "anna@stellarlabs.com", score: 95, lastPurchase: "5 days ago" },
  { name: "NexGen Solutions", contact: "tom@nexgen.dev", score: 90, lastPurchase: "2 months ago" },
  { name: "Pinnacle Group", contact: "lisa@pinnacle.com", score: 82, lastPurchase: "1 week ago" },
];

// ─── Component ───

function ReviewsPage() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("google");
  const [expandedReview, setExpandedReview] = useState<number | null>(null);
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [respondedTo, setRespondedTo] = useState<Record<number, boolean>>(
    Object.fromEntries(recentReviews.filter((r) => r.responded).map((r) => [r.id, true]))
  );
  const [sentSuccess, setSentSuccess] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState<"all" | "positive" | "neutral" | "negative">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "highest" | "lowest">("newest");
  const [requestStep, setRequestStep] = useState(0); // 0=not started yet for modal, 1=select customer, 2=choose platform, 3=preview

  const repliesRef = useRef<HTMLDivElement>(null);
  const successTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => { if (successTimer.current) clearTimeout(successTimer.current); };
  }, []);

  const handleSaveResponse = (id: number) => {
    setRespondedTo((prev) => ({ ...prev, [id]: true }));
    setExpandedReview(null);
  };

  // Handle send request with success feedback
  const handleSendRequest = () => {
    const customer = satisfiedCustomers.find((c) => c.name === selectedCustomer);
    if (!customer) return;
    setSentSuccess(customer.name);
    setShowRequestModal(false);
    successTimer.current = setTimeout(() => setSentSuccess(null), 2500);
  };

  // Scroll to reviews needing response
  const scrollToUnreplied = () => {
    setSentimentFilter("all");
    setSearchQuery("");
    setTimeout(() => {
      const firstUnreplied = document.querySelector("[data-unreplied]");
      firstUnreplied?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  // Count unreplied reviews
  const unrepliedCount = recentReviews.filter((r) => !respondedTo[r.id]).length;
  const unconnectedCount = platforms.filter((p) => !p.connected).length;
  const happyCustomerCount = satisfiedCustomers.length;

  // Filtered & sorted reviews
  const filteredReviews = useMemo(() => {
    let filtered = recentReviews;
    if (sentimentFilter !== "all") {
      filtered = filtered.filter((r) => r.sentiment === sentimentFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) => r.author.toLowerCase().includes(q) || r.text.toLowerCase().includes(q)
      );
    }
    const sorted = [...filtered];
    switch (sortOrder) {
      case "newest": return sorted;
      case "oldest": return sorted.reverse();
      case "highest": return sorted.sort((a, b) => b.rating - a.rating);
      case "lowest": return sorted.sort((a, b) => a.rating - b.rating);
    }
    return sorted;
  }, [sentimentFilter, searchQuery, sortOrder]);

  // Modal step logic
  const modalStep = requestStep === 0 && selectedCustomer ? 2 : requestStep === 1 && selectedCustomer ? 2 : requestStep === 2 && selectedPlatform ? 3 : requestStep || 1;
  const currentModalStep = modalStep;

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Review Management</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monitor, respond, and request reviews — ethically.
          </p>
        </div>
        <button
          onClick={() => { setShowRequestModal(true); setRequestStep(1); }}
          className="rounded-lg bg-revenue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400"
        >
          <span className="hidden sm:inline">+ Request Review</span>
          <span className="sm:hidden">+ Request</span>
        </button>
      </div>

      {/* ─── Quick Action Cards ─── */}
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <button
          onClick={scrollToUnreplied}
          className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left transition-all hover:shadow-sm dark:border-amber-800 dark:bg-amber-950/40"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">{unrepliedCount} review{unrepliedCount !== 1 ? "s" : ""} need{unrepliedCount === 1 ? "s" : ""} a response</p>
            <p className="text-xs text-amber-600 dark:text-amber-400">Click to jump to unreplied reviews</p>
          </div>
        </button>

        <button
          onClick={() => { setShowRequestModal(true); setRequestStep(1); }}
          className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-left transition-all hover:shadow-sm dark:border-green-800 dark:bg-green-950/40"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-green-800 dark:text-green-200">{happyCustomerCount} happy customer{happyCustomerCount !== 1 ? "s" : ""} to ask</p>
            <p className="text-xs text-green-600 dark:text-green-400">Open review request flow</p>
          </div>
        </button>

        <button
          className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-left transition-all hover:shadow-sm dark:border-blue-800 dark:bg-blue-950/40"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">{unconnectedCount} platform{unconnectedCount !== 1 ? "s" : ""} to connect</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">Connect Facebook & Yelp for full coverage</p>
          </div>
        </button>
      </div>

      {/* Success toast */}
      {sentSuccess && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
          <svg className="h-5 w-5 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Review request sent to {sentSuccess}!
        </div>
      )}

      {/* Overview Stats */}
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-start justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${stat.positive ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"}`}>
                {stat.change}
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Platforms Grid */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Review Platforms</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => (
            <div key={p.name} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${p.color}`}>
                  {p.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{p.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`h-3.5 w-3.5 ${i < Math.floor(p.rating) ? "text-amber-400" : "text-gray-200 dark:text-gray-700"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {p.rating} · {p.reviewCount} reviews
                    </span>
                  </div>
                  {p.trend === "up" && <span className="text-xs text-green-600">⬆ Trending up</span>}
                  {p.trend === "down" && <span className="text-xs text-red-600">⬇ Trending down</span>}
                  {p.trend === "stable" && <span className="text-xs text-gray-400">→ Stable</span>}
                </div>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${p.connected ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"}`}>
                {p.connected ? "Connected" : "Connect"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sentiment Chart + Recent Reviews */}
      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Sentiment Trend Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 lg:col-span-2 dark:border-gray-800 dark:bg-gray-950">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Sentiment Trend</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Monthly average sentiment score</p>
          <div className="mt-6">
            {/* Chart bars */}
            <div className="flex items-end justify-between gap-2" style={{ height: 160 }}>
              {sentimentOverTime.map((month) => (
                <div key={month.month} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-revenue-500 to-revenue-400 transition-all hover:from-revenue-600 hover:to-revenue-500"
                    style={{ height: `${(month.score / 100) * 140}px` }}
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400">{month.score}%</span>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{month.month}</span>
                </div>
              ))}
            </div>
            {/* Threshold line indicator with tooltip hints */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-400">
              <div className="group relative flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <span>Positive (80%+)</span>
                <div className="absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg group-hover:block dark:bg-gray-100 dark:text-gray-900">
                  Reviews with positive sentiment are above 80%
                </div>
              </div>
              <div className="group relative flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
                <span>Neutral (60-80%)</span>
                <div className="absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg group-hover:block dark:bg-gray-100 dark:text-gray-900">
                  Mixed or average feedback in this range
                </div>
              </div>
              <div className="group relative flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                <span>Negative (&lt;60%)</span>
                <div className="absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg group-hover:block dark:bg-gray-100 dark:text-gray-900">
                  Reviews below 60% need immediate attention
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reviews Feed */}
        <div className="rounded-xl border border-gray-200 bg-white lg:col-span-3 dark:border-gray-800 dark:bg-gray-950" ref={repliesRef}>
          <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Recent Reviews</h3>
          </div>

          {/* Search & Filters */}
          <div className="border-b border-gray-100 px-5 py-3 dark:border-gray-800">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <svg className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search reviews..."
                  className="w-full rounded-lg border border-gray-300 bg-white py-1.5 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500"
                />
              </div>
              {/* Filter buttons */}
              <div className="flex gap-1">
                {(["all", "positive", "neutral", "negative"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setSentimentFilter(f)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      sentimentFilter === f
                        ? "bg-revenue-100 text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300"
                        : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    }`}
                  >
                    {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
              {/* Sort */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
            {searchQuery && (
              <p className="mt-2 text-xs text-gray-400">{filteredReviews.length} result{filteredReviews.length !== 1 ? "s" : ""}</p>
            )}
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredReviews.length === 0 ? (
              <div className="px-5 py-10 text-center text-sm text-gray-400">No reviews match your search.</div>
            ) : (
              filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className="px-5 py-4"
                  data-unreplied={!respondedTo[review.id] ? "true" : undefined}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{review.author}</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-500">{review.platform}</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`h-4 w-4 ${i < review.rating ? "text-amber-400" : "text-gray-200 dark:text-gray-700"}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            review.sentiment === "positive"
                              ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                              : review.sentiment === "neutral"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                              : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
                          }`}
                        >
                          {review.sentiment === "positive" ? "Positive" : review.sentiment === "neutral" ? "Neutral" : "Negative"}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{review.text}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex items-center gap-3">
                    {respondedTo[review.id] ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Responded
                      </span>
                    ) : (
                      <button
                        onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                        className="text-xs font-semibold text-revenue-600 hover:text-revenue-700 dark:text-revenue-400 dark:hover:text-revenue-300"
                      >
                        {expandedReview === review.id ? "Cancel" : "Respond"}
                      </button>
                    )}
                    <button className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      View on {review.platform}
                    </button>
                  </div>

                  {/* Response editor */}
                  {expandedReview === review.id && (
                    <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900">
                      <textarea
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500"
                        rows={3}
                        placeholder={`Write a response to ${review.author}...`}
                        value={responses[review.id] || ""}
                        onChange={(e) => setResponses((prev) => ({ ...prev, [review.id]: e.target.value }))}
                      />
                      <div className="mt-2 flex justify-end gap-2">
                        <button
                          onClick={() => setExpandedReview(null)}
                          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveResponse(review.id)}
                          disabled={!responses[review.id]?.trim()}
                          className="rounded-lg bg-revenue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-revenue-700 disabled:opacity-50 dark:bg-revenue-500 dark:hover:bg-revenue-400"
                        >
                          Save & Respond
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ─── Request Review Modal ─── */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Request a Review</h2>
              <button
                onClick={() => setShowRequestModal(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ─── Stepped Progress ─── */}
            <div className="px-6 pt-5">
              <div className="flex items-center gap-0">
                {[
                  { step: 1, label: "Customer" },
                  { step: 2, label: "Platform" },
                  { step: 3, label: "Preview" },
                ].map((s, idx) => (
                  <div key={s.step} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                          currentModalStep >= s.step
                            ? "bg-revenue-600 text-white dark:bg-revenue-500"
                            : "border border-gray-300 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-500"
                        }`}
                      >
                        {currentModalStep > s.step ? (
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          s.step
                        )}
                      </div>
                      <span className={`mt-1 text-xs ${currentModalStep >= s.step ? "font-medium text-revenue-600 dark:text-revenue-400" : "text-gray-400"}`}>
                        {s.label}
                      </span>
                    </div>
                    {idx < 2 && (
                      <div className={`mx-2 mt-[-1.25rem] flex-1 border-t ${
                        currentModalStep > s.step ? "border-revenue-400" : "border-gray-200 dark:border-gray-700"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5 px-6 py-5">
              {/* Step 1: Select Customer */}
              {(currentModalStep === 1 || currentModalStep === 2) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {currentModalStep === 1 && "Step 1:"} Select a satisfied customer
                  </label>
                  <select
                    value={selectedCustomer}
                    onChange={(e) => { setSelectedCustomer(e.target.value); if (e.target.value) setRequestStep(2); }}
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  >
                    <option value="">Choose a customer...</option>
                    {satisfiedCustomers.map((c) => (
                      <option key={c.name} value={c.name}>{c.name} (Satisfaction: {c.score}%)</option>
                    ))}
                  </select>
                  {selectedCustomer && (
                    <div className="mt-2 rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700 dark:bg-green-950 dark:text-green-300">
                      ✅ {selectedCustomer} — Last purchase: {satisfiedCustomers.find(c => c.name === selectedCustomer)?.lastPurchase}
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Choose Platform */}
              {(currentModalStep === 2 || currentModalStep === 3) && selectedCustomer && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {currentModalStep === 2 && "Step 2:"} Review platform
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {[
                      { id: "google", label: "Google Business" },
                      { id: "g2", label: "G2" },
                      { id: "capterra", label: "Capterra" },
                      { id: "trustpilot", label: "Trustpilot" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => { setSelectedPlatform(p.id); setRequestStep(3); }}
                        className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
                          selectedPlatform === p.id
                            ? "border-revenue-500 bg-revenue-50 text-revenue-700 dark:border-revenue-400 dark:bg-revenue-950 dark:text-revenue-300"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-400 dark:hover:bg-gray-900"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Preview Message */}
              {currentModalStep === 3 && selectedCustomer && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Step 3: Request message preview</label>
                  <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      Hi <strong>{selectedCustomer}</strong>,<br /><br />
                      Thank you for being a valued customer! We'd love to hear about your experience with RevenueOS.
                      If you have a moment, would you mind sharing your honest thoughts on <strong>{platformNames[selectedPlatform] || "our platform"}</strong>?
                      <br /><br />
                      Your feedback helps other businesses make informed decisions — and helps us keep improving.
                      <br /><br />
                      Thanks,<br />
                      The RevenueOS Team
                    </p>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">
                    This is a genuine request for an honest review. No incentives, no pressure.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4 dark:border-gray-800">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Reviews help businesses grow — ask authentically.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
                >
                  Cancel
                </button>
                <button
                  disabled={!selectedCustomer}
                  onClick={handleSendRequest}
                  className="rounded-lg bg-revenue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-revenue-700 disabled:opacity-50 dark:bg-revenue-500 dark:hover:bg-revenue-400"
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}