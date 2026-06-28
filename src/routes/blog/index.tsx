import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/")({
  component: BlogPage,
});

const posts = [
  {
    slug: "what-is-an-ai-cro",
    title: "What Is an AI Chief Revenue Officer? (And Why Your Business Needs One)",
    excerpt: "A deep dive into how AI-powered revenue leadership is transforming growth-stage businesses — and why hiring a human CRO isn't the only option anymore.",
    author: "RevenueOS Team",
    date: "March 15, 2026",
    category: "Insights",
    readTime: "8 min read",
  },
  {
    slug: "top-5-reasons-leads-go-cold",
    title: "The Top 5 Reasons Leads Go Cold (And How to Bring Them Back)",
    excerpt: "Most businesses lose 80% of leads within 5 minutes. Here's why — and how RevenueOS recovers them automatically.",
    author: "RevenueOS Team",
    date: "March 8, 2026",
    category: "Lead Generation",
    readTime: "6 min read",
  },
  {
    slug: "ad-spend-waste-checklist",
    title: "The 7-Point Ad Spend Waste Checklist for B2B Marketers",
    excerpt: "Are you burning budget on campaigns that don't convert? Run this checklist and find out where your money is really going.",
    author: "RevenueOS Team",
    date: "February 28, 2026",
    category: "Advertising",
    readTime: "10 min read",
  },
  {
    slug: "churn-early-warning-signals",
    title: "10 Early Warning Signals a Customer Is About to Churn",
    excerpt: "Churn doesn't happen overnight. Most businesses miss the warning signs. Here's what RevenueOS tracks to protect your recurring revenue.",
    author: "RevenueOS Team",
    date: "February 20, 2026",
    category: "Retention",
    readTime: "7 min read",
  },
  {
    slug: "review-management-roi",
    title: "The ROI of Review Management: Why Every Dollar Spent on Reputation Returns $5",
    excerpt: "Online reviews are the new word of mouth. Here's the data on what they're worth — and how to automate the process.",
    author: "RevenueOS Team",
    date: "February 12, 2026",
    category: "Reviews",
    readTime: "5 min read",
  },
  {
    slug: "follow-up-automation-best-practices",
    title: "Follow-Up Automation: Best Practices That Don't Feel Robotic",
    excerpt: "Great follow-up sequences feel human, even when automated. Learn the framework RevenueOS uses to convert 3x more leads.",
    author: "RevenueOS Team",
    date: "February 5, 2026",
    category: "Sales",
    readTime: "9 min read",
  },
  {
    slug: "ai-cro-vs-human-cro",
    title: "The AI CRO vs. The Human CRO: Why You Need Both (But Only One Costs $300k)",
    excerpt: "The Chief Revenue Officer role is evolving. Here is how AI-powered execution pairs with human strategy to drive growth.",
    author: "RevenueOS Team",
    date: "March 20, 2026",
    category: "Insights",
    readTime: "5 min read",
  },
  {
    slug: "daily-top-5-power",
    title: "The Power of the Daily Top 5: How AI Prioritization Boosts Sales Productivity",
    excerpt: "Most sales teams spend 40% of their time on low-value leads. Here is how AI-driven prioritization changes the game.",
    author: "RevenueOS Team",
    date: "March 25, 2026",
    category: "Productivity",
    readTime: "7 min read",
  },
  {
    slug: "data-rich-insight-poor",
    title: "From Data Rich to Insight Rich: Bridging the Gap in SMB Revenue Operations",
    excerpt: "You have the data, but do you have the answers? Learn how to turn your tool stack into a decision engine.",
    author: "RevenueOS Team",
    date: "March 28, 2026",
    category: "Strategy",
    readTime: "6 min read",
  },
  {
    slug: "automated-upsell-detection",
    title: "Automated Upsell Detection: Turning Your Customer Success into a Revenue Engine",
    excerpt: "The easiest revenue comes from existing customers. Here is how to find the patterns that signal an account is ready to expand.",
    author: "RevenueOS Team",
    date: "April 2, 2026",
    category: "Retention",
    readTime: "8 min read",
  },
];

function BlogPage() {
  return (
    <div className="pt-20">
      <section className="border-b border-gray-200 bg-gray-50 px-4 py-20 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-revenue-100 px-3 py-1 text-xs font-semibold text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300">
            Blog
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Revenue insights for growth-stage businesses.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Practical advice on lead recovery, follow-up automation, ad optimization, churn prevention,
            and building a revenue engine that runs itself.
          </p>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white transition-all hover:border-revenue-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:border-revenue-800"
              >
                <div className="aspect-[16/9] rounded-t-2xl bg-gradient-to-br from-revenue-100 to-revenue-50 dark:from-revenue-950 dark:to-revenue-900" />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="rounded-full bg-revenue-100 px-2 py-0.5 font-medium text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="mt-3 text-base font-bold leading-snug text-gray-900 group-hover:text-revenue-600 dark:text-white dark:group-hover:text-revenue-400">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-gray-50 px-4 py-20 text-center dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Want more revenue insights?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600 dark:text-gray-400">
            Get the latest posts delivered to your inbox. No spam, just actionable revenue advice.
          </p>
          <div className="mx-auto mt-8 flex max-w-md gap-3">
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder-gray-500"
            />
            <button className="rounded-xl bg-revenue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}