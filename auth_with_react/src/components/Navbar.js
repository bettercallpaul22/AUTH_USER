import React, { useEffect } from "react";
import { GoHome } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logOutUser } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const logOUt = () => {
    dispatch(logOutUser());
    navigate("/login");
  };

  return (
    <div className="flex justify-around items-center h-[4rem] bg-slate-200 shadow-sm">
        <Link to="/">
      <div className="flex flex-col items-center justify-center cursor-pointer">
          <GoHome size={30} />
        <p className="text-slate-500">Home</p>
      </div>
        </Link>
      <div className="flex gap-4">
        <p className=" font-semibold cursor-pointer ">ABOUT</p>
        <p className=" font-semibold cursor-pointer ">CONTACT</p>
        <p className=" font-semibold cursor-pointer ">WRITE</p>
      </div>
      <div className="flex justify-center w-[20rem]">
        <p className=" font-semibold cursor-pointer ">
          <CgProfile size={30} />
        </p>
        <div className="flex justify-center items-center font-semibold w-[15rem]">
          {" "}
          {auth.id ? (
            <p className="cursor-pointer" onClick={logOUt}>
              LOGOUT
            </p>
          ) : (
            <div>
              <Link to="/login">
                <p className="cursor-pointer mr-5">LOGIN</p>
              </Link>
              <Link to="/register">
                <p className="cursor-pointer mr-5">REGISTER</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
