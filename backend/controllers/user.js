import bcrypt from "bcryptjs";
import User from "../models/user.js"
import generateTokenAndSetCookie from "../utils/genrateTokenAndSetCookie.js";



export const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    if (newUser) {
      // Generate JWT token here
        generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const login =  async (req,res) =>{
  try {

    const {email,password} = req.body

    const user = await User.findOne({email})
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    
    if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}
		generateTokenAndSetCookie(user._id, res);
		res.status(200).json({
			_id: user._id,
      email:user.email,
			username: user.username,
		});

    
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

