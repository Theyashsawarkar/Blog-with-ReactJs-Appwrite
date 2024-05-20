import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postsSlice from "./postsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postsSlice,
  },
});

export default store;
