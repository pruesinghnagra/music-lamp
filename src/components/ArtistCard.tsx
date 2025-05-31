import React from 'react';
import { Artist } from '../types/Artist';

interface Props {
  artist: Artist;
}

export default function ArtistCard({ artist }: Props) {
  return (
    <>
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-black group-hover:text-gray-400 tracking-tight">
          {artist.artistName}
        </h2>
        <p className="text-xs text-gray-500 group-hover:text-gray-400">{artist.region}</p>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-black">
        {artist.genre.map((g) => (
          <span
            key={g}
            className="px-2 py-0.5 border border-black rounded-full group-hover:text-gray-400 group-hover:border-gray-400"
          >
            {g}
          </span>
        ))}
        {artist.language.map((l) => (
          <span
            key={l}
            className="px-2 py-0.5 border border-black rounded-full group-hover:text-gray-400 group-hover:border-gray-400"
          >
            {l}
          </span>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-700 space-y-1 group-hover:text-gray-400">
        <p>
          <strong className="font-medium text-black group-hover:text-gray-400">
            Active since:
          </strong>{' '}
          {artist.activeSince}
        </p>
        <p>
          <strong className="font-medium text-black group-hover:text-gray-400">Food Type:</strong>{' '}
          {artist.foodType.join(', ')}
        </p>
        <p>
          <strong className="font-medium text-black group-hover:text-gray-400">Indie?</strong>{' '}
          {artist.selfDescribedIndie ? 'Yes' : 'No'}
        </p>
      </div>
    </>
  );
}
