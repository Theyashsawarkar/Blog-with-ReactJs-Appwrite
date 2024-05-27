import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
  activePosts: [],
  myPosts: [],
  activeTopic: "Array",
};

const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPosts: (state, action) => {
      // Ensure payload is an array
      if (!Array.isArray(action.payload.posts)) {
        console.error("addPosts slice: Payload must be an array of posts");
        return; // Or throw an error if preferred
      }
      state.allPosts = action.payload.posts;
    },
    addActivePosts: (state, action) => {
      const topic = action.payload;
      state.activeTopic = topic;
      if (Array.isArray(state.allPosts)) {
        state.activePosts = state.allPosts.filter(
          (post) => post.topic === topic
        );
      } else {
        state.activePosts = [];
      }
    },
    addMyPosts: (state, action) => {
      if (Array.isArray(state.allPosts)) {
        state.myPosts = state.allPosts.filter(
          (post) => post.userId === action.payload
        );
      } else {
        state.myPosts = [];
      }
    },
    deletePost: (state, action) => {
      state.activePosts = state.activePosts.filter(post => post.$id !== action.payload)
      state.myPosts = state.myPosts.filter(post => post.$id !== action.payload)
      state.allPosts = state.allPosts.filter(post => post.$id !== action.payload)
    }
  },
});

export const { addActivePosts, deletePost, addPosts, addMyPosts } = postsSlice.actions;

export default postsSlice.reducer;
