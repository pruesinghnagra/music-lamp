import ReactMarkdown from 'react-markdown';
import type { EssayDetail as EssayDetailType } from '../types/Essay';

type Props = { essay: EssayDetailType };

export default function EssayDetail({ essay }: Props) {
  const slugClass = essay.title
    .toLowerCase()
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '');

  return (
    <article className={`${slugClass}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 items-start">
          {essay.coverImage && (
            <div className="w-full max-h-[400px] overflow-hidden rounded-xl">
              <img
                src={essay.coverImage}
                alt={essay.imageCredit ?? essay.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-col justify-start">
            <h1 className="text-4xl">{essay.title}</h1>
            <p className="text-sm mt-2 text-gray-600">
              {new Date(essay.updatedAt).toLocaleDateString()}
            </p>
            {essay.tags?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {essay.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs lg:text-sm uppercase tracking-wide bg-gray-100 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 overflow-y-auto p-4 lg:p-6 markdown space-y-4 leading-relaxed">
        <ReactMarkdown>{essay.content}</ReactMarkdown>
      </div>
    </article>
  );
}
