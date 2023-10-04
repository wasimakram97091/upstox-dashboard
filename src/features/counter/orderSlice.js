import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderList: [],
};

const orderSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addToOrderList: (state, action) => {
      let data = [...state.orderList];
      if (data.includes(action.payload)) {
        data = data.filter((item) => item !== action.payload);
        state.orderList = data;
      } else {
        state.orderList.push(action.payload);
      }
    },
  },
});

export default orderSlice.reducer;
export const { addToOrderList } = orderSlice.actions;
