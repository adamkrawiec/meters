const amqp = require('amqplib');

const CHANNEL_NAME = 'meter_readouts';

let readoutsChannel;

const setupChannel = (channel) => {
  channel.assertExchange('direct_exchange', 'direct', { durable: false });
  channel.assertQueue(CHANNEL_NAME, { durable: false });
  channel.bindQueue(CHANNEL_NAME, 'direct_exchange', 'readout');
  return channel;
};

const setupConnection = async() => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    readoutsChannel = setupChannel(channel);
  }
  catch (error) {
    console.error(error);
  }

  return readoutsChannel
}

module.exports = {
  setupConnection,
  CHANNEL_NAME
}