import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const floatingFoods = ['🍛', '🍗', '🍚', '🥘', '🍝', '🥤'];

interface ThankYouScreenProps {
  show: boolean;
  onDismiss: () => void;
  title?: string;
  message?: string;
  trackingId?: string;
  variant?: 'order' | 'verification' | 'reset';
}

const ThankYouScreen = ({
  show,
  onDismiss,
  title = 'Thank you 💙',
  message = 'Your order has been received and is being prepared.',
  trackingId,
  variant = 'order',
}: ThankYouScreenProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[90] flex items-center justify-center"
          onClick={onDismiss}
        >
          {/* Blurred background */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />

          {/* Floating food */}
          {floatingFoods.map((food, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl opacity-30"
              initial={{
                x: Math.random() * 300 - 150,
                y: 200,
                opacity: 0,
              }}
              animate={{
                y: -300,
                opacity: [0, 0.4, 0],
                x: Math.random() * 300 - 150,
              }}
              transition={{
                duration: 4,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              style={{
                left: `${15 + i * 14}%`,
              }}
            >
              {food}
            </motion.div>
          ))}

          {/* Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 15, delay: 0.1 }}
            className="relative z-10 max-w-sm mx-4 text-center"
            onClick={e => e.stopPropagation()}
          >
            {/* Glowing checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, delay: 0.3 }}
              className="relative mx-auto mb-6"
            >
              <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center mx-auto relative">
                <Heart className="w-12 h-12 text-primary-foreground fill-primary-foreground" />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: '0 0 60px 20px hsla(22, 95%, 53%, 0.3)' }}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-display text-3xl font-bold mb-3"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground mb-8 leading-relaxed"
            >
              {message}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col gap-3"
            >
              {variant === 'order' && trackingId && (
                <Link
                  to={`/tracking/${trackingId}`}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-2xl gradient-bg text-primary-foreground font-semibold btn-glow hover:opacity-90 transition-all active:scale-[0.98]"
                >
                  Track my order
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <Link
                to="/home"
                onClick={onDismiss}
                className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-border/50 text-foreground font-semibold hover:bg-muted/50 transition-all"
              >
                <Home className="w-4 h-4" />
                Back to home
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThankYouScreen;
