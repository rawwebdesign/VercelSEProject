import { NextResponse } from 'next/server';
import words from 'an-array-of-english-words';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const queryParts = query.split(' ');
    const lastWord = queryParts[queryParts.length - 1].toLowerCase();
    if (lastWord === '') {
      return NextResponse.json({ suggestions: [] });
    }
    const remainingQuery = queryParts.slice(0, queryParts.length - 1).join(' ');

    const filteredWords = words.filter(word => word.startsWith(lastWord)).slice(0, 5);

    const suggestions = filteredWords.map(word => {
      if (remainingQuery) {
        return `${remainingQuery} ${word}`;
      } else {
        return word;
      }
    });

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error);
    return NextResponse.json({ suggestions: [] }, { status: 500 });
  }
}
