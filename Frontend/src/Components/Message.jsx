import React from "react";

export default function Message({ self, message }) {
  return (
    <div
      className={`w-full flex items-center gap-2 px-4 flex-shrink-0  ${
        self ? "flex-row-reverse" : ""
      }`}
    >
      <div className="h-[40px] w-[40px] bg-gray-100 rounded-full"></div>
      <div
        className={`p-4 max-w-[40%] rounded-3xl max-sm:p-3  ${
          self ? "bg-[#42A4CB]" : "bg-[#3e404b]"
        }`}
      >
        <h3 className="font-mont text-white max-sm:text-[13px]">{message}</h3>
      </div>
    </div>
  );
}
