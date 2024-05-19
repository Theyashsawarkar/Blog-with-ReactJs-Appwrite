import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";

const Store = configureStore({
  reducer: {
    auth: AuthSlice,
    //TODO: add more slices here for posts
  },
});

export default Store;
