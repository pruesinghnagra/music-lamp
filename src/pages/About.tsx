import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import useArtists from '../hooks/useArtists';

export default function About() {
  const { artists, loading, error } = useArtists();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!artists.length) return <p>No artists found</p>;

  const data = artists.map((artist) => ({
    name: artist.artistName,
    spotify: artist.platforms.spotify.monthlyListeners,
    youtube: artist.platforms.youtube.averageViews,
  }));

  return (
    <BarChart width={1200} height={500} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="spotify" fill="#1DB954" />
      <Bar dataKey="youtube" fill="#FF0000" />
    </BarChart>
  );
}
