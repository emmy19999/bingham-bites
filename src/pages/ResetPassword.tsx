import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Loader2, UtensilsCrossed, CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ThankYouScreen from '@/components/animations/ThankYouScreen';

const passwordChecks = (password: string) => [
  { label: 'At least 8 characters', met: password.length >= 8 },
  { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
  { label: 'Number', met: /[0-9]/.test(password) },
  { label: 'Special character', met: /[^A-Za-z0-9]/.test(password) },
];

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const checks = passwordChecks(password);
  const allMet = checks.every(c => c.met);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allMet) return;
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setShowSuccess(true);
    }
  };

  return (
    <div className="min-h-screen animated-gradient-bg flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
              <UtensilsCrossed className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold">Set New Password</h1>
            <p className="text-sm text-muted-foreground mt-1">Choose a strong password for your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                  placeholder="Strong password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {password.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 space-y-1">
                  {checks.map(c => (
                    <div key={c.label} className="flex items-center gap-1.5">
                      {c.met ? <CheckCircle2 className="w-3 h-3 text-success" /> : <XCircle className="w-3 h-3 text-muted-foreground" />}
                      <span className={`text-xs ${c.met ? 'text-success' : 'text-muted-foreground'}`}>{c.label}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !allMet}
              className="w-full py-3.5 rounded-xl gradient-bg text-primary-foreground font-semibold btn-glow hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Update Password'}
            </button>
          </form>
        </div>
      </motion.div>

      <ThankYouScreen
        show={showSuccess}
        onDismiss={() => navigate('/home')}
        title="Password Updated! 🔐"
        message="Your password has been successfully changed. You're all set."
        variant="reset"
      />
    </div>
  );
};

export default ResetPassword;
