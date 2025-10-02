import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  photo: string;
  createdAt: Date;
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  removeProduct: (id: string) => void;
  canAddProduct: () => boolean;
  getProductCount: () => number;
  clearError: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  addProduct: product => {
    const state = get();
    if (state.products.length >= 5) {
      set({ error: 'Maximum of 5 products allowed!' });
      return;
    }

    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    set(state => ({
      products: [...state.products, newProduct],
      error: null,
    }));
  },

  removeProduct: id => {
    set(state => ({
      products: state.products.filter(product => product.id !== id),
      error: null,
    }));
  },

  canAddProduct: () => {
    return get().products.length < 5;
  },

  getProductCount: () => {
    return get().products.length;
  },

  clearError: () => {
    set({ error: null });
  },
}));
