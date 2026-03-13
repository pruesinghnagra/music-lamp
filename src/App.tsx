import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';

import HomePage from './pages/HomePage';
import EssayPage from './pages/EssayPage';
import NotFoundPage from './pages/NotFoundPage';
import BandcampPage from './pages/BandcampPage';
import SpotifyPage from './pages/SpotifyPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bandcamp/" element={<BandcampPage />} />
        <Route path="/spotify/" element={<SpotifyPage />} />
        <Route path="/writings/:slug" element={<EssayPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
