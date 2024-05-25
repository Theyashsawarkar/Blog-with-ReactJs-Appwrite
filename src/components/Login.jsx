import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from ".";
import authService from "../appwrite/auth.js";
import coloredLogo from "../assets/coloredLogo.png";
import { login as authLogin } from "../store/authSlice";
import { addMyPosts } from "../store/postsSlice.js";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState("Sign in");
  const [upLoading, setUpLoading] = useState(false);

  const login = async (data) => {
    setUpLoading(true);
    setClicked("Signing In...");
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          dispatch(addMyPosts(userData.$id));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-black rounded-xl p-10 border-gray-100`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <img src={coloredLogo} alt="coloredLogo" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-100 leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-gray-100">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className=" text-gray-100 font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className=" bg-black mt-8">
          <div className=" bg-black space-y-5">
            <Input
              label="Email : "
              placeholder="Enter your email"
              type="email"
              className="login-input bg-black text-white"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password : "
              type="password"
              placeholder="Enter your password"
              className="login-input bg-black text-white"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              className={`w-full text-black hover:text-gray-100 font-serif font-bold  py-2 rounded-md ${
                clicked === "All feilds are required"
                  ? " bg-red-800"
                  : "bg-[#f97316]"
              } `}
              shouldPreventDefault={false}
              clickHandler={() => {
                setClicked("All feilds are required");
                if (!upLoading) {
                  let timeOut = setTimeout(() => {
                    setClicked("Sign in");
                    clearTimeout(timeOut);
                  }, 3000);
                }
              }}
              type="submit"
              name={clicked}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
