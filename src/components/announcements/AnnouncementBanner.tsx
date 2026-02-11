import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';

const AnnouncementBanner = () => {
  const [dismissed, setDismissed] = useState<string[]>([]);

  const { data: announcements = [] } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  const visible = announcements.filter(a => !dismissed.includes(a.id));

  if (visible.length === 0) return null;

  return (
    <div className="space-y-2 mb-4">
      <AnimatePresence>
        {visible.map(a => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 border border-primary/20"
          >
            <Megaphone className="w-4 h-4 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{a.title}</p>
              <p className="text-xs text-muted-foreground truncate">{a.message}</p>
            </div>
            <button
              onClick={() => setDismissed(prev => [...prev, a.id])}
              className="p-1 rounded-lg hover:bg-muted/50 transition-colors flex-shrink-0"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AnnouncementBanner;
