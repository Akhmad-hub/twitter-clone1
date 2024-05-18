import React, { useEffect, useState } from "react";
import formatHashtags from "../../utils/hastag/hastag";

const TrendingHasCommon = () => {
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingHashtags = async () => {
      try {
        const response = await fetch("/api/posts/trending");
        if (!response.ok) {
          throw new Error("Failed to fetch trending hashtags");
        }
        const data = await response.json();
        setTrendingHashtags(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingHashtags();
  }, []);

  return (
    <div className="border border-gray-600 my-2 p-4 rounded-md sticky top-[200px]">
      <div className="pb-4">
        <p className="font-bold text-2xl">Trending Topic</p>
        <p>maasih ada yang kurang </p>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <ul>
          {trendingHashtags.map((hashtag) => (
            <li key={hashtag._id} className="text-lg cursor-pointer">
                  {/* {hashtag._id} ({hashtag.count}) */}
                  {formatHashtags(hashtag._id)} ({hashtag.count})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrendingHasCommon;
