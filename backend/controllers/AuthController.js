import Joi from "joi";
import bcrypt from "bcrypt";
import UserModel from "../model/UserModel.js";
import jwt from "jsonwebtoken";

const registerSchema = Joi.object({
  firstName: Joi.string().min(3).required().trim(),
  lastName: Joi.string().min(3).required().trim(),
  userName: Joi.string().min(3).required().trim(),
  email: Joi.string().email().min(3).required().trim(),
  password: Joi.string().min(6).required().trim(),
});
const loginSchema = Joi.object({
  email: Joi.string().email().min(3).required().trim(),
  password: Joi.string().min(6).required().trim(),
});

export const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    const { firstName, lastName, userName, email, password } = req.body;
    const existing_Email = await UserModel.findOne({ email });
    if (existing_Email) return res.status(400).json("Email already in use");
    const existing_userName = await UserModel.findOne({ userName });
    if (existing_userName)
      return res.status(400).json("Username already taken");
    const salt = 10;
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = new UserModel({
      firstName,
      lastName,
      userName,
      email,
      password: hashPassword,
    });
    const token = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
      },
      process.env.MY_SECRET_KEY
    );
    res.status(200).json(token);
    await user.save();
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json("Email does not exist");
    const validPassword = bcrypt.compareSync(password, user.password);
    if (validPassword) {
      // Generating our token
      const token = jwt.sign(
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
        },
        process.env.MY_SECRET_KEY
      );
      res.status(200).json(token);
    } else {
      res.status(400).json("Invalid Password");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.MY_SECRET_KEY, (err, user) => {
        if (err) {
          res.status(400).json({ message: "Invalid Token" });
        } else {
          req.id = user.id;
          next();
        }
      });
    } else {
      return res.status(400).json({ message: "no Token" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userId = req.id;
    const user = await UserModel.findById(userId, "-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
