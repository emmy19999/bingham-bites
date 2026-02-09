import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface CartMenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  preparation_time: number | null;
}

export interface CartItem {
  menuItem: CartMenuItem;
  quantity: number;
  specialInstructions?: string;
  cafeteriaId: string;
  cafeteriaName: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartMenuItem, cafeteriaId: string, cafeteriaName: string) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  updateInstructions: (menuItemId: string, instructions: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  justAdded: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const addItem = useCallback((menuItem: CartMenuItem, cafeteriaId: string, cafeteriaName: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.menuItem.id === menuItem.id);
      if (existing) {
        return prev.map(i => i.menuItem.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { menuItem, quantity: 1, cafeteriaId, cafeteriaName }];
    });
    setJustAdded(menuItem.id);
    setTimeout(() => setJustAdded(null), 800);
  }, []);

  const removeItem = useCallback((menuItemId: string) => {
    setItems(prev => prev.filter(i => i.menuItem.id !== menuItemId));
  }, []);

  const updateQuantity = useCallback((menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.menuItem.id !== menuItemId));
    } else {
      setItems(prev => prev.map(i => i.menuItem.id === menuItemId ? { ...i, quantity } : i));
    }
  }, []);

  const updateInstructions = useCallback((menuItemId: string, instructions: string) => {
    setItems(prev => prev.map(i => i.menuItem.id === menuItemId ? { ...i, specialInstructions: instructions } : i));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, updateInstructions, clearCart, totalItems, subtotal, justAdded }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
