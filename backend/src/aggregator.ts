import { eventEmitter } from "./events";
import Redis from "ioredis";

const redis = new Redis({ host: "redis" });
const WINDOW_SIZE = 5;

async function aggregateStockPrice(stock: { symbol: string; price: number }) {
  const key = `stock:${stock.symbol}`;
  const prices = await redis.lrange(key, 0, WINDOW_SIZE - 1);

  if (prices.length === 0) {
    console.warn(`⚠️ Aucune donnée stockée pour ${stock.symbol}, initialisation...`);
  }

  const numericPrices = prices.map(Number).filter((p) => !isNaN(p));
  numericPrices.unshift(stock.price);

  if (numericPrices.length > WINDOW_SIZE) numericPrices.pop();

  if (numericPrices.length === 0) {
    console.error(`❌ Erreur: Aucun prix valide pour ${stock.symbol}`);
    return;
  }

  const avgPrice = numericPrices.reduce((sum, p) => sum + p, 0) / numericPrices.length;

  await redis.lpush(key, stock.price);
  await redis.ltrim(key, 0, WINDOW_SIZE - 1);

  console.log(`✅ Agrégation réussie pour ${stock.symbol}: Prix moyen -> ${avgPrice}`);

  eventEmitter.emit("save-aggregated-price", { symbol: stock.symbol, avgPrice });
}

eventEmitter.on("stock-price-update", aggregateStockPrice);
