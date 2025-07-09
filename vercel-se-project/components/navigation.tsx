"use client";

import Link from "next/link";
import { TrendingUp, History, X } from "lucide-react";
import SearchBar from "./search-bar";
import React, { useEffect, useState } from "react";
import PopularTopicsSkeleton from "./popular-topics-skeleton";

export default function Navigation() {
  const [popularTopics, setPopularTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

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

  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  const addRecentSearch = (query: string) => {
    setRecentSearches((prevSearches) => {
      return [query, ...prevSearches.filter((s) => s !== query)].slice(0, 5);
    });
  };

  const handleDeleteSearch = (e: React.MouseEvent, search: string) => {
    e.preventDefault();
    e.stopPropagation();
    setRecentSearches((prevSearches) =>
      prevSearches.filter((s) => s !== search),
    );
  };

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
      <div className="flex-grow">
        <div className="mb-8">
          <Link href="/" className="text-xl font-bold text-orange-600">
            Vercel Reader
          </Link>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={addRecentSearch} />

        {/* Popular Topics */}
        <div className="mb-8">
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

        {/* Recent Searches */}
        {Boolean(recentSearches.length) && (
          <div>
            <div className="flex items-center mb-4">
              <History className="h-4 w-4 text-gray-500 mr-2" />
              <h3 className="font-semibold text-gray-700">Recent Searches</h3>
            </div>
            <div className="space-y-2">
              {recentSearches.map((search) => (
                <Link
                  key={search}
                  href={`/topic/${encodeURIComponent(search)}`}
                  className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
                >
                  <span>{search}</span>
                  <button
                    onClick={(e) => handleDeleteSearch(e, search)}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
