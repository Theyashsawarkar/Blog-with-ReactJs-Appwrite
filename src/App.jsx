import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import { Footer, Header } from "./components";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => console.log("app.jsx :: useEffect ::", error))
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="m-0 h-screen  flex flex-wrap content-between bg-gray-400">
      <div className="w-full mx-auto block">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
