import React, { useContext, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { LuSendHorizontal } from "react-icons/lu";
import { PiChatCircleLight } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { LuUsersRound } from "react-icons/lu";

import User from "./User";
import Message from "./Message";
import { Usercontextp } from "../context/Usercontext";

export default function Home() {
  const [usertosearch, setUsertosearch] = useState("");
  const [message, setMessage] = useState("");
  const [mobileSidebar, setmobileSidebar] = useState(false);
  const {
    user,
    checkAuth,
    selectedUser,
    setselectedUser,
    availableusers,
    logoutUser,
    getMessages,
    getUsers,
    messages,
    sendMessage,
  } = useContext(Usercontextp);
  const SearchUser = () => {};
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    setmobileSidebar(false);
    if (user && selectedUser) {
      getMessages();
    }
  }, [selectedUser]);

  useEffect(() => {
    getUsers(user);
  }, [user]);

  return (
    <div className="relative w-full h-full rounded-2xl flex justify-center items-center overflow-hidden">
      <div
        className="usersbar w-[25px] h-[25px] absolute  min-sm:hidden bg-amber-50 right-[5px] top-[0.5] rounded-[3px]
         flex justify-center items-center"
        onClick={() => {
          setmobileSidebar(true);
        }}
      >
        <LuUsersRound />
      </div>

      {/* Sidebar Mobile */}
      {mobileSidebar ? (
        <div className="sidebarMobile bg-[#1A1C20]  hidden max-sm:absolute max-sm:flex w-[100%] h-full rounded-l-2xl  flex-col items-center gap-[30px]">
          <div className="w-full flex justify-between items-center h-[100px] px-3">
            <h1 className="font-gara text-3xl text-gray-100 mt-2">Q-Chat</h1>
            <div
              className="close w-[40px] h-[40px] flex justify-center items-center"
              onClick={() => {
                setmobileSidebar(false);
              }}
            >
              <IoIosClose className="text-white text-[35px]"></IoIosClose>
            </div>
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
              value={usertosearch}
              onChange={(e) => setUsertosearch(e.target.value)}
              placeholder="search user"
              className="h-[50px] outline-none text-gray-100 font-mont font-medium text-[15px] w-full bg-transparent"
            />
          </div>

          {/* User List */}
          <div className="w-full flex flex-col gap-[15px] mt-[10px] h-full overflow-y-auto">
            {availableusers?.map((item, index) => (
              <User
                name={item.name}
                key={index}
                id={item._id}
                lastMessage="ok bye!"
              />
            ))}
          </div>

          <div className="flex justify-between px-5 w-full h-[70px] items-start">
            <h1 className="font-mont text-[#42A4CB] font-medium text-[18px]">
              {user?.name}
            </h1>
            <div
              className="w-[30px] h-[30px] bg-red-500 rounded-full cursor-pointer flex justify-center items-center"
              onClick={logoutUser}
            >
              <MdLogout className="text-white"></MdLogout>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Sidebar */}
      <div className="sidebar bg-[#1A1C20] max-sm:hidden w-[30%] h-full rounded-l-2xl flex flex-col items-center gap-[30px]">
        <div className="w-full flex justify-center items-end h-[100px]">
          <h1 className="font-gara text-5xl text-gray-100">Q-Chat</h1>
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
            value={usertosearch}
            onChange={(e) => setUsertosearch(e.target.value)}
            placeholder="search user"
            className="h-[50px] outline-none text-gray-100 font-mont font-medium text-xl w-full bg-transparent"
          />
        </div>

        {/* User List */}
        <div className="w-full flex flex-col gap-[15px] px-2 mt-[10px] h-full overflow-y-auto">
          {availableusers?.map((item, index) => (
            <User
              name={item.name}
              key={item._id}
              id={item._id}
              lastMessage="ok bye!"
            />
          ))}
        </div>

        <div className="flex justify-between px-5 w-full h-[70px] items-start">
          <h1 className="font-mont text-[#42A4CB] font-medium text-[18px]">
            {user?.name}
          </h1>
          <div
            className="w-[30px] h-[30px] bg-red-500 rounded-full cursor-pointer flex justify-center items-center"
            onClick={logoutUser}
          >
            <MdLogout className="text-white"></MdLogout>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      {selectedUser != null ? (
        <div className="chatcontainer bg-[#20232D] w-[70%] max-sm:w-[100%] h-full rounded-r-2xl gap-2 px-2 pt-4 pb-2 flex flex-col max-sm:px-1">
          {/* Chat Header */}
          <div className="w-full h-[80px] flex px-6 justify-between items-center">
            <div className="profile flex items-center gap-[15px]">
              <div className="h-[40px] w-[40px] rounded-full bg-gray-200"></div>
              <h2 className="font-mont text-[20px] text-white">
                {selectedUser.name}
              </h2>
            </div>
            <div
              className="clearchat cursor-pointer h-[40px] w-[40px] flex justify-center items-center"
              onClick={() => {
                setselectedUser(null);
              }}
            >
              <IoIosClose className="text-white" size={30} />
            </div>
          </div>

          {/* Divider */}
          <div className="w-[90%] h-[2px] rounded-2xl bg-gray-500 self-center" />

          {/* Message Area */}
          <div className="messagearea w-full flex flex-col flex-grow overflow-hidden p-2">
            {/* Messages Scrollable */}
            <div className="messages flex flex-col gap-2 overflow-y-auto flex-grow pr-1">
              {messages?.map((item) => (
                <Message
                  key={item._id}
                  self={user._id === item.senderId}
                  message={item.message}
                />
              ))}
              <div className="w-full h-[10px]" ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="inputarea h-[70px] max-sm:h-[60px] mt-2 flex justify-center items-center flex-shrink-0">
              <div className="w-[85%] max-sm:w-[100%] rounded-2xl h-full bg-[#16171F] flex items-center">
                <input
                  type="text"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message here . ."
                  className="w-[93%]  h-full text-[16px] text-gray-100 font-mont pl-4 outline-none bg-transparent"
                />
                <div className="options h-full w-[50px] flex justify-center items-center">
                  <div
                    onClick={() => {
                      sendMessage(message);
                      setMessage("");
                    }}
                    className="w-[40px] h-[40px] rounded-full bg-[#42A4CB] cursor-pointer flex justify-center items-center"
                  >
                    <LuSendHorizontal className="text-white" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="chatcontainer bg-[#20232D] w-[70%] max-sm:w-[100%] h-full rounded-r-2xl gap-4  flex flex-col justify-center items-center">
          <div>
            <PiChatCircleLight className="text-white max-sm:text-[150px] text-[300px]" />
          </div>
          <h2 className="font-mont font-medium text-xl text-white max-sm:text-[15px] max-sm:text-center max-sm:leading-[30px] ">
            Select any user to start / continue{" "}
            <span className="bg-[#42A4CB]  p-1 rounded-[10px]">
              conversation
            </span>{" "}
            .
          </h2>
        </div>
      )}
    </div>
  );
}
