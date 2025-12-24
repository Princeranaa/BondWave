import React, { useRef, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // optional icon (install if needed)
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";

function Chat() {
  const { targetUserId } = useParams();
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const location = useLocation();
  const targetUser = location.state?.targetUser;

  /* get the user id */
  const user = useSelector((store) => store.user);
  console.log("chatUser", user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log("chatmessagesssss-->", chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessage(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  /* send message function  */
  const socketRef = useRef(null);

  const sendMessage = () => {
    if (!socketRef.current) return;
    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage(""); //clear the msg on the input field
  };

  useEffect(() => {
    if (!userId) return;

    socketRef.current = createSocketConnection();

    /* joined a chat of the users */
    socketRef.current.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socketRef.current.on("messageReceived", ({ firstName, text }) => {
      // console.log("hello user---->", firstName + " " + text);
      setMessage((message) => [...message, { firstName, text }]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [userId, targetUserId]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-purple-900 via-black to-gray-900 flex justify-center p-4 overflow-hidden">
      {/* Floating Chat Card */}
      <div className="w-screen max-w-4xl h-[80vh] rounded-2xl bg-base-300/60 backdrop-blur-xl shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-purple-900 via-black to-gray-900 text-white flex items-center gap-3 shadow-md">
          <Link to="/connections">
            <button className="btn btn-circle btn-sm bg-white/20 border-none hover:bg-white/30">
              <ArrowLeft size={18} />
            </button>
          </Link>

          <div className="avatar">
            <div className="w-12 rounded-full ring-2 ring-white/40">
              <img
                src={
                  targetUser?.avatarUrl ||
                  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe"
                }
              />
            </div>
          </div>

          {targetUser && (
            <div>
              <h2 className="text-xl font-bold">
                {targetUser.firstName + " " + targetUser.lastName}
              </h2>
              <p className="text-sm opacity-80">Online</p>
            </div>
          )}
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {message.map((msg, index) =>
            msg.firstName === user.firstName ? (
              /* Right message (YOU) */
              <div key={index} className="flex items-end justify-end gap-2">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl max-w-[70%]">
                  <p>{msg.text}</p>
                </div>
              </div>
            ) : (
              /* Left message (OTHER USER) */
              <div key={index} className="flex items-start gap-2">
                <div className="p-3 bg-base-200 rounded-xl max-w-[70%]">
                  <p>{msg.text}</p>
                </div>
              </div>
            )
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-base-200 flex items-center gap-3 border-t border-white/10">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Type a message..."
            className="input input-bordered w-full bg-base-100 rounded-full shadow-md"
          />
          <button
            onClick={sendMessage}
            className="btn btn-primary rounded-full px-6 shadow-lg hover:scale-105 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
