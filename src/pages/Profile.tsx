import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, LogOut, MapPin, Clock, ChevronRight, Package, Settings, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/components/ui/Skeletons';

const Profile = () => {
  const { profile, isAuthenticated, logout, hasRole } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col pb-16 md:pb-0">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center px-4">
            <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mx-auto mb-5">
              <User className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-2">Sign in to continue</h2>
            <p className="text-muted-foreground mb-6">Access your profile and order history</p>
            <Link to="/auth" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-primary-foreground font-semibold btn-glow">
              Sign In
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <PageTransition>
        <main className="flex-1 animated-gradient-bg">
          <div className="container mx-auto px-4 py-6 max-w-2xl">
            {/* Profile Card */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-2xl font-bold text-primary-foreground">
                  {profile?.full_name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-xl font-bold">{profile?.full_name}</h2>
                  <p className="text-sm text-muted-foreground">{profile?.email}</p>
                  {profile?.student_id && (
                    <p className="text-xs text-muted-foreground mt-0.5">{profile.student_id}</p>
                  )}
                  {hasRole('super_admin') && (
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-semibold">
                      <ShieldCheck className="w-3 h-3" /> Super Admin
                    </span>
                  )}
                  {hasRole('cafeteria_admin') && (
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-md bg-warning/10 text-warning text-[10px] font-semibold">
                      Cafeteria Admin
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4 text-center">
                <div className="font-display text-2xl font-bold text-primary">{orders.length}</div>
                <div className="text-xs text-muted-foreground mt-1">Total Orders</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-4 text-center">
                <div className="font-display text-2xl font-bold text-primary">
                  ₦{orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Total Spent</div>
              </motion.div>
            </div>

            {/* Menu Items */}
            <div className="glass-card overflow-hidden mb-4">
              {[
                { icon: Clock, label: 'Order History', to: '/orders' },
                { icon: MapPin, label: 'About BHU-Quick-Food', to: '/about' },
                ...(hasRole('super_admin') || hasRole('cafeteria_admin')
                  ? [{ icon: Settings, label: 'Admin Dashboard', to: '/admin' }]
                  : []),
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors border-b border-border/30 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              ))}
            </div>

            {/* Recent Orders */}
            {orders.length > 0 && (
              <div className="glass-card p-6 mb-4">
                <h3 className="font-display font-semibold mb-4">Recent Orders</h3>
                <div className="space-y-3">
                  {orders.slice(0, 5).map(order => (
                    <Link
                      key={order.id}
                      to={`/tracking/${order.id}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Package className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{order.id.slice(0, 12)}...</div>
                          <div className="text-xs text-muted-foreground">
                            {order.items.length} item{order.items.length > 1 ? 's' : ''} · ₦{order.total.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-md text-xs font-medium ${
                        order.status === 'delivered'
                          ? 'bg-success/10 text-success'
                          : 'bg-warning/10 text-warning'
                      }`}>
                        {order.status.replace(/_/g, ' ')}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/5 transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};

export default Profile;
