import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import type { CartItem } from './CartContext';

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'rider_assigned' | 'on_the_way' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  hostel: string;
  paymentMethod: string;
  createdAt: Date;
  estimatedDelivery: number;
  riderName?: string;
  riderPhone?: string;
  cafeteriaId: string;
}

interface OrderContextType {
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (items: CartItem[], subtotal: number, deliveryFee: number, hostel: string, paymentMethod: string) => Promise<Order | null>;
  fetchOrders: () => Promise<void>;
  isLoading: boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const riderNames = ['Adamu M.', 'Chinedu O.', 'Ibrahim K.', 'Grace A.', 'Emeka N.'];

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mapped: Order[] = (data || []).map(o => ({
        id: o.id,
        items: (o.order_items || []).map((oi: any) => ({
          menuItem: {
            id: oi.menu_item_id,
            name: oi.item_name,
            description: null,
            price: Number(oi.item_price),
            image_url: null,
            preparation_time: null,
          },
          quantity: oi.quantity,
          specialInstructions: oi.special_instructions,
          cafeteriaId: o.cafeteria_id,
          cafeteriaName: '',
        })),
        subtotal: Number(o.subtotal),
        deliveryFee: Number(o.delivery_fee),
        total: Number(o.total),
        status: o.status as OrderStatus,
        hostel: o.hostel,
        paymentMethod: o.payment_method,
        createdAt: new Date(o.created_at),
        estimatedDelivery: o.estimated_delivery || 30,
        riderName: o.rider_name || undefined,
        riderPhone: o.rider_phone || undefined,
        cafeteriaId: o.cafeteria_id,
      }));

      setOrders(mapped);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user, fetchOrders]);

  // Subscribe to realtime order updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('orders-realtime')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders', filter: `user_id=eq.${user.id}` },
        (payload) => {
          const updated = payload.new as any;
          setOrders(prev => prev.map(o =>
            o.id === updated.id ? { ...o, status: updated.status as OrderStatus, riderName: updated.rider_name, riderPhone: updated.rider_phone } : o
          ));
          setCurrentOrder(prev =>
            prev?.id === updated.id ? { ...prev, status: updated.status as OrderStatus, riderName: updated.rider_name, riderPhone: updated.rider_phone } : prev
          );
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const placeOrder = useCallback(async (items: CartItem[], subtotal: number, deliveryFee: number, hostel: string, paymentMethod: string): Promise<Order | null> => {
    if (!user || items.length === 0) return null;

    const cafeteriaId = items[0].cafeteriaId;
    const riderName = riderNames[Math.floor(Math.random() * riderNames.length)];
    const riderPhone = '080' + Math.floor(Math.random() * 90000000 + 10000000);
    const estimatedDelivery = 25 + Math.floor(Math.random() * 15);

    try {
      // Insert order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          cafeteria_id: cafeteriaId,
          status: 'confirmed' as const,
          payment_method: paymentMethod as 'card' | 'transfer' | 'cash',
          subtotal,
          delivery_fee: deliveryFee,
          total: subtotal + deliveryFee,
          hostel,
          rider_name: riderName,
          rider_phone: riderPhone,
          estimated_delivery: estimatedDelivery,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Insert order items
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        menu_item_id: item.menuItem.id,
        item_name: item.menuItem.name,
        item_price: item.menuItem.price,
        quantity: item.quantity,
        special_instructions: item.specialInstructions || null,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      const order: Order = {
        id: orderData.id,
        items,
        subtotal,
        deliveryFee,
        total: subtotal + deliveryFee,
        status: 'confirmed',
        hostel,
        paymentMethod,
        createdAt: new Date(orderData.created_at),
        estimatedDelivery,
        riderName,
        riderPhone,
        cafeteriaId,
      };

      setOrders(prev => [order, ...prev]);
      setCurrentOrder(order);

      return order;
    } catch (err) {
      console.error('Failed to place order:', err);
      return null;
    }
  }, [user]);

  return (
    <OrderContext.Provider value={{ orders, currentOrder, placeOrder, fetchOrders, isLoading }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within OrderProvider');
  return ctx;
};
