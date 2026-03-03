import { Link } from 'react-router-dom';

export function PlatformCard({ to, title, description, logoSrc }: PlatformCardProps) {
  return (
    <Link to={to} className="block group">
      <div className="flex flex-col items-center bg-white rounded-lg shadow-sm hover:shadow-md transition p-6 max-w-xs text-center">
        <div className="w-24 h-24 mb-4 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden">
          <img src={logoSrc} alt={`${title} Logo`} className="w-20 h-20 object-contain" />
        </div>
        <h3 className="text-xl font-semibold text-black dark:text-white group-hover:text-gray-400 tracking-tight">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}
