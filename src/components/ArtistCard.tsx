import React from 'react';
import { Artist } from '../types/Artist';

interface Props {
  artist: Artist;
}

export default function ArtistCard({ artist }: Props) {
  return (
    <div className="border rounded-2xl shadow-md p-4">
      <h2 className="text-xl font-bold mb-1">{artist.artistName}</h2>
      <p className="text-sm text-gray-600">{artist.region}</p>
      <p className="mt-2">
        <strong>Genre: </strong>
        {artist.genre.join(', ')}
      </p>
      <p>
        <strong>Food Type: </strong>
        {artist.foodType.join(', ')}
      </p>
      <p>
        <strong>Language: </strong>
        {artist.language.join(', ')}
      </p>
      <p>
        <strong>Active Since: </strong>
        {artist.activeSince}
      </p>
      <p>
        <strong>Self Described Independent Artist: </strong>
        {artist.selfDescribedIndie ? 'yes' : 'no'}
      </p>
    </div>
  );
}
