import React from 'react';
import useArtists from '../hooks/useArtists';
import ArtistCard from '../components/ArtistCard';

export default function Home() {
  const { artists, loading, error } = useArtists();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {artists.map((artist, index) => (
        <ArtistCard key={index} artist={artist} />
      ))}
    </div>
  );
}
