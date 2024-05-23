/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config.js";

function PostCard({ $id, title, featuredImage }) {
  console.log("img", featuredImage);
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full flex flex-col justify-center items-center hover:bg-gray-900 duration-200 bg-gray-950 border-gray-500 border text-white rounded-xl p-4">
        <h2 className="text-xl mb-1 font-bold font-serif">{title}</h2>
        {featuredImage ? (
          <div className="w-full mt-3 justify-center mb-1">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="rounded-xl mx-auto"
            />
          </div>
        ) : null}
      </div>
    </Link>
  );
}

export default PostCard;
