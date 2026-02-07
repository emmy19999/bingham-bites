import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonCardProps {
  count?: number;
}

export const SkeletonCard = ({ count = 1 }: SkeletonCardProps) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="glass-card p-4 space-y-3">
        <div className="w-full h-40 rounded-xl skeleton-shimmer" />
        <div className="h-5 w-3/4 rounded-lg skeleton-shimmer" />
        <div className="h-4 w-1/2 rounded-lg skeleton-shimmer" />
        <div className="flex justify-between items-center">
          <div className="h-4 w-1/4 rounded-lg skeleton-shimmer" />
          <div className="h-8 w-20 rounded-lg skeleton-shimmer" />
        </div>
      </div>
    ))}
  </>
);

export const SkeletonMenu = ({ count = 3 }: SkeletonCardProps) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="glass-card p-4 flex gap-4">
        <div className="w-24 h-24 rounded-xl skeleton-shimmer flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 rounded-lg skeleton-shimmer" />
          <div className="h-4 w-full rounded-lg skeleton-shimmer" />
          <div className="h-4 w-1/3 rounded-lg skeleton-shimmer" />
        </div>
      </div>
    ))}
  </>
);

export const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);
