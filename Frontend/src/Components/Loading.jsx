import React from "react";
import { IoReloadOutline } from "react-icons/io5";

export default function Loading() {
  return (
    <div className=" flex gap-2 w-full h-full justify-center items-center">
      <h3 className="font-mont text-white text-2xl">Loading ..</h3>
      <IoReloadOutline size={20} className="text-white animate-spin"/>
    </div>
  );
}
