import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2, X, Loader2, Store } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCafeterias } from '@/hooks/use-cafeterias';
import { useQueryClient } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/components/ui/Skeletons';
import { toast } from 'sonner';

interface CafeteriaForm {
  name: string;
  slug: string;
  description: string;
  price_range: string;
  delivery_time: string;
  is_open: boolean;
}

const emptyForm: CafeteriaForm = { name: '', slug: '', description: '', price_range: '₦', delivery_time: '20-35 min', is_open: true };

const ManageCafeterias = () => {
  const navigate = useNavigate();
  const { data: cafeterias = [], isLoading } = useCafeterias(true);
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CafeteriaForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const openAdd = () => { setForm(emptyForm); setEditingId(null); setShowForm(true); };
  const openEdit = (caf: any) => {
    setForm({ name: caf.name, slug: caf.slug || '', description: caf.description || '', price_range: caf.price_range || '₦', delivery_time: caf.delivery_time || '20-35 min', is_open: caf.is_open ?? true });
    setEditingId(caf.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('Name is required'); return; }
    setSaving(true);
    const slug = form.slug.trim() || form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const payload = { name: form.name.trim(), slug, description: form.description.trim() || null, price_range: form.price_range, delivery_time: form.delivery_time, is_open: form.is_open };

    if (editingId) {
      const { error } = await supabase.from('cafeterias').update(payload).eq('id', editingId);
      if (error) { toast.error(error.message); } else { toast.success('Cafeteria updated'); }
    } else {
      const { error } = await supabase.from('cafeterias').insert(payload);
      if (error) { toast.error(error.message); } else { toast.success('Cafeteria added'); }
    }
    setSaving(false);
    setShowForm(false);
    queryClient.invalidateQueries({ queryKey: ['cafeterias'] });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this cafeteria? This will also delete all its menu items.')) return;
    setDeleting(id);
    const { error } = await supabase.from('cafeterias').delete().eq('id', id);
    if (error) toast.error(error.message); else toast.success('Cafeteria deleted');
    setDeleting(null);
    queryClient.invalidateQueries({ queryKey: ['cafeterias'] });
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
              <h1 className="font-display text-2xl font-bold">Cafeterias</h1>
              <button onClick={openAdd} className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-bg text-primary-foreground text-sm font-semibold btn-glow">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            {/* Form Modal */}
            <AnimatePresence>
              {showForm && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                  <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-card p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-display text-lg font-bold">{editingId ? 'Edit' : 'Add'} Cafeteria</h2>
                      <button onClick={() => setShowForm(false)} className="p-1 rounded-lg hover:bg-muted/50"><X className="w-5 h-5" /></button>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: 'Name', key: 'name', placeholder: 'e.g. Omega Cafeteria' },
                        { label: 'Slug', key: 'slug', placeholder: 'auto-generated if empty' },
                        { label: 'Description', key: 'description', placeholder: 'Short description' },
                        { label: 'Price Range', key: 'price_range', placeholder: '₦ - ₦₦₦' },
                        { label: 'Delivery Time', key: 'delivery_time', placeholder: '20-35 min' },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="block text-sm font-medium mb-1">{f.label}</label>
                          <input
                            value={(form as any)[f.key]}
                            onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                            className="w-full px-3 py-2.5 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                            placeholder={f.placeholder}
                          />
                        </div>
                      ))}
                      <div className="flex items-center gap-2">
                        <input type="checkbox" checked={form.is_open} onChange={e => setForm(p => ({ ...p, is_open: e.target.checked }))} className="rounded" />
                        <label className="text-sm">Currently Open</label>
                      </div>
                    </div>
                    <button onClick={handleSave} disabled={saving} className="w-full mt-4 py-3 rounded-xl gradient-bg text-primary-foreground font-semibold btn-glow disabled:opacity-60 flex items-center justify-center gap-2">
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                      {editingId ? 'Update' : 'Create'} Cafeteria
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* List */}
            <div className="space-y-3">
              {isLoading ? (
                <div className="text-center py-12 text-muted-foreground">Loading...</div>
              ) : cafeterias.length === 0 ? (
                <div className="text-center py-12">
                  <Store className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No cafeterias yet</p>
                </div>
              ) : cafeterias.map((caf, i) => (
                <motion.div key={caf.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Store className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold truncate">{caf.name}</div>
                      <div className="text-xs text-muted-foreground">{caf.is_open ? '🟢 Open' : '🔴 Closed'} · {caf.price_range}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => openEdit(caf)} className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(caf.id)} disabled={deleting === caf.id} className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                      {deleting === caf.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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

export default ManageCafeterias;
