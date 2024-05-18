import React from "react";
import LoadingSpinnerCommon from "./LoadingSpinnerCommon";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import { Link } from "react-router-dom";
import useFollow from "../../hooks/useFollow";

const FollowRightCommon = ({ isLoading, suggestedUser }) => {
  const { follow, isPending } = useFollow();
  return (
    <>
      <div className="border border-gray-600  p-4 rounded-md sticky top-2">
        <p className="font-bold text-2xl pb-4">who to follow</p>
        <div className="flex flex-col gap-4">
          {isLoading && (
            <>
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
            </>
          )}
          {!isLoading &&
            suggestedUser?.map((user) => (
              <Link
                key={user._id}
                to={`/profile/${user.username}`}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex gap-2 items-center">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src={user.profileImg || "/avatar-placeholder.png"} />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold tracking-tight truncate w-28">
                      {user.fullName}
                    </span>
                    <span className="text-sm text-slate-500">
                      @{user.username}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    className="btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      follow(user._id);
                    }}
                  >
                    {isPending ? <LoadingSpinnerCommon size="sm" /> : "Follow"}
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default FollowRightCommon;
