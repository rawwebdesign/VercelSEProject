"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"

const popularTopics = [
  "AI",
  "React",
  "JavaScript",
  "Python",
  "Machine Learning",
  "Startup",
  "Crypto",
  "Web3",
  "TypeScript",
  "Next.js",
  "Docker",
  "Kubernetes",
  "AWS",
  "Security",
  "Open Source",
]

export default function Navigation() {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/topic/${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setShowSuggestions(false)
    }
  }

  const handleInputChange = (value: string) => {
    setSearchQuery(value)

    if (value.length > 0) {
      const filtered = popularTopics.filter((topic) => topic.toLowerCase().includes(value.toLowerCase())).slice(0, 5)
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
    router.push(`/topic/${encodeURIComponent(suggestion)}`)
  }

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6">
      <div className="mb-8">
        <Link href="/" className="text-xl font-bold text-orange-600">
          HN Reader
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-8 relative">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              className="pl-10"
              onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
          </div>
        </form>

        {/* Typeahead Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                onClick={() => selectSuggestion(suggestion)}
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
    </nav>
  )
}
