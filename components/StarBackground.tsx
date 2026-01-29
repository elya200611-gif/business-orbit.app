import React, { useEffect, useState } from 'react';

const StarBackground: React.FC = () => {
  const [stars, setStars] = useState<{ id: number; left: number; top: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const starCount = 50;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#070708]">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star absolute bg-white rounded-full opacity-70"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${10 + star.delay}s`,
            animationDelay: `-${star.delay}s`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#070708] opacity-80" />
    </div>
  );
};

export default StarBackground;