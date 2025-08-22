import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import type { EssayListItem } from '../types/Essay';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

export default function EssayList() {
  const [essays, setEssays] = useState<EssayListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/api/essays?status=PUBLISHED`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

        const data: EssayListItem[] = await res.json();
        setEssays(data);
      } catch (e: any) {
        if (e.name !== 'AbortError') setError(e.message ?? 'Failed to fetch');
      } finally {
        setLoading(false);
      }
    }

    load();

    // cleanup
    return () => controller.abort();
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (essays.length === 0) return <p>No writings found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Writings</h1>

      <ul className="space-y-6">
        {essays.map((essay) => (
          <li key={essay.id} className="border-b border-gray-200 pb-4">
            <p className="text-sm text-gray-500">
              {new Date(essay.updatedAt).toLocaleDateString()}
            </p>

            <Link to={`/writings/${essay.slug}`}>
              <h2 className="text-xl font-semibold hover:underline">{essay.title}</h2>
            </Link>

            {essay.tags?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {essay.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs uppercase tracking-wide bg-gray-100 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
