/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import authService from "./appwrite/auth.js";
import appwriteService from "./appwrite/config.js";
import { Footer, Header } from "./components/index.js";
import { login, logout } from "./store/authSlice.js";
import { addPosts } from "./store/postsSlice.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // get the current user if loged in
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => console.log("app.jsx :: useEffect ::", error));

    // load all the posts
    appwriteService
      .getPosts()
      .then((postsList) => postsList.documents)
      .then((posts) => dispatch(addPosts({ posts })))
      .catch((error) =>
        console.log("error while featching all the posts :: App ", error)
      )
      .finally(() => setLoading(false));
    [];
  });

  return !loading ? (
    <div className="m-0 min-h-screen flex flex-wrap content-between bg-black">
      <div className="w-full h-auto overflow-auto mx-auto block">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  ) : (
    <div className="w-[80vw] mx-auto h-[90vh] flex justify-center items-center">
      <HashLoader
        color={"white"}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default App;
