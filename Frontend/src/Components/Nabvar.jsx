import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constant";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";


function Nabvar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

return (
    <div className="navbar bg-base-100 shadow-md px-2 md:px-8 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      {/* LEFT SECTION */}
      <div className="navbar-start">
        {/* HAMBURGER: Visible on sm and md, hidden on lg */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-52 border border-base-200">
            <li><Link to="/feed">Explore</Link></li>
            <li><Link to="/connections">Connections</Link></li>
            <li><Link to="/requests">Requests</Link></li>
            <li><Link to="/premium" className="text-orange-500 font-bold">Premium</Link></li>
          </ul>
        </div>
        
        <Link to="/" className="btn btn-ghost text-xl md:text-2xl font-black tracking-tighter text-rose-500 gap-2 px-1">
          <span>🌊</span>
          <span className="inline-block">BondWave</span>
        </Link>
      </div>

      {/* CENTER SECTION: Hidden on sm/md, Visible only on lg */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold gap-2">
          <li><Link to="/feed" className="hover:text-rose-500 transition-colors">Explore</Link></li>
          <li><Link to="/connections" className="hover:text-rose-500 transition-colors">Connections</Link></li>
          <li><Link to="/requests" className="hover:text-rose-500 transition-colors">Requests</Link></li>
          <li><Link to="/premium" className="hover:text-rose-500 text-orange-500">✨ Premium</Link></li>
        </ul>
      </div>

      {/* RIGHT SECTION */}
      <div className="navbar-end gap-2">
        {user ? (
          <div className="flex items-center gap-2">
            {/* Name: Hidden on small mobile, shown from md up */}
            <span className="hidden md:inline-block text-sm font-bold opacity-70 italic">
              {user.firstName}
            </span>
            
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online ring-2 ring-violet-500 ring-offset-2 ring-offset-base-100">
                <div className="w-10 rounded-full">
                  <img alt="User" src={user.avatarUrl || "https://via.placeholder.com/150"} />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200">
                <li className="menu-title text-rose-500 font-bold px-4 py-2">Account</li>
                <li><Link to="/profile">My Profile</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <div className="divider my-0"></div>
                <li><button onClick={handleLogout} className="text-error font-bold">Logout</button></li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
            <Link to="/signup" className="btn btn-primary btn-sm bg-rose-500 border-none text-white">Join</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nabvar;
