import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { LuSendHorizontal } from "react-icons/lu";
import { PiChatCircleLight } from "react-icons/pi";
import { MdLogout } from "react-icons/md";

import { RxEraser } from "react-icons/rx";

import User from "./User";
import Message from "./Message";

export default function Home() {
  const [usertosearch, setUsertosearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(false);
  const SearchUser = () => {};
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="w-full h-full rounded-2xl flex justify-center items-center overflow-hidden">
      {/* Sidebar */}
      <div className="sidebar bg-[#1A1C20] w-[30%] h-full rounded-l-2xl flex flex-col items-center gap-[30px]">
        <div className="w-full flex justify-center items-end h-[100px]">
          <h1 className="font-gara text-6xl text-gray-100">Vovo</h1>
        </div>

        {/* Search */}
        <div className="flex justify-center items-center w-[85%] bg-[#232429] rounded-3xl">
          <div
            className="logo flex justify-center items-center w-[50px] h-[50px] cursor-pointer"
            onClick={SearchUser}
          >
            <FiSearch className="text-white font-medium" size={20} />
          </div>
          <input
            type="text"
            name="usersearch"
            id="usersearch"
            value={usertosearch}
            onChange={(e) => setUsertosearch(e.target.value)}
            placeholder="search user"
            className="h-[50px] outline-none text-gray-100 font-mont font-medium text-xl w-full bg-transparent"
          />
        </div>

        {/* User List */}
        <div className="w-full flex flex-col gap-[15px] px-2 mt-[10px] h-full overflow-y-auto">
          <User
            name="Nishanth Reddy"
            lastMessage="ok bye!"
            selectfn={setSelectedUser}
          />
          <User
            name="Tejaswinath"
            lastMessage="Hmmm"
            selectfn={setSelectedUser}
          />
          <User
            name="Pranav Kumar"
            lastMessage="Intership ??"
            selectfn={setSelectedUser}
          />
          <User
            name="Ranga Sainadh"
            lastMessage="Have a Nice Day!"
            selectfn={setSelectedUser}
          />
          <User
            name="Ranga Sainadh"
            lastMessage="Have a Nice Day!"
            selectfn={setSelectedUser}
          />
        </div>

        <div className="flex justify-between px-5 w-full h-[70px] items-start">
          <h1 className="font-mont text-[#42A4CB] font-medium text-[18px]">
            Kanala Hemanth Reddy
          </h1>
          <div className="w-[30px] h-[30px] bg-red-500 rounded-full cursor-pointer flex justify-center items-center">
            <MdLogout className="text-white"></MdLogout>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      {selectedUser ? (
        <div className="chatcontainer bg-[#20232D] w-[70%] h-full rounded-r-2xl gap-2 px-2 pt-4 pb-2 flex flex-col">
          {/* Chat Header */}
          <div className="w-full h-[80px] flex px-6 justify-between items-center">
            <div className="profile flex items-center gap-[15px]">
              <div className="h-[40px] w-[40px] rounded-full bg-gray-200"></div>
              <h2 className="font-mont text-[20px] text-white">Tejaswinath</h2>
            </div>
            <div className="clearchat cursor-pointer h-[40px] w-[40px] flex justify-center items-center">
              <RxEraser className="text-white" size={20} />
            </div>
          </div>

          {/* Divider */}
          <div className="w-[90%] h-[2px] rounded-2xl bg-gray-500 self-center" />

          {/* Message Area */}
          <div className="messagearea w-full flex flex-col flex-grow overflow-hidden p-2">
            {/* Messages Scrollable */}
            <div className="messages flex flex-col gap-2 overflow-y-auto flex-grow pr-1">
              <Message self={false} message="Hey ! Where are you right now ?" />
              <Message self={true} message="Infront CB exactly at footpath !" />
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="inputarea h-[70px] mt-2 flex justify-center items-center flex-shrink-0">
              <div className="w-[85%] rounded-2xl h-full bg-[#16171F] flex items-center">
                <input
                  type="text"
                  name="message"
                  id="message"
                  placeholder="Type a message here . ."
                  className="w-[93%] h-full text-[16px] text-gray-100 font-mont pl-4 outline-none bg-transparent"
                />
                <div className="options h-full w-[50px] flex justify-center items-center">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#42A4CB] flex justify-center items-center">
                    <LuSendHorizontal className="text-white" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="chatcontainer bg-[#20232D] w-[70%] h-full rounded-r-2xl gap-4  flex flex-col justify-center items-center">
          <div>
            <PiChatCircleLight className="text-white" size={300} />
          </div>
          <h2 className="font-mont font-medium text-xl text-white">
            Select any user to start / continue{" "}
            <span className="bg-[#42A4CB] p-1 rounded-[10px]">
              conversation
            </span>{" "}
            .
          </h2>
        </div>
      )}
    </div>
  );
}
