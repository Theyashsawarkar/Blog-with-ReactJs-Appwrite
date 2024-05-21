import { useDispatch } from "react-redux";
import logo from "../assets/logo.png";
import ListPosts from "../components/ListPosts";
import Options from "../components/Options";
import { addActivePosts } from "../store/postsSlice";

function Home() {
  const dispatch = useDispatch();
  dispatch(addActivePosts("Array"));
  return (
    <div className="w-full min-h-[50vh] h-auto flex flex-col items-center">
      <img src={logo} alt="logo" width={500} className=" mt-[-5rem] " />
      <span className="text-white text-3xl mt-[-5rem]">
        Your Roadmap to DSA Mastery
      </span>
      <h1 className="text-center text-white text-[4rem] mt-1 mb-1 font-serif w-full font-bold">
        {"It's"} <span className="text-[#f97316]">Simpler </span> than You Think
      </h1>
      <Options />
      <div className="w-[93%] mx-auto h-1 mt-3 bg-[#f97316]"></div>
      <ListPosts />
    </div>
  );
}

export default Home;
