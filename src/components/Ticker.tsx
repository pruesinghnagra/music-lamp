import React, { useState, useEffect } from 'react';

const Ticker = () => {
  const logos = [
    'https://lastfm.freetls.fastly.net/i/u/1200x1200/42984b53fb992f6190a0ab76373bcbad.jpg',
  ];

  const [windowWidth, setWindowWidth] = useState(0);

  // Get window width on mount (safe for SSR)
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate repeats to fill screen
  const itemWidth = 120; // image width + margin approx
  const repeats = windowWidth ? Math.ceil(windowWidth / (logos.length * itemWidth)) : 2;
  const tickerItems = Array.from({ length: repeats }).flatMap(() => logos);

  return (
    <div className="overflow-hidden w-full bg-gray-100">
      <div className="flex animate-ticker whitespace-nowrap">
        {tickerItems.map((url, i) => (
          <img key={i} src={url} className="inline-block mx-4" alt="logo" />
        ))}
      </div>
    </div>
  );
};

export default Ticker;
