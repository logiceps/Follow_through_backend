import  {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadImageToCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {

    const {fullName,email,userName,password} = req.body;
    console.log(fullName,email,userName,password);

    if(!fullName || !email || !userName || !password){
        throw new ApiError(400, "All fields are required");
    }

    const userExists = await User.findOne({
        $or : [{ email },{ userName }]
    });

    if(userExists){
        throw new ApiError(409, "User with email or username already exists");
    }
    const avatarlocalpath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarlocalpath){
        throw new ApiError(400, "Avatar image is required");
    }
    const avatarResult = await uploadImageToCloudinary(avatarlocalpath);
    const coverImageResult = coverImageLocalPath ? await uploadImageToCloudinary(coverImageLocalPath) : null;
    if(avatarResult.error || (coverImageResult && coverImageResult.error)) {
        throw new ApiError(500, "Failed to upload images to Cloudinary");
    }

    const user = await User.create({
        fullName,
        avatar : avatarResult.url,
        coverImage : coverImageResult?.url,
        email,
        userName : userName.toLowerCase(),
        password

    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(!createdUser) {
        throw new ApiError(500, "Failed to create user");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );

});

export {registerUser};  