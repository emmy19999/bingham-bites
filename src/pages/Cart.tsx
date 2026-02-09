import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Minus, Plus, Trash2, MessageSquare, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/layout/Header';
import { PageTransition } from '@/components/ui/Skeletons';

const Cart = () => {
  const { items, updateQuantity, removeItem, updateInstructions, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col pb-16 md:pb-0">
        <Header />
        <PageTransition>
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center px-4"
            >
              <div className="w-24 h-24 rounded-3xl bg-muted/50 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Add some tasty items from our cafeterias!</p>
              <Link
                to="/home"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-primary-foreground font-semibold btn-glow"
              >
                Explore Food
              </Link>
            </motion.div>
          </div>
        </PageTransition>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <PageTransition>
        <main className="flex-1 animated-gradient-bg">
          <div className="container mx-auto px-4 py-6 max-w-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-card/80 flex items-center justify-center hover:bg-card transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="font-display text-xl font-bold">Your Cart</h1>
                  <p className="text-sm text-muted-foreground">{items.length} item{items.length > 1 ? 's' : ''}</p>
                </div>
              </div>
              <button
                onClick={clearCart}
                className="text-sm text-destructive hover:underline font-medium"
              >
                Clear All
              </button>
            </div>

            {/* Cart Items */}
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {items.map(item => (
                  <motion.div
                    key={item.menuItem.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    className="glass-card p-4"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/10 to-accent flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🍽️</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-sm truncate">{item.menuItem.name}</h3>
                            <p className="text-xs text-muted-foreground">{item.cafeteriaName}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.menuItem.id)}
                            className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <span className="font-display font-bold text-primary">
                            ₦{(item.menuItem.price * item.quantity).toLocaleString()}
                          </span>
                          <div className="flex items-center gap-2 bg-muted/60 rounded-xl px-1">
                            <button
                              onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-card transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-card transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Special instructions */}
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <MessageSquare className="w-3 h-3" />
                        Special instructions
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. No onions, extra pepper..."
                        value={item.specialInstructions || ''}
                        onChange={e => updateInstructions(item.menuItem.id, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border/30 text-xs outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="glass-card p-6 mt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery fee</span>
                <span className="text-muted-foreground text-xs">Calculated at checkout</span>
              </div>
              <div className="border-t border-border/50 pt-3 flex justify-between">
                <span className="font-display font-semibold">Estimated Total</span>
                <span className="font-display font-bold text-lg text-primary">₦{subtotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              className="flex items-center justify-center gap-2 w-full mt-6 py-4 rounded-2xl gradient-bg text-primary-foreground font-semibold text-lg btn-glow hover:opacity-90 transition-all active:scale-[0.98]"
            >
              Proceed to Checkout
            </Link>
          </div>
        </main>
      </PageTransition>
    </div>
  );
};

export default Cart;
