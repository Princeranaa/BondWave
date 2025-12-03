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

  // Submit
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
          skills: skills.split(",").map((s) => s.trim()), // convert to array
        },
        { withCredentials: true }
      );
      console.log("signup========>", response.data.data)
      dispatch(addUser(response.data.data));
      navigate("/");

    } catch (err) {
      setError(err.response?.data || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="card bg-base-200 w-[450px] shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Create Account</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* First Name */}
          <label className="form-control w-full py-2">
            <span className="label-text">First Name *</span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered"
            />
          </label>

          {/* Last Name */}
          <label className="form-control w-full py-2">
            <span className="label-text">Last Name</span>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered"
            />
          </label>

          {/* Email */}
          <label className="form-control w-full py-2">
            <span className="label-text">Email *</span>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered"
            />
          </label>

          {/* Password */}
          <label className="form-control w-full py-2">
            <span className="label-text">Password *</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered"
            />
          </label>

          {/* Age */}
          <label className="form-control w-full py-2">
            <span className="label-text">Age (must be 18+)</span>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered"
            />
          </label>

          {/* Gender */}
          <label className="form-control w-full py-2">
            <span className="label-text">Gender</span>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select select-bordered"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          {/* Photo URL */}
          <label className="form-control w-full py-2">
            <span className="label-text">Photo URL</span>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="input input-bordered"
              placeholder="Leave empty for default"
            />
          </label>

          {/* About */}
          <label className="form-control w-full py-2">
            <span className="label-text">About</span>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="textarea textarea-bordered"
            ></textarea>
          </label>

          {/* Skills */}
          <label className="form-control w-full py-2">
            <span className="label-text">Skills (comma separated)</span>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="React, Node, MongoDB"
              className="input input-bordered"
            />
          </label>

          <div className="card-actions justify-center mt-4">
            <button
              onClick={handleSubmit}
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </div>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
