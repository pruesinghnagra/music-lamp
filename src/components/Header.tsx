import { Link, NavLink } from 'react-router-dom';

function navClass({ isActive }: { isActive: boolean }) {
  return `transition-colors duration-200 hover:text-black ${
    isActive ? 'text-black font-semibold' : 'text-gray-500'
  }`;
}

export default function Header() {
  return (
    <header className="border-b border-black px-8 py-6 flex items-center justify-center">
      <Link to="/">
        <h1 className="text-2xl leading-none tracking-tight">Music Lamp</h1>
      </Link>
      {/* <nav className="flex gap-8 text-sm uppercase tracking-wider">
        <NavLink to="/writings" className={navClass}>
          Writings
        </NavLink>
      </nav> */}
    </header>
  );
}
