import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";

export default function App() {
  return (
    <div className="w-full h-screen bg-[#3B3D48] p-4 max-sm:p-2">
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/Signup" element={<Signup></Signup>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
      </Routes>
    </div>
  );
}
