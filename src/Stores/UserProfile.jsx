import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const ApiUrl = import.meta.env.ApiUrl;
export const UserContext = createContext();
const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
  });  
  useEffect(() => {
    axios
      .get("https://backendmern-5yke.onrender.com/user/getdata", { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setUserData({
          _id: response.data.userId,
          name: response.data.name,
          email: response.data.email,
        });
        setIsAuthenticated(true);
      })
      .catch((error) => {
        // console.error("Error fetching user data:", error);
        setIsAuthenticated(false);
        setUserData({ _id: "", name: "", email: "" });
      });
  }, []);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
