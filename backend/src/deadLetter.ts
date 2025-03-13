import { eventEmitter } from "./events";
import Redis from "ioredis";

const redis = new Redis({ host: "redis" });

eventEmitter.on("stock-price-update", async (stock) => {
  if (!stock.price) {
    console.error(`Invalid data for ${stock.symbol}, sending to DLC...`);
    await redis.lpush("dead-letter-queue", JSON.stringify(stock));
  }
});
