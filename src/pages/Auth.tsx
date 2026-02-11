import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, UtensilsCrossed, ArrowRight, Loader2, ShieldCheck, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const ALLOWED_DOMAIN = 'binghamuni.edu.ng';
const SUPER_ADMIN_EMAIL = 'bemm7754@gmail.com';

const passwordChecks = (password: string) => [
  { label: 'At least 8 characters', met: password.length >= 8 },
  { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
  { label: 'Number', met: /[0-9]/.test(password) },
  { label: 'Special character', met: /[^A-Za-z0-9]/.test(password) },
];

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', studentId: '' });
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const emailDomain = form.email.split('@')[1]?.toLowerCase() || '';
  const normalizedEmail = form.email.trim().toLowerCase();
  const isValidDomain = !form.email.includes('@') || emailDomain === ALLOWED_DOMAIN || normalizedEmail === SUPER_ADMIN_EMAIL;
  const checks = passwordChecks(form.password);
  const allChecksMet = checks.every(c => c.met);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && !isValidDomain) {
      toast.error(`Only @${ALLOWED_DOMAIN} emails are allowed.`);
      return;
    }
    if (!isLogin && !allChecksMet) {
      toast.error('Please meet all password requirements.');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const result = await login(form.email, form.password);
        if (result.success) {
          toast.success('Welcome back! 🎉');
          navigate('/home');
        } else {
          toast.error(result.error || 'Invalid credentials');
        }
      } else {
        const result = await signup(form.name, form.email, form.password, form.studentId);
        if (result.success) {
          toast.success('Account created! Check your email to verify your account. 📧');
        } else {
          toast.error(result.error || 'Signup failed');
        }
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen animated-gradient-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-primary-foreground" />
              </div>
            </Link>
            <h1 className="font-display text-2xl font-bold">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isLogin ? 'Sign in to order food on campus' : 'Join BHU-Quick-Food today'}
            </p>
          </div>

          {/* Restricted access banner */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/5 border border-primary/20 mb-6">
            <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Access restricted to verified Bingham University students only.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-medium mb-1.5">Full Name</label>
                <input
                  type="text"
                  required={!isLogin}
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                  placeholder="e.g. John Doe"
                />
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className={`w-full px-4 py-3 rounded-xl bg-muted/50 border outline-none transition-all text-sm ${
                  form.email.includes('@') && !isValidDomain
                    ? 'border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20'
                    : 'border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20'
                }`}
                placeholder={`student@${ALLOWED_DOMAIN}`}
              />
              {form.email.includes('@') && !isValidDomain && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1 text-xs text-destructive mt-1.5"
                >
                  <AlertTriangle className="w-3 h-3" />
                  Only @{ALLOWED_DOMAIN} emails are accepted
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm pr-10"
                  placeholder="Strong password"
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength indicators */}
              {!isLogin && form.password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 space-y-1"
                >
                  {checks.map(check => (
                    <div key={check.label} className="flex items-center gap-1.5">
                      {check.met ? (
                        <CheckCircle2 className="w-3 h-3 text-success" />
                      ) : (
                        <XCircle className="w-3 h-3 text-muted-foreground" />
                      )}
                      <span className={`text-xs ${check.met ? 'text-success' : 'text-muted-foreground'}`}>
                        {check.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <label className="block text-sm font-medium mb-1.5">Student ID <span className="text-muted-foreground">(Optional)</span></label>
                <input
                  type="text"
                  value={form.studentId}
                  onChange={e => setForm(p => ({ ...p, studentId: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                  placeholder="e.g. BHU/22/01234"
                />
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || (!isLogin && (!isValidDomain || !allChecksMet))}
              className="w-full py-3.5 rounded-xl gradient-bg text-primary-foreground font-semibold btn-glow hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            {isLogin && (
              <Link to="/forgot-password" className="block text-sm text-primary/80 hover:text-primary hover:underline transition-colors">
                Forgot your password?
              </Link>
            )}
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-primary font-semibold hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Security badge */}
          <div className="mt-6 pt-4 border-t border-border/30 text-center">
            <p className="text-[10px] text-muted-foreground/60 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Security-first system built by a cybersecurity student
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
