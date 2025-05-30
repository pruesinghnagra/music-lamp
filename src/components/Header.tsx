import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-100 shadow-md" style={{ backgroundColor: 'var(--purple-pizzazz)' }}>
      <Link
        to="/"
        className="hover:underline font-bold"
        style={{ fontSize: '12rem', color: 'var(--tea-green)', lineHeight: '1' }}
      >
        <h1>Music Lamp</h1>
      </Link>
      <nav className="flex gap-6 items-center justify-between mx-auto">
        <ul className="flex gap-4 text-6xl">
          <li>
            <Link to="/artists" className="hover:underline">
              Artists
            </Link>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'text-blue-500 font-bold' : 'text-gray-600')}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/test"
              className={({ isActive }) => (isActive ? 'text-blue-500 font-bold' : 'text-gray-600')}
            >
              test
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
