import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import useArtists from '../hooks/useArtists';
import ArtistCard from '../components/ArtistCard';
import { motion } from 'framer-motion';

export default function About() {
  const { artists, loading, error } = useArtists();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!artists.length) return <p>No artists found</p>;

  const topArtists = [...artists]
    .sort(
      (a, b) =>
        b.platforms.spotify.monthlyListeners +
        b.platforms.youtube.averageViews -
        (a.platforms.spotify.monthlyListeners + a.platforms.youtube.averageViews)
    )
    .slice(0, 5);

  const data = topArtists.map((artist) => ({
    name: artist.artistName,
    spotify: artist.platforms.spotify.monthlyListeners,
    youtube: artist.platforms.youtube.averageViews,
    region: artist.region,
  }));

  const container = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className="overflow-x-auto whitespace-nowrap p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        <motion.div
          variants={container}
          initial="initial"
          animate="animate"
          className="inline-flex gap-6"
        >
          {topArtists.map((artist) => (
            <motion.div
              key={artist.artistName}
              variants={item}
              className="w-64 shrink-0 border-b border-black pb-6 group"
            >
              <ArtistCard artist={artist} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="container mt-8">
        <BarChart width={865} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="spotify" fill="#1DB954" />
          <Bar dataKey="youtube" fill="#FF0000" />
        </BarChart>
      </div>
    </>
  );
}
