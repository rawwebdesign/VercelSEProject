import Link from "next/link";
import { ExternalLink, MessageCircle, User, Clock } from "lucide-react";

interface Story {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  descendants?: number;
}

interface StoryCardProps {
  story: Story;
  rank: number;
}

function formatTimeAgo(timestamp: number): string {
  const now = Date.now() / 1000;
  const diff = now - timestamp;

  if (diff < 3600) {
    return `${Math.floor(diff / 60)}m ago`;
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)}h ago`;
  } else {
    return `${Math.floor(diff / 86400)}d ago`;
  }
}

function getDomainFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

export default function StoryCard({ story, rank }: StoryCardProps) {
  const domain = story.url ? getDomainFromUrl(story.url) : "";

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 text-gray-400 font-mono text-sm w-8">
          {rank}.
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">
              {story.url ? (
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-600 transition-colors"
                >
                  {story.title}
                  <ExternalLink className="inline ml-1 h-4 w-4" />
                </a>
              ) : (
                <Link
                  href={`https://news.ycombinator.com/item?id=${story.id}`}
                  target="_blank"
                  className="hover:text-orange-600 transition-colors"
                >
                  {story.title}
                </Link>
              )}
            </h2>
          </div>

          {domain && <p className="text-sm text-gray-500 mb-2">{domain}</p>}

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="font-medium text-orange-600">{story.score}</span>
              <span className="ml-1">points</span>
            </div>

            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              <span>{story.by}</span>
            </div>

            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatTimeAgo(story.time)}</span>
            </div>

            {story.descendants !== undefined && (
              <div className="flex items-center">
                <MessageCircle className="h-3 w-3 mr-1" />
                <Link
                  href={`https://news.ycombinator.com/item?id=${story.id}`}
                  target="_blank"
                  className="hover:text-orange-600 transition-colors"
                >
                  {story.descendants} comments
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
