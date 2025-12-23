import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function EditProfile({ user }) {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(user.avatarUrl);

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("about", about);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      dispatch(addUser(res.data.data));

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data || "Update failed");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-10 my-10 px-4">

      {/* Edit Profile */}
      <div className="card bg-base-200 w-full max-w-md shadow-lg rounded-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Edit Profile
          </h2>

          <div className="space-y-4">

            <label className="form-control">
              <span className="label-text">First Name</span>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered"
              />
            </label>

            <label className="form-control">
              <span className="label-text">Last Name</span>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered"
              />
            </label>

            {/* ✅ IMAGE UPLOAD */}
            <label className="form-control">
              <span className="label-text">Profile Photo</span>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImageFile(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </label>

            <label className="form-control">
              <span className="label-text">Age</span>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered"
              />
            </label>

            <label className="form-control">
              <span className="label-text">Gender</span>
              <input
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input input-bordered"
              />
            </label>

            <label className="form-control">
              <span className="label-text">About</span>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="textarea textarea-bordered resize-none"
                rows={3}
              />
            </label>

          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button className="btn btn-primary w-full mt-4" onClick={saveProfile}>
            Save Profile
          </button>
        </div>
      </div>

      {/* Preview Card */}
      <div className="card bg-base-200 shadow-md rounded-2xl w-80 p-5 text-center">
        <figure className="w-32 h-32 mx-auto rounded-full overflow-hidden border mb-4">
          <img
            src={preview}
            alt="Avatar"
            className="object-cover w-full h-full"
          />
        </figure>

        <h2 className="font-semibold">
          {firstName} {lastName}
        </h2>

        <p className="text-sm text-gray-500">{gender}</p>
        <p className="text-sm text-gray-500">Age: {age}</p>

        <p className="text-sm italic mt-2">
          {about || "Tell something about yourself..."}
        </p>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
