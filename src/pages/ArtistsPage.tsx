import { useMemo, useState } from 'react';
import useArtists from '../hooks/useArtists';
import ArtistCard from '../components/ArtistCard';
import CursorTrail from '../components/CursorTrail';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const { artists, loading, error } = useArtists();
  const [regionFilter, setRegionFilter] = useState<string>('All Regions');
  const [sortBy, setSortBy] = useState<string>('Default');

  const [openDropdown, setOpenDropdown] = useState<'region' | 'sort' | null>(null);

  const filteredAndSortedArtists = useMemo(() => {
    if (loading || error || !artists) return [];

    let result = [...artists];

    if (regionFilter !== 'All Regions') {
      result = result.filter((artist) => artist.region === regionFilter);
    }

    if (sortBy === 'Sort by Value') {
      result.sort((a, b) => {
        const aValue = a.platforms.spotify.monthlyListeners + a.platforms.youtube.averageViews;
        const bValue = b.platforms.spotify.monthlyListeners + b.platforms.youtube.averageViews;
        return bValue - aValue;
      });
    }

    return result;
  }, [artists, regionFilter, sortBy]);

  const dropdownVariants = {
    initial: { opacity: 0, y: -5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 },
  };

  const Dropdown = ({
    label,
    options,
    selected,
    onChange,
    type,
  }: {
    label: string;
    options: string[];
    selected: string;
    onChange: (value: string) => void;
    type: 'region' | 'sort';
  }) => (
    <motion.div className="relative inline-block text-left">
      <button
        onClick={() => setOpenDropdown(openDropdown === type ? null : type)}
        className="px-4 py-2 min-w-[160px] rounded-md border bg-white text-gray-700 hover:ring-2 hover:border-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition flex justify-between items-center"
      >
        {selected}
        <span className="ml-4">▼</span>
      </button>

      <AnimatePresence>
        {openDropdown === type && (
          <motion.ul
            {...dropdownVariants}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg"
          >
            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpenDropdown(null);
                }}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  opt === selected ? 'font-medium text-black' : 'text-gray-600'
                }`}
              >
                {opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <>
      <CursorTrail />
      <div className="flex gap-4 mb-6 items-center">
        <Dropdown
          label="Region"
          options={['All Regions', 'Auckland', 'Wellington', 'Christchurch', 'Dunedin']}
          selected={regionFilter}
          onChange={setRegionFilter}
          type="region"
        />
        <Dropdown
          label="Sort"
          options={['Default', 'Sort by Value']}
          selected={sortBy}
          onChange={setSortBy}
          type="sort"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedArtists.map((artist, index) => (
          <div key={artist.artistName} className="border-t border-black py-6 group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <ArtistCard artist={artist} />
            </motion.div>
          </div>
        ))}
      </div>
    </>
  );
}
