/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config.js";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-black border-gray-500 border text-white rounded-xl p-4">
        <h2 className="text-xl mb-5 font-bold font-serif ml-2">{title}</h2>
        <div className="w-full justify-center mb-1">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
