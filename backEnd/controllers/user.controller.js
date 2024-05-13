import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import { validatePassword } from "../utils/validation.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
export const getUserProfile = async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({ userName }).select("-password");
    if (!user) return res.status(404).json({ message: "user not Found" });

    return res.status(200).json(user);
  } catch (error) {
    console.log("Eror in getUserProfile contrroller ", error.message);
    res.status(500).json({ error: "Internal  Serrver Eror" });
  }
};

export const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userTomodify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id) {
      return res
        .status(400)
        .json({ error: "you can't follow/unfollow yourself" });
    }

    if (!userTomodify || !currentUser) {
      return res.status(404).json({ error: "user not Found" });
    }

    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      // unfollow the user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { following: id },
      });
      res.status(200).json({ message: "user Unfollowed succesfully" });
    } else {
      //   follow the User
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, {
        $push: { following: id },
      });
      // send notofication
      const newNotification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userTomodify._id,
      });
      await newNotification.save();
      // todo return the id of the user as aresponse
      res.status(200).json({ message: "user followed succesfully" });
    }
  } catch (error) {
    console.log("Eror in followUnFollowUser contrroller ", error.message);
    res.status(500).json({ error: "Internal  Serrver Eror" });
  }
};

// mencari pengguana yang direkom untuk diikuti
export const getSuggestedUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const usersFollowedByMe = await User.findById(userId).select("following");

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      { $sample: { size: 10 } },
    ]);

    // 1,2,3,4,5,6,
    const filteredUsers = users.filter(
      (user) => !usersFollowedByMe.following.includes(user._id)
    );
    const suggestedUsers = filteredUsers.slice(0, 4);

    suggestedUsers.forEach((user) => (user.password = null));

    res.status(200).json(suggestedUsers);
  } catch (error) {
    console.log("Eror in getSuggestedUser contrroller ", error.message);
    res.status(500).json({ error: "Internal  Serrver Eror" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      userName,
      currentPassword,
      newPassword,
      bio,
      link,
    } = req.body;
    let { profileImg, coverImg } = req.body;
    const userId = req.user._id;

    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not Found" });

    if (
      (!currentPassword && newPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res
        .status(400)
        .json({ error: "Please provide current password and new password" });
    }

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ error: "Current password is incorrect" });
      if (!validatePassword(newPassword)) {
        return res.status(400).json({
          error:
            "password must be at least 8 characters long and contain at least one alphabet, one digit, and one special character",
        });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (profileImg) {
      if (user.profileImg) {
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }
      const uploadedImg = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedImg.secure_url;
    }
    if (coverImg) {
      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0]
        );
      }
      const uploadedImg = await cloudinary.uploader.upload(coverImg);
      coverImg = uploadedImg.secure_url;
    }

    user.fullName = fullName || user.fullName;
    user.userName = userName || user.userName;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;

    await user.save();
    user.password = null;

    res.status(200).json(user);
  } catch (error) {
    console.log("Eror in updateUser contrroller ", error.message);
    res.status(500).json({ error: error.message });
  }
};
