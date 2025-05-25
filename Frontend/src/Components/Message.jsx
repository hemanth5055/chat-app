import React from "react";
import userImg from "../assets/user.png";

export default function Message({ self, message, time }) {
  const changeTime = (createdAt) => {
    const date = new Date(createdAt);
    const istDate = new Date(date.getTime() + 330 * 60 * 1000);
    let hours = istDate.getUTCHours();
    const minutes = istDate.getUTCMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = hours.toString().padStart(2, "0");
    return `${hoursStr}:${minutes} ${ampm}`;
  };
  return (
    <>
      <div
        className={`w-full flex items-center gap-2 px-4 flex-shrink-0  ${
          self ? "flex-row-reverse" : ""
        }`}
      >
        <h2 className="font-mont text-white text-[10px]">{changeTime(time)}</h2>
      </div>
      <div
        className={`w-full flex items-center gap-2 px-4 flex-shrink-0  ${
          self ? "flex-row-reverse" : ""
        }`}
      >
        <div className="h-[40px] w-[40px] bg-gray-100 rounded-full">
          <img src={userImg} className="w-full h-full scale-[0.5]" />
        </div>
        <div
          className={`p-4 max-w-[40%] rounded-3xl max-sm:p-3  ${
            self ? "bg-[#42A4CB]" : "bg-[#3e404b]"
          }`}
        >
          <h3 className="font-mont text-white max-sm:text-[13px]">{message}</h3>
        </div>
      </div>
    </>
  );
}
