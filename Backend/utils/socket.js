const crypto = require("crypto");
const socket = require("socket.io");
const Chat = require("../../Backend/model/Chat");

const initializeScoket = (server) => {
  const getSecretRoomId = (userId, targetUserId) => {
    return crypto
      .createHash("sha256")
      .update([userId, targetUserId].sort().join("$"))
      .digest("hex");
  };

  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log("user connection", socket.id);

    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      // const roomId = [userId, targetUserId].sort().join("_");
      const roomId = getSecretRoomId(userId, targetUserId);

      // console.log("roomId--->", userId + " targetUserId", targetUserId);

      console.log(firstName + "joined roomId--->", roomId);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        // console.log(firstName + " " + text);
        // const roomId = [userId, targetUserId].sort().join("_");
        // console.log("PAYLOAD RECEIVED:", {
        //   firstName,
        //   lastName,
        //   userId,
        //   targetUserId,
        //   text,
        // });

        if (!userId || !targetUserId) {
          console.error("Invalid Payload: Missing userId or targetUserId");
          return;
        }

        try {
          const roomId = getSecretRoomId(userId, targetUserId);
          console.log(firstName + " " + text);
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();
          io.to(roomId).emit("messageReceived", { firstName, lastName, text });
        } catch (error) {
          console.error("sendMessage Error:", error.message, error);
        }
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeScoket;
