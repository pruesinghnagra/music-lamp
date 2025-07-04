import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

interface Essay {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  createdAt: string;
}

export default function EssayDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [essay, setEssay] = useState<Essay | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/essays/${slug}`)
      .then((res) => res.json())
      .then(setEssay)
      .catch((err) => console.error('Failed to fetch essay:', err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!essay) return <p className="p-4">Essay not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{essay.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{new Date(essay.createdAt).toLocaleDateString()}</p>
      <div className="prose">
        <ReactMarkdown>{essay.content}</ReactMarkdown>
      </div>
    </div>
  );
}
