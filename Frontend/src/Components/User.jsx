import React, { useContext } from "react";
import { Usercontextp } from "../context/Usercontext";

export default function User({ id, name, lastMessage }) {
  const { selectedUser, setselectedUser, getMessages } =
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

  return (
    <div
      className="flex justify-center items-center min-h-[50px] flex-shrink-0 p-2 max-sm:px-3 hover:bg-gray-800 cursor-pointer rounded-2xl"
      onClick={handleClick}
    >
      <div className="w-[18%] h-full max-sm:w-[20%]">
        <div className="rounded-full w-[50px] h-[50px] bg-white max-sm:w-[40px] max-sm:h-[40px]"></div>
      </div>
      <div className="w-[72%]  h-full flex flex-col justify-center gap-[3px]">
        <h2 className="font text-[17px] text-white font-mont max-sm:text-[15px]">{name}</h2>
        <h3 className="text-gray-300 font-mont text-[12px]">{lastMessage}</h3>
      </div>
      <div className="w-[10%] ">
        <h2 className="font-mont text-gray-400 max-sm:text-[10px]">12 m</h2>
      </div>
    </div>
  );
}
