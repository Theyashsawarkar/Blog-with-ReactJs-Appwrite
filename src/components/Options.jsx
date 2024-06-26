import { useDispatch, useSelector } from "react-redux";
import { addActivePosts } from "../store/postsSlice";
import dsaTopics from "../utils/dsaTopics";
import { Button } from "./index";

function Options() {
  const dispatch = useDispatch();
  const activeTopic = useSelector((state) => state.post.activeTopic);
  return (
    <div className=" flex flex-wrap justify-center ">
      {dsaTopics.map((topic) => (
        <Button
          clickHandler={() => {
            dispatch(addActivePosts(topic));
          }}
          key={topic}
          name={topic}
          className={` ${
            topic === activeTopic ? "bg-[#f97316]  font-semibold" : ""
          } inline-bock text-white mx-2 duration-200 mt-3 text-[1.1rem] border hover:text-black hover:bg-[white] hover:font-bold border-white rounded-md px-4`}
        />
      ))}
    </div>
  );
}

export default Options;
