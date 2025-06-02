import { useEffect, useState } from 'react';
import { fetchSpotifyToken } from '../api/spotify';

export default function SpotifyStatus() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    async function testConnection() {
      try {
        const token = await fetchSpotifyToken();
        if (token) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (e) {
        setStatus('error');
      }
    }

    testConnection();
  }, []);

  return (
    <div>
      <h2>Spotify API Status</h2>
      {status === 'loading' && <p>Connecting...</p>}
      {status === 'success' && <p style={{ color: 'green' }}>Connected successfully ✅</p>}
      {status === 'error' && <p style={{ color: 'red' }}>Failed to connect ❌</p>}
    </div>
  );
}
