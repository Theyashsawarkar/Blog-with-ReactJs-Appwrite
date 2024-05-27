import { useSelector } from "react-redux";
import empty_meme from "../assets/empty_meme.png";
import { PostCard } from "../components";

function MyPosts() {
  const myPosts = useSelector((state) => state.post.myPosts);
  return (
    <div className="flex justify-center items-center mt-[5rem] md:my-[10%] min-h-[50vh] gap-5 flex-wrap mx-auto w-[80%] ">
      {myPosts.length === 0 ? (
        <img
          className="w-[20%] ml-[5%] my-[8%] rounded-2xl"
          src={empty_meme}
          alt="empty_meme"
        />
      ) : (
        myPosts.map((post) => <PostCard key={post.$id} {...post} />)
      )}
    </div>
  );
}

export default MyPosts;
