import { Link, NavLink } from 'react-router-dom';

function navClass({ isActive }: { isActive: boolean }) {
  return `transition-colors duration-200 hover:text-black ${
    isActive ? 'text-black font-semibold' : 'text-gray-500'
  }`;
}

export default function Header() {
  return (
    <header className="bg-white border-b border-black px-8 py-6 flex items-center justify-between">
      <Link to="/">
        <h1 className="text-2xl leading-none font-extrabold tracking-tight">Music Lamp</h1>
      </Link>
      <nav className="flex gap-8 text-sm uppercase tracking-wider">
        {/* <NavLink to="/artists" className={navClass}>
          Artists
        </NavLink>
        <NavLink to="/about" className={navClass}>
          About
        </NavLink>
        <NavLink to="/platforms" className={navClass}>
          Platforms
        </NavLink>
        <NavLink to="/tracks" className={navClass}>
          Tracks
        </NavLink> */}
        <NavLink to="/writings" className={navClass}>
          Writings
        </NavLink>
      </nav>
    </header>
  );
}
