import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, register } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    dispatch(register(user));
  };

  useEffect(() => {
    if (auth.registerStatus == "success") {
      navigate(`/login`);
    }
    dispatch(loadUser());
  }, [auth.registerStatus]);

  return (
    <form className="flex justify-center items-center  h-[100vh] w-full ">
      <div className="flex flex-col items-center gap-3 border rounded-md h-[400px] w-[500px] ">
        <p className="text-3xl">REGISTER</p>
        <div className="flex justify-center gap-2 w-[90%]">
          <TextField
            id="outlined-name"
            label="First Name"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
          <TextField
            id="outlined-name"
            label="Last Name"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </div>
        <div className="flex flex-col justify-center gap-2 w-[90%]">
          <TextField
            fullWidth
            label="UserName"
            id="fullWidth"
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            id="fullWidth"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextField
            fullWidth
            label="Password"
            id="fullWidth"
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-2 w-[90%]">
          <Button
            className="w-full "
            variant="contained"
            onClick={handleSubmit}
          >
            {auth.registerStatus == "pending" ? "Submitting..." : "Submit"}
          </Button>
         
          <p className="text-red-600">{auth.registerError}</p>
          <p>
            Already registered ?
            <span className="cursor-pointer font-semibol text-2xl">Login</span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Register;
