import { useMemo, useState } from 'react';
import useArtists from '../hooks/useArtists';
import ArtistCard from '../components/ArtistCard';
import { Artist } from '../types/Artist';

export default function Home() {
  const { artists, loading, error } = useArtists();
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  const filteredAndSortedArtists = useMemo(() => {
    if (loading || error || !artists) return [];

    let result = [...artists];

    if (regionFilter !== 'all') {
      result = result.filter((artist) => artist.region === regionFilter);
    }

    if (sortBy === 'value') {
      result.sort((a, b) => {
        const aValue = a.platforms.spotify.monthlyListeners + a.platforms.youtube.averageViews;
        const bValue = b.platforms.spotify.monthlyListeners + b.platforms.youtube.averageViews;
        return bValue - aValue; // decending order
      });
    }

    return result;
  }, [artists, regionFilter, sortBy]);

  return (
    <>
      <p>Current Region Filter: {regionFilter}</p>
      <div className="flex gap-4 mb-6 items-center">
        <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
          <option value="all">All Regions</option>
          <option value="Auckland">Auckland</option>
          <option value="Wellington">Wellington</option>
          <option value="Christchurch">Christchurch</option>
          <option value="Dunedin">Dunedin</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="value">Sort by Value</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredAndSortedArtists.map((artist) => (
          <ArtistCard key={artist.artistName} artist={artist} />
        ))}
      </div>
    </>
  );
}
