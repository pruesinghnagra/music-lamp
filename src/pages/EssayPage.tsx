import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EssayDetail from '../components/EssayDetail';
import type { EssayDetail as EssayDetailType } from '../types/Essay';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export default function EssayPage() {
  const { slug } = useParams();
  const [essay, setEssay] = useState<EssayDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE}/api/essays/${slug}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data: EssayDetailType = await res.json();
        setEssay(data);
      } catch (e: any) {
        if (e.name !== 'AbortError') setError(e.message ?? 'Failed to fetch');
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [slug]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!essay) return <p>Not found</p>;

  return <EssayDetail essay={essay} />;
}
