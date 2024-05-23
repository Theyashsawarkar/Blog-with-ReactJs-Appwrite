import { useSelector } from "react-redux";
import { PostCard } from "../components";

function MyPosts() {
  const currentUser = useSelector((state) => state.auth.userData);

  const allPosts = useSelector((state) => state.post.allPosts);
  const myPosts = allPosts.filter((post) => post.userId === currentUser?.$id);
  // console.log("posts : ", myPosts);
  // console.log("user :: ", currentUser);
  return myPosts.length === 0 ? (
    <div className="w-full min-h-[50vh] my-5 flex items-center">
      <h1 className="text-center text-[5rem] w-full font-bold">No Posts yet</h1>
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
