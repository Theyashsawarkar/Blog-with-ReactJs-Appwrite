import { useSelector } from "react-redux";
import { PostCard } from "../components/index.js";

function ListPosts() {
  const activePosts = useSelector((state) => state.post.activePosts);
  const activeTopic = useSelector((state) => state.post.activeTopic);

  return (
    <div className="flex justify-center items-start min-h-[50vh] gap-5 flex-wrap w-[90%] mt-10">
      {activePosts.length === 0 ? (
        <h1 className="text-white text-8xl font-serif mb-10 ">
          No posts yet For {activeTopic}{" "}
        </h1>
      ) : (
        activePosts.map((post) => <PostCard key={post.$id} {...post} />)
      )}
    </div>
  );
}

export default ListPosts;
