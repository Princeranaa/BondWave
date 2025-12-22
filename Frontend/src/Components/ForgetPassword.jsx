import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { toast } from "react-hot-toast";

function ForgetPassword() {
  const [emailId, setEmail] = useState("");

  const handleResetRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/forgot-password`, { emailId });
      toast.success("Reset link sent! Please check your email 📧");
      console.log(response.data);
      setEmail("")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen w-full bg-base-100 overflow-hidden">
      
      {/* LEFT SIDE: Calm/Peaceful Image (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=1974" 
          alt="Peaceful sunset" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-900 via-rose-600/20 to-transparent flex flex-col justify-end p-12 text-white">
          <div className="bg-black/20 backdrop-blur-md p-8 rounded-3xl border border-white/10">
            <h1 className="text-4xl font-black mb-2 tracking-tight">Don't worry.</h1>
            <p className="text-lg opacity-80 leading-relaxed">
              We'll help you get back to finding your match in no time.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Reset Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent inline-block">
              Forgot Password?
            </h2>
            <p className="text-gray-500">
              Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>
          </div>

          

          <form onSubmit={handleResetRequest} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold uppercase text-xs tracking-widest text-gray-500">Email Address</span>
              </label>
              <input
                type="email"
                required
                placeholder="yourname@example.com"
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
                className="input bg-base-200 border-none focus:ring-2 focus:ring-rose-400 w-full h-12"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full h-12 bg-gradient-to-r from-rose-500 to-pink-600 border-none text-white text-lg shadow-lg hover:opacity-90"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/login" className="text-sm font-bold text-rose-500 hover:underline flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;