import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "./mainApi.js";
import { userSlice } from "../features/account/userSlice.js";
import { cartSlice } from "../features/cart/cartSlice.js";


export const store = configureStore({
  reducer: {
    [cartSlice.name]: cartSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [mainApi.reducerPath]: mainApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    mainApi.middleware
  ])
});