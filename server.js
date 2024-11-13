const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

//create port
const PORT = process.env.PORT || 3000;

//initialize Express app
const app = express();

//Create HTTP server that both express and websocket can use later
const server = http.createServer(app);

//Initialize Websocket server instance to connect websocket' server with express's server
const wsServer = new WebSocket.Server({server});

//Serve static files for 'public' directory
app.use(express.static(path.join(__dirname,'public')));

//use 'Set' to store connected clients. Each client will be presented by different 'ws' below
const clients = new Set();
// var i = 0;

wsServer.on('connection', (ws) => {
    clients.add(ws); 
    console.log('New client connected');
  
    // Handle incoming messages from clients
    ws.on('message', (message) => {
      console.log(`Received: ${message}`);
  
      // Broadcast the message to all other connected clients
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) { //I remove 'client != ws'. However, with comparison 'client != ws' will ensure the message is not sent back to the current sender (ws) and checks that the client's connection is open.
          client.send(message); //send message back to client. No need to convert message to a string
        }
      });
    });
  
    // Handle client disconnections
    ws.on('close', () => {
      clients.delete(ws);
      console.log('Client disconnected');
    });
  });
  
  // Start the server
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });