import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Shield, Loader2, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/components/ui/Skeletons';
import { toast } from 'sonner';

const ROLES = ['student', 'cafeteria_admin', 'super_admin'] as const;

const ManageUsers = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ['admin-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const { data: allRoles = [] } = useQuery({
    queryKey: ['admin-all-roles'],
    queryFn: async () => {
      const { data, error } = await supabase.from('user_roles').select('*');
      if (error) throw error;
      return data || [];
    },
  });

  const getUserRole = (userId: string) => {
    const role = allRoles.find(r => r.user_id === userId);
    return role?.role || 'student';
  };

  const updateRole = async (userId: string, newRole: string) => {
    setUpdating(userId);
    // Delete existing roles
    await supabase.from('user_roles').delete().eq('user_id', userId);
    // Insert new role
    const { error } = await supabase.from('user_roles').insert({ user_id: userId, role: newRole as any });
    if (error) toast.error(error.message); else toast.success(`Role updated to ${newRole}`);
    setUpdating(null);
    queryClient.invalidateQueries({ queryKey: ['admin-all-roles'] });
  };

  const filtered = profiles.filter(p =>
    p.full_name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <PageTransition>
        <main className="flex-1 animated-gradient-bg">
          <div className="container mx-auto px-4 py-6 max-w-3xl">
            <button onClick={() => navigate('/admin')} className="flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Admin
            </button>
            <h1 className="font-display text-2xl font-bold mb-4">Users & Roles</h1>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-card/80 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm" />
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : (
              <div className="space-y-3">
                {filtered.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }} className="glass-card p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                        {p.full_name[0]?.toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate">{p.full_name}</div>
                        <div className="text-xs text-muted-foreground truncate">{p.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <select
                        value={getUserRole(p.user_id)}
                        onChange={e => updateRole(p.user_id, e.target.value)}
                        disabled={updating === p.user_id}
                        className="px-2 py-1.5 rounded-lg bg-muted/50 border border-border/50 text-xs outline-none focus:border-primary"
                      >
                        {ROLES.map(r => <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>)}
                      </select>
                      {updating === p.user_id && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
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

export default ManageUsers;
