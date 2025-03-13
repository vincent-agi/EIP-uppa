import kafka from "kafka-node";

const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
const producer = new kafka.Producer(client);

const STOCK_SYMBOLS = ["AAPL", "GOOGL", "TSLA", "AMZN", "MSFT"];

function getRandomPrice(basePrice: number) {
  const variation = (Math.random() - 0.5) * 10;
  return Math.round((basePrice + variation) * 100) / 100;
}

// Prix de départ des actions
const stockPrices: any = {
  AAPL: 180.0,
  GOOGL: 2700.0,
  TSLA: 900.0,
  AMZN: 3300.0,
  MSFT: 310.0,
};

function sendStockPrice() {
  const symbol = STOCK_SYMBOLS[Math.floor(Math.random() * STOCK_SYMBOLS.length)];
  const newPrice = getRandomPrice(stockPrices[symbol]);

  stockPrices[symbol] = newPrice;

  const message = { symbol, price: newPrice };
  producer.send(
    [{ topic: "stock-prices", messages: JSON.stringify(message) }],
    (err, data) => {
      if (err) {
        console.error("❌ Erreur lors de l'envoi du message Kafka :", err);
      } else {
        console.log(`📤 Envoyé : ${symbol} -> $${newPrice}`);
      }
    }
  );
}

producer.on("ready", () => {
  console.log("🚀 Producteur Kafka prêt !");
  setInterval(sendStockPrice, 10000);
});

producer.on("error", (err) => {
  console.error("❌ Erreur du producteur Kafka :", err);
});
