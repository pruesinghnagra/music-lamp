import { useMemo, useState } from 'react';
import useArtists from '../hooks/useArtists';
import ArtistCard from '../components/ArtistCard';
import { motion } from 'framer-motion';

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredAndSortedArtists.map((artist, index) => (
          <div
            key={artist.artistName}
            className="border rounded-2xl shadow-md p-4 bg-white hover:shadow-lg"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <ArtistCard key={artist.artistName} artist={artist} />
            </motion.div>
          </div>
        ))}
      </div>
    </>
  );
}
