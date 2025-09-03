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
      <h1 className="text-2xl mb-4 font-bold uppercase tracking-wider">Articles</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {essays.map((essay) => (
          <Link
            key={essay.id}
            to={`/writings/${essay.slug}`}
            className="border-t border-black py-6"
          >
            <div className="mb-2">
              <h2 className="text-xl font-semibold text-black group-hover:text-gray-400 tracking-tight">
                {essay.title}
              </h2>
              <p className="text-xs text-gray-500 group-hover:text-gray-400">
                {new Date(essay.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-black">
              {essay.tags?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {essay.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 border border-black rounded-full group-hover:text-gray-400 group-hover:border-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
