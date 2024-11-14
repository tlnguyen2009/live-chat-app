# Live Chat Application

A real-time chat application built with HTML, CSS, and JavaScript on the frontend, and Node.js with WebSockets on the backend. This application enables multiple users to communicate instantly, with messages neatly aligned to the sender's and receiver's sides.

![Demo Image](/Images/live-chat-demo-img.png)

## Installation

Follow these steps to set up and run the Live Chat Application on your local machine.

### Prerequisites

- **Node.js & npm**: Ensure that you have [Node.js](https://nodejs.org/) and npm installed on your system.

### Steps

1. **Clone the Repository**

   Clone the project to your local machine using the following command:

   ```bash
   git clone https://github.com/tlnguyen2009/live-chat-app.git
   ```

2. **Navigate to the Project Directory**

    Change your current directory to the project's root folder:
    
   ```bash    
    cd live-chat-app
   ```

3. **Install Dependencies**

    Install the necessary Node.js packages by running:
    
    ```bash    
    npm install
    ```

4. **Start the Server**
    
    Launch the server with the following command:

    ```bash
    npm start
    ```

5. **Access the Application**

    Open one web browser and navigate to `http://localhost:3000`. And open another tab and also navigate to `http://localhost:3000` again. Now, you can start using the Live Chat application by chatting between two windows.
    
## Usage

   1. **Enter a Username:** *(Future feature, NOT updated yet)* <br />
    When you open the application, you'll be prompted to enter a username. This name will appear next to your messages in the chat.

   3. **Sending Messages:** <br />
    Via Button: Type your message in the input field and click the "Send" button.<br />
    Via Keyboard: Press the "Enter" key to send your message.<br />

   4. **Receiving Messages:** <br />
   Messages from other users will appear on the left side of the chat window, while your messages will appear on the right.

   5. **Scrolling:** <br />
   If there are many messages, the chat window will become scrollable. It will automatically scroll to show the latest message.
    

## What I Learned from the project

Building the Live Chat Application was an enriching experience that deepened my understanding of real-time web technologies, server-client interactions, and efficient coding practices. Here are the key lessons I gathered from this project:

   1. **Using an HTTP Server with WebSockets:** <br />
   Why It’s Needed: When creating a chat app, I used Express.js to set up a server that listens for incoming connections. Normally, app.listen(port) starts the server, but to add real-time features like WebSockets, I needed direct access to the underlying HTTP server. This is because WebSockets start as regular HTTP requests that then upgrade to a WebSocket connection.
   Simplifying Deployment: By using one server for both regular web pages and WebSocket connections, everything runs smoothly together. However, to handle more users across multiple servers, I realized I would need tools like RabbitMQ or Redis to manage messages between servers.

   2. **Sending Data with WebSockets:** <br />
   Working with JSON: I learned how to send data between the client and server by converting JavaScript objects into JSON strings. This makes the data easy to send and receive through WebSockets.

   3. **Handling Messages in JavaScript:** <br />
   Asynchronous Processing: JavaScript can handle multiple messages at the same time without slowing down the application. Using event listeners, I was able to process each incoming message as it arrived.
   Fixing a Bug: I discovered a mistake where I compared a number (clientId from Date.now()) with a string (id from the received JSON). This always made the comparison return false. To fix it, I converted clientId to a string using Date.now().toString(), which allowed the comparison to work correctly.

   4. **References:** <br />

   [1] https://dev.to/devland/build-a-real-time-chat-app-using-nodejs-and-websocket-441g

   [2] https://ably.com/blog/web-app-websockets-nodejs

   [3] https://stackoverflow.com/questions/54868232/send-text-from-client-to-server-using-json-and-ws
