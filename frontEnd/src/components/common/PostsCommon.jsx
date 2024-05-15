import React, { useEffect } from "react";
import PostSkeleton from "../skeletons/PostSkeleton";
import { POSTS } from "../../utils/db/dummy";
import PostCommon from "./PostCommon";
import { useQuery } from "@tanstack/react-query";

const PostsCommon = ({ feedType }) => {
  console.log(POSTS);

  const getPostEndPoint = () => {
    switch (feedType) {
      case "forYou":
        return "/api/posts/all";
      case "following":
        return "/api/posts/getFollowing";
      default:
        return "/api/posts/all";
    }
  };

  const POST_ENDPOINT = getPostEndPoint();

  const { data: posts, isLoading,refetch, isRefetching } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await fetch(POST_ENDPOINT);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  useEffect(() => {
    refetch()
  },[feedType,refetch])
  console.log("ini adalah posts", posts);
  return (
    <>
      {(isLoading || isRefetching) && (
        <div>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading&& !isRefetching && posts?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!isLoading&& !isRefetching && posts && (
        <div>
          {posts.map((post) => (
            <PostCommon key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default PostsCommon;
