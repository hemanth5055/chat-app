import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Usercontextp } from "../context/Usercontext";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = useContext(Usercontextp);
  const handleLogin = async () => {
    return data.loginUser(email, password);
  };
  return (
    <div className="w-full h-full bg-[#1A1C20] rounded-2xl flex flex-col justify-center items-center gap-[60px]">
      <h1 className="font-gara  text-5xl text-gray-200">Login</h1>

      <div className="w-full flex flex-col justify-center items-center gap-[20px]">
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          placeholder="E-mail"
          className="w-[35%] bg-white h-[55px] rounded-3xl font-medium outline-none text-xl font-mont pl-4 text-black"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          placeholder="Password"
          className="w-[35%] bg-white h-[55px] rounded-3xl outline-none text-xl font-mont pl-4 text-black font-medium"
        />
        <div
          onClick={handleLogin}
          className="px-6 py-3 bg-white font-mont rounded-2xl cursor-pointer"
        >
          Login
        </div>
      </div>
      <h2 className="font-mont text-white font-medium">
        Don't have an account ,
        <span
          className="text-[#42A4CB] cursor-pointer"
          onClick={() => {
            navigate("/signup");
          }}
        >
          {" "}
          create one !
        </span>
      </h2>
    </div>
  );
}
