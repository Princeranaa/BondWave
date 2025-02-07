import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        emailId, // Changed 'email' to 'emailId' to match backend
        password
      },{withCredentials: true});
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message, "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs py-2">
              <div className="label">
                <span className="label-text">Email Id</span>
              </div>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Please Enter Your Email Address"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs py-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Please Enter Password"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div className="card-actions justify-center">
            <button onClick={handleSubmit} className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
