import { headers } from 'next/headers';

export default async function UserCity() {
  const headersList = headers();
  const city = headersList.get('x-user-city');

  if (!city || city === 'Unknown City') {
    return null;
  }

  return <p>Hello reader from {city}</p>;
}
