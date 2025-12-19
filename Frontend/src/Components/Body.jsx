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

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatchEvent(addUser(res.data));
    } catch (error) {
      const status = error?.response?.status;
      if (error?.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Nabvar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Body;
