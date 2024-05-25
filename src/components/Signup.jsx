import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth.js";
import coloredLogo from "../assets/coloredLogo.png";
import { login } from "../store/authSlice.js";
import { Button, Input } from "./index.js";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [clicked, setClicked] = useState("Create Account");

  const create = async (data) => {
    setClicked("Creating Account...");
    console.log(data);
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className={`text-gray-100 bg-black mx-auto w-[80%] max-w-lg  rounded-xl `}
    >
      <div className="text-gray-100 bg-black mb-2 flex justify-center">
        <span className="text-gray-100 bg-black inline-block w-full max-w-[100px]">
          <img src={coloredLogo} alt="coloredLogo" />
        </span>
      </div>
      <h2 className="text-gray-100 bg-black text-center text-2xl font-bold leading-tight">
        Sign up to create account
      </h2>
      <p className="mt-2 text-center text-base text-gray-100 bg-black">
        Already have an account?&nbsp;
        <Link
          to="/login"
          className="font-medium text-gray-100 bg-black text-primary transition-all duration-200 hover:underline"
        >
          Sign In
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

      <form onSubmit={handleSubmit(create)}>
        <div className=" bg-black space-y-5">
          <Input
            className="login-input bg-black text-white"
            label="Full Name: "
            placeholder="Enter your full name"
            {...register("name", {
              required: true,
            })}
          />
          <Input
            className="login-input bg-black text-white"
            label="Email: "
            placeholder="Enter your email"
            type="email"
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
            label="Password: "
            className="login-input bg-black text-white"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          <Button
            type="submit"
            shouldPreventDefault={false}
            className={`w-full text-black hover:text-gray-100 font-serif font-bold  py-2 rounded-md ${
              clicked === "All feilds are required"
                ? " bg-red-800"
                : "bg-[#f97316]"
            }`}
            clickHandler={() => {
              setClicked("All feilds are required");
              let timeOut = setTimeout(() => {
                setClicked("Create Account");
                clearTimeout(timeOut);
              }, 5000);
            }}
            name={clicked}
          />
        </div>
      </form>
    </div>
  );
}

export default Signup;
