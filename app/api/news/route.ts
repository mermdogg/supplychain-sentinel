import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "News API key not configured" }, { status: 500 });
  }

  // These are the search terms most relevant to supply chain / aerospace / defense
  const queries = [
    "supply chain disruption",
    "port congestion shipping delay",
    "semiconductor shortage export",
    "sanctions trade restriction",
    "aerospace defense procurement",
  ];

  // Pick a random query so results stay varied on each refresh
  const query = queries[Math.floor(Math.random() * queries.length)];

  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=15&apiKey=${apiKey}`;

    const response = await fetch(url, {
      // Tell Next.js not to cache this — we want fresh news
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`NewsAPI responded with status ${response.status}`);
    }

    const data = await response.json();

    // Clean up the articles — only send what we need to the frontend
    const articles = (data.articles || [])
      .filter((a: any) => a.title && a.title !== "[Removed]")
      .map((a: any) => ({
        id: a.url,
        title: a.title,
        source: a.source?.name || "Unknown Source",
        url: a.url,
        publishedAt: a.publishedAt,
        description: a.description || "",
      }));

    return NextResponse.json({ articles, query });
  } catch (error) {
    console.error("News fetch error:", error);

    // Return mock news as fallback so the dashboard never breaks
    return NextResponse.json({
      articles: getMockNews(),
      query: "fallback",
    });
  }
}

// Fallback data if the API fails or key isn't set
function getMockNews() {
  return [
    {
      id: "mock-1",
      title: "Taiwan Strait Tensions Disrupt Asia-Pacific Shipping Lanes",
      source: "Reuters",
      url: "#",
      publishedAt: new Date().toISOString(),
      description: "Commercial shipping operators report delays as military exercises affect transit routes.",
    },
    {
      id: "mock-2",
      title: "New BIS Export Controls Target Advanced Semiconductor Equipment",
      source: "Wall Street Journal",
      url: "#",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      description: "Bureau of Industry and Security expands restrictions on chip manufacturing tools.",
    },
    {
      id: "mock-3",
      title: "Port of Los Angeles Reports Record Container Backlog",
      source: "Bloomberg",
      url: "#",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      description: "Supply chain managers urged to build additional buffer stock ahead of peak season.",
    },
    {
      id: "mock-4",
      title: "Russia Titanium Exports Fall 40% Under Western Sanctions",
      source: "Financial Times",
      url: "#",
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      description: "Aerospace manufacturers accelerate domestic titanium qualification programs.",
    },
    {
      id: "mock-5",
      title: "India Emerges as Alternative Sourcing Hub for Electronics Manufacturing",
      source: "Defense News",
      url: "#",
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      description: "US-India defense partnership drives investment in domestic electronics supply chains.",
    },
  ];
}