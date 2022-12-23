import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import mocdata from '../asset/data'

const initialState = mocdata;
// CREATE POST
export const createPost = createAsyncThunk("createPost/post", async (post, { rejectWithValue }) => {
  try {
    const resp = await axios.post("http://localhost:5000/createpost", {
      userName: post.userName,
      title: post.title,
      desc: post.desc,
      price: post.price,
    });
    //saving the post to localStorage
    localStorage.setItem("post", resp.data);
    return resp.data;
  } catch (error) {
    return rejectWithValue(error.resp.data);
  }

});
export const getAllPost = createAsyncThunk("getPost/post", async ( { rejectWithValue }) => {
  try {
    const resp = await axios.get("http://localhost:5000/posts");
    //saving the post to localStorage
    localStorage.setItem("post", resp.data);
    return resp.data;
  } catch (error) {
    return rejectWithValue(error.resp.data);
  }

});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
});


export default postSlice.reducer