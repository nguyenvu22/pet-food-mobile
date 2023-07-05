import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./user/user";
import productReducers from "./product/product";

export const store = configureStore({
  reducer: {
    userReducers: userReducers,
    productReducers: productReducers,
  },
});
