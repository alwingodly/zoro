import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, default: "" }, // Changed to not required
    lastName: { type: String, default: "" }, // Changed to not required
    userName: { type: String, required: true, unique: true },
    proflePicture: { type: String, default: "" }, // Note: typo in 'profle' - consider fixing to 'profilePicture'
    bannerImage: { type: String, default: "" },
    bio: { type: String, default: "", maxLength: 160 },
    location: { type: String, default: "" },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Changed to array
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Changed to array
    // Remove password field entirely since you're using Clerk
    // password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;