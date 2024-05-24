import { useSelector } from "react-redux";
import empty_meme from "../assets/empty_meme.png";
import { PostCard } from "../components";

function MyPosts() {
  const myPosts = useSelector((state) => state.post.myPosts);
  return myPosts.length === 0 ? (
    <div className="my-5 justify-center flex items-center">
      <img
        className="w-[20%] my-[8%] rounded-2xl"
        src={empty_meme}
        alt="emtpy_meme"
      />
    </div>
  ) : (
    <div className="w-[80%] mx-auto min-h-screen pt-32 flex flex-wrap justify-center items-center ">
      {myPosts.map((post) => (
        <div key={post.$id} className="p-2 w-1/4">
          <PostCard {...post} />
        </div>
      ))}
    </div>
  );
}

export default MyPosts;
