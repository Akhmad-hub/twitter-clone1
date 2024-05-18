import React from "react";
import { useQuery } from "@tanstack/react-query";
import FollowRightCommon from "./FollowRightCommon";
import TrendingHasCommon from "./TrendingHasCommon";

const RightPanelCommon = () => {
  const { data: suggestedUser, isLoading } = useQuery({
    queryKey: ["suggestedUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/suggestedUser");
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

  
    if (suggestedUser?.length === 0)
    return (
      <div>
        <p className="md:w-64 w-0 text-center text-slate-500">No users found</p>
      </div>
    );
  return (
    <div className="hidden lg:block my-4 mx-2 ">
      
      <FollowRightCommon suggestedUser={suggestedUser} isLoading={isLoading} />
 
      <TrendingHasCommon / >
    </div>
  );
};

export default RightPanelCommon;
