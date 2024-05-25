/* eslint-disable react/prop-types */
import { ID } from "appwrite";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, Rte, Select } from ".";
import appwriteService from "../appwrite/config.js";
import { addPosts } from "../store/postsSlice.js";
import dsaTopics from "../utils/dsaTopics.js";

export default function PostForm({ post }) {
  const [toggleImage, setToggleImage] = useState(false);
  const [clicked, setClicked] = useState(post ? "Update" : "Submit");
  const [loading, setLoading] = useState(true);
  const [deleteImage, setDeleteImage] = useState(false);

  useEffect(() => setLoading(false), [loading]);

  const userData = useSelector((state) => state.auth.userData);
  console.log("userdata :: postForm", userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      description: post?.description || "",
      status: post?.status || "active",
      topic: post?.topic || "Array",
      code: post?.code || "",
    },
  });

  const submit = async (data) => {
    setClicked("Uploading...");
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (post?.featuredImage && (file || deleteImage)) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      const fileId = file ? file.$id : null;
      data.featuredImage = fileId;

      const slug = ID.unique();
      const dbPost = await appwriteService.createPost({
        ...data,
        slug,
        userId: userData.$id,
      });

      appwriteService
        .getPosts()
        .then((postsList) => postsList.documents)
        .then((posts) => dispatch(addPosts({ posts })))
        .catch((error) =>
          console.log("error while featching all the posts :: App ", error)
        );

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className=" items-center gap-5 flex flex-wrap mt-[10vh] lg:mt-0  lg:flex-nowrap w-[90%] justify-center min-h-[90vh] "
    >
      <div className=" w-[90%] lg:w-[50%]">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4 px-3 bg-black py-2 rounded-lg hover:bg-gray-950 text-gray-100 focus:bg-gray-900 duration-200 border w-full"
          {...register("title", { required: true })}
        />

        <Rte
          label="Description :"
          name="description"
          control={control}
          defaultValue={getValues("description")}
        />
      </div>
      <div className=" w-[90%] lg:w-[50%]">
        <textarea
          rows={17}
          label="Code :"
          type="textarea"
          placeholder="Paste your code here ..."
          className="mb-4 px-3 mt-6 bg-black py-2 rounded-lg hover:bg-gray-950 text-gray-100 focus:bg-gray-900 duration-200 border w-full"
          {...register("code", { required: true })}
        />
        <div
          className={`${post?.featuredImage ? "flex gap-10 items-center" : ""}`}
        >
          <Input
            label="Featured Image :"
            type="file"
            className={`mb-4 px-3 bg-black py-2 rounded-lg hover:bg-gray-950 text-gray-100 focus:bg-gray-900 duration-200 border w-full`}
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image")}
          />
          {post?.featuredImage && !deleteImage && (
            <div className=" text-white flex items-start gap-5 text-[1.5rem] w-full mb-4">
              <img
                src={appwriteService.getFilePreview(post?.featuredImage)}
                alt={post.title}
                onClick={() => setToggleImage((prev) => !prev)}
                className={`w-52 outline rounded-lg text-gray-100 ${
                  toggleImage
                    ? "absolute w-[60vw] top-40 right-[20vw] z-10"
                    : ""
                }`}
              />
              <div
                className=" cursor-pointer text-red-600"
                onClick={() => setDeleteImage(true)}
              >
                <ion-icon name="trash-outline"></ion-icon>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-5">
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-5"
            {...register("status", { required: true })}
          />
          <Select
            options={dsaTopics}
            label="Topic"
            className="mb-5 text-gray-100 bg-black"
            {...register("topic", { required: true })}
          />
        </div>
        <Button
          clickHandler={() => {
            setClicked("All feilds are required");
            let timeOut = setTimeout(() => {
              setClicked(post ? "Update" : "Submit");
              clearTimeout(timeOut);
            }, 3000);
          }}
          name={clicked}
          className={`w-full ${
            clicked === "All feilds are required"
              ? " bg-red-800 cursor-not-allowed"
              : "bg-[#f97316]"
          } hover:text-gray-100 py-2 rounded-md font-serif `}
          shouldPreventDefault={false}
        />
      </div>
    </form>
  );
}
