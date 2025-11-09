import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    //Clear Errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-10 my-10 px-4">
        {/* Edit Profile Card */}
        <div className="card bg-base-200 w-full max-w-md shadow-lg rounded-2xl">
          <div className="card-body">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Edit Profile
            </h2>

            <div className="space-y-5">
              <label className="form-control w-full">
                <span className="label-text font-medium">First Name</span>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text font-medium">Last Name</span>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text font-medium">Photo URL</span>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text font-medium">Age</span>
                <input
                  type="number"
                  value={age}
                  className="input input-bordered w-full"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text font-medium">Gender</span>
                <input
                  type="text"
                  value={gender}
                  className="input input-bordered w-full"
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text font-medium">About</span>
                <textarea
                  value={about}
                  className="textarea textarea-bordered w-full resize-none"
                  rows={3}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary w-full" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* User Card Preview (Balanced Size) */}
        <div className="w-full max-w-sm flex justify-center">
          <div className="card bg-base-200 shadow-md rounded-2xl w-full h-full max-h-[500px] flex flex-col items-center text-center p-5">
            <figure className="w-32 h-32 rounded-full overflow-hidden border border-gray-300 mb-4">
              <img
                src={photoUrl || "https://via.placeholder.com/150"}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </figure>
            <h2 className="text-lg font-semibold mb-1">
              {firstName || "First"} {lastName || "Last"}
            </h2>
            <p className="text-sm text-gray-500 mb-2">{gender || "Gender"}</p>
            <p className="text-sm text-gray-500 mb-2">Age: {age || "N/A"}</p>
            <p className="text-sm text-gray-600 italic max-w-xs">
              {about || "Tell something about yourself..."}
            </p>
          </div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="toast toast-top toast-center z-50">
            <div className="alert alert-success">
              <span>Profile saved successfully.</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EditProfile;
