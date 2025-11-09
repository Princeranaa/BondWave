import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constant";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";


function Nabvar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      return navigate("login");
    } catch (error) {
      console.log("something want wrong", error);
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">👦🏻 devTinder</a>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div>
            Welcome, {user.firstName} {user.lastName}
          </div>
          <div className="dropdown dropdown-end gap-2 mx-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nabvar;
