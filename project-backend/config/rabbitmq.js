const amqp = require('amqplib');

let channel;

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    await channel.assertQueue('chat-messages', { durable: true });
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('RabbitMQ connection failed:', error);
    process.exit(1);
  }
};

const sendMessageToQueue = async (queue, message) => {
  if (!channel) {
    await connectToRabbitMQ();
  }
  channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
  console.log(`Sent message to ${queue}:`, message);
};

module.exports = { connectToRabbitMQ, sendMessageToQueue };