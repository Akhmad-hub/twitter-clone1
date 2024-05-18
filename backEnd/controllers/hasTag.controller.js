import Post from "../models/post.model.js";

export const getTrendingHashtags = async (req, res) => {
    try {
      const trendingHashtags = await Post.aggregate([
        { $unwind: "$hashtags" },
        { $group: { _id: "$hashtags", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 7 }
      ]);
  
      res.status(200).json(trendingHashtags);
    } catch (error) {
      console.log("Error in getTrendingHashtags controller ", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  