import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { validateEmail, validatePassword } from "../utils/validation.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { fullName, userName, email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid format Email" });
    }

  
    const existingUser = await User.findOne({ userName });
		if (existingUser) {
			return res.status(400).json({ error: "userName is already taken" });
		}


    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "email is already taken" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long and contain at least one alphabet, one digit, and one special character",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log({ hashPassword, password });

    const newUser = new User({
      fullName,
      userName,
      email,
      password: hashPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        userName: newUser.userName,
        fullName: newUser.fullName,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      });
    } else {
      res.status(400).json({ error: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Eror in signUp contrroller ", error.message);
    res.status(500).json({ error: "Internal  Serrver Eror" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Email not found" });
    
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or Password" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      userName: user.userName,
      fullName: user.fullName,
      email: user.email,
      followers: user.followers,
      following: user.following,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
    });
  } catch (error) {
    console.log("Eror in signUp contrroller ", error.message);
    res.status(500).json({ error: "Internal  Serrver Eror" });
  }
};
export const logOut = async (req, res) => {
 try {
   res.cookie("jwt", "", { maxAge: 0 })
   res.status(200).json({message: "looged out succesfully"})
 } catch (error) {
  console.log("Eror in signUp contrroller ", error.message);
  res.status(500).json({ error: "Internal  Serrver Eror" });
 }
};


export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password")
    res.status(200).json(user)
  } catch (error) {
    console.log("Eror in getMe contrroller ", error.message);
    res.status(500).json({ error: "Internal  Serrver Eror" });
  }
}