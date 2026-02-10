import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2, X, Loader2, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useHostels } from '@/hooks/use-cafeterias';
import { useQueryClient } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/components/ui/Skeletons';
import { toast } from 'sonner';

interface HostelForm {
  name: string;
  delivery_fee: number;
  extra_delivery_time: number;
  is_active: boolean;
}

const emptyForm: HostelForm = { name: '', delivery_fee: 200, extra_delivery_time: 5, is_active: true };

const ManageHostels = () => {
  const navigate = useNavigate();
  const { data: hostels = [], isLoading } = useHostels();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<HostelForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const openAdd = () => { setForm(emptyForm); setEditingId(null); setShowForm(true); };
  const openEdit = (h: any) => {
    setForm({ name: h.name, delivery_fee: h.delivery_fee, extra_delivery_time: h.extra_delivery_time, is_active: h.is_active ?? true });
    setEditingId(h.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('Name is required'); return; }
    setSaving(true);
    const payload = { name: form.name.trim(), delivery_fee: form.delivery_fee, extra_delivery_time: form.extra_delivery_time, is_active: form.is_active };

    if (editingId) {
      const { error } = await supabase.from('hostels').update(payload).eq('id', editingId);
      if (error) toast.error(error.message); else toast.success('Hostel updated');
    } else {
      const { error } = await supabase.from('hostels').insert(payload);
      if (error) toast.error(error.message); else toast.success('Hostel added');
    }
    setSaving(false);
    setShowForm(false);
    queryClient.invalidateQueries({ queryKey: ['hostels'] });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this hostel?')) return;
    setDeleting(id);
    const { error } = await supabase.from('hostels').delete().eq('id', id);
    if (error) toast.error(error.message); else toast.success('Hostel deleted');
    setDeleting(null);
    queryClient.invalidateQueries({ queryKey: ['hostels'] });
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
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-display text-2xl font-bold">Hostels</h1>
              <button onClick={openAdd} className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-bg text-primary-foreground text-sm font-semibold btn-glow">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            <AnimatePresence>
              {showForm && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-card p-6 w-full max-w-md">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-display text-lg font-bold">{editingId ? 'Edit' : 'Add'} Hostel</h2>
                      <button onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-muted/50"><X className="w-5 h-5" /></button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2.5 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm" placeholder="e.g. New Boys Hostel" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Delivery Fee (₦)</label>
                        <input type="number" value={form.delivery_fee} onChange={e => setForm(p => ({ ...p, delivery_fee: Number(e.target.value) }))} className="w-full px-3 py-2.5 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Extra Delivery Time (min)</label>
                        <input type="number" value={form.extra_delivery_time} onChange={e => setForm(p => ({ ...p, extra_delivery_time: Number(e.target.value) }))} className="w-full px-3 py-2.5 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm" />
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" checked={form.is_active} onChange={e => setForm(p => ({ ...p, is_active: e.target.checked }))} className="rounded" />
                        <label className="text-sm">Active</label>
                      </div>
                    </div>
                    <button onClick={handleSave} disabled={saving} className="w-full mt-4 py-3 rounded-xl gradient-bg text-primary-foreground font-semibold btn-glow disabled:opacity-60 flex items-center justify-center gap-2">
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      {editingId ? 'Update' : 'Create'} Hostel
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              {isLoading ? (
                <div className="text-center py-12 text-muted-foreground">Loading...</div>
              ) : hostels.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No hostels yet</p>
                </div>
              ) : hostels.map((h, i) => (
                <motion.div key={h.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">{h.name}</div>
                      <div className="text-xs text-muted-foreground">₦{h.delivery_fee} · +{h.extra_delivery_time} min</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => openEdit(h)} className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(h.id)} disabled={deleting === h.id} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                      {deleting === h.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};

export default ManageHostels;
