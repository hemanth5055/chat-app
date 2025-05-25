import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Usercontextp } from "../context/Usercontext";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const data = useContext(Usercontextp);
  const handleSignup = async () => {
    return data.signupUser(name, email, password, bio);
  };
  useEffect(() => {
    if (data.user) {
      navigate("/"); // Redirect to homepage if logged in
    }
  }, [data.user]);
  return (
    <div className="w-full h-full bg-[#1A1C20] rounded-2xl flex flex-col justify-center items-center gap-[60px]">
      <h1 className="font-gara  text-5xl text-gray-200">Signup</h1>

      <div className="w-full flex flex-col justify-center items-center gap-[20px]">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Good Name"
          className="w-[35%] max-sm:w-[80%] max-sm:text-[20px] bg-white h-[55px] rounded-3xl font-medium outline-none text-xl font-mont pl-4 text-black"
        />
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          className="w-[35%] bg-white max-sm:w-[80%] max-sm:text-[20px] h-[55px] rounded-3xl font-medium outline-none text-xl font-mont pl-4 text-black"
        />
        <input
          type="text"
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
          className="w-[35%] bg-white max-sm:w-[80%] max-sm:text-[20px] h-[55px] rounded-3xl font-medium outline-none text-xl font-mont pl-4 text-black"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-[35%] bg-white max-sm:w-[80%] max-sm:text-[20px] h-[55px] rounded-3xl outline-none text-xl font-mont pl-4 text-black font-medium"
        />
        <div
          onClick={handleSignup}
          className="px-6 py-3 bg-white font-mont rounded-2xl cursor-pointer"
        >
          Signup
        </div>
      </div>
      <h2 className="font-mont text-white font-medium max-sm:text-center max-sm:w-[80%]">
        Already have an account ,
        <span
          className="text-[#42A4CB] cursor-pointer"
          onClick={() => {
            navigate("/login");
          }}
        >
          {" "}
          login here!
        </span>
      </h2>
    </div>
  );
}
