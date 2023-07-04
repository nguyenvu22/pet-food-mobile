import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: {} },
  reducers: {
    todo: (state, action) => {},
  },
});

export const todo = userSlice.actions.todo;

export default userSlice.reducer;
