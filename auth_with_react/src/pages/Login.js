import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, login } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    dispatch(login(user));
  };



  useEffect(() => {
    dispatch(loadUser())
    if (auth.id) navigate(`/user/${auth.userName}`);
    
  }, [auth.id]);


  return (
    <form className="flex justify-center items-center  h-[100vh] w-full ">
      <div className="flex flex-col items-center gap-3 border rounded-md h-[400px] w-[500px] ">
        <p className="text-3xl">LOGIN</p>

        <div className="flex flex-col justify-center gap-2 w-[90%]">
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
            {auth.loginStatus == "pending" ? "Submitting..." : "Submit"}
          </Button>
          
          <p className="text-red-600">{auth.loginError}</p>
          <p>
            Don' have an account ?
            <span className="cursor-pointer font-semibol text-2xl">
              Register
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
