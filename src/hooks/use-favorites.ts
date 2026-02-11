import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useFavorites = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const toggleFavoriteCafeteria = useMutation({
    mutationFn: async (cafeteriaId: string) => {
      if (!user) throw new Error('Not authenticated');
      const existing = favorites.find(f => f.cafeteria_id === cafeteriaId);
      if (existing) {
        await supabase.from('favorites').delete().eq('id', existing.id);
      } else {
        await supabase.from('favorites').insert({ user_id: user.id, cafeteria_id: cafeteriaId });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
    onError: () => toast.error('Failed to update favorite'),
  });

  const toggleFavoriteMenuItem = useMutation({
    mutationFn: async (menuItemId: string) => {
      if (!user) throw new Error('Not authenticated');
      const existing = favorites.find(f => f.menu_item_id === menuItemId);
      if (existing) {
        await supabase.from('favorites').delete().eq('id', existing.id);
      } else {
        await supabase.from('favorites').insert({ user_id: user.id, menu_item_id: menuItemId });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
    onError: () => toast.error('Failed to update favorite'),
  });

  const isCafeteriaFavorite = (cafeteriaId: string) =>
    favorites.some(f => f.cafeteria_id === cafeteriaId);

  const isMenuItemFavorite = (menuItemId: string) =>
    favorites.some(f => f.menu_item_id === menuItemId);

  return {
    favorites,
    toggleFavoriteCafeteria,
    toggleFavoriteMenuItem,
    isCafeteriaFavorite,
    isMenuItemFavorite,
  };
};
