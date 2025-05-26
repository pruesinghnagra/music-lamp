import React from 'react';
import { Artist } from '../types/Artist';

interface Props {
  artist: Artist;
}

export default function ArtistCard({ artist }: Props) {
  return (
    <div>
      <h2>{artist.artistName}</h2>
      <p>{artist.region}</p>
      <p>
        <strong>Genre:</strong>
        {artist.genre.join(', ')}
      </p>
      <p>
        <strong>Food Type:</strong>
        {artist.foodType.join(', ')}
      </p>
      <p>
        <strong>Language:</strong>
        {artist.language.join(', ')}
      </p>
      <p>
        <strong>Active Since:</strong>
        {artist.activeSince}
      </p>
      <p>
        <strong>Self Described Independent Artist:</strong>
        {artist.selfDescribedIndie ? 'yes' : 'no'}
      </p>
    </div>
  );
}
