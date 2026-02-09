import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Clock, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const location = useLocation();
  const { totalItems } = useCart();

  const links = [
    { to: '/home', label: 'Home', icon: Home },
    { to: '/cart', label: 'Cart', icon: ShoppingCart, badge: totalItems },
    { to: '/orders', label: 'Orders', icon: Clock },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  // Don't show on landing, auth, or about pages
  const hiddenPaths = ['/', '/auth', '/about'];
  if (hiddenPaths.includes(location.pathname)) return null;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-card/95 backdrop-blur-xl border-t border-border/50 pb-safe">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {links.map(({ to, label, icon: Icon, badge }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors relative ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {badge && badge > 0 && (
                  <motion.span
                    key={badge}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full gradient-bg text-primary-foreground text-[10px] flex items-center justify-center font-bold"
                  >
                    {badge}
                  </motion.span>
                )}
              </div>
              <span className="text-[10px] font-medium">{label}</span>
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-0.5 w-5 h-0.5 rounded-full gradient-bg"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
