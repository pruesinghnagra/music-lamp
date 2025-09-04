import { motion } from 'framer-motion';

import EssayList from '../components/EssayList';
import CursorTrail from '../components/CursorTrail';

export default function Home() {
  return (
    <>
      <CursorTrail />
      <article className="w-full lg:mx-auto relative overflow-hidden bg-lime-200">
        <p className="text-3xl lg:text-6xl tracking-wider text-black p-6">
          Music Lamp is a place for exploring the music scene of Tamaki Makaurau ~ Auckland. From
          reviewing albums, spotlighting artists and covering local venues, this is an online zine
          documenting community and music.
        </p>
      </article>
      <section className="p-6 max-w-4xl dark:text-white">
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
