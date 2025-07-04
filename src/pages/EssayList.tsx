import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Essay {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  createdAt: string;
}

export default function EssayList() {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/essays`)
      .then((res) => res.json())
      .then((data) => setEssays(data))
      .catch((err) => console.error('Failed to fetch essays:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mini Essays</h1>

      {loading && <p>Loading...</p>}
      {!loading && essays.length === 0 && <p>No essays found.</p>}

      {essays.map((essay) => (
        <div key={essay.id} className="mb-6 border-b border-gray-300 pb-4">
          <p className="text-sm text-gray-500">{new Date(essay.createdAt).toLocaleDateString()}</p>
          <Link to={`/essays/${essay.slug}`}>
            <h2 className="text-xl font-semibold hover:underline">{essay.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}
