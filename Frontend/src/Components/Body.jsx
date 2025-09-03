import React, { useEffect } from "react";
import Nabvar from "./Nabvar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/Constant";
import { useDispatch } from "react-redux";
function Body() {
  const dispatchEvent = useDispatch();
  const naviagate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatchEvent(addUser(res.data));
    } catch (error) {
      if(error.status === 401){
        naviagate("/login");
      }
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Nabvar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;
