"use client";

import type React from "react";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { popularTopics } from "@/lib/topics";

export default function Navigation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(-1);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce function
  const debounce = (func: (query: string) => Promise<void>, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (arg: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(arg), delay);
    };
  };

  const fetchSuggestions = async (query: string) => {
    if (query.length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const response = await fetch(
        `/api/autocomplete?query=${encodeURIComponent(query)}`,
      );
      const data = await response.json();
      setSuggestions(data.suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/topic/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSuggestions([]);
      setShowSuggestions(false);
      setFocusedSuggestionIndex(-1);
    }
  };

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    debouncedFetchSuggestions(value);
    setFocusedSuggestionIndex(-1); // Reset focus when input changes
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedSuggestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1),
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (focusedSuggestionIndex !== -1) {
        selectSuggestion(suggestions[focusedSuggestionIndex]);
      } else if (searchQuery.trim()) {
        handleSearch(e);
      }
    } else if (e.key === "Tab") {
      if (focusedSuggestionIndex !== -1) {
        e.preventDefault(); // Prevent default tab behavior if a suggestion is focused
        selectSuggestion(suggestions[focusedSuggestionIndex]);
      } else {
        setShowSuggestions(false);
      }
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
    setFocusedSuggestionIndex(-1);
    router.push(`/topic/${encodeURIComponent(suggestion)}`);
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
        <div className="mb-8 relative">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10"
                onFocus={() =>
                  searchQuery.length > 0 &&
                  suggestions.length > 0 &&
                  setShowSuggestions(true)
                }
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
            </div>
          </form>

          {/* Typeahead Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  className={`w-full text-left px-3 py-2 ${index === focusedSuggestionIndex ? "bg-gray-100" : "hover:bg-gray-50"} first:rounded-t-md last:rounded-b-md`}
                  onClick={() => selectSuggestion(suggestion)}
                  onMouseDown={(e) => e.preventDefault()} // Prevent input blur on suggestion click
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Popular Topics */}
        <div>
          <div className="flex items-center mb-4">
            <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
            <h3 className="font-semibold text-gray-700">Popular Topics</h3>
          </div>
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
        </div>
      </div>
    </nav>
  );
}
