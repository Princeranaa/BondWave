const crypto = require("crypto");
const socket = require("socket.io");


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
      ({ firstName, userId, targetUserId, newMessage }) => {
        console.log(firstName + " " + newMessage);

        // const roomId = [userId, targetUserId].sort().join("_");
        const roomId = getSecretRoomId(userId, targetUserId);
        io.to(roomId).emit("messageReceived", { firstName, newMessage });
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeScoket;
