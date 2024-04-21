const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let items = []; // Хранение списка элементов на сервере

io.on("connection", (socket) => {
  console.log("New client connected");

  // Отправка текущего списка новому пользователю
  socket.emit("initialItems", items);

  // Обработка добавления нового элемента
  socket.on("addItem", (item) => {
    items = [item, ...items];
    io.emit("itemAdded", item); // Отправка нового элемента всем клиентам
  });

  // Обработка удаления элемента
  socket.on("removeItem", (id) => {
    items = items.filter((item) => item.id !== id);
    io.emit("itemRemoved", id); // Уведомление всех клиентов об удалении элемента
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
