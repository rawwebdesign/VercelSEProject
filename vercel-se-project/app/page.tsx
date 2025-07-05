import { Suspense } from "react";
import StoryCard from "@/components/story-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Story } from "@/lib/types";

// ISR: Revalidate every five minutes
export const revalidate = 300;

async function getTopStories(): Promise<Story[]> {
  const baseURL = "https://hacker-news.firebaseio.com";
  const version = "v0";
  try {
    // Get top story IDs
    const topStoriesResponse = await fetch(
      `${baseURL}/${version}/topstories.json`,
    );
    const topStoryIds = await topStoriesResponse.json();

    // Get story details for the first 30 stories
    const storyPromises = topStoryIds.slice(0, 30).map(async (id: number) => {
      const storyResponse = await fetch(
        `${baseURL}/${version}/item/${id}.json`,
      );
      return storyResponse.json();
    });

    const stories = await Promise.all(storyPromises);
    return stories.filter((story): story is Story => story !== null);
  } catch (error) {
    console.error("Error fetching stories:", error);
    return [];
  }
}

function StoryListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  );
}

async function StoryList() {
  const stories = await getTopStories();

  return (
    <div className="space-y-4">
      {stories.map((story, index) => (
        <StoryCard key={story.id} story={story} rank={index + 1} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Top Stories</h1>
        <Suspense fallback={<StoryListSkeleton />}>
          <StoryList />
        </Suspense>
      </div>
    </div>
  );
}
