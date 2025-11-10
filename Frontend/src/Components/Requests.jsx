import React, { useEffect } from 'react'
import { BASE_URL } from "../utils/Constant";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';

function Requests() {

  const requests  = useSelector((state)=> state.requests);
  const dispatch = useDispatch()

  const fetchRequests = async()=>{
    
    const res = await axios.get(BASE_URL + "/user/requests/received", {withCredentials:true});
    console.log("request data", res.data.data);
    dispatch(addRequests(res.data.data));
  }

  useEffect(()=>{
    fetchRequests();
  },[])

   if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
  <div className="text-center my-10 px-4">
    <h1 className="font-bold text-white text-3xl mb-6">Connection Requests</h1>

    <div className="flex flex-col gap-6 max-w-3xl mx-auto overflow-auto">
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-base-300 rounded-xl p-4 shadow-md gap-4"
          >
            {/* Profile Photo */}
            <div className="flex justify-center sm:justify-start">
              <img
                src={photoUrl}
                alt="photo"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-left">
              <h2 className="font-semibold text-xl text-white">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-gray-300">
                  {age}, {gender}
                </p>
              )}
              {about && <p className="text-gray-400 text-sm mt-1">{about}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center sm:justify-end gap-3">
              <button
                className="btn btn-error btn-sm sm:btn-md"
                // onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-primary btn-sm sm:btn-md"
                // onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

};

export default Requests