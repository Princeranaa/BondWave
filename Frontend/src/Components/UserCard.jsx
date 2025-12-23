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
    <div className="relative w-96 h-[520px] rounded-3xl overflow-hidden shadow-xl bg-base-300 group">
      
      {/* Profile Image */}
      <img
        src={avatarUrl}
        alt="profile"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* User Info */}
      <div className="absolute bottom-24 left-5 right-5 text-white">
        <h2 className="text-2xl font-bold tracking-wide">
          {firstName} {lastName}
          {age && <span className="text-xl font-normal">, {age}</span>}
        </h2>

        {gender && (
          <p className="text-sm opacity-80 mt-1 capitalize">{gender}</p>
        )}

        {about && (
          <p className="text-sm mt-2 line-clamp-3 opacity-90">
            {about}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-6">
        <button
          onClick={() => handleSendRequest("ignored", _id)}
          className="btn btn-circle btn-lg bg-white text-red-500 hover:bg-red-500 hover:text-white shadow-lg transition-all"
        >
          ✕
        </button>

        <button
          onClick={() => handleSendRequest("interested", _id)}
          className="btn btn-circle btn-lg bg-white text-green-500 hover:bg-green-500 hover:text-white shadow-lg transition-all"
        >
          ❤
        </button>
      </div>
    </div>
  );
}

export default UserCard;
