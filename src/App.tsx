import { Routes, Route } from 'react-router-dom';

import About from './pages/About';
import Artists from './pages/Artists';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Platforms from './pages/Platforms';
import Tracks from './pages/Tracks';
import EssayList from './pages/EssayList';
import EssayDetail from './components/EssayDetail';

function App() {
  return (
    <>
      <Header />
      <main className="mt-8 px-4 max-w-4xl mx-auto relative overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/about" element={<About />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/essays" element={<EssayList />} />
          <Route path="/essays/:slug" element={<EssayDetail />} />;
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
