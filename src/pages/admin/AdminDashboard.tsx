import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Store, MapPin, Package, Users, ChevronRight, Plus, ArrowLeft, BarChart3 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/components/ui/Skeletons';
import { useCafeterias, useHostels } from '@/hooks/use-cafeterias';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const AdminDashboard = () => {
  const { profile, hasRole } = useAuth();
  const navigate = useNavigate();
  const { data: cafeterias = [] } = useCafeterias();
  const { data: hostels = [] } = useHostels();

  const { data: orderStats } = useQuery({
    queryKey: ['admin-order-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('id, status, total, created_at');
      if (error) throw error;
      const totalRevenue = (data || []).reduce((s, o) => s + Number(o.total), 0);
      const pending = (data || []).filter(o => o.status === 'pending' || o.status === 'confirmed').length;
      return { total: data?.length || 0, revenue: totalRevenue, pending };
    },
    enabled: hasRole('super_admin'),
  });

  const isSuperAdmin = hasRole('super_admin');

  const adminSections = [
    ...(isSuperAdmin ? [
      { icon: Store, label: 'Manage Cafeterias', desc: 'Add, edit, delete cafeterias', to: '/admin/cafeterias' },
      { icon: MapPin, label: 'Manage Hostels', desc: 'Delivery fees & times', to: '/admin/hostels' },
      { icon: Users, label: 'Manage Users & Roles', desc: 'Assign admin roles', to: '/admin/users' },
    ] : []),
    { icon: Package, label: 'Manage Orders', desc: 'View & update order status', to: '/admin/orders' },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <PageTransition>
        <main className="flex-1 animated-gradient-bg">
          <div className="container mx-auto px-4 py-6 max-w-3xl">
            <button onClick={() => navigate('/profile')} className="flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Profile
            </button>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <h1 className="font-display text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">{isSuperAdmin ? 'Super Admin' : 'Cafeteria Admin'} Panel</p>
            </motion.div>

            {/* Stats */}
            {isSuperAdmin && orderStats && (
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: 'Total Orders', value: orderStats.total, color: 'text-primary' },
                  { label: 'Revenue', value: `₦${orderStats.revenue.toLocaleString()}`, color: 'text-success' },
                  { label: 'Pending', value: orderStats.pending, color: 'text-warning' },
                ].map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-4 text-center">
                    <div className={`font-display text-xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-[10px] text-muted-foreground mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Quick counts */}
            {isSuperAdmin && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="glass-card p-4 text-center">
                  <div className="font-display text-xl font-bold text-primary">{cafeterias.length}</div>
                  <div className="text-xs text-muted-foreground">Cafeterias</div>
                </div>
                <div className="glass-card p-4 text-center">
                  <div className="font-display text-xl font-bold text-primary">{hostels.length}</div>
                  <div className="text-xs text-muted-foreground">Hostels</div>
                </div>
              </div>
            )}

            {/* Sections */}
            <div className="glass-card overflow-hidden">
              {adminSections.map((section) => (
                <button
                  key={section.label}
                  onClick={() => navigate(section.to)}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors border-b border-border/30 last:border-b-0 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{section.label}</div>
                      <div className="text-xs text-muted-foreground">{section.desc}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};

export default AdminDashboard;
