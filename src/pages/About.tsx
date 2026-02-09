import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Users, Building, ArrowRight, CheckCircle2, UtensilsCrossed, Lock, Globe, BarChart3 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/components/ui/Skeletons';

const About = () => {
  const benefits = [
    {
      group: 'Students',
      icon: Users,
      items: ['No more waiting in long cafeteria lines', 'Real-time order tracking to your hostel', 'Multiple payment options', 'Access 9+ cafeterias from one app'],
    },
    {
      group: 'Cafeterias',
      icon: Building,
      items: ['Digital order management system', 'Increased order volume & reach', 'Real-time menu control', 'Transparent analytics'],
    },
    {
      group: 'University',
      icon: Globe,
      items: ['Modernized campus food infrastructure', 'Data-driven insights on student needs', 'Enhanced student satisfaction', 'Security-hardened system'],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageTransition>
        <main className="flex-1">
          {/* Hero */}
          <section className="py-20 animated-gradient-bg">
            <div className="container mx-auto px-4 text-center max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              >
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Security-First Campus Platform</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl font-extrabold leading-tight"
              >
                About <span className="gradient-text">BHU-Quick-Food</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground mt-6 leading-relaxed"
              >
                A centralized, secure food ordering and delivery platform built exclusively for Bingham University.
                Solving campus food delays with technology, trust, and a security-first mindset.
              </motion.p>
            </div>
          </section>

          {/* Problem & Solution */}
          <section className="py-16 bg-card">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-8"
                >
                  <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center mb-5">
                    <span className="text-2xl">😤</span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3">The Problem</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Long queues during peak hours at campus cafeterias</li>
                    <li>• No centralized menu or pricing information</li>
                    <li>• Students miss classes waiting for food</li>
                    <li>• No order tracking or delivery coordination</li>
                    <li>• Payment confusion and lack of transparency</li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-8"
                >
                  <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center mb-5">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3">The Solution</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• One app to browse all 9+ campus cafeterias</li>
                    <li>• Order from anywhere, delivered to your hostel</li>
                    <li>• Real-time tracking from kitchen to doorstep</li>
                    <li>• Transparent pricing with no hidden fees</li>
                    <li>• Secure student-only access with email verification</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-16 animated-gradient-bg">
            <div className="container mx-auto px-4 max-w-4xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl font-bold text-center mb-12"
              >
                Benefits for Everyone
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-6">
                {benefits.map((b, i) => (
                  <motion.div
                    key={b.group}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-6"
                  >
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center mb-4">
                      <b.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-3">{b.group}</h3>
                    <ul className="space-y-2">
                      {b.items.map(item => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="py-16 bg-card">
            <div className="container mx-auto px-4 max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="font-display text-3xl font-bold mb-4">Security-First Approach</h2>
                <p className="text-muted-foreground mb-8">
                  Built by a cybersecurity student with enterprise-grade security practices.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                  {[
                    'Email domain restriction',
                    'Strong password policy',
                    'Row-level security',
                    'Role-based access control',
                    'Input sanitization',
                    'Secure session handling',
                    'Audit logging',
                    'Rate limiting ready',
                  ].map(feature => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 animated-gradient-bg">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-3xl font-bold mb-4">Ready to Transform Campus Dining?</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Join the food revolution at Bingham University.
                </p>
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-bg text-primary-foreground font-semibold text-lg btn-glow hover:opacity-90 transition-all active:scale-95"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};

export default About;
