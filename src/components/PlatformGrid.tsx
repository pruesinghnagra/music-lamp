import { PlatformCard } from './PlatformCard';

export default function PlatformsGrid() {
  const platforms = [
    {
      to: '/bandcamp',
      title: 'Bandcamp',
      description: 'View metrics for Bandcamp artists and albums in one place.',
      logoSrc: '/BandCamp-Logo.png',
    },
    {
      to: '/spotify',
      title: 'Spotify',
      description: 'Analyze your Spotify playlists and artist stats.',
      logoSrc: '/Spotify-Logo.png',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <h2 className="text-2xl mb-4 font-bold uppercase tracking-wider dark:text-white">
        Platforms
      </h2>
      <div className="flex flex-wrap gap-6 border-t border-black dark:border-white py-6">
        {platforms.map((platform) => (
          <PlatformCard key={platform.to} {...platform} />
        ))}
      </div>
    </div>
  );
}
