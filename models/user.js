import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId; // password tab required hoga jab googleId nahi hoga
    },
  },
  googleId: {
    type: String,
  },
  // isAdmin: {
  //   type: Boolean,
  //   default: false,
  // },
});


const User = mongoose.model("User", userSchema);

export default User; // ✅ Add this