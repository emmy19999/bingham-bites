import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, UtensilsCrossed } from 'lucide-react';

const VerificationSuccess = () => {
  return (
    <div className="min-h-screen animated-gradient-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, delay: 0.2 }}
            className="relative mx-auto mb-6"
          >
            <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-14 h-14 text-success" />
            </div>
            <motion.div
              className="absolute inset-0 rounded-full mx-auto w-24 h-24"
              style={{ boxShadow: '0 0 40px 15px hsla(142, 70%, 40%, 0.2)' }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold">BHU-Quick-Food</span>
            </div>
            <h1 className="font-display text-2xl font-bold mb-3">You've been authorized successfully.</h1>
            <p className="text-sm text-muted-foreground mb-8">Your email has been verified. You can now sign in and start ordering food on campus.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl gradient-bg text-primary-foreground font-semibold btn-glow hover:opacity-90 transition-all active:scale-[0.98]"
            >
              Sign In Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerificationSuccess;
