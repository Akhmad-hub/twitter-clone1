import React, { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { FaFile } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const CreatePostPages = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [text]);

  const [img, setImg] = useState(null);
  const imgRef = useRef(null);

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const {
    mutate: createPost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ text, img }) => {
      try {
        const res = await fetch("/api/posts/create", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ text, img }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create post");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      setText("");
      setImg(null);
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({ text, img });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex p-4 items-start gap-4 border-b border-gray-700 ">
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img src={authUser.profileImg || "/avatar-placeholder.png"} alt="" />
        </div>
      </div>
      <form className="flex flex-col gap-2 w-full " onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          className="textarea w-full p-0 text-lg resize-none border-none focus:outline-none  border-gray-800 h-auto"
          placeholder="What is happening?!"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {img && (
          <div className="relative w-72 mx-auto">
            <IoCloseSharp
              className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
              onClick={() => {
                setImg(null);
                imgRef.current.value = null;
              }}
            />
            <img
              src={img}
              className="w-full mx-auto h-72 object-contain rounded"
              alt=""
            />
          </div>
        )}

        <div className="flex justify-between border-t py-2 border-t-gray-700">
          <div className="flex gap-4 items-center">
            <div className="relative group ">
              <CiImageOn
                className="fill-primary w-6 h-6  cursor-pointer group-hover:text-green-500"
                onClick={() => imgRef.current.click()}
              />
              <p className="absolute -top-5 scale-0 transition-all rounded text-xs text-white group-hover:scale-100">
                Images
              </p>
            </div>

            <div className="relative group ">
              <BsEmojiSmileFill className="fill-primary w-5 h-5  cursor-pointer group-hover:text-green-500" />
              <p className="absolute -top-5 scale-0 transition-all rounded text-xs text-white group-hover:scale-100">
                Stikker
              </p>
            </div>

            <div className="relative group ">
              <FaFile className="fill-primary w-5 h-5  cursor-pointer group-hover:text-green-500" />
              <p className="absolute -top-5 scale-0 transition-all rounded text-xs text-white group-hover:scale-100">
                Files
              </p>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={imgRef}
            onChange={handleImgChange}
          />
          <button className="btn btn-primary rounded-full btn-sm text-white px-4">
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
        {isError && <div className="text-red-500">{error.message}</div>}
      </form>
    </div>
  );
};

export default CreatePostPages;
