import { useState } from 'react';
import { fetchAlbumMetrics, fetchBandcampBand } from '../api/bandcamp';

export default function BandcampBandForm() {
  const [bandName, setBandName] = useState('');
  const [artists, setArtists] = useState<MetricSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [albumMetrics, setAlbumMetrics] = useState<AlbumMetrics | null>(null);
  const [albumLoading, setAlbumLoading] = useState(false);

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

  async function handleAlbumSelect(album: { name: string; url: string }) {
    setSelectedAlbum(album);
    setAlbumLoading(true);
    try {
      const metrics = await fetchAlbumMetrics(album.url);
      setAlbumMetrics(metrics);
    } catch (err) {
      console.error(err);
    } finally {
      setAlbumLoading(false);
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
    <div className="p-6">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter band name"
          value={bandName}
          onChange={(e) => setBandName(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
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
                  <td className="px-4 py-2 text-center">
                    <select
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      onChange={(e) => {
                        const album = artist.discography.totalAlbums.find(
                          (a) => a.url === e.target.value
                        );
                        if (album) handleAlbumSelect(album);
                      }}
                    >
                      <option value="">Select an album</option>
                      {artist.discography.totalAlbums.map((album) => (
                        <option key={album.url} value={album.url}>
                          {album.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedAlbum && albumMetrics && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-y-auto max-h-[90vh] p-6">
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
              onClick={() => {
                setSelectedAlbum(null);
                setAlbumMetrics(null);
              }}
            >
              ✕
            </button>

            {/* Top section: image + info + metrics */}
            <div className="flex flex-col sm:flex-row gap-4">
              {albumMetrics.album.imageUrl && (
                <img
                  src={albumMetrics.album.imageUrl}
                  alt={albumMetrics.album.title}
                  className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto rounded shadow hover:scale-105 transition-transform"
                />
              )}

              <div className="flex-1 flex flex-col justify-between gap-4">
                {/* Album info */}
                <div>
                  <h2 className="text-xl font-semibold mb-1">{albumMetrics.album.title}</h2>
                  <h3 className="text-sm mb-2">
                    Artist:{' '}
                    <a
                      href={albumMetrics.album.artist.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {albumMetrics.album.artist.name}
                    </a>
                  </h3>
                  <p className="text-sm mb-1">
                    <strong>Release Date:</strong> {albumMetrics.album.releaseDate || '—'}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Tags:</strong> {albumMetrics.album.tags?.join(', ') || '—'}
                  </p>
                </div>

                {/* Metrics in 2 columns */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm p-2 bg-gray-50 rounded">
                  <p>
                    <strong>Tracks:</strong> {albumMetrics.metrics.numTracks}
                  </p>
                  <p>
                    <strong>Streamable:</strong> {albumMetrics.metrics.streamableTracks}
                  </p>
                  <p>
                    <strong>Total duration:</strong>{' '}
                    {Math.round(albumMetrics.metrics.totalDuration)}s
                  </p>
                  <p>
                    <strong>Tracks w/ lyrics:</strong> {albumMetrics.metrics.tracksWithLyrics}
                  </p>
                  <p>
                    <strong>Avg track duration:</strong>{' '}
                    {Math.round(albumMetrics.metrics.averageTrackDuration)}s
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            {albumMetrics.album.description && (
              <p className="text-sm leading-relaxed mt-4 max-h-48 overflow-y-auto">
                {albumMetrics.album.description.split('. ').map((sentence, idx, arr) => (
                  <span key={idx} className="block mb-2">
                    {sentence.trim()}
                    {idx < arr.length - 1 ? '.' : ''}
                  </span>
                ))}
              </p>
            )}

            {/* Releases */}
            {albumMetrics.album.releases?.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold mb-1">Releases:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {albumMetrics.album.releases.map((r) => (
                    <li key={r.url}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {r.name} ({r.format})
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
