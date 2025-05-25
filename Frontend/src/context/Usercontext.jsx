import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { useRef } from "react";

export const Usercontextp = React.createContext();

export const ContextFunc = ({ children }) => {
  const [user, setUser] = useState(null);
  const [socketSt, setsocketSt] = useState(null);
  const [selectedUser, setselectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [availableusers, setAvailableusers] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [onlineUsers, setOnlineUsers] = useState([]);

  const selectedUserRef = useRef(null);

  const serverURL = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth();
  }, []);
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  const getUsers = async (usertoUse) => {
    if (!usertoUse) return;
    try {
      const result = await axios.get(`${serverURL}/api/auth/allusers`, {
        headers: {
          token: token,
        },
      });
      if (result) {
        setAvailableusers(result.data.allusers);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const checkAuth = async () => {
    if (!token) {
      navigate("/login");
    }
    try {
      const result = await axios.get(`${serverURL}/api/auth/check`, {
        headers: {
          token: token,
        },
      });
      if (!result) {
      }
      if (result.data.success == "true") {
        setUser(result.data.user);
        // getUsers(result.data.user);
        connectTosocket(result.data.user);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const loginUser = async (email, password) => {
    try {
      if (!email || !password) {
        console.log("Missing Details");
        return;
      }
      const result = await axios.post(`${serverURL}/api/auth/login`, {
        email,
        password,
      });
      if (result.data.success == "true") {
        setToken(result.data.token);
        setUser(result.data.user);
        connectTosocket(result.data.user);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const signupUser = async (name, email, password, bio) => {
    try {
      if (!email || !password || !name || !bio) {
        console.log("Missing Details");
        return;
      }
      const result = await axios.post(`${serverURL}/api/auth/signup`, {
        name,
        email,
        bio,
        password,
      });
      if (result.data.success == "true") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const logoutUser = () => {
    socketSt.disconnect(true);
    setUser(null);
    setAvailableusers(null);
    setselectedUser(null);
    setOnlineUsers([]);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getMessages = async () => {
    if (selectedUser == null || user == null) return;
    try {
      const result = await axios.post(
        `${serverURL}/api/msg/getmessages`,
        {
          senderId: user._id,
          recieverId: selectedUser._id,
        },
        {
          headers: {
            token,
          },
        }
      );
      setMessages(result.data.messages);
    } catch (error) {
      console.log(error.message);
    }
  };
  const sendMessage = async (msg) => {
    if (!msg) return;
    if (!selectedUser || !user) return;
    try {
      const load = {
        senderId: user._id,
        recieverId: selectedUser._id,
        message: msg,
      };
      const result = await axios.post(
        `${serverURL}/api/msg/send`,
        {
          ...load,
        },
        {
          headers: {
            token,
          },
        }
      );
      if (result.data.success === "true") {
        // Use the actual saved message from the response
        setMessages((prevMessages) => [
          ...(prevMessages || []),
          result.data.msgObj,
        ]);
        socketSt.emit("communication", result.data.msgObj);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectTosocket = async (userf) => {
    const socket = io.connect(serverURL);
    socket.on("connect", () => {
      setsocketSt(socket); // Assuming this is a state setter
      socket.emit("SuccessfullConnection", `${userf._id}`);
    });
    socket.on("messageRecieved", (load) => {
      const currentSelected = selectedUserRef.current;
      if (currentSelected && currentSelected._id === load.senderId) {
        setMessages((prevMessages) => [...(prevMessages || []), load]);
      } else {
        console.log("Message ignored: not from selected user");
      }
    });
    socket.on("userOnline", (userIds) => {
      setOnlineUsers(userIds);
    });

    socket.on("userOffline", (userIds) => {
      setOnlineUsers(userIds);
    });
  };

  const data = {
    user,
    availableusers,
    selectedUser,
    messages,
    socketSt,
    onlineUsers,
    getMessages,
    setMessages,
    setselectedUser,
    sendMessage,
    checkAuth,
    getUsers,
    loginUser,
    signupUser,
    logoutUser,
  };

  return <Usercontextp.Provider value={data}>{children}</Usercontextp.Provider>;
};
