import { Link, createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
});

const posts: Record<string, { title: string; content: string; category: string }> = {
  "what-is-an-ai-cro": {
    title: "What Is an AI Chief Revenue Officer? (And Why Your Business Needs One)",
    category: "Insights",
    content: `
      <p>The role of Chief Revenue Officer (CRO) has become increasingly vital as businesses recognize that revenue generation can't be siloed into separate sales, marketing, and customer success departments. But hiring a seasoned CRO is expensive — average salaries exceed $300,000 — and many growth-stage companies simply can't justify that investment.</p>
      <p>Enter the AI Chief Revenue Officer: a system that does everything a human CRO does — analyzes data, identifies opportunities, prioritizes actions, and drives revenue — but works 24/7, costs a fraction of a salary, and connects to your existing tools in under 30 minutes.</p>
      <h2>What an AI CRO actually does</h2>
      <p>An AI CRO like RevenueOS continuously monitors your entire revenue operation:</p>
      <ul>
        <li><strong>Lead Recovery</strong> — scans your CRM for leads that went cold and re-engages them</li>
        <li><strong>Follow-up Automation</strong> — runs multi-channel sequences until prospects respond</li>
        <li><strong>Review Management</strong> — monitors sentiment and boosts positive reviews</li>
        <li><strong>Ad Spend Optimization</strong> — detects wasted budget and reallocates to high-ROI channels</li>
        <li><strong>Churn Detection</strong> — flags at-risk accounts before they cancel</li>
        <li><strong>Competitor Monitoring</strong> — tracks competitor moves in real-time</li>
      </ul>
      <p>And it doesn't just report — it takes action. Every day, you receive a "Top 5 Actions" report ranked by estimated revenue impact.</p>
      <h2>Why now?</h2>
      <p>Three forces have converged to make AI CROs viable: LLMs that can understand unstructured data across platforms, APIs that give read-only access to every major business tool, and the economic reality that SMBs need enterprise-level revenue intelligence without enterprise-level headcount.</p>
      <p>The result is a system that doesn't replace the human touch — it amplifies it. Your team still closes deals, builds relationships, and makes strategic decisions. But they do it armed with AI-powered prioritization instead of gut feelings.</p>
    `,
  },
  "top-5-reasons-leads-go-cold": {
    title: "The Top 5 Reasons Leads Go Cold (And How to Bring Them Back)",
    category: "Lead Generation",
    content: `
      <p>Studies show that 80% of leads are never followed up after the first contact. Even among leads that are contacted, most receive only one or two attempts before being abandoned. Here are the five most common reasons leads go cold — and how RevenueOS brings them back.</p>
      <h2>1. No follow-up at all</h2>
      <p>Someone fills out a form, requests a demo, or asks a question. The lead lands in the CRM. And then... nothing. It's the most common failure mode in B2B sales.</p>
      <h2>2. Giving up too early</h2>
      <p>Most sales reps stop after 1-2 attempts. But 80% of sales require 5+ follow-ups.</p>
      <h2>3. Bad timing</h2>
      <p>Sending an email at 2 AM or during a holiday weekend guarantees low engagement.</p>
      <h2>4. Generic messaging</h2>
      <p>Copy-paste sequences don't work. RevenueOS personalizes every message.</p>
      <h2>5. No lead scoring</h2>
      <p>Without prioritization, your team chases the wrong leads.</p>
    `,
  },
  "ad-spend-waste-checklist": {
    title: "The 7-Point Ad Spend Waste Checklist for B2B Marketers",
    category: "Advertising",
    content: `
      <p>Most B2B companies waste 20–30% of their ad budget. Before you increase your budget, run through this checklist.</p>
      <h2>1. Are you running ads on weekends?</h2>
      <p>For most B2B, weekend traffic converts at a fraction of weekday rates.</p>
      <h2>2. Are negative keywords up to date?</h2>
      <p>Review your search term reports for irrelevant queries.</p>
      <h2>3. Are you targeting the wrong geography?</h2>
      <p>Check if your ads serve to locations where you don't do business.</p>
      <h2>4. Is frequency too high?</h2>
      <p>Cap frequency if your audience sees the same ad 7+ times without converting.</p>
      <h2>5. Are lookalike audiences stale?</h2>
      <p>Refresh lookalikes every 30 days from recent high-value customer data.</p>
      <h2>6. Are you measuring full-funnel ROAS?</h2>
      <p>Last-click attribution undervalues top-of-funnel.</p>
      <h2>7. Is your landing page aligned?</h2>
      <p>Check bounce rates per ad group to ensure landing page match.</p>
      <p>RevenueOS automates all of these checks daily.</p>
    `,
  },
  "churn-early-warning-signals": {
    title: "10 Early Warning Signals a Customer Is About to Churn",
    category: "Retention",
    content: `
      <p>Churn rarely happens overnight. RevenueOS tracks 30+ behavioral signals. Here are the 10 most predictive ones.</p>
      <h2>1. Declining login frequency</h2>
      <p>The single strongest churn signal. If daily active users drop to weekly, churn is imminent.</p>
      <h2>2. Support tickets spike</h2>
      <p>A sudden increase in support requests signals frustration.</p>
      <h2>3. Feature adoption stalls</h2>
      <p>Customers using only core features are 3x more likely to churn.</p>
      <h2>4. Contract renewal date approaches</h2>
      <p>Most churn decisions are made 30-60 days before renewal.</p>
      <h2>5. Account contact changes</h2>
      <p>When your champion leaves, you've lost your internal advocate.</p>
      <h2>6. Usage drops after onboarding</h2>
      <p>If a customer doesn't reach the "aha moment" in 30 days, they rarely recover.</p>
      <h2>7. Negative sentiment in feedback</h2>
      <p>NPS dips and CSAT declines are leading indicators.</p>
      <h2>8. Competitor activity increases</h2>
      <p>If a competitor launches a feature you lack, churn risk spikes.</p>
      <h2>9. Billing issues</h2>
      <p>Failed payments or downgrade requests signal retention risk.</p>
      <h2>10. Product area stagnation</h2>
      <p>If you haven't shipped a requested feature in 90+ days, they may look elsewhere.</p>
    `,
  },
  "review-management-roi": {
    title: "The ROI of Review Management: Why Every Dollar Spent on Reputation Returns $5",
    category: "Reviews",
    content: `
      <p>Online reviews are the new word of mouth. 93% of B2B buyers say reviews influence purchasing decisions.</p>
      <h2>The math</h2>
      <p>Businesses that actively manage reviews can increase review volume 3-5x, improve ratings by 0.5-1.0 stars, and attribute 5-9% revenue growth to improved social proof.</p>
      <h2>What automated review management looks like</h2>
      <p>RevenueOS monitors G2, Capterra, Google Business, Trustpilot, and more. Sentiment analysis flags negatives, and happy customers get auto-requests for reviews.</p>
      <p>The result: more reviews, better ratings, and measurable revenue growth — with zero manual effort.</p>
    `,
  },
  "follow-up-automation-best-practices": {
    title: "Follow-Up Automation: Best Practices That Don't Feel Robotic",
    category: "Sales",
    content: `
      <p>Sales follow-up automation done badly is spam. Done well, it's a superpower. Here's how RevenueOS does it right.</p>
      <h2>1. Start with personalization</h2>
      <p>Reference something specific. RevenueOS pulls context from your CRM automatically.</p>
      <h2>2. Multi-channel</h2>
      <p>A prospect who ignores email might respond to SMS or LinkedIn.</p>
      <h2>3. Smart pacing</h2>
      <p>Space touches 2-4 days apart and pause if the prospect engages.</p>
      <h2>4. Value in every touch</h2>
      <p>Offer something: a case study, an article, a tool. Never just check in.</p>
      <h2>5. Clear opt-out</h2>
      <p>Track compliance across CAN-SPAM, GDPR, and CCPA.</p>
      <p>The result: 3x more conversations started, zero spam complaints.</p>
    `,
  },
  "daily-top-5-power": {
    title: "The Power of the Daily Top 5: How AI Prioritization Boosts Sales Productivity",
    category: "Productivity",
    content: `
      <p>Most sales teams are overwhelmed by their inbox and CRM alerts. Without a clear signal on which actions will actually move the needle, reps often default to "first-in, first-out" or chasing the loudest prospect. Neither is optimal for revenue.</p>
      <h2>The Signal in the Noise</h2>
      <p>RevenueOS analyzes thousands of data points across your stack to identify the <strong>Top 5 Actions</strong> that have the highest estimated revenue impact for your business today.</p>
      <ul>
        <li><strong>Stalled Deals</strong>: Identifies opportunities that haven't moved in 7 days and drafts a personalized follow-up.</li>
        <li><strong>Ad Waste Fixes</strong>: Flags a campaign with a 0.5x ROAS and suggests reallocating that budget.</li>
        <li><strong>Churn Warnings</strong>: Detects a power user who hasn't logged in for 2 weeks.</li>
      </ul>
      <p>By focusing on these five things first, your team stops "working harder" and starts "working smarter"—directly impacting the bottom line.</p>
    `,
  },
  "data-rich-insight-poor": {
    title: "From Data Rich to Insight Rich: Bridging the Gap in SMB Revenue Operations",
    category: "Strategy",
    content: `
      <p>Most growth-stage SMBs have no shortage of data. They have HubSpot for sales, Klaviyo for email, Meta for ads, and Google Analytics for the web. The problem isn't having the data—it's knowing what to do with it.</p>
      <h2>The Insight Gap</h2>
      <p>Bridging the gap between a spreadsheet and a sale requires analysis that most lean teams don't have time for. You need to know: <em>Which leads are most likely to close? Why did our CAC spike yesterday? Which customers are actually happy?</em></p>
      <p>An AI CRO bridges this gap by continuously cross-referencing your tools. It doesn't just show you a chart of your churn; it tells you exactly which customer is leaving and why, based on their recent support tickets and usage patterns.</p>
    `,
  },
  "automated-upsell-detection": {
    title: "Automated Upsell Detection: Turning Your Customer Success into a Revenue Engine",
    category: "Retention",
    content: `
      <p>It costs 5x more to acquire a new customer than to keep (and grow) an existing one. Yet most companies leave expansion revenue to chance, waiting for a customer to "ask" for more.</p>
      <h2>Expansion Signals</h2>
      <p>RevenueOS tracks "Expansion Intent" signals that humans often miss:</p>
      <ul>
        <li><strong>Usage Spikes</strong>: An account hitting 90% of their plan limit.</li>
        <li><strong>Sentiment Shifts</strong>: High-praise reviews or positive support interactions.</li>
        <li><strong>Feature Discovery</strong>: Users exploring pages for higher-tier features.</li>
      </ul>
      <p>When these signals align, RevenueOS flags the account as a "Top Action," ensuring your sales or success team reaches out exactly when the customer is ready to grow.</p>
    `,
  },
};

function BlogPostPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const post = posts[slug];

  if (!post) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center pt-20 text-center">
        <h1 className="text-4xl font-bold">Post not found</h1>
        <p className="mt-2 text-gray-500">This blog post doesn't exist yet.</p>
        <Link to="/blog" className="mt-4 text-revenue-600 underline hover:text-revenue-700">
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <article className="mx-auto max-w-3xl px-4 py-16">
        <Link
          to="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-revenue-600 hover:text-revenue-700 dark:text-revenue-400 dark:hover:text-revenue-300"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to blog
        </Link>

        <span className="rounded-full bg-revenue-100 px-3 py-1 text-xs font-semibold text-revenue-700 dark:bg-revenue-950 dark:text-revenue-300">
          {post.category}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <div
          className="mt-8 prose prose-gray max-w-none dark:prose-invert prose-headings:font-bold prose-h2:mt-8 prose-h2:text-xl prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <section className="border-t border-gray-200 bg-gray-50 px-4 py-16 text-center dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold">Get more insights like this</h2>
          <p className="mx-auto mt-2 max-w-lg text-gray-600 dark:text-gray-400">
            Subscribe to the RevenueOS newsletter.
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
