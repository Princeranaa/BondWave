import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import { useEffectEvent } from "react";
import UserCard from "./UserCard";

function Feed() {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    const res = await axios(BASE_URL + "/feed", { withCredentials: true });
    dispatch(addFeed(res?.data?.data));
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed?.[0]} />
      </div>
    )
  );
}

export default Feed;
