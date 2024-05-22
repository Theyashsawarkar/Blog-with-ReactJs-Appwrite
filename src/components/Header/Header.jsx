import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { LogoutBtn } from "..";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-black fixed right-1 text-white">
      <nav className="flex ">
        <ul className="flex gap-2 mt-3 ml-auto mr-10">
          {navItems.map((item) =>
            item.active ? (
              <NavLink
                key={item.name}
                to={item.slug}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "text-[#f97316] font-serif font-bold text-xl duration-200 "
                      : ""
                  } inline-bock mx-2 duration-200 hover:underline hover:text-xl border-white hover:text-[#f97316] `
                }
              >
                {item.name}
              </NavLink>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
