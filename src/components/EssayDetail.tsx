import ReactMarkdown from 'react-markdown';
import type { EssayDetail as EssayDetailType } from '../types/Essay';

type Props = { essay: EssayDetailType };

export default function EssayDetail({ essay }: Props) {
  const slugClass = essay.title
    .toLowerCase()
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '');

  return (
    <article className={`flex flex-col lg:flex-row min-h-screen ${slugClass}`}>
      <aside className="w-full lg:w-1/2 relative lg:sticky lg:top-0 h-64 lg:h-screen flex items-center justify-center">
        {essay.coverImage && (
          <img
            src={essay.coverImage}
            alt={essay.imageCredit ?? essay.title}
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex flex-col justify-start p-4 lg:p-6">
          <h1 className="text-4xl lg:text-8xl font-bold text-white">{essay.title}</h1>
          <p className="text-sm text-gray-200 mt-1">
            {new Date(essay.updatedAt).toLocaleDateString()}
          </p>
          {essay.tags?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {essay.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs lg:text-sm uppercase tracking-wide bg-gray-100/30 text-white px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </aside>

      <div className="w-full lg:w-2/3 overflow-y-auto p-4 lg:p-6 markdown space-y-4 leading-relaxed">
        <ReactMarkdown>{essay.content}</ReactMarkdown>
      </div>
    </article>
  );
}
