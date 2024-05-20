import { useDispatch } from "react-redux";
import { addActivePosts } from "../store/postsSlice";
import dsaTopics from "../utils/dsaTopics";
import { Button } from "./index";

function Options() {
  const dispatch = useDispatch();
  return (
    <div className=" flex flex-wrap ">
      {dsaTopics.map((topic) => (
        <Button
          clickHandler={dispatch(addActivePosts(topic))}
          key={topic}
          name={topic}
          bgColor="black"
          textColor="white"
          className="inline-bock mx-2 duration-200 text-white border-[1px] hover:text-black hover:bg-white border-white rounded-md px-4"
        />
      ))}
    </div>
  );
}

export default Options;
