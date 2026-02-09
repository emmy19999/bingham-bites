import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ChefHat, Bike, MapPin, Package, Phone, Clock } from 'lucide-react';
import { useOrders, type OrderStatus } from '@/contexts/OrderContext';
import Header from '@/components/layout/Header';
import { PageTransition } from '@/components/ui/Skeletons';

const statusSteps: { status: OrderStatus; label: string; icon: React.ElementType; description: string }[] = [
  { status: 'confirmed', label: 'Order Confirmed', icon: Check, description: 'Your order has been received' },
  { status: 'preparing', label: 'Preparing', icon: ChefHat, description: 'The kitchen is cooking your food' },
  { status: 'rider_assigned', label: 'Rider Assigned', icon: Bike, description: 'A rider has been assigned' },
  { status: 'on_the_way', label: 'On The Way', icon: MapPin, description: 'Your food is on the way!' },
  { status: 'delivered', label: 'Delivered', icon: Package, description: 'Enjoy your meal! 🎉' },
];

const OrderTracking = () => {
  const { id } = useParams<{ id: string }>();
  const { currentOrder, orders } = useOrders();
  const order = currentOrder?.id === id ? currentOrder : orders.find(o => o.id === id);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!order || order.status === 'delivered') return;
    const interval = setInterval(() => setElapsed(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [order]);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col pb-16 md:pb-0">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <span className="text-5xl mb-4 block">📦</span>
            <h2 className="font-display text-xl font-semibold mb-2">Order not found</h2>
            <Link to="/home" className="text-primary hover:underline">Go home</Link>
          </div>
        </div>
      </div>
    );
  }

  const currentStepIndex = statusSteps.findIndex(s => s.status === order.status);
  const progressPercent = ((currentStepIndex + 1) / statusSteps.length) * 100;
  const remainingTime = Math.max(0, order.estimatedDelivery - Math.floor(elapsed / 60));

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <PageTransition>
        <main className="flex-1 animated-gradient-bg">
          <div className="container mx-auto px-4 py-6 max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Link to="/home" className="w-10 h-10 rounded-xl bg-card/80 flex items-center justify-center hover:bg-card transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="font-display text-xl font-bold">Order Tracking</h1>
                <p className="text-sm text-muted-foreground">{order.id.slice(0, 12)}...</p>
              </div>
            </div>

            {/* Live Status */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display font-semibold text-lg">{statusSteps[currentStepIndex]?.label}</h2>
                  <p className="text-sm text-muted-foreground">{statusSteps[currentStepIndex]?.description}</p>
                </div>
                {order.status !== 'delivered' && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">{remainingTime} min</span>
                  </div>
                )}
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <motion.div className="h-full rounded-full gradient-bg" initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 0.8 }} />
              </div>
            </motion.div>

            {/* Timeline */}
            <div className="glass-card p-6 mb-4">
              <h3 className="font-display font-semibold mb-6">Order Progress</h3>
              <div className="space-y-0">
                {statusSteps.map((step, i) => {
                  const isComplete = i <= currentStepIndex;
                  const isCurrent = i === currentStepIndex;
                  return (
                    <div key={step.status} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.15 }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isComplete ? 'gradient-bg' : 'bg-muted'} ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}
                        >
                          <step.icon className={`w-5 h-5 ${isComplete ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                        </motion.div>
                        {i < statusSteps.length - 1 && <div className={`w-0.5 h-12 ${isComplete ? 'bg-primary/40' : 'bg-muted'}`} />}
                      </div>
                      <div className={`pb-8 ${i === statusSteps.length - 1 ? 'pb-0' : ''}`}>
                        <h4 className={`font-semibold text-sm ${isComplete ? '' : 'text-muted-foreground'}`}>{step.label}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                        {isCurrent && order.status !== 'delivered' && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
                            <span className="text-xs text-primary font-medium">In progress...</span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rider Info */}
            {(order.status === 'rider_assigned' || order.status === 'on_the_way') && order.riderName && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-4">
                <h3 className="font-display font-semibold mb-4">Your Rider</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-lg">🏍️</div>
                    <div>
                      <div className="font-semibold text-sm">{order.riderName}</div>
                      <div className="text-xs text-muted-foreground">{order.riderPhone}</div>
                    </div>
                  </div>
                  <a href={`tel:${order.riderPhone}`} className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center btn-glow">
                    <Phone className="w-4 h-4 text-primary-foreground" />
                  </a>
                </div>
              </motion.div>
            )}

            {order.status === 'delivered' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="font-display text-2xl font-bold mb-2">Delivered!</h2>
                <p className="text-muted-foreground mb-6">Your order has been delivered. Enjoy your meal!</p>
                <Link to="/home" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-primary-foreground font-semibold btn-glow">Order Again</Link>
              </motion.div>
            )}

            {/* Order Details */}
            <div className="glass-card p-6 mt-4">
              <h3 className="font-display font-semibold mb-3">Order Details</h3>
              {order.items.map(item => (
                <div key={item.menuItem.id} className="flex justify-between text-sm py-1.5">
                  <span className="text-muted-foreground">{item.quantity}× {item.menuItem.name}</span>
                  <span>₦{(item.menuItem.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-border/50 mt-3 pt-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery to</span>
                  <span className="font-medium">{order.hostel}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment</span>
                  <span className="font-medium capitalize">{order.paymentMethod.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border/50 mt-2">
                  <span className="font-display font-semibold">Total</span>
                  <span className="font-display font-bold text-primary">₦{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
};

export default OrderTracking;
