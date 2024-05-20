import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  activePosts: [],
};

const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPosts: (state, action) => {
      state.posts = action.payload;
    },
    addActivePosts: (state, action) => {
      const topic = action.payload;
      //NOTE: this needs post to have topic attribute in appwrite
      state.activePosts = state.posts.filter((post) => post.$topic === topic);
    },
  },
});

export const { addActivePosts, addPosts } = postsSlice.actions;

export default postsSlice.reducer;
