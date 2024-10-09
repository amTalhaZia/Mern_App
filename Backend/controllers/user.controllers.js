import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.models.js";

// generarteAndAccessToken
const generateAccessAndRefreshToken = async (userId) => {
    // console.log("userid", userId);
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    // console.log("access token  genreated", accessToken);
    // console.log("refresh token genreated", refreshToken);
    
    

    user.refreshToken = refreshToken;

    try {
      await user.save({ validateBeforeSave: false });
    } catch (error) {
      throw new Error("Error saving user refresh token");
    }

    return { accessToken, refreshToken };
  } catch (error) {
    // console.log("Error generating access and refresh tokens", error);
    throw new Error("Error generating access and refresh tokens", error.message);
  }
};

//   register user

const registerUser = asyncHandler(async (req, res) => {
  // console.log(req.body);
  
  const { username, email, password } = req.body;


  if ([username, email, password].some((field) => field.trim() == '')) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const userExists = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (userExists) {
    return res.status(409).json({
      success: false,
      message: "User with email or username already exists",
    });
  }

  const newUser = await User.create({
    email,
    password,
    username
  });

  const user = await User.findById(newUser._id).select("-password");

  return res.status(201).json(new ApiResponse(201, "User registered successfully", user));
});


// loginuser

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    console.log("User not found");
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  const matchPassword = await user.isPasswordMatch(password);

  if (!matchPassword) {
    console.log("Invalid password");
    return res.status(401).json({
      success: false,
      message: "Invalid password"
    });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);


  // console.log("generating  acces  and  referesh token..", accessToken, refreshToken);
  

  const loginUser = await User.findById(user._id).select("-password -refreshToken");

  return res.status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json({
      success: true,
      message: "Login successful",
      user:loginUser,
      accessToken,
      // refreshToken
    });
});


const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: undefined } });

  const options = {
    httpOnly: true, 
    secure: true
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      message: "Logout successfully",
      success: true,
    });
});

  

export {
  registerUser,
  loginUser,
  logout
};
