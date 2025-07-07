"use client";

export default function PopularTopicsSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
        </div>
      ))}
    </div>
  );
}
