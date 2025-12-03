import React, { useEffect } from "react";
import Nabvar from "./Nabvar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/Constant";
import { useDispatch } from "react-redux";
function Body() {
  const dispatchEvent = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();



  // Public routes where profile should NOT be fetched
  const publicRoutes = ["/login", "/signup"];

  
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatchEvent(addUser(res.data));
    } catch (error) {
      const status = error?.response?.status;
      // Only redirect if user is on a PROTECTED route
      if (status === 401 && !publicRoutes.includes(location.pathname)) {
        navigate("/login");
      }
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // Don’t fetch user when on login or signup
    if (!publicRoutes.includes(location.pathname)) {
      fetchUser();
    }
  }, [location.pathname]);

  return (
    <div>
      <Nabvar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Body;
