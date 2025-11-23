import { createSlice } from "@reduxjs/toolkit";
import { getCartFromLocal, removeCartFromLocal, setCartToLocal } from "../local/local.js";



export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    cart: getCartFromLocal()
  },

  reducers: {
    setCart: (state, action) => {
      const isExist = state.cart.find((item) => item.id === action.payload.id);
      if (isExist) {
        state.cart = state.cart.map((item) => item.id === action.payload.id ? action.payload : item);
        setCartToLocal(state.cart)
      } else {
        state.cart.push(action.payload);
        setCartToLocal(state.cart);
      }
    },

    removeCartItem : (state, action) => {
      state.cart.splice(action.payload, 1);
      setCartToLocal(state.cart);
    },

    clearCart : (state) => {
      state.cart = []
      removeCartFromLocal();
    }


  }
});


export const {setCart, removeCartItem, clearCart} = cartSlice.actions;