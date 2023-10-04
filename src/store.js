import { configureStore } from "@reduxjs/toolkit";
import wishlistSlice from "./features/counter/wishlistSlice";
import orderSlice from "./features/counter/orderSlice";

export const store = configureStore({
  reducer: {
    data: wishlistSlice,
    orderData: orderSlice,
  },
});
