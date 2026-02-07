import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { CartItem } from './CartContext';

export type OrderStatus = 'confirmed' | 'preparing' | 'rider_assigned' | 'on_the_way' | 'delivered';

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
  estimatedDelivery: number; // minutes
  riderName?: string;
  riderPhone?: string;
}

interface OrderContextType {
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (items: CartItem[], subtotal: number, deliveryFee: number, hostel: string, paymentMethod: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const riderNames = ['Adamu M.', 'Chinedu O.', 'Ibrahim K.', 'Grace A.', 'Emeka N.'];

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const placeOrder = useCallback((items: CartItem[], subtotal: number, deliveryFee: number, hostel: string, paymentMethod: string): Order => {
    const order: Order = {
      id: 'ORD-' + Date.now().toString(36).toUpperCase(),
      items,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      status: 'confirmed',
      hostel,
      paymentMethod,
      createdAt: new Date(),
      estimatedDelivery: 25 + Math.floor(Math.random() * 15),
      riderName: riderNames[Math.floor(Math.random() * riderNames.length)],
      riderPhone: '080' + Math.floor(Math.random() * 90000000 + 10000000),
    };
    setOrders(prev => [order, ...prev]);
    setCurrentOrder(order);

    // Simulate order progression
    const statuses: OrderStatus[] = ['preparing', 'rider_assigned', 'on_the_way', 'delivered'];
    statuses.forEach((status, i) => {
      setTimeout(() => {
        setCurrentOrder(prev => prev?.id === order.id ? { ...prev, status } : prev);
        setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status } : o));
      }, (i + 1) * 8000 + Math.random() * 4000);
    });

    return order;
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    setCurrentOrder(prev => prev?.id === orderId ? { ...prev, status } : prev);
  }, []);

  return (
    <OrderContext.Provider value={{ orders, currentOrder, placeOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within OrderProvider');
  return ctx;
};
