import mongoose, { model } from "mongoose";

const PostSchema = mongoose.Schema({
  title: { type: String, required: true,},
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  userName:{ type: String,  },
  img: {
    data: Buffer,
    contentType: String
  },
});

const PostModel = mongoose.model("Post", PostSchema);
export default PostModel;
