import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Dot {
  id: number;
  x: number;
  y: number;
}

export default function CursorTrail() {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const newDot = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setDots((prev) => [...prev, newDot]);

      // Remove dot after 500ms
      setTimeout(() => {
        setDots((prev) => prev.filter((dot) => dot.id !== newDot.id));
      }, 500);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <>
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="pointer-events-none fixed w-10 h-10 rounded-full bg-pink-300 z-50"
          initial={{ opacity: 0.1, scale: 3 }}
          animate={{ opacity: 0, scale: 4 }}
          transition={{ duration: 5, ease: 'easeOut' }}
          style={{ left: dot.x, top: dot.y, transform: 'translate(-50%, -50%)' }}
        />
      ))}
    </>
  );
}
