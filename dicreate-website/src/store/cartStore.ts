import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
  category?: string;
  selectedOptions?: {
    size?: string;
    color?: string;
  };
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (id: string) => number;
}

export const useCartStore = create<CartStore>()(  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.id === item.id);
        
        if (existingItem) {
          set(state => ({
            items: state.items.map(i => 
              i.id === item.id 
                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                : i
            ),
          }));
        } else {
          set(state => ({
            items: [...state.items, { ...item, quantity: item.quantity || 1 }],
          }));
        }
        
        // 更新总计
        const newState = get();
        set({
          totalItems: newState.items.reduce((sum, item) => sum + item.quantity, 0),
          totalPrice: newState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        });
      },

      removeItem: (id) => {
        set(state => {
          const newItems = state.items.filter(item => item.id !== id);
          return {
            items: newItems,
            totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          };
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set(state => {
          const newItems = state.items.map(item => 
            item.id === id ? { ...item, quantity } : item
          );
          return {
            items: newItems,
            totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },

      getItemQuantity: (id) => {
        const item = get().items.find(i => i.id === id);
        return item?.quantity || 0;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);