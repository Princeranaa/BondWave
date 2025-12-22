import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { toast } from "react-hot-toast"; // Or your preferred toast library

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/reset-password`, {
        token,
        password,
      });

      if (res.data.success) {
        toast.success("Password updated successfully!");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Link invalid or expired");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-base-100 overflow-hidden">
      
      {/* LEFT SIDE: Visual Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=1974" 
          alt="Security" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-900 via-rose-600/20 to-transparent flex flex-col justify-end p-12 text-white">
          <div className="bg-black/20 backdrop-blur-md p-8 rounded-3xl border border-white/10 max-w-md">
            <h1 className="text-4xl font-black mb-2 tracking-tight italic uppercase">Locked In.</h1>
            <p className="text-lg opacity-80 leading-relaxed">
              Your security is our priority. Set a strong password to keep your waves private.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-base-100">
        <div className="w-full max-w-md">
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent inline-block">
              Reset Password
            </h2>
            <p className="text-gray-500">
              Almost there! Just enter your new password below to regain access to your account.
            </p>
          </div>

          <form onSubmit={handleResetSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold uppercase text-xs tracking-widest text-gray-400">New Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input bg-base-200 border-none focus:ring-2 focus:ring-rose-400 w-full h-12 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold uppercase text-xs tracking-widest text-gray-400">Confirm New Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input bg-base-200 border-none focus:ring-2 focus:ring-rose-400 w-full h-12 transition-all"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full h-12 bg-gradient-to-r from-rose-500 to-pink-600 border-none text-white text-lg shadow-lg hover:opacity-90 hover:scale-[1.01] active:scale-95 transition-all"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Update Password"}
            </button>
          </form>

          <div className="mt-8 text-center lg:text-left">
            <Link to="/login" className="text-sm font-bold text-rose-500 hover:underline flex items-center justify-center lg:justify-start gap-2">
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

export default ResetPassword;