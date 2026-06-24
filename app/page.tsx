import Link from "next/link";
import {
  ShieldAlert,
  Globe2,
  Brain,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: ShieldAlert,
    title: "Supplier Risk Scoring",
    description:
      "Every supplier scored 0–100 using country risk, industry exposure, and criticality weighting. Know your weakest links before they break.",
    color: "blue",
    stat: "0–100",
    statLabel: "risk scale",
  },
  {
    icon: Brain,
    title: "AI Disruption Briefings",
    description:
      "Claude AI generates executive-ready risk summaries, threat factors, and recommended actions for every supplier in seconds.",
    color: "purple",
    stat: "<10s",
    statLabel: "per analysis",
  },
  {
    icon: Globe2,
    title: "Global Risk Map",
    description:
      "Visualize your supplier network on a live map. Color-coded pins show exactly where your exposure is concentrated worldwide.",
    color: "cyan",
    stat: "195+",
    statLabel: "countries tracked",
  },
];

const whyItMatters = [
  "Monitor supplier disruptions before they halt production lines",
  "Improve program readiness by surfacing risks weeks earlier",
  "Reduce operational delays with proactive mitigation plans",
  "Support data-driven decision-making across procurement teams",
  "Strengthen supply chain resilience for long-cycle defense programs",
];

const stats = [
  { value: "94%", label: "of aerospace programs impacted by supply disruptions" },
  { value: "67 days", label: "average delay from undetected supplier risk events" },
  { value: "$4.2B", label: "annual cost of supply chain failures in A&D sector" },
];

const companies = [
  "Lockheed Martin", "Boeing", "Raytheon", "Northrop Grumman", "General Dynamics", "L3Harris",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">

      {/* Nav */}
      <nav className="border-b border-gray-800/50 px-6 py-4 flex items-center justify-between sticky top-0 bg-gray-950/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ShieldAlert className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            SupplyChain<span className="text-blue-400">Sentinel</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard"
            className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-1.5"
          >
            Open App <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            AI-Powered · Real-Time · Defense-Grade Intelligence
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            Supply chain risk.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Seen before it strikes.
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-3">
            AI-powered supply chain risk intelligence for global operations.
          </p>
          <p className="text-gray-500 max-w-xl mx-auto mb-10 text-sm leading-relaxed">
            Built for aerospace, defense, and advanced manufacturing — where a
            single supplier failure can ground a program for months and cost
            millions in delays.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-7 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/30 hover:-translate-y-0.5"
            >
              View Live Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard/simulator"
              className="inline-flex items-center justify-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white px-7 py-3.5 rounded-xl font-medium transition-all hover:-translate-y-0.5"
            >
              <Zap className="w-4 h-4" />
              Try Scenario Simulator
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted by banner */}
      <section className="border-y border-gray-800/50 py-5 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-4">
            Built for teams at companies like
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {companies.map((c) => (
              <span key={c} className="text-gray-600 text-sm font-medium hover:text-gray-400 transition-colors">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center hover:border-blue-800/50 transition-colors"
            >
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-8 pb-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3">
            Intelligence at every layer of your supply chain
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm">
            Three capabilities that give procurement and program managers the
            data they need, in the format they can act on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, description, color, stat, statLabel }) => (
            <div
              key={title}
              className="group bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-blue-800/50 transition-all hover:-translate-y-1"
            >
              <div
                className={`w-11 h-11 rounded-xl mb-5 flex items-center justify-center ${
                  color === "blue"
                    ? "bg-blue-600/15 border border-blue-600/20"
                    : color === "purple"
                    ? "bg-purple-600/15 border border-purple-600/20"
                    : "bg-cyan-600/15 border border-cyan-600/20"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    color === "blue"
                      ? "text-blue-400"
                      : color === "purple"
                      ? "text-purple-400"
                      : "text-cyan-400"
                  }`}
                />
              </div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-2xl font-bold text-white">{stat}</span>
                <span className="text-xs text-gray-500 mb-1">{statLabel}</span>
              </div>
              <h3 className="text-base font-semibold mb-2 text-white">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why it matters */}
      <section className="bg-gray-900/40 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-5 px-3 py-1.5 bg-blue-600/10 border border-blue-600/20 rounded-full">
                <AlertTriangle className="w-3 h-3" />
                For Aerospace & Defense
              </div>
              <h2 className="text-3xl font-bold mb-5 leading-tight">
                Why this matters to Lockheed Martin, Boeing, and Raytheon
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed text-sm">
                Defense programs run on multi-year timelines with zero
                tolerance for supply chain failures. A single critical-component
                shortage can delay a program by months, trigger contract
                penalties, and degrade mission readiness. Sentinel was designed
                for exactly this environment.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-600/20"
              >
                Explore the Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {whyItMatters.map((point, i) => (
                <div
                  key={point}
                  className="flex items-start gap-3 p-4 bg-gray-900/50 border border-gray-800/50 rounded-xl hover:border-blue-800/40 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-600/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <span className="text-gray-300 text-sm leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="bg-gradient-to-br from-blue-950/50 to-gray-900 border border-blue-900/30 rounded-3xl p-12">
          <TrendingUp className="w-10 h-10 text-blue-400 mx-auto mb-5" />
          <h2 className="text-3xl font-bold mb-3">
            Ready to see your supply chain risk?
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm">
            The dashboard is live with real news feeds, AI risk analysis, and
            mock supplier data ready to explore.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/25"
          >
            Open Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 px-6 py-6 text-center text-gray-600 text-xs">
        <p>
          SupplyChain Sentinel — Portfolio Project · Built with Next.js, Tailwind CSS, Claude AI & NewsAPI
        </p>
      </footer>
    </div>
  );
}