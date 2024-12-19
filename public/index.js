const chat = document.getElementById("chat");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");

// Establish WebSocket connection to the server
const ws = new WebSocket(`ws://${window.location.host}`);

//--------------------------SEND--------------------------------
// Generate a unique ID for the each client (or ws). In other words, each 'ws' will have different ID
const clientId = Date.now().toString(); //convert this to a string to compare it later

// Check message user input before sending it to the server
const sendMessage = () => {
  if (messageInput.value.trim() !== "") {
    //check if user's message is not empty after trimming whitespace
    //send message package including client's id and content of the message
    const messageData = {
      id: clientId,
      text: messageInput.value,
    };
    ws.send(JSON.stringify(messageData)); //send a package message (JSON or object) to the server via WebSocket connection
    messageInput.value = ""; //clear input field box after sending message
  }
};

//Allow users to send message with clicking 'Send' or hitting 'Enter' button
//1. sending message with click button, trigger the sendMessage above
sendButton.addEventListener("click", sendMessage);

//2. Sending message with Enter key
messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

//-------------------------------RECEIVE--------------------------
// Customed display message for sender and receivers on chat box
function displayMessage(text, isSender = false) {
  const message = document.createElement("div"); // create a 'div' tag
  message.classList.add("message-style"); // add class 'message' for that 'div' for CSS effect later

  if (isSender) {
    message.classList.add("sender"); // add class 'sender' for CSS effect
  } else {
    message.classList.add("receiver"); // add class 'receiver' for CSS effect
  }

  message.textContent = text; // convert or put the text content from 'text' variable into the empty div tag (assigned under message name)
  chat.appendChild(message); // add 'div' box above to chatbox. Always 'apprendChild' when using 'createElement'
  chat.scrollTop = chat.scrollHeight; //keep the lastest chats at the bottom of chatbox
}

// Listen for messages from the server to show it in chat box
ws.addEventListener("message", (event) => {
  // Convert Blob to text. Since event.data is a Blob, we need to convert it to text before parsing it as JSON.
  event.data
    .text()
    .then((text) => {
      try {
        const messageJSON = JSON.parse(text); // Parse the JSON data sent back from the server
        const isSender = messageJSON.id === clientId; // Check if this ID is from this client (sender) or from other clients (receivers)
        // console.log(messageJSON.id); //Print in web console F12
        // console.log(clientId); //Print in web console F12
        displayMessage(messageJSON.text, isSender);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    })
    .catch((error) => {
      console.error("Error reading message data:", error);
    });
});
