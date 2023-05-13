import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
}

type CartState = {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

/**
 * The reducer function for the products slice.
 */
export const cartReducer = cartSlice.reducer;
