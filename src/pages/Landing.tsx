import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin, Star, Zap, UtensilsCrossed, ShieldCheck } from 'lucide-react';
import heroFood from '@/assets/hero-food.jpg';

const Landing = () => {
  return (
    <div className="min-h-screen animated-gradient-bg">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image overlay */}
        <div className="absolute inset-0">
          <img src={heroFood} alt="Delicious food" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6"
            >
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary-foreground/90">Exclusive for Bingham University</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight"
            >
              <span className="text-background">Campus Food,</span>
              <br />
              <span className="gradient-text">Delivered Fast.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-background/70 mt-6 max-w-lg leading-relaxed"
            >
              Order from 9+ campus cafeterias and get food delivered straight to your hostel. Fast, affordable, delicious.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-bg text-primary-foreground font-semibold text-lg btn-glow hover:opacity-90 transition-all active:scale-95"
              >
                Order Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/home"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-background/10 backdrop-blur-sm border border-background/20 text-background font-semibold text-lg hover:bg-background/20 transition-all"
              >
                View Menu
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-8 mt-12"
            >
              {[
                { value: '9+', label: 'Cafeterias' },
                { value: '15min', label: 'Avg. Delivery' },
                { value: '2K+', label: 'Happy Students' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-background">{stat.value}</div>
                  <div className="text-sm text-background/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating food emojis */}
        <motion.div
          className="absolute right-10 top-1/4 text-5xl floating hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.8 }}
        >
          🍛
        </motion.div>
        <motion.div
          className="absolute right-32 bottom-1/3 text-4xl floating-delayed hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.2 }}
        >
          🍗
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Why Students Love Us</h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto">Built by students, for students. The easiest way to get food on campus.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: 'Super Fast Delivery', desc: 'Average 15 minutes from order to your hostel door. No more waiting in long cafeteria lines.' },
              { icon: MapPin, title: 'Hostel-to-Door', desc: 'Select your exact hostel and we deliver right to you. All 8 hostels covered.' },
              { icon: ShieldCheck, title: 'Secure & Reliable', desc: 'Track your order in real-time. Multiple payment options. Trusted by 2000+ students.' },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card p-8 text-center group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-3">{feat.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 animated-gradient-bg">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Ready to Order?</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Join thousands of Bingham University students already enjoying fast campus delivery.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-bg text-primary-foreground font-semibold text-lg btn-glow hover:opacity-90 transition-all active:scale-95"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/[0.03] border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center">
              <UtensilsCrossed className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold">BHU-Quick-Food</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 BHU-Quick-Food</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Created for Bingham University Students Only</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
