import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import PostModel from "../model/PostModel.js";

const schema = Joi.object({
  title: Joi.string().min(10).required(),
  desc: Joi.string().min(10).required(),
  userName: Joi.string().min(3).required().trim(),
  price: Joi.number().required()
});

// CREATE A POST
export const createPost = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  try {
    const { title, desc, price, userName } = req.body;
    const post = new PostModel({ title, desc, price, userName });
    await post.save();
    res.status(200).json("post created successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// FIND ALL POST
export const getAllPost = async (req, res) => {
  try {
    const { userName } = req.body;
    const allPost = await PostModel.findOne();
    res.status(200).json(allPost);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// DELETE A POST
export const deletePost = async (req, res) => {
  try {
    const { userName } = req.body;
    const post = await PostModel.findById(req.params.id)
    if(post.userName === userName){
    await PostModel.deleteOne(post)
      res.status(200).json("post deleted");
    }else{
      return res.status(400).json("You are not allowed to delete this post")
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// UPDATE A POST
export const update = async (req, res) => {
  try {
    const { userName } = req.body;
    const post = await PostModel.findById(req.params.id)
    if(post.userName === userName){
    const post = await PostModel.findByIdAndUpdate(req.params.id, req.body,{new:true})
      res.status(200).json(post);
    }else{
      return res.status(400).json("You are not allowed to update this post")
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
