import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constant";

function Login() {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailId || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const response = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(response.data));
      navigate("/feed");
    } catch (err) {
      setError(
        err.response?.data ||
          "We couldn’t log you in. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-base-300 overflow-hidden">
      {/* LEFT: Image / Branding */}
      <div className="hidden lg:flex w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1506014299253-3725319c0f69?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y291cGxlfGVufDB8fDB8fHww"
          alt="Happy couple"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-rose-900 via-rose-600/40  to-transparent flex flex-col justify-end p-12 text-white">
          <h1 className="text-5xl font-black mb-4 leading-tight">
            Find your wave 💞
          </h1>
          <p className="text-lg opacity-90 max-w-md">
            Real people. Real stories. Start meaningful connections today.
          </p>
        </div>
      </div>

      {/* RIGHT: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 md:px-16">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h2 className="text-3xl font-extrabold text-rose-500">
              💖 BondWave
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Where connections begin
            </p>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold mb-2">Welcome Back</h2>
            <p className="text-gray-500">Login to continue your love journey</p>
          </div>

          {/* {error && (
            <div className="alert alert-error mb-6 py-2 text-sm shadow-sm">
              {error}
            </div>
          )} */}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs font-semibold uppercase tracking-wide">
                  Email Address
                </span>
              </label>
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="input h-12 bg-base-200 border-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label flex justify-between">
                <span className="label-text text-xs font-semibold uppercase tracking-wide">
                  Password
                </span>
                <Link to="/forget-password">
                <span className="label-text-alt text-rose-500 cursor-pointer">
                  Forgot?
                </span>
                </Link>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input h-12 bg-base-200 border-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full h-12 mt-6 text-lg border-none text-white bg-gradient-to-r from-rose-500 to-pink-600 shadow-lg hover:opacity-90 disabled:opacity-70"
            >
              {loading ? "Signing you in..." : "Login to BondWave"}
            </button>
          </form>

          {/*   <div className="divider my-8 text-xs uppercase tracking-widest">
            Or continue with
          </div> */}

          {/* <div className="grid grid-cols-2 gap-4">
            <button className="btn btn-outline">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="w-5 h-5 mr-2"
                alt="Google"
              />
              Google
            </button>
            <button className="btn btn-outline">
              <img
                src="https://www.svgrepo.com/show/448234/facebook.svg"
                className="w-5 h-5 mr-2"
                alt="Facebook"
              />
              Facebook
            </button>
          </div> */}

          <p className="text-center text-sm mt-10 text-gray-500">
            New to BondWave?{" "}
            <Link
              to="/signup"
              className="text-rose-500 font-bold hover:underline"
            >
              Create an account
            </Link>
          </p>

          <p className="text-center text-xs text-gray-400 mt-4">
            🔒 Your privacy matters. We never share your data.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
