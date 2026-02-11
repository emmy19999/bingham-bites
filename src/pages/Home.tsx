import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useCafeterias } from '@/hooks/use-cafeterias';
import CafeteriaCard from '@/components/home/CafeteriaCard';
import { SkeletonCard, PageTransition } from '@/components/ui/Skeletons';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementBanner from '@/components/announcements/AnnouncementBanner';
import { useAuth } from '@/contexts/AuthContext';

const foodCategories = [
  { id: 'all', name: 'All', emoji: '🍽️' },
  { id: 'rice', name: 'Rice', emoji: '🍚' },
  { id: 'swallow', name: 'Swallow', emoji: '🥘' },
  { id: 'pasta', name: 'Pasta', emoji: '🍝' },
  { id: 'grills', name: 'Grills', emoji: '🥩' },
  { id: 'snacks', name: 'Snacks', emoji: '🥧' },
  { id: 'drinks', name: 'Drinks', emoji: '🥤' },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data: cafeterias = [], isLoading: loading } = useCafeterias();
  const { profile } = useAuth();

  const filteredCafeterias = cafeterias.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <PageTransition>
        <main className="flex-1 animated-gradient-bg">
          <section className="pt-6 pb-4">
            <div className="container mx-auto px-4">
              <AnnouncementBanner />
              {profile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4"
                >
                  <h1 className="font-display text-2xl sm:text-3xl font-bold">
                    Hey, {profile.full_name.split(' ')[0]} 👋
                  </h1>
                  <p className="text-muted-foreground text-sm mt-1">What are you craving today?</p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search cafeterias..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm shadow-card"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide"
              >
                {foodCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'gradient-bg text-primary-foreground shadow-button'
                        : 'bg-card/60 text-muted-foreground hover:bg-card border border-border/50'
                    }`}
                  >
                    <span>{cat.emoji}</span>
                    {cat.name}
                  </button>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="pb-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-lg">All Cafeterias</h2>
                <span className="text-sm text-muted-foreground">{filteredCafeterias.length} available</span>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <SkeletonCard count={6} />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCafeterias.map((caf, i) => (
                    <CafeteriaCard key={caf.id} cafeteria={caf} index={i} />
                  ))}
                </div>
              )}

              {!loading && filteredCafeterias.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                  <span className="text-5xl mb-4 block">🔍</span>
                  <h3 className="font-display font-semibold text-xl mb-2">No results found</h3>
                  <p className="text-muted-foreground text-sm">Try a different search</p>
                </motion.div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};

export default Home;
