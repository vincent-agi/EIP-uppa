import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import { eventEmitter } from "./events"; // Import de eventEmitter

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = 3001;

io.on("connection", (socket) => {
  console.log(`🟢 Client connecté: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`🔴 Client déconnecté: ${socket.id}`);
  });
});

// 🔥 Émission des prix agrégés aux clients WebSocket
eventEmitter.on("save-aggregated-price", (stock) => {
  console.log(`📡 Envoi WebSocket: ${stock.symbol} -> $${stock.avgPrice}`);
  io.emit("stock-price-update", stock); // Envoi aux clients
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ WebSocket server running on port ${PORT}`);
});
