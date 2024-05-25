/* eslint-disable react/prop-types */
import { CCard, CCardBody, CCardImage, CCardTitle } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import { Button } from "../components";

function PostCard({ $id, title, featuredImage }) {
  const navigate = useNavigate();
  return (
    <CCard
      className="text-white flex flex-col box-border justify-center items-start border rounded-2xl p-5"
      style={{ width: "18rem", height: "18rem" }}
    >
      {featuredImage && (
        <CCardImage
          className="rounded-2xl outline object-fit"
          style={{ width: "100%", height: "auto", maxHeight: "10rem" }}
          orientation="top"
          src={appwriteService.getFilePreview(featuredImage)}
        />
      )}
      <CCardBody>
        <CCardTitle className="font-semibold my-3">{title}</CCardTitle>
        <Button
          className="hover:font-semibold duration-300 font-serif bg-[#f97316] hover:bg-white text-black rounded-lg px-2 py-1"
          shouldPreventDefault={true}
          clickHandler={() => navigate(`/post/${$id}`)}
          name={"Read More.."}
        />
      </CCardBody>
    </CCard>
  );
}

export default PostCard;
