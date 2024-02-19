const express = require('express');
const http = require('http');
const socket = require('socket.io');
const { setupConnection } = require('./queue');
var bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())

const server = http.Server(app);
const io = socket(server);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/readouts', async (req, res) => {
  const message = req.body
  console.log(message);
  // const channel = await setupConnection();
  // channel.publish('direct_exchange', 'meter_readouts', Buffer.from(JSON.stringify(message)));

  res.send('OK');
});


// io.on('connection', (socket) => {
//   const channel = setupConnection();

//   channel.consume('meter_readouts', (msg) => {
//     const message = JSON.parse(msg.content.toString());
//     socket.emit('meter-readout', message);
//   }, { noAck: true });
// });

app.listen(3001, () => {
  console.log('Server is up on port 3001');
});