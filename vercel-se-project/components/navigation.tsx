"use client";

import Link from "next/link";
import { TrendingUp } from "lucide-react";
import SearchBar from "./search-bar";
import { useEffect, useState } from "react";
import PopularTopicsSkeleton from "./popular-topics-skeleton";

export default function Navigation() {
  const [popularTopics, setPopularTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularTopics = async () => {
      try {
        const response = await fetch("/api/popular-topics");
        const data = await response.json();
        setPopularTopics(data);
      } catch (error) {
        console.error("Error fetching popular topics:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchPopularTopics();
  }, []);

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
      <div className="flex-grow">
        <div className="mb-8">
          <Link href="/" className="text-xl font-bold text-orange-600">
            Vercel Reader
          </Link>
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Popular Topics */}
        <div>
          <div className="flex items-center mb-4">
            <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
            <h3 className="font-semibold text-gray-700">Popular Topics</h3>
          </div>
          {loading ? (
            <PopularTopicsSkeleton />
          ) : (
            <div className="space-y-2">
              {popularTopics.map((topic) => (
                <Link
                  key={topic}
                  href={`/topic/${encodeURIComponent(topic)}`}
                  className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
                >
                  {topic}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
