const client = new StompJs.Client();
client.brokerURL = "ws://localhost:8080/websockets";

function connectMessage(message) {
    const connect = `<p class='connect-message'>${message.username}${message.content}</p>`;
    chatHistory.insertAdjacentHTML("beforeend", connect);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

const connectCallback = (message) => {
    const parsedMessage = JSON.parse(message.body);
    if (parsedMessage.content === ' has joined the chat') {
        connectMessage(parsedMessage);
    }
    else {
        appendMessage(parsedMessage);
    }
};

client.onConnect = (frame) => {
    console.log("Connected: " + frame);
    const subscription = client.subscribe("/topic/channel", connectCallback);
    client.publish({
        destination: "/app/channel",
        body: JSON.stringify({username: 'currentUser', content: ' has joined the chat'})
    });
};

client.onStompError = (frame) => {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
};

const chatHistory = document.querySelector(".chat-history");
function appendMessage(message) {
    const chatMessage = `<div class='chat-message-grid'>
                                         <img src='img/user-solid.svg' class='avatar'>
                                         <div class='chat-and-username'>
                                             <b class='username'>${message.username}</b>
                                             <span class='chat-message chat-bubble'>${message.content}</span>
                                         </div>
                                     </div>`;
    chatHistory.insertAdjacentHTML("beforeend", chatMessage);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

chatHistory.insertAdjacentHTML("beforeend", "<p class='connect-message'>Connecting...</p>");
client.activate();

const form = document.getElementById("input-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendButton.click();
});

const sendButton = document.getElementById("send-message");
sendButton.addEventListener("click", () => {
    let textBox = document.getElementById("input-message");
    client.publish({
            destination: "/app/channel",
            body: JSON.stringify({username: 'currentUser', content: textBox.value})
    });
    textBox.value = "";
});

client.debug = str => console.log(str);