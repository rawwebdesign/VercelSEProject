import { Suspense } from "react";
import StoryCard from "@/components/story-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Story } from "@/lib/types";

async function getStoriesByTopic(topic: string): Promise<Story[]> {
  try {
    // Get top stories first
    const topStoriesRes = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json",
    );
    const topStoryIds: number[] = await topStoriesRes.json();

    // Get first 100 stories to search through
    const storyPromises = topStoryIds.slice(0, 100).map(async (id) => {
      const storyRes = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      );
      return storyRes.json();
    });

    const allStories = await Promise.all(storyPromises);

    // Filter stories that mention the topic (case insensitive)
    return allStories
      .filter(
        (story) =>
          story &&
          story.title &&
          story.title.toLowerCase().includes(topic.toLowerCase()),
      )
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, 30); // Limit to 30 results
  } catch (error) {
    console.error("Error fetching stories by topic:", error);
    return [];
  }
}

function TopicStoryListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  );
}

async function TopicStoryList({ topic }: { topic: string }) {
  const stories = await getStoriesByTopic(topic);

  if (stories.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm text-center">
        <p className="text-gray-500">
          No stories found for &#34;{topic}&#34;. Try a different search term.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {stories.map((story, index) => (
        <StoryCard key={story.id} story={story} rank={index + 1} />
      ))}
    </div>
  );
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = decodeURIComponent(params.slug);

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Stories about &#34;{topic}&#34;
        </h1>
        <Suspense fallback={<TopicStoryListSkeleton />}>
          <TopicStoryList topic={topic} />
        </Suspense>
      </div>
    </div>
  );
}
