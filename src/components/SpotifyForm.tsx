import { useState } from 'react';
import { fetchSpotifyMetrics, fetchAlbumMetrics } from '../api/spotify';
import type {
  SpotifyArtistMetrics,
  SpotifyAlbumMetrics,
  SpotifyAlbum,
  SpotifyTrack,
} from '../types/Spotify';

export default function SpotifyMetricsForm() {
  const [artistId, setArtistId] = useState('');
  const [artists, setArtists] = useState<SpotifyArtistMetrics[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<SpotifyAlbumMetrics | null>(null);
  const [albumLoading, setAlbumLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!artistId.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchSpotifyMetrics(artistId);

      console.log('Artist metrics fetched:', data);

      if (!data) setError('No data found for this artist.');
      else setArtists((prev) => [...prev, data]);
      setArtistId('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch artist metrics.');
    } finally {
      setLoading(false);
    }
  }

  function TrackListCell({ tracks }: { tracks: string[] }) {
    const [expanded, setExpanded] = useState(false);

    return (
      <div className="relative inline-block text-left">
        <button
          type="button"
          className="inline-flex justify-between w-56 rounded border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Top Tracks ▼' : 'Top Tracks ▶'}
        </button>

        {expanded && (
          <div className="fixed left-1/2 top -translate-x-1/2 bg-white shadow-lg border border-gray-200 rounded max-h-96 w-72 overflow-y-auto z-50">
            <ul className="py-1 text-sm text-gray-700">
              {tracks.map((track, idx) => (
                <li key={idx} className="px-3 py-1 hover:bg-blue-100 cursor-pointer">
                  {track}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  function formatDuration(ms: number) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  async function handleAlbumSelect(albumId: string) {
    setAlbumLoading(true);
    try {
      let albumWithGenres: SpotifyAlbum | undefined;
      for (const artist of artists) {
        albumWithGenres = artist.albums.find((a) => a.id === albumId);
        if (albumWithGenres) break;
      }

      if (!albumWithGenres) {
        console.error('Album not found in artist metrics');
        setAlbumLoading(false);
        return;
      }

      const data = await fetchAlbumMetrics(albumId);
      data.album.genres = albumWithGenres.genres;
      console.log('Album metrics fetched:', data);
      setSelectedAlbum(data);
    } catch (err) {
      console.error(err);
    } finally {
      setAlbumLoading(false);
    }
  }

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Spotify Artist"
          value={artistId}
          onChange={(e) => setArtistId(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Artist
        </button>
      </form>

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {artists.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Artist</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Followers
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Artist Popularity
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Album Select
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Top Tracks
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Top Tracks Avg Popularity
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Avg Duration
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Total Albums
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Total Singles
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Latest Release
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {artists.map((artist, idx) => {
                const totalAlbums = artist.albums.filter((a) => a.albumType === 'album').length;
                const totalSingles = artist.albums.filter((a) => a.albumType === 'single').length;

                return (
                  <tr key={idx}>
                    <td className="px-4 py-2">{artist.artist.name}</td>
                    <td className="px-4 py-2">{artist.artist.followers}</td>
                    <td className="px-4 py-2">{artist.artist.popularity}</td>
                    <td className="px-4 py-2">
                      <select
                        defaultValue=""
                        className="border border-gray-300 rounded px-2 py-1 text-sm w-48 max-w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                        onChange={(e) => handleAlbumSelect(e.target.value)}
                      >
                        <option value="" disabled>
                          Select album
                        </option>
                        {artist.albums.map((album) => (
                          <option key={album.id} value={album.id}>
                            {album.name} ({album.releaseDate})
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <TrackListCell tracks={artist.tracks.topTrackNames.split(', ')} />
                    </td>
                    <td className="px-4 py-2">{artist.tracks.averagePopularity.toFixed(1)}</td>
                    <td className="px-4 py-2">{artist.tracks.averageDuration.toFixed(0)}</td>
                    <td className="px-4 py-2">{totalAlbums}</td>
                    <td className="px-4 py-2">{totalSingles}</td>
                    <td className="px-4 py-2">{artist.latestReleaseDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-y-auto max-h-[90vh] p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{selectedAlbum.album.name}</h2>
              <button
                onClick={() => setSelectedAlbum(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Album image */}
            <div className="flex flex-col sm:flex-row gap-4">
              {selectedAlbum.album.image && (
                <img
                  src={selectedAlbum.album.image}
                  alt={selectedAlbum.album.name}
                  className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto rounded shadow hover:scale-105 transition-transform"
                />
              )}

              <div className="flex-1 flex flex-col justify-between gap-4">
                <div>
                  {selectedAlbum.album.genres && selectedAlbum.album.genres.length > 0 && (
                    <p className="mb-2">
                      {selectedAlbum.album.genres.map((genre) => (
                        <span
                          key={genre}
                          className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2 mb-1 inline-block text-xs"
                        >
                          {genre}
                        </span>
                      ))}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm p-2 bg-gray-50 rounded">
                  <p>
                    <strong>Release Date:</strong> {selectedAlbum.album.releaseDate}
                  </p>
                  <p>
                    <strong>Total Tracks:</strong> {selectedAlbum.album.totalTracks}
                  </p>
                  <p>
                    <strong>Album Type:</strong> {selectedAlbum.album.albumType}
                  </p>
                  <p>
                    <strong>Average Track Duration:</strong>{' '}
                    {formatDuration(selectedAlbum.metrics.averageTrackDuration)}
                  </p>
                  <p>
                    <strong>Average Track Popularity:</strong>{' '}
                    {selectedAlbum.metrics.averagePopularity.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <table className="min-w-full border border-gray-300 divide-y divide-gray-200 text-sm rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Track</th>
                    <th className="px-4 py-2 font-semibold text-gray-700">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAlbum.tracks.map((track, idx) => (
                    <tr
                      key={track.id}
                      className={`${
                        idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      } hover:bg-gray-200 transition-colors`}
                    >
                      <td className="px-4 py-2">{track.name}</td>
                      <td className="px-4 py-2 text-center">{formatDuration(track.durationMs)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
