# Real-Time Market Price Updates with Enterprise Integration Patterns

## Context and Subject

This university project focuses on implementing `Enterprise Integration Patterns` (EIP) in a real-world scenario: a real-time stock market price update system. The goal is to explore how different integration patterns can be applied to process, aggregate, and distribute stock price updates efficiently and reliably.

Financial markets require real-time data processing to track stock price fluctuations, which is a high-throughput and low-latency challenge. The project simulates a stock trading environment where price updates are produced at regular intervals, processed through event-driven architectures, and displayed in a frontend application in real time.

## Problem Statement

Handling real-time stock price updates presents multiple challenges:

`High Volume and Frequency`: Stock prices change rapidly, requiring an efficient mechanism to process and distribute updates without bottlenecks.
`Data Aggregation`: Individual price updates are not always useful; traders need aggregated price trends over time to make decisions.
`Fault Tolerance`: Network issues, crashes, or data corruption can lead to lost or incorrect stock price updates. A mechanism must be in place to handle failures.
`Asynchronous Communication`: The system should be loosely coupled so that components like data producers, aggregators, and consumers can operate independently.

## Proposed Solution Using Enterprise Integration Patterns
To address these challenges, the project integrates multiple EIPs using Kafka, Redis, PostgreSQL, WebSockets, and Node.js:

### Architecture

If you want see an achitecture with `Mermaid`format, please see [Real-Time market EIP](./architecture.md)

### Event-Driven Consumer (EIP) → Kafka Consumer

Stock price updates are streamed as Kafka messages from a producer.
A Kafka consumer listens for these events asynchronously and processes them.

### Aggregator (EIP) → Price Averaging in Redis

The system maintains a rolling window of recent stock prices.
A price aggregator computes the average price over a time window and emits this to WebSocket clients.
This prevents frontend overload by reducing message frequency while maintaining accuracy.

### Dead Letter Channel (EIP) → Error Handling in PostgreSQL

If a stock price update fails processing (e.g., missing data, invalid format), it is redirected to a Dead Letter Channel.
Instead of being lost, these failed messages are stored in PostgreSQL for debugging and potential reprocessing.
WebSockets for Real-Time Data Streaming

The aggregated stock prices are sent to the frontend via WebSockets, ensuring low-latency updates without polling.
This enables users to see live stock price changes without refreshing their page.

## How run it

1. Please install Docker and Git on your machine

2. clone project

```bash
git clone https://github.com/vincent-agi/EIP-uppa.git
```

3. Run project

Move to project folder

```bash
cd EIP-uppa
```

Run docker-compose

```bash
docker-compose up -d
```

## Services

### Frontend

To show prices update in real-time open browser to [localhost:4200](http://localhost:4200)

### Backend

You can see backend logs in as soon as arrived with `Docker-Desktop` or following command

```bash
docker logs eip-project-backend-1 --follow
```