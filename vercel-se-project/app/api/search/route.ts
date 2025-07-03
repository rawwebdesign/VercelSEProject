import { type NextRequest, NextResponse } from "next/server";

const popularTopics = [
  "AI",
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "React",
  "Vue",
  "Angular",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Python",
  "Java",
  "Go",
  "Rust",
  "C++",
  "Swift",
  "Startup",
  "Entrepreneurship",
  "Business",
  "Marketing",
  "Crypto",
  "Bitcoin",
  "Ethereum",
  "Blockchain",
  "Web3",
  "DeFi",
  "Next.js",
  "Svelte",
  "Flutter",
  "React Native",
  "Docker",
  "Kubernetes",
  "DevOps",
  "CI/CD",
  "AWS",
  "Google Cloud",
  "Azure",
  "Cloud Computing",
  "Security",
  "Cybersecurity",
  "Privacy",
  "Open Source",
  "GitHub",
  "Git",
  "Database",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "API",
  "GraphQL",
  "REST",
  "Microservices",
  "Design",
  "UI/UX",
  "Frontend",
  "Backend",
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q")?.toLowerCase() || "";

  if (!query) {
    return NextResponse.json([]);
  }

  const suggestions = popularTopics
    .filter((topic) => topic.toLowerCase().includes(query))
    .slice(0, 8);

  return NextResponse.json(suggestions);
}
