import React from "react";
import PostSkeleton from "../skeletons/PostSkeleton";
import { POSTS } from "../../utils/db/dummy";
import PostCommon from "./PostCommon";

const PostsCommon = () => {
  console.log(POSTS);
  const isLoading = false;
  return (
    <>
      {isLoading && (
        <div>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && POSTS?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && POSTS && (
				<div>
					{POSTS.map((post) => (
						<PostCommon key={post._id} post={post} />
					))}
				</div>
			)}
    </>
  );
};

export default PostsCommon;
