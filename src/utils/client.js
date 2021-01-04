// var WebSocketClient = require('websocket').client;

const ip = '192.168.0.211';
const port = 5000;

const client = new WebSocket(`ws://${ip}:${port}/ws`);

export default client;
