/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config.js";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className=" flex p-5 flex-col box-border h-[30vh] justify-around items-center hover:bg-gray-950 duration-200 bg-black border-gray-500 border text-white rounded-xl">
        <h2 className="text-xl h-auto font-bold overflow-hidden w-[80%] font-serif">
          {title.length > 50 ? title.slice(0, 42) + "..." : title}
        </h2>
        {featuredImage && (
          <div className="overflow-hidden ">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="rounded-xl mx-auto object-contain"
            />
          </div>
        )}
      </div>
    </Link>
  );
}

export default PostCard;
