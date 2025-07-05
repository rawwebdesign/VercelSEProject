import { Suspense } from "react";
import StoryCard from "@/components/story-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Story } from "@/lib/types";
import { AlgoliaSearchResultSchema } from "@/lib/validators";

async function getStoriesByTopic(topic: string): Promise<Story[]> {
  try {
    const response = await fetch(
      `https://hn.algolia.com/api/v1/search?query=${topic}&tags=story`,
    );
    const json = await response.json();
    const parsed = AlgoliaSearchResultSchema.parse(json);

    return parsed.hits.map((hit) => ({
      id: parseInt(hit.objectID, 10),
      title: hit.title,
      url: hit.url,
      score: hit.points,
      by: hit.author,
      time: hit.created_at_i,
      descendants: hit.num_comments,
    }));
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
          &#34;{topic}&#34;: Top Stories of all time
        </h1>
        <Suspense fallback={<TopicStoryListSkeleton />}>
          <TopicStoryList topic={topic} />
        </Suspense>
      </div>
    </div>
  );
}
