import mongoose, { model } from "mongoose";

const UserSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String, },
  email: { type: String,  },
  password: { type: String,  },
});

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
