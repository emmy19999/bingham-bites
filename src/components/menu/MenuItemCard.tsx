import React from 'react';
import { Plus, Minus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DbMenuItem } from '@/hooks/use-cafeterias';
import { useCart, type CartMenuItem } from '@/contexts/CartContext';

interface MenuItemCardProps {
  item: DbMenuItem;
  cafeteriaId: string;
  cafeteriaName: string;
}

const MenuItemCard = ({ item, cafeteriaId, cafeteriaName }: MenuItemCardProps) => {
  const { items, addItem, updateQuantity, justAdded } = useCart();
  const cartItem = items.find(i => i.menuItem.id === item.id);
  const quantity = cartItem?.quantity || 0;
  const isJustAdded = justAdded === item.id;
  const isSoldOut = item.is_sold_out;

  const cartMenuItem: CartMenuItem = {
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price),
    image_url: item.image_url,
    preparation_time: item.preparation_time,
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-4 flex gap-4 group hover:shadow-card-hover transition-all duration-300 ${isSoldOut ? 'opacity-60' : ''}`}
    >
      {/* Placeholder Image */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary/10 to-accent flex items-center justify-center">
        <span className="text-3xl">🍽️</span>
        {isSoldOut && (
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
            <span className="text-xs font-bold text-background bg-destructive px-2 py-0.5 rounded">SOLD OUT</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h4 className="font-semibold text-sm sm:text-base truncate">{item.name}</h4>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-0.5">{item.description}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-display font-bold text-primary">
            ₦{Number(item.price).toLocaleString()}
          </span>

          {!isSoldOut && (
            <div className="flex items-center gap-2">
              <AnimatePresence mode="wait">
                {quantity === 0 ? (
                  <motion.button
                    key="add"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addItem(cartMenuItem, cafeteriaId, cafeteriaName)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl gradient-bg text-primary-foreground text-sm font-medium btn-glow transition-all hover:opacity-90"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </motion.button>
                ) : (
                  <motion.div
                    key="controls"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex items-center gap-2 bg-muted/60 rounded-xl px-1"
                  >
                    <button
                      onClick={() => updateQuantity(item.id, quantity - 1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-card transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <motion.span
                      key={quantity}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      className="w-6 text-center text-sm font-bold"
                    >
                      {quantity}
                    </motion.span>
                    <button
                      onClick={() => addItem(cartMenuItem, cafeteriaId, cafeteriaName)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-card transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isJustAdded && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="w-6 h-6 rounded-full bg-success flex items-center justify-center"
                  >
                    <Check className="w-3.5 h-3.5 text-success-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItemCard;
