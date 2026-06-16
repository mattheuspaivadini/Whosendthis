'use client';

import { useEffect, useState } from 'react';

type Square = {
  size: number;
  left: number;
  top: number;
  moveDelay: number;
  moveDuration: number;
  colorDelay: number;
  colorDuration: number;
};

export default function AnimatedBackground() {
  const [squares, setSquares] = useState<Square[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 65 }, () => ({
      size: Math.random() * 28 + 6,
      left: Math.random() * 120 - 10,
      top: Math.random() * 120 - 10,
      moveDelay: Math.random() * 10,
      moveDuration: Math.random() * 10 + 6,
      colorDelay: Math.random() * 5,
      colorDuration: Math.random() * 4 + 2,
    }));
    setSquares(generated);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {squares.map((s, i) => (
        <div
          key={i}
          className="absolute border border-white/50"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.left}%`,
            top: `${s.top}%`,
            animation: `move-diagonal ${s.moveDuration}s linear ${s.moveDelay}s infinite, color-swap ${s.colorDuration}s ease-in-out ${s.colorDelay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
