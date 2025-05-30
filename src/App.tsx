import { Routes, Route } from 'react-router-dom';

import About from './pages/About';
import Artists from './pages/Artists';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Header />
      <main className="mt-8 px-4 max-w-4xl mx-auto bg-mauveine">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
