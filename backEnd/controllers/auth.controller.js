import User from "../models/user.model.js";

export const signUp = async (req, res) => {
  try {
      const { fullName, username, email, password } = req.body;
      
      
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid format Email" });
    }
      
      const existingUser = await User.findOne({ username })
      if (existingUser) {
          return res.status(400).json({error: "username is already taken"})
      }

      const existingEmail = await User.findOne({ email })
      if (existingEmail) {
          return res.status(400).json({error: "username is already taken"})
      }
  } catch (error) {}
};

export const login = async (req, res) => {
  res.json({ data: "ini data" });
};
export const logOut = async (req, res) => {
  res.json({ data: "ini data" });
};
