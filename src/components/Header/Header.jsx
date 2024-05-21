import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, LogoutBtn } from "..";

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
              <Button
                key={item.name}
                clickHandler={() => navigate(item.slug)}
                className="inline-bock mx-2 duration-200 hover:underline hover:text-xl border-white hover:text-[#f97316] "
                name={item.name}
              />
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
