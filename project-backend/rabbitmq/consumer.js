const amqp = require('amqplib');

const startConsumer = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue('chat-messages', { durable: true });

    console.log('Waiting for messages...');

    channel.consume('chat-messages', (msg) => {
      if (msg !== null) {
        const message = msg.content.toString();
        console.log('Received message:', message);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Consumer error:', error);
  }
};

module.exports = { startConsumer };