import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white border-b border-black px-8 py-6 flex items-center justify-between">
      <Link to="/">
        <h1 className="text-2xl leading-none font-extrabold tracking-tight">Music Lamp</h1>
      </Link>
      <nav className="flex gap-8 text-sm uppercase tracking-wider">
        <NavLink
          to="/artists"
          className={({ isActive }) =>
            `transition-colors duration-200 hover:text-black ${
              isActive ? 'text-black font-semibold' : 'text-gray-500'
            }`
          }
        >
          Artists
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `transition-colors duration-200 hover:text-black ${
              isActive ? 'text-black font-semibold' : 'text-gray-500'
            }`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/test"
          className={({ isActive }) =>
            `transition-colors duration-200 hover:text-black ${
              isActive ? 'text-black font-semibold' : 'text-gray-500'
            }`
          }
        >
          test
        </NavLink>
        <NavLink
          to="/platforms"
          className={({ isActive }) =>
            `transition-colors duration-200 hover:text-black ${
              isActive ? 'text-black font-semibold' : 'text-gray-500'
            }`
          }
        >
          Platforms
        </NavLink>
        <NavLink
          to="/tracks"
          className={({ isActive }) =>
            `transition-colors duration-200 hover:text-black ${
              isActive ? 'text-black font-semibold' : 'text-gray-500'
            }`
          }
        >
          Tracks
        </NavLink>
        <NavLink
          to="/essays"
          className={({ isActive }) =>
            `transition-colors duration-200 hover:text-black ${
              isActive ? 'text-black font-semibold' : 'text-gray-500'
            }`
          }
        >
          Articles
        </NavLink>
      </nav>
    </header>
  );
}
