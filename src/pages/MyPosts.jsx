import { useSelector } from "react-redux";
import empty_meme from "../assets/empty_meme.png";
import { PostCard } from "../components";

function MyPosts() {
  const currentUser = useSelector((state) => state.auth.userData);

  const allPosts = useSelector((state) => state.post.allPosts);
  const myPosts = allPosts.filter((post) => post.userId === currentUser?.$id);
  // console.log("posts : ", myPosts);
  // console.log("user :: ", currentUser);
  return myPosts.length === 0 ? (
    <div className="my-5 justify-center flex items-center">
      <img
        className="w-[20%] my-[8%] rounded-2xl"
        src={empty_meme}
        alt="emtpy_meme"
      />
    </div>
  ) : (
    <div className=" my-10 min-h-[80vh] flex flex-wrap justify-center mt-20 items-center ">
      {myPosts.map((post) => (
        <div key={post.$id} className="p-2 w-1/4">
          <PostCard {...post} />
        </div>
      ))}
    </div>
  );
}

export default MyPosts;
