import React from 'react';
import { Star, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { DbCafeteria } from '@/hooks/use-cafeterias';

interface CafeteriaCardProps {
  cafeteria: DbCafeteria;
  index: number;
}

const CafeteriaCard = ({ cafeteria, index }: CafeteriaCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/cafeteria/${cafeteria.slug}`} className="block group">
        <div className="glass-card overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
          <div className="relative h-40 bg-gradient-to-br from-primary/10 to-accent flex items-center justify-center overflow-hidden">
            <span className="text-6xl group-hover:scale-110 transition-transform duration-300">🍽️</span>
            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
              cafeteria.is_open
                ? 'bg-success/90 text-success-foreground'
                : 'bg-destructive/90 text-destructive-foreground'
            }`}>
              {cafeteria.is_open ? 'Open' : 'Closed'}
            </div>
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm text-xs font-medium">
              {cafeteria.price_range}
            </div>
          </div>

          <div className="p-4 space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
                {cafeteria.name}
              </h3>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {cafeteria.description}
            </p>

            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="text-sm font-semibold">{cafeteria.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-xs">{cafeteria.delivery_time}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CafeteriaCard;
