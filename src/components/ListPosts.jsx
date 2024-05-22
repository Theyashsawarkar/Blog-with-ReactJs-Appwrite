import { useSelector } from "react-redux";
import { PostCard } from "../components/index.js";

function ListPosts() {
  const activePosts = useSelector((state) => state.post.activePosts);
  const activeTopic = useSelector((state) => state.post.activeTopic);
  console.log("active Posts ::", activePosts);

  return (
    <div className="flex justify-center flex-wrap w-[90%] mt-10">
      {activePosts.length === 0 ? (
        <h1 className="text-white text-8xl font-serif mb-10 ">
          No posts yet For {activeTopic}{" "}
        </h1>
      ) : (
        activePosts.map((post) => (
          <div key={post.$id} className="p-2 w-1/5 ">
            <PostCard {...post} />
          </div>
        ))
      )}
    </div>
  );
}

export default ListPosts;
