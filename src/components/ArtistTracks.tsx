import { useEffect, useState } from 'react';
import { getArtistsTopTracks } from '../api/spotify';

export default function ArtistTracks() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getArtistsTopTracks('2JHMJFyabIEyXjY57QcSeK');
        setTracks(result);
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 border-b pb-2">Top Tracks</h2>
      <ul className="space-y-8">
        {tracks.map((track) => (
          <li key={track.id} className="flex flex-col sm:flex-row items-start gap-4 border-b pb-6">
            <img
              src={track.album.images[0].url}
              alt={track.name}
              className="w-full sm:w-32 sm:h-32 object-cover rounded shadow"
            />
            <div>
              <h3 className="text-xl font-semibold">{track.name}</h3>
              <p className="text-sm text-gray-500 italic">{track.album.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
