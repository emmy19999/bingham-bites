import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, CreditCard, Building, Banknote, Check, Loader2, ChevronDown } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/contexts/OrderContext';
import { hostels } from '@/data/hostels';
import Header from '@/components/layout/Header';
import { PageTransition } from '@/components/ui/Skeletons';
import { toast } from 'sonner';

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const [selectedHostel, setSelectedHostel] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hostelOpen, setHostelOpen] = useState(false);

  const hostel = hostels.find(h => h.id === selectedHostel);
  const deliveryFee = hostel?.deliveryFee || 0;
  const total = subtotal + deliveryFee;

  const paymentMethods = [
    { id: 'card', label: 'Card Payment', icon: CreditCard, desc: 'Visa, Mastercard' },
    { id: 'transfer', label: 'Bank Transfer', icon: Building, desc: 'Instant transfer' },
    { id: 'cash', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when delivered' },
  ];

  const handlePlaceOrder = async () => {
    if (!selectedHostel) { toast.error('Please select your hostel'); return; }
    if (!paymentMethod) { toast.error('Please select a payment method'); return; }

    setProcessing(true);
    // Simulate payment processing
    await new Promise(r => setTimeout(r, 2000));
    setProcessing(false);
    setShowSuccess(true);

    const order = placeOrder(items, subtotal, deliveryFee, hostel!.name, paymentMethod);

    setTimeout(() => {
      clearCart();
      navigate(`/tracking/${order.id}`);
    }, 2500);
  };

  if (items.length === 0 && !showSuccess) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageTransition>
        <main className="flex-1 animated-gradient-bg">
          <div className="container mx-auto px-4 py-6 max-w-2xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-card/80 flex items-center justify-center hover:bg-card transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="font-display text-xl font-bold">Checkout</h1>
            </div>

            {/* Delivery Location */}
            <div className="glass-card p-6 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="font-display font-semibold">Delivery Location</h2>
              </div>

              <div className="relative">
                <button
                  onClick={() => setHostelOpen(!hostelOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all text-sm text-left ${
                    selectedHostel
                      ? 'bg-primary/5 border-primary/30'
                      : 'bg-muted/50 border-border/50'
                  }`}
                >
                  <span className={selectedHostel ? 'font-medium' : 'text-muted-foreground'}>
                    {hostel ? hostel.name : 'Select your hostel'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${hostelOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {hostelOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute top-full left-0 right-0 mt-1 bg-card border border-border/50 rounded-xl shadow-card-hover z-20 overflow-hidden"
                    >
                      {hostels.map(h => (
                        <button
                          key={h.id}
                          onClick={() => { setSelectedHostel(h.id); setHostelOpen(false); }}
                          className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-muted/50 transition-colors text-left ${
                            selectedHostel === h.id ? 'bg-primary/5 text-primary font-medium' : ''
                          }`}
                        >
                          <span>{h.name}</span>
                          <span className="text-xs text-muted-foreground">₦{h.deliveryFee} · +{h.estimatedExtraTime}min</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {hostel && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 flex items-center gap-4 text-xs text-muted-foreground"
                >
                  <span>Delivery fee: <strong className="text-foreground">₦{hostel.deliveryFee}</strong></span>
                  <span>Extra time: <strong className="text-foreground">+{hostel.estimatedExtraTime} min</strong></span>
                </motion.div>
              )}
            </div>

            {/* Payment Method */}
            <div className="glass-card p-6 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-primary" />
                <h2 className="font-display font-semibold">Payment Method</h2>
              </div>

              <div className="space-y-2">
                {paymentMethods.map(pm => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all text-left ${
                      paymentMethod === pm.id
                        ? 'bg-primary/5 border-primary/30'
                        : 'bg-muted/30 border-border/30 hover:bg-muted/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      paymentMethod === pm.id ? 'gradient-bg' : 'bg-muted'
                    }`}>
                      <pm.icon className={`w-5 h-5 ${paymentMethod === pm.id ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{pm.label}</div>
                      <div className="text-xs text-muted-foreground">{pm.desc}</div>
                    </div>
                    {paymentMethod === pm.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center"
                      >
                        <Check className="w-3.5 h-3.5 text-primary-foreground" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="glass-card p-6 mb-6 space-y-3">
              <h2 className="font-display font-semibold">Order Summary</h2>
              {items.map(item => (
                <div key={item.menuItem.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.quantity}× {item.menuItem.name}</span>
                  <span className="font-medium">₦{(item.menuItem.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-border/50 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery fee</span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border/50">
                  <span className="font-display font-semibold">Total</span>
                  <span className="font-display font-bold text-lg text-primary">₦{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Place Order */}
            <button
              onClick={handlePlaceOrder}
              disabled={processing || showSuccess}
              className="w-full py-4 rounded-2xl gradient-bg text-primary-foreground font-semibold text-lg btn-glow hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Payment...
                </>
              ) : showSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  Order Placed!
                </>
              ) : (
                `Pay ₦${total.toLocaleString()}`
              )}
            </button>
          </div>
        </main>

        {/* Success Overlay */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                className="glass-card p-8 text-center max-w-sm mx-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-10 h-10 text-primary-foreground" />
                </motion.div>
                <h2 className="font-display text-2xl font-bold mb-2">Order Confirmed! 🎉</h2>
                <p className="text-sm text-muted-foreground">Your food is being prepared. Redirecting to tracking...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </PageTransition>
    </div>
  );
};

export default Checkout;
