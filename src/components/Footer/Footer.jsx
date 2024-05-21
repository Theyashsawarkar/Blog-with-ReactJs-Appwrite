import { NavLink } from "react-router-dom";

// TODO: replace this # with actual links of pages

function Footer() {
  return (
    <footer className="bottom-10 left-10 text-gray-100 flex mt-4 justify-around px-12 w-[92%] mx-auto py-2 rounded-md  bg-[#e8713c]">
      <div>
        © 2024
        <NavLink to={"/"} className={"ml-1 mr-1 hover:underline"}>
          DsaSimplified™.
        </NavLink>
        All rights reserved
      </div>
      <div className="flex flex-wrap min-w-[20%] justify-between">
        <NavLink to={"#"} className={"ml-1 mr-1 hover:underline"}>
          Privacy Policy
        </NavLink>
        <NavLink to={"#"} className={"ml-1 mr-1 hover:underline"}>
          Terms of Services
        </NavLink>
        <NavLink to={"#"} className={"ml-1 mr-1 hover:underline"}>
          contact
        </NavLink>
      </div>
    </footer>
  );
}

export default Footer;
