import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';

import HomePage from './pages/HomePage';
import EssaysPage from './pages/EssaysPage';
import EssayPage from './pages/EssayPage';
// import ArtistsPage from './pages/ArtistsPage';
// import TracksPage from './pages/TracksPage';
// import PlatformsPage from './pages/PlatformsPage';
// import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <Header />
      <main className="mt-8 px-4 max-w-4xl mx-auto relative overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/writings" element={<EssaysPage />} />
          <Route path="/writings/:slug" element={<EssayPage />} />
          {/* <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/tracks" element={<TracksPage />} />
          <Route path="/platforms" element={<PlatformsPage />} />
          <Route path="/about" element={<AboutPage />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
