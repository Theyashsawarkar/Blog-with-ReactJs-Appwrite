/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { Button, Input, Rte, Select } from ".";
import appwriteService from "../appwrite/config.js";
import { addPosts } from "../store/postsSlice.js";
import dsaTopics from "../utils/dsaTopics.js";

export default function PostForm({ post }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(false), [loading]);

  const dispatch = useDispatch();

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setLoading(true);
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (post.featuredImage) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : null,
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
      console.log("userData", userData);
      console.log("Post-data", data);
      const dbPost = await appwriteService.createPost({
        ...data,
        userId: userData.$id,
      });

      console.log("db-post-data", dbPost);

      appwriteService
        .getPosts()
        .then((postsList) => postsList.documents)
        .then((posts) => dispatch(addPosts({ posts })))
        .catch((error) =>
          console.log("error while featching all the posts :: App ", error)
        );

      setLoading(false);

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  if (loading) {
    return (
      <div className="w-[80vw] mx-auto h-[90vh] flex justify-center items-center">
        <HashLoader
          color={"white"}
          loading={!post}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className=" my-24 flex w-[70vw] flex-wrap"
    >
      <div className="w-[50%] h-full px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4 px-3 bg-black py-2 rounded-lg hover:bg-gray-950 text-gray-100 focus:bg-gray-900 duration-200 border w-full"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4 px-3 bg-black py-2 rounded-lg hover:bg-gray-950 text-gray-100 focus:bg-gray-900 duration-200 border w-full"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <Rte
          label="Description :"
          name="description"
          control={control}
          defaultValue={getValues("description")}
        />
      </div>
      <div className="w-[50%] px-2">
        <textarea
          rows={17}
          label="Code :"
          type="textarea"
          placeholder="Paste your code here ..."
          className="mb-4 px-3 mt-6 bg-black py-2 rounded-lg hover:bg-gray-950 text-gray-100 focus:bg-gray-900 duration-200 border w-full"
          {...register("code", { required: true })}
        />
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4 px-3 bg-black py-2 rounded-lg hover:bg-gray-950 text-gray-100 focus:bg-gray-900 duration-200 border w-full"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image")}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg text-gray-100"
            />
          </div>
        )}
        <div className="flex gap-5">
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Select
            options={dsaTopics}
            label="Topic"
            className="mb-4 text-gray-100 bg-black"
            {...register("topic", { required: true })}
          />
        </div>
        <Button
          name={post ? "Update" : "Submit"}
          className={`w-full bg-[#f97316] hover:text-gray-100 py-2 rounded-md font-serif `}
          shouldPreventDefault={false}
        />
      </div>
    </form>
  );
}
