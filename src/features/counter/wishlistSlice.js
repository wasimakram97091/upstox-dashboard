import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchList: [],
};

const wishlistSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      let data = [...state.watchList];
      if (data.includes(action.payload)) {
        data = data.filter((item) => item !== action.payload);
        state.watchList = data;
      } else {
        state.watchList.push(action.payload);
      }
    },
  },
});

export default wishlistSlice.reducer;
export const { addToWishList } = wishlistSlice.actions;
