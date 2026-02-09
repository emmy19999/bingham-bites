import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DbCafeteria {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  image_url: string | null;
  rating: number | null;
  delivery_time: string | null;
  price_range: string | null;
  is_open: boolean | null;
  is_active: boolean | null;
  parent_id: string | null;
  sort_order: number | null;
}

export interface DbMenuItem {
  id: string;
  cafeteria_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean | null;
  is_sold_out: boolean | null;
  preparation_time: number | null;
  sort_order: number | null;
}

export interface DbHostel {
  id: string;
  name: string;
  delivery_fee: number;
  extra_delivery_time: number;
  is_active: boolean | null;
}

export const useCafeterias = () => {
  return useQuery({
    queryKey: ['cafeterias'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cafeterias')
        .select('*')
        .eq('is_active', true)
        .is('parent_id', null)
        .order('sort_order');
      if (error) throw error;
      return data as DbCafeteria[];
    },
  });
};

export const useSubCafeterias = (parentId: string | undefined) => {
  return useQuery({
    queryKey: ['sub-cafeterias', parentId],
    queryFn: async () => {
      if (!parentId) return [];
      const { data, error } = await supabase
        .from('cafeterias')
        .select('*')
        .eq('parent_id', parentId)
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      return data as DbCafeteria[];
    },
    enabled: !!parentId,
  });
};

export const useCafeteria = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['cafeteria', slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from('cafeterias')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      if (error) throw error;
      return data as DbCafeteria | null;
    },
    enabled: !!slug,
  });
};

export const useMenuItems = (cafeteriaId: string | undefined) => {
  return useQuery({
    queryKey: ['menu-items', cafeteriaId],
    queryFn: async () => {
      if (!cafeteriaId) return [];
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('cafeteria_id', cafeteriaId)
        .eq('is_available', true)
        .order('sort_order');
      if (error) throw error;
      return data as DbMenuItem[];
    },
    enabled: !!cafeteriaId,
  });
};

export const useHostels = () => {
  return useQuery({
    queryKey: ['hostels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hostels')
        .select('*')
        .eq('is_active', true)
        .order('name');
      if (error) throw error;
      return data as DbHostel[];
    },
  });
};
