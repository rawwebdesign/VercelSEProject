import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type") || "top"
  const limit = Number.parseInt(searchParams.get("limit") || "30")

  try {
    let endpoint = "https://hacker-news.firebaseio.com/v0/topstories.json"

    if (type === "new") {
      endpoint = "https://hacker-news.firebaseio.com/v0/newstories.json"
    } else if (type === "best") {
      endpoint = "https://hacker-news.firebaseio.com/v0/beststories.json"
    }

    const response = await fetch(endpoint)
    const storyIds = await response.json()

    // Get story details for the first 'limit' stories
    const storyPromises = storyIds.slice(0, limit).map(async (id: number) => {
      const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      return storyResponse.json()
    })

    const stories = await Promise.all(storyPromises)
    const validStories = stories.filter((story) => story && story.title)

    return NextResponse.json(validStories)
  } catch (error) {
    console.error("Error fetching Hacker News data:", error)
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 })
  }
}
