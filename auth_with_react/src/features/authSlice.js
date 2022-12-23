import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
const initialState = {
  token: localStorage.getItem("token"), //getting our token from localStorage
  id: "",
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  registerStatus: "",
  registerError: "",
  loginStatus:"",
  loginError:""
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      const resp = await axios.post("http://localhost:5000/register", {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        password: user.password,
      });
      //saving our token to localStorage
    //  localStorage.setItem("token", resp.data);
      return resp.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// LOGIN ACTION
export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const resp = await axios.post("http://localhost:5000/login", {
        email: user.email,
        password: user.password,
      });
      //saving our token to localStorage
      localStorage.setItem("token", resp.data);
      return resp.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;
      if (token) {
        const user = jwtDecode(token); // decode the token....
        return {
          ...state,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          registerStatus:"success"
          
        };
      }
    },

    logOutUser(state, action) {
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        id: "",
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        registerStatus: "",
        registerError: "",
      };
    },
  },
  extraReducers: (Builder) => {
    Builder.addCase(register.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    Builder.addCase(register.fulfilled, (state, { payload }) => {
      if (payload) {
        const user = jwtDecode(payload); // decode the token
        return {
          ...state,
        //  token: payload, // the response token we get from our action creator "register"
          // id:"",
          // firstName: user.firstName,
          // lastName: user.lastName,
          // userName: user.userName,
          // email: user.email,
          
          registerStatus: "success",
        };
      } else return state;
    });

    Builder.addCase(register.rejected, (state, {payload}) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: payload,
      };
    });

    // LOGIN ACTION
    Builder.addCase(login.pending, (state) => {
      return { ...state, loginStatus: "pending" };
    });
    Builder.addCase(login.fulfilled, (state, { payload }) => {
      if (payload) {
        const user = jwtDecode(payload); 
        return {
          ...state,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          loginStatus: "login successfull",
        };
      } else return state;
    });

    Builder.addCase(login.rejected, (state, action) => {
      return {
        ...state,
        loginError: action.payload,
        loginStatus: "rejected",
      };
    });
  },
});

export default authSlice.reducer;
export const { loadUser, logOutUser } = authSlice.actions;
