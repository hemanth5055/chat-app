import React from "react";

export default function Message({ self, message }) {
  return (
    <div
      className={`w-full flex items-center gap-2 px-4 flex-shrink-0 ${
        self ? "flex-row-reverse" : ""
      }`}
    >
      <div className="h-[40px] w-[40px] bg-gray-100 rounded-full"></div>
      <div
        className={`p-4 max-w-[40%] rounded-3xl ${
          self ? "bg-[#42A4CB]" : "bg-[#16171F]"
        }`}
      >
        <h3 className="font-mont text-white">{message}</h3>
      </div>
    </div>
  );
}
