import { useSelector } from "react-redux";
import { PostCard } from "../components/index.js";

function ListPosts() {
  const activePosts = useSelector((state) => state.post.activePosts);
  console.log("active Posts ::", activePosts);

  return (
    <div className="flex justify-center flex-wrap w-full mt-10">
      {!activePosts ? (
        <h1>No posts yet</h1>
      ) : (
        activePosts.map((post) => (
          <div key={post.$id} className="p-2 w-1/5">
            <PostCard {...post} />
          </div>
        ))
      )}
    </div>
  );
}

export default ListPosts;
