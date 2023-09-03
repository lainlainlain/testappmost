import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.product.id === id);

      if (existingItem) {
        // Если продукт уже есть в корзине, увеличиваем его количество
        existingItem.quantity += 1;
      } else {
        // Если продукта нет в корзине, добавляем его с начальным количеством 1
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const idToRemove = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.product.id === idToRemove);

      if (existingItemIndex !== -1) {
        // Если найден объект с заданным id
        const existingItem = state.items[existingItemIndex];

        if (existingItem.quantity > 1) {
          // Если у объекта больше 1 единицы, уменьшаем количество на 1
          existingItem.quantity -= 1;
        } else {
          // Если у объекта 1 единица, удаляем его из корзины
          state.items.splice(existingItemIndex, 1);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
