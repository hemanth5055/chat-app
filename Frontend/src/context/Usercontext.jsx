import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Usercontextp = React.createContext();

export const ContextFunc = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedUser, setselectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [availableusers, setAvailableusers] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const serverURL = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const getUsers = async (usertoUse) => {
    if (!usertoUse) return;
    try {
      const result = await axios.get(`${serverURL}/api/auth/allusers`, {
        headers: {
          token: token,
        },
      });
      console.log(result);
      if (result) {
        console.log(result.data);
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
        getUsers(result.data.user);
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
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const signupUser = async (name, email, password) => {
    try {
      if (!email || !password || !name) {
        console.log("Missing Details");
        return;
      }
      const result = await axios.post(`${serverURL}/api/auth/signup`, {
        name,
        email,
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
    setUser(null);
    setAvailableusers(null);
    setselectedUser(null);
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
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };
  const sendMessage = async (msg) => {
    if (!msg) return;
    if (!selectedUser || !user) return;
    try {
      const result = await axios.post(
        `${serverURL}/api/msg/send`,
        {
          senderId: user._id,
          recieverId: selectedUser._id,
          message: msg,
        },
        {
          headers: {
            token,
          },
        }
      );
      if (result.data.success === "true") {
        // Use the actual saved message from the response
        console.log(result.data.msg);
        setMessages((prevMessages) => [
          ...(prevMessages || []),
          result.data.msgObj,
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    user,
    availableusers,
    selectedUser,
    messages,
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
