import logo from "../assets/logo.png";
import ListPosts from "../components/ListPosts";
import Options from "../components/Options";

function Home() {
  return (
    <div className="w-full min-h-[50vh] flex flex-col items-center">
      <img src={logo} alt="logo" width={500} className=" mt-[-5rem] " />
      <span className="text-white text-3xl mt-[-5rem]">
        Roadmap to DSA Mastery
      </span>
      <h1 className="text-center text-white text-[4rem] mt-1 mb-10 font-serif w-full font-bold">
        {"It's"} <span className="text-[#f97316]">Simpler </span> than You Think
      </h1>
      <Options />
      <ListPosts />
    </div>
  );
}

export default Home;
