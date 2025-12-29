import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

function UserCard({ user }) {
  const { _id, firstName, lastName, age, avatarUrl, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    const res = await axios.post(
      BASE_URL + "/request/send/" + status + "/" + userId,
      {},
      { withCredentials: true }
    );
    console.log(res.data.data);
    dispatch(removeUserFromFeed(userId));
  };

  return (
    <div
      className="
      relative
      w-full
      max-w-sm sm:max-w-md md:max-w-lg
      h-[75vh] sm:h-[80vh]
      rounded-3xl
      overflow-hidden
      bg-base-300
      shadow-2xl
      transition-transform duration-300
      hover:scale-[1.02]
    "
    >
      {/* Profile Image */}
      <img
        src={avatarUrl}
        alt="profile"
        className="
        absolute inset-0
        w-full h-full
        object-cover
        transition-transform duration-500
        hover:scale-105
      "
      />

      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* User Info */}
      <div className="absolute bottom-28 left-4 right-4 text-white">
        <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">
          {firstName} {lastName}
          {age && <span className="text-lg font-normal">, {age}</span>}
        </h2>

        {gender && (
          <p className="text-sm uppercase tracking-wide opacity-80 mt-1">
            {gender}
          </p>
        )}

        {about && (
          <p className="text-sm mt-3 opacity-90 line-clamp-3">{about}</p>
        )}
      </div>

      {/* Action Buttons Container */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8">
        {/* Ignore */}
        <button
          onClick={() => handleSendRequest("ignored", _id)}
          className="
          w-14 h-14
          rounded-full
          bg-white/90
          text-red-500
          text-2xl
          shadow-xl
          backdrop-blur-md
          transition-all
          hover:bg-red-500 hover:text-white hover:scale-110
          active:scale-95
        "
        >
          ✕
        </button>

        {/* Like */}
        <button
          onClick={() => handleSendRequest("interested", _id)}
          className="
          w-14 h-14
          rounded-full
          bg-white/90
          text-green-500
          text-2xl
          shadow-xl
          backdrop-blur-md
          transition-all
          hover:bg-green-500 hover:text-white hover:scale-110
          active:scale-95
        "
        >
          ❤
        </button>
      </div>
    </div>
  );
}

export default UserCard;
