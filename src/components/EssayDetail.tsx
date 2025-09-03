import ReactMarkdown from 'react-markdown';
import type { EssayDetail as EssayDetailType } from '../types/Essay';

type Props = { essay: EssayDetailType };

export default function EssayDetail({ essay }: Props) {
  return (
    <article className="p-6 max-w-3xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{essay.title}</h1>
        <p className="text-sm text-gray-500">{new Date(essay.createdAt).toLocaleDateString()}</p>

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

        {essay.coverImage && (
          <figure className="mt-4">
            <img
              src={essay.coverImage}
              alt={essay.imageCredit ?? essay.title}
              className="w-full rounded"
              loading="lazy"
            />
            {essay.imageCredit && (
              <figcaption className="mt-2 text-xs text-gray-500">{essay.imageCredit}</figcaption>
            )}
          </figure>
        )}
      </header>

      <div className="markdown space-y-4 leading-relaxed">
        <ReactMarkdown>{essay.content}</ReactMarkdown>
      </div>

      {essay.images?.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Photos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {essay.images.map((img) => (
              <figure key={img.id}>
                <img src={img.url} alt={img.alt ?? ''} className="w-full rounded" loading="lazy" />
                {(img.credit || img.alt) && (
                  <figcaption className="mt-1 text-xs text-gray-500">
                    {img.alt}
                    {img.alt && img.credit ? ' — ' : ''}
                    {img.credit}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
