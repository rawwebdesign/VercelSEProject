import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export async function GET() {
  try {
    const popularTopics = await get("popularTopics");
    return NextResponse.json(popularTopics);
  } catch (error) {
    console.error('Error fetching popular topics from Edge Config:', error);
    return new NextResponse('Error fetching popular topics', { status: 500 });
  }
}
