"use client";
import { useEffect, useState, useCallback } from "react";
import { ExternalLink, RefreshCw, Radio } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  description: string;
}

function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return seconds + "s ago";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + "m ago";
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + "h ago";
  return Math.floor(hours / 24) + "d ago";
}

function getSeverityTag(title: string): { label: string; color: string } {
  const t = title.toLowerCase();
  if (t.includes("sanction") || t.includes("ban") || t.includes("war") || t.includes("military")) {
    return { label: "CRITICAL", color: "bg-red-900/60 text-red-400 border-red-800" };
  }
  if (t.includes("shortage") || t.includes("delay") || t.includes("disruption") || t.includes("tariff")) {
    return { label: "HIGH", color: "bg-orange-900/60 text-orange-400 border-orange-800" };
  }
  if (t.includes("risk") || t.includes("supply chain") || t.includes("procurement")) {
    return { label: "MEDIUM", color: "bg-yellow-900/60 text-yellow-400 border-yellow-800" };
  }
  return { label: "INFO", color: "bg-blue-900/60 text-blue-400 border-blue-800" };
}

export default function LiveNewsFeed() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchNews = useCallback(async (showRefresh = false) => {
    if (showRefresh) setIsRefreshing(true);
    try {
      const res = await fetch("/api/news", { cache: "no-store" });
      const data = await res.json();
      if (data.articles) {
        setArticles(data.articles);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchNews(); }, [fetchNews]);
  useEffect(() => {
    const interval = setInterval(() => fetchNews(), 60000);
    return () => clearInterval(interval);
  }, [fetchNews]);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-5 h-5">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </div>
          <h3 className="font-semibold text-white text-sm">Live Intelligence Feed</h3>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-xs text-gray-600">Updated {timeAgo(lastUpdated.toISOString())}</span>
          )}
          <button onClick={() => fetchNews(true)} disabled={isRefreshing} className="text-gray-500 hover:text-blue-400 transition-colors disabled:opacity-50">
            <RefreshCw className={"w-3.5 h-3.5 " + (isRefreshing ? "animate-spin" : "")} />
          </button>
        </div>
      </div>
      <div className="overflow-y-auto flex-1 divide-y divide-gray-800/60">
        {loading ? (
          <div className="p-4 space-y-4">
            {[0,1,2,3,4].map((i) => (
              <div key={i} className="animate-pulse space-y-2">
                <div className="h-3 bg-gray-800 rounded w-3/4"></div>
                <div className="h-2 bg-gray-800 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="p-6 text-center text-gray-600 text-sm">No articles found.</div>
        ) : (
          articles.map((article) => {
            const severity = getSeverityTag(article.title);
            return (
              <div key={article.id} className="px-5 py-3.5 hover:bg-gray-800/40 transition-colors group">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1.5">
                    <span className={"shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border " + severity.color}>
                      {severity.label}
                    </span>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-gray-200 leading-snug hover:text-blue-400 line-clamp-2">
                      {article.title}
                    </a>
                  </div>
                  {article.description && (
                    <p className="text-xs text-gray-500 line-clamp-1 mb-1.5">{article.description}</p>
                  )}
                  <div className="flex items-center gap-2 text-[11px] text-gray-600">
                    <span className="font-medium text-gray-500">{article.source}</span>
                    <span>·</span>
                    <span>{timeAgo(article.publishedAt)}</span>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-400">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="px-5 py-2.5 border-t border-gray-800 bg-gray-950/50">
        <p className="text-[11px] text-gray-600 flex items-center gap-1.5">
          <Radio className="w-3 h-3" />
          Auto-refreshes every 60 seconds · Powered by NewsAPI
        </p>
      </div>
    </div>
  );
}