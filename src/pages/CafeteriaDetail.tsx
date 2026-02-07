import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Clock, MapPin, ShoppingCart } from 'lucide-react';
import { cafeterias } from '@/data/cafeterias';
import MenuItemCard from '@/components/menu/MenuItemCard';
import { SkeletonMenu, PageTransition } from '@/components/ui/Skeletons';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';

const CafeteriaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const cafeteria = cafeterias.find(c => c.id === id);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { totalItems, subtotal } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!cafeteria) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl mb-4 block">😕</span>
          <h2 className="font-display text-xl font-semibold mb-2">Cafeteria not found</h2>
          <Link to="/home" className="text-primary hover:underline">Go back</Link>
        </div>
      </div>
    );
  }

  const categories = ['All', ...new Set(cafeteria.menu.map(m => m.category))];
  const filteredMenu = selectedCategory === 'All'
    ? cafeteria.menu
    : cafeteria.menu.filter(m => m.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageTransition>
        <main className="flex-1">
          {/* Hero */}
          <div className="relative h-48 sm:h-56 bg-gradient-to-br from-primary/10 to-accent flex items-center justify-center">
            <span className="text-7xl sm:text-8xl">{cafeteria.emoji}</span>
            <Link
              to="/home"
              className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
              cafeteria.isOpen
                ? 'bg-success/90 text-success-foreground'
                : 'bg-destructive/90 text-destructive-foreground'
            }`}>
              {cafeteria.isOpen ? 'Open Now' : 'Closed'}
            </div>
          </div>

          {/* Info */}
          <div className="container mx-auto px-4 -mt-6 relative z-10">
            <div className="glass-card p-6">
              <h1 className="font-display text-2xl sm:text-3xl font-bold">{cafeteria.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{cafeteria.description}</p>
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <span className="font-semibold">{cafeteria.rating}</span>
                  <span className="text-xs text-muted-foreground">({cafeteria.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{cafeteria.deliveryTime}</span>
                </div>
                <div className="text-sm text-muted-foreground">{cafeteria.priceRange}</div>
              </div>
              <div className="text-xs text-muted-foreground mt-2">🕐 {cafeteria.openHours}</div>
            </div>
          </div>

          {/* Menu */}
          <div className="container mx-auto px-4 py-6">
            {/* Category filter */}
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'gradient-bg text-primary-foreground shadow-button'
                      : 'bg-card/60 text-muted-foreground hover:bg-card border border-border/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu items */}
            <div className="space-y-3 mt-4">
              {loading ? (
                <SkeletonMenu count={4} />
              ) : (
                filteredMenu.map(item => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    cafeteriaId={cafeteria.id}
                    cafeteriaName={cafeteria.name}
                  />
                ))
              )}
            </div>
          </div>

          {/* Floating Cart Bar */}
          {totalItems > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="fixed bottom-0 inset-x-0 z-50 p-4 bg-gradient-to-t from-background via-background to-transparent"
            >
              <Link
                to="/cart"
                className="flex items-center justify-between w-full max-w-lg mx-auto px-6 py-4 rounded-2xl gradient-bg text-primary-foreground font-semibold btn-glow hover:opacity-90 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4" />
                  </div>
                  <span>{totalItems} item{totalItems > 1 ? 's' : ''}</span>
                </div>
                <span className="font-display font-bold">₦{subtotal.toLocaleString()}</span>
              </Link>
            </motion.div>
          )}
        </main>
        <div className={totalItems > 0 ? 'pb-24' : ''}>
          <Footer />
        </div>
      </PageTransition>
    </div>
  );
};

export default CafeteriaDetail;
