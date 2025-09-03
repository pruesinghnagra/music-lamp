import { motion } from 'framer-motion';

import EssayList from '../components/EssayList';
import CursorTrail from '../components/CursorTrail';

export default function Home() {
  return (
    <>
      <CursorTrail />
      <section className="mt-8 px-4 max-w-7xl mx-auto relative overflow-hidden bg-lime-200">
        <p className="text-6xl tracking-wider">
          Music Lamp is a place for exploring the music scene of Tamaki Makaurau ~ Auckland. From
          reviewing albums, spotlighting artists and covering local venues, this is an online zine
          documenting community and music.
        </p>
      </section>
      <section className="mt-8 px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <EssayList />
        </motion.div>
      </section>
    </>
  );
}
