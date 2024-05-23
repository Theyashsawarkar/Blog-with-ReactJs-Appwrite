import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";

export default function Post() {
  const [copy, setCopy] = useState(true);
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 border mx-auto w-[80%] bg-gray-900 rounded-2xl min-h-[80vh] mt-20 mb-5">
      <Container>
        <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
          {post.featuredImage && (
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl"
            />
          )}
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  name={"Edit"}
                  shouldPreventDefault={false}
                  className=" py-1 px-5 rounded-md font-serif hover:text-gray-100 bg-green-500 mr-3"
                />
              </Link>
              <Button
                name={"Delete"}
                className=" py-1 px-5 rounded-md mr-3 font-serif hover:text-gray-100 bg-red-500"
                clickHandler={deletePost}
              />
            </div>
          )}
        </div>
        <div>
          <div className="w-full mb-6">
            <h1 className="text-2xl text-gray-100 font-bold">{post.title}</h1>
          </div>
          <div className=" text-gray-100 browser-css">
            {parse(post.description)}
          </div>
        </div>
        {post.code && (
          <div className="rounded-2xl overflow-hidden my-20 relative">
            <div
              className=" text-2xl hover:cursor-pointer absolute text-white right-5 top-5"
              onClick={() => {
                navigator.clipboard.writeText(post.code);
                setCopy(false);
                setInterval(() => {
                  setCopy(true);
                }, 2000);
              }}
            >
              {copy ? (
                <ion-icon name="copy-outline"></ion-icon>
              ) : (
                <ion-icon name="checkmark-done-outline"></ion-icon>
              )}
            </div>
            <SyntaxHighlighter
              language="cpp"
              style={atomOneDark}
              customStyle={{
                padding: "25px",
              }}
              wrapLines={true}
            >
              {post.code}
            </SyntaxHighlighter>
          </div>
        )}
      </Container>
    </div>
  ) : (
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
