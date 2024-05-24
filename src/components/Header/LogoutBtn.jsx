import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth.js";
import { logout } from "../../store/authSlice.js";
import Button from "../Button.jsx";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };
  return (
    <Button
      clickHandler={logoutHandler}
      className="inline-bock mx-2 duration-200 hover:underline hover:text-xl border-white hover:text-[#f97316] "
      name={"Log Out"}
    />
  );
}

export default LogoutBtn;
