import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UtensilsCrossed } from 'lucide-react';

const floatingFoods = ['🍛', '🍗', '🍚', '🥘', '🍝', '🥤', '🥩', '🍰', '🍜'];

const WelcomeAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 600);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(22 95% 53% / 0.9), hsl(280 60% 45% / 0.8), hsl(200 80% 50% / 0.9))',
          }}
        >
          {/* Floating food icons */}
          {floatingFoods.map((food, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl sm:text-4xl"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              animate={{
                y: -100,
                opacity: [0, 0.7, 0.7, 0],
                rotate: Math.random() * 360 + 180,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: i * 0.25,
                ease: 'easeOut',
              }}
            >
              {food}
            </motion.div>
          ))}

          {/* Wave effect */}
          <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-full"
              style={{
                background: 'radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.15) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.1, 1], y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Logo & Text */}
          <div className="relative z-10 text-center px-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 12, delay: 0.3 }}
              className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/30"
            >
              <UtensilsCrossed className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight"
            >
              BHU-Quick-Food
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-white/80 text-lg sm:text-xl font-medium"
            >
              Food made easy for Bingham students
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-8"
            >
              <div className="flex items-center justify-center gap-1.5">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-white/60"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeAnimation;
