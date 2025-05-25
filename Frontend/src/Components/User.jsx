import React, { use, useContext, useEffect, useState } from "react";
import { Usercontextp } from "../context/Usercontext";
import userImg from "../assets/user.png";

export default function User({ id, name, bio }) {
  const [isOnline, setisOnline] = useState(false);
  const { onlineUsers, selectedUser, setselectedUser } =
    useContext(Usercontextp);
  const handleClick = () => {
    const temp = {
      _id: id,
      name: name,
    };
    if (!selectedUser || selectedUser._id !== temp._id) {
      setselectedUser(temp);
    }
  };
  useEffect(() => {
    if (Array.isArray(onlineUsers)) {
      setisOnline(onlineUsers.includes(id));
    }
  }, [onlineUsers, id]);

  return (
    <div
      className="flex justify-center items-center min-h-[50px] flex-shrink-0 p-2 max-sm:px-3 hover:bg-gray-800 cursor-pointer rounded-2xl"
      onClick={handleClick}
    >
      <div className="w-[18%] h-full max-sm:w-[20%]">
        <div className="rounded-full w-[50px] h-[50px] bg-white max-sm:w-[40px] max-sm:h-[40px]">
          <img src={userImg} className="w-full h-full scale-[0.5]" />
        </div>
      </div>
      <div className="w-[72%]  h-full flex flex-col justify-center gap-[3px]">
        <h2 className="font text-[17px] text-white font-mont max-sm:text-[15px]">
          {name}
        </h2>
        <h3 className="text-gray-300 font-mont text-[12px]">{bio}</h3>
      </div>
      <div className="w-[10%] ">
        <div
          className={`font-mont h-[10px] w-[10px] rounded-full ${
            isOnline ? "bg-green-400" : "bg-gray-300"
          }`}
        ></div>
      </div>
    </div>
  );
}
