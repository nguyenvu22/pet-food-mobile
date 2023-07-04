import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: { products: {} },
  reducers: {
    todo: (state, action) => {},
  },
});

export const todo = userSlice.actions.todo;

export default productSlice.reducer;