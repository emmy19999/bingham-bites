import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useOrders } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/components/ui/Skeletons';
import { Package, ArrowLeft, Clock } from 'lucide-react';

const Orders = () => {
  const { orders } = useOrders();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <span className="text-5xl mb-4 block">🔒</span>
            <h2 className="font-display text-xl font-bold mb-2">Sign in to view orders</h2>
            <Link to="/auth" className="text-primary font-semibold hover:underline">Sign In</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageTransition>
        <main className="flex-1 animated-gradient-bg">
          <div className="container mx-auto px-4 py-6 max-w-2xl">
            <h1 className="font-display text-2xl font-bold mb-6">Your Orders</h1>

            {orders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mx-auto mb-5">
                  <Package className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-6">Your order history will appear here</p>
                <Link to="/home" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-primary-foreground font-semibold btn-glow">
                  Start Ordering
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {orders.map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      to={`/tracking/${order.id}`}
                      className="glass-card p-5 block hover:shadow-card-hover transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-display font-semibold">{order.id}</span>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          order.status === 'delivered'
                            ? 'bg-success/10 text-success'
                            : order.status === 'on_the_way'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {order.status.replace(/_/g, ' ')}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {order.items.map(i => `${i.quantity}× ${i.menuItem.name}`).join(', ')}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          {order.createdAt.toLocaleDateString()}
                        </div>
                        <span className="font-display font-bold text-primary">₦{order.total.toLocaleString()}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};

export default Orders;
