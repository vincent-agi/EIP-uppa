import kafka from "kafka-node";
import { eventEmitter } from "./events";

const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });

const topicToCreate = [
  {
    topic: "stock-prices",
    partitions: 3,
    replicationFactor: 1,
  },
];

// 🏗 Création du topic s'il n'existe pas
client.createTopics(topicToCreate, (err, result) => {
  if (err) {
    console.error("❌ Erreur lors de la création du topic:", err);
  } else {
    console.log("✅ Topic 'stock-prices' créé ou déjà existant.");
  }

  const consumer = new kafka.Consumer(
    client,
    [{ topic: "stock-prices", partition: 0 }],
    { autoCommit: true }
  );

  consumer.on("message", (message) => {
    console.log("✅ Kafka Consumer connecté et reçoit des messages !");
    console.log(`📥 Received Kafka Message: ${message.value.toString()}`);
    const stock = JSON.parse(message.value.toString());
    eventEmitter.emit("stock-price-update", stock);
  });

  consumer.on("error", (err) => {
    console.error("Kafka Consumer Error:", err);
  });
});
