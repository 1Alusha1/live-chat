import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import Users from "./use/users.js";
const users = new Users();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("join", (data) => {
    socket.join(data.room);
    users.remove(socket.id);

    users.add({
      id: socket.id,
      room: data.room,
      name: data.name,
    });

    socket.broadcast
      .to(data.room)
      .emit("systemMessage", {
        system: true,
        msg: `Зашел новый пользователь ${data.name}`,
      });

    io.to(data.room).emit("userList", users.updateUserList(data));

    socket.on("leave", async () => {
      await socket.broadcast
        .to(data.room)
        .emit("systemMessage", {
          system: true,
          msg: `Пользователь ${data.name} вышел`,
        });

      await users.remove(socket.id);

      await io.to(data.room).emit("userList", users.updateUserList(data));
    });

    socket.emit("userId", socket.id);
    socket.emit("user", users.getUser(socket.id));

    socket.on("disconnect", async () => {
      await socket.broadcast
        .to(users.getUser(socket.id).room)
        .emit("systemMessage", {
          system: true,
          msg: `Пользователь ${users.getUser(socket.id).name} вышел`,
        });
      await users.remove(socket.id);
      await io.to(data.room).emit("userList", users.updateUserList(data));
    });
  });

  socket.on("message", (message) => {
    const user = users.getUser(socket.id);
    io.to(user.room).emit("rendermsg", {
      msg: message,
      name: user.name,
      id: socket.id,
    });
  });

  socket.on("disconnect", async () => {
    console.log("disconnected");
  });
});

app.set("port", 8080);
httpServer.listen(app.get("port"), function () {
  var port = httpServer.address().port;
  console.log("Running on : ", port);
});
