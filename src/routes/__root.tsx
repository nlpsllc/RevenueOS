import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "RevenueOS — AI Chief Revenue Officer" },
      {
        name: "description",
        content:
          "RevenueOS connects to your existing tools in under 30 minutes and acts as your AI Chief Revenue Officer — recovering missed leads, automating follow-ups, optimizing ad spend, and delivering daily revenue actions.",
      },
      { property: "og:title", content: "RevenueOS — AI Chief Revenue Officer" },
      {
        property: "og:description",
        content:
          "Connect in 30 minutes. Recover revenue immediately. The AI CRO for growth-stage businesses.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-dvh flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">404 — Page Not Found</h1>
      <p className="mt-2 text-gray-500">The page you're looking for doesn't exist.</p>
    </div>
  ),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}