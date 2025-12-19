import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constant";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!firstName || !emailId || !password) {
      setError("First name, email, and password are required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          emailId,
          password,
          age,
          gender,
          photoUrl,
          about,
          skills: skills.split(",").map((s) => s.trim()),
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data.data));
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* h-screen and overflow-hidden prevent the whole page from scrolling */
    <div className="flex h-screen w-full bg-base-100 overflow-hidden">
      
      {/* LEFT SIDE: Fixed Image */}
      <div className="hidden lg:flex lg:w-5/12 h-full relative">
        <img 
          src="https://static.vecteezy.com/system/resources/thumbnails/054/691/236/small_2x/couple-sharing-an-intimate-moment-among-blooming-roses-at-dusk-with-soft-lights-in-the-background-free-photo.jpeg" 
          alt="BondWave Couple" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* The Sunset Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-rose-900 via-rose-600/20 to-transparent flex flex-col justify-end p-12 text-white">
           <div className="bg-black/20 backdrop-blur-md p-8 rounded-3xl border border-white/10">
            <h1 className="text-4xl font-black mb-2 tracking-tight">BondWave</h1>
            <p className="text-lg opacity-80 leading-relaxed">
              Find the connection you've been waiting for.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Internally Scrollable Form */}
      <div className="w-full lg:w-7/12 h-full flex flex-col bg-base-100">
        {/* This div handles the internal scroll if content is too tall */}
        <div className="flex-1 overflow-y-auto  px-6 py-8 md:px-16 lg:py-12 custom-scrollbar">
          <div className="max-w-xl mx-auto">
            
            <div className="mb-6">
              <h2 className="text-3xl font-extrabold text-rose-500">Create Account</h2>
              <p className="text-gray-500 text-sm">Join the community today.</p>
            </div>

            {error && (
              <div className="alert alert-error mb-4 py-2 text-sm shadow-sm">
                <span>{error}</span>
              </div>
            )}

            {/* Form Grid - Two columns to save vertical space */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
              <div className="form-control">
                <label className="label py-1"><span className="label-text text-xs font-bold uppercase">First Name</span></label>
                <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="input input-sm bg-base-200 border-none focus:ring-1 focus:ring-rose-400 h-10" />
              </div>
              
              <div className="form-control">
                <label className="label py-1"><span className="label-text text-xs font-bold uppercase">Last Name</span></label>
                <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="input input-sm bg-base-200 border-none focus:ring-1 focus:ring-rose-400 h-10" />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label py-1"><span className="label-text text-xs font-bold uppercase">Email</span></label>
                <input type="email" value={emailId} onChange={(e)=>setEmail(e.target.value)} className="input input-sm bg-base-200 border-none focus:ring-1 focus:ring-rose-400 h-10" />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label py-1"><span className="label-text text-xs font-bold uppercase">Password</span></label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="input input-sm bg-base-200 border-none focus:ring-1 focus:ring-rose-400 h-10" />
              </div>

              <div className="form-control">
                <label className="label py-1"><span className="label-text text-xs font-bold uppercase">Age</span></label>
                <input type="number" value={age} onChange={(e)=>setAge(e.target.value)} className="input input-sm bg-base-200 border-none focus:ring-1 focus:ring-rose-400 h-10" />
              </div>

              <div className="form-control">
                <label className="label py-1"><span className="label-text text-xs font-bold uppercase">Gender</span></label>
                <select value={gender} onChange={(e)=>setGender(e.target.value)} className="select select-sm bg-base-200 border-none h-10">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="form-control md:col-span-2">
                      <label className="label py-1">
                        <span className="label-text text-xs font-bold uppercase">
                          Profile Photo URL
                        </span>
                      </label>
                      <input
                        type="text"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                        className="input input-sm bg-base-200 border-none focus:ring-1 focus:ring-rose-400 h-10"
                      />
              </div>


              <div className="form-control md:col-span-2">
                <label className="label py-1"><span className="label-text text-xs font-bold uppercase">Interests</span></label>
                <input type="text" value={skills} onChange={(e)=>setSkills(e.target.value)} placeholder="Music, Travel, Cooking..." className="input input-sm bg-base-200 border-none h-10" />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label py-1"><span className="label-text text-xs font-bold uppercase">Bio</span></label>
                <textarea value={about} onChange={(e)=>setAbout(e.target.value)} className="textarea textarea-sm bg-base-200 border-none h-20 resize-none" placeholder="Tell us about yourself..."></textarea>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="btn btn-primary w-full mt-6 bg-gradient-to-r from-rose-500 to-pink-600 border-none text-white shadow-lg"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : "Create My Profile"}
            </button>

            <p className="text-center mt-4 text-sm text-gray-500 pb-4">
              Already a member? <Link to="/login" className="text-rose-500 font-bold hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;