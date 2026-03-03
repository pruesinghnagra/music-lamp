import { useState } from 'react';
import { fetchBandcampBand } from '../api/bandcamp';

export default function BandcampBandForm() {
  const [bandName, setBandName] = useState('');
  const [artists, setArtists] = useState<MetricSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await fetchBandcampBand(bandName);
      if (!data) {
        setError('No data found for this band');
      } else {
        setArtists((prev) => [...prev, data]);
        setBandName('');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch band info');
    } finally {
      setLoading(false);
    }
  }

  function Indicator({ value }: { value: number }) {
    return (
      <span
        style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: value ? 'green' : 'red',
          marginLeft: '8px',
        }}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex items-center mb-6 space-x-2">
        <input
          type="text"
          placeholder="Enter band name"
          value={bandName}
          onChange={(e) => setBandName(e.target.value)}
          className="border rounded px-3 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-gray-500">Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}

      <h2>Metric Visibility</h2>
      {artists.length > 0 && (
        <div className="overflow-x-auto border border-gray-200 rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Artist</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Location
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Description
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Image</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Label</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Keywords
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Publisher
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Featured Track
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Total Albums
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Albums w/ Release Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Albums w/ Track Count
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Albums w/ Image
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Albums w/ Description
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Albums w/ Label
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Avg Tracks/Album
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Total Tracks
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Streamable Tracks
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Tracks w/ Lyrics
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {artists.map((artist, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{artist.artist.name}</td>
                  <td className="px-4 py-2 text-center">
                    <Indicator value={artist.artist.locationPresent} />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Indicator value={artist.artist.descriptionPresent} />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Indicator value={artist.artist.imagePresent} />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Indicator value={artist.artist.labelPresent} />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Indicator value={artist.artist.keywordsPresent} />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Indicator value={artist.artist.publisherPresent} />
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Indicator value={artist.artist.featuredTrackPresent} />
                  </td>
                  <td className="px-4 py-2 text-center">{artist.discography.totalAlbums}</td>
                  <td className="px-4 py-2 text-center">
                    {artist.discography.albumsWithReleaseDate}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {artist.discography.albumsWithTrackCount}
                  </td>
                  <td className="px-4 py-2 text-center">{artist.discography.albumsWithImage}</td>
                  <td className="px-4 py-2 text-center">
                    {artist.discography.albumsWithDescription}
                  </td>
                  <td className="px-4 py-2 text-center">{artist.discography.albumsWithLabel}</td>
                  <td className="px-4 py-2 text-center">
                    {artist.discography.averageTracksPerAlbum.toFixed(1)}
                  </td>
                  <td className="px-4 py-2 text-center">{artist.discography.totalTrackCount}</td>
                  <td className="px-4 py-2 text-center">
                    {artist.discography.totalStreamableTracks}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {artist.discography.totalTracksWithLyrics}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
