import React from 'react';
import { Artist } from '../types/Artist';

interface Props {
  artist: Artist;
}

export default function ArtistCard({ artist }: Props) {
  return (
    <div
      className="group relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
      style={{ backgroundColor: 'var(--pink)', color: 'var(--tea-green)' }}
    >
      <div className="mb-4">
        <h2 className="text-2xl font-extrabold tracking-tight group-hover:text-indigo-600 transition-colors">
          {artist.artistName}
        </h2>
        <p className="text-sm text-gray-400">{artist.region}</p>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        {artist.genre.map((g) => (
          <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{g}</span>
        ))}
        {artist.language.map((l) => (
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{l}</span>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>
          <strong>Active since:</strong> {artist.activeSince}
        </p>
        <p>
          <strong>Food Type:</strong> {artist.foodType.join(', ')}
        </p>
        <p>
          <strong>Indie?</strong> {artist.selfDescribedIndie ? 'Yes' : 'No'}
        </p>
      </div>
    </div>
  );
}
