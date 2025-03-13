#!/bin/sh

echo "🚀 Attente de Kafka..."
sleep 10  # Attendre que Kafka démarre complètement

echo "📌 Création du topic 'stock-prices'..."
kafka-topics.sh --create --topic stock-prices --partitions 3 --replication-factor 1 --bootstrap-server kafka:9092

echo "✅ Topic 'stock-prices' créé avec succès."
