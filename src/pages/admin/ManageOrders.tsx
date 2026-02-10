import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Loader2, ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/components/ui/Skeletons';
import { toast } from 'sonner';

const ORDER_STATUSES = ['pending', 'confirmed', 'preparing', 'rider_assigned', 'on_the_way', 'delivered', 'cancelled'] as const;

const statusColors: Record<string, string> = {
  pending: 'bg-muted text-muted-foreground',
  confirmed: 'bg-primary/10 text-primary',
  preparing: 'bg-warning/10 text-warning',
  rider_assigned: 'bg-accent text-accent-foreground',
  on_the_way: 'bg-primary/10 text-primary',
  delivered: 'bg-success/10 text-success',
  cancelled: 'bg-destructive/10 text-destructive',
};

const ManageOrders = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false })
        .limit(100);
      if (error) throw error;
      return data || [];
    },
  });

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdating(orderId);
    const { error } = await supabase.from('orders').update({ status: newStatus as any }).eq('id', orderId);
    if (error) toast.error(error.message); else toast.success(`Order status → ${newStatus.replace(/_/g, ' ')}`);
    setUpdating(null);
    queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <PageTransition>
        <main className="flex-1 animated-gradient-bg">
          <div className="container mx-auto px-4 py-6 max-w-3xl">
            <button onClick={() => navigate('/admin')} className="flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Admin
            </button>
            <h1 className="font-display text-2xl font-bold mb-4">Orders</h1>

            {/* Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
              {['all', ...ORDER_STATUSES].map(s => (
                <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${filter === s ? 'gradient-bg text-primary-foreground' : 'bg-card/60 text-muted-foreground border border-border/50'}`}>
                  {s === 'all' ? 'All' : s.replace(/_/g, ' ')}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading orders...</div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No orders found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map((order, i) => (
                  <motion.div key={order.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }} className="glass-card p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm font-semibold">#{order.id.slice(0, 8)}</div>
                        <div className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleString()}</div>
                      </div>
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[order.status] || ''}`}>
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {(order.order_items || []).length} items · ₦{Number(order.total).toLocaleString()} · {order.hostel} · {order.payment_method}
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={order.status}
                        onChange={e => updateStatus(order.id, e.target.value)}
                        disabled={updating === order.id}
                        className="flex-1 px-3 py-2 rounded-xl bg-muted/50 border border-border/50 text-sm outline-none focus:border-primary"
                      >
                        {ORDER_STATUSES.map(s => (
                          <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                        ))}
                      </select>
                      {updating === order.id && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
                    </div>
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

export default ManageOrders;
