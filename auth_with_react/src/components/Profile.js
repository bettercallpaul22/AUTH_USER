import React from "react";
import image from "./images.jpg";

const Profile = () => {
  return (
    <div className="w-[30%] shadow-lg flex flex-col items-center ">
      <div className=" w-[96%] h-[400px] static rounded-t-lg flex flex-col ">
        <div className="bg-pink-400 w-full rounded-t-lg h-[100px]"></div>
        <img
          src={image}
          alt=""
          className="absolute left-[11.5rem] top-[8rem] w-[130px] rounded-[30%]"
        />
        <div className="flex flex-col items-center mt-[5rem]">
            <p className="font-bold text-2xl text-slate-600 ">Paul Paul</p>
            <p className="font-bold text-2xl text-slate-600 ">Software Developer</p>
            
        </div>
      </div>
      
    </div>
  );
};

export default Profile;
