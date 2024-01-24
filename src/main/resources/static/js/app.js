const client = new StompJs.Client();
client.brokerURL = "ws://localhost:8080/websockets";

let myUsername;
let subscription;

function connectMessage(message) {
    const connect = `<p class='connect-message'>${message.username}${message.content}</p>`;
    chatHistory.insertAdjacentHTML("beforeend", connect);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

const connectCallback = (message) => {
    const parsedMessage = JSON.parse(message.body);
    if (parsedMessage.content === ' has joined the chat' || parsedMessage.content === ' has left the chat') {
        connectMessage(parsedMessage);
    }
    else {
        appendMessage(parsedMessage);
    }
};

client.onConnect = (frame) => {
    console.log("Connected: " + frame);
    myUsername = frame.headers['user-name'];
    subscription = client.subscribe("/topic/channel", connectCallback);
    client.publish({
        destination: "/app/channel",
        body: JSON.stringify({username: 'currentUser', content: ' has joined the chat'})
    });
    const connectedHTML = "<span id='connect-status'><i class='fa-solid fa-check'></i>Connected to chat room</span>";
    document.getElementById("connect-layout").innerHTML = connectedHTML;
};

client.onStompError = (frame) => {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
};

const chatHistory = document.querySelector(".chat-history");
function appendMessage(message) {
    let chatMessage;
    if (message.username === myUsername) {
        chatMessage = `<div class='my-chat-message-grid'>
                                                 <div class='my-chat-and-username'>
                                                     <b class='my-username'>${message.username}</b>
                                                     <span class='my-chat-bubble'>${message.content}</span>
                                                 </div>
                                                 <img src='img/user-solid.svg' class='my-avatar'>
                                             </div>`;
    }
    else {
        chatMessage = `<div class='chat-message-grid'>
                                                 <img src='img/user-solid.svg' class='avatar'>
                                                 <div class='chat-and-username'>
                                                     <b class='username'>${message.username}</b>
                                                     <span class='chat-bubble'>${message.content}</span>
                                                 </div>
                                             </div>`;
    }
    chatHistory.insertAdjacentHTML("beforeend", chatMessage);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

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

client.activate();

const signoutButton = document.getElementById("signout");
signoutButton.addEventListener("click", () => {
    client.publish({
        destination: "/app/channel",
        body: JSON.stringify({username: 'currentUser', content: ' has left the chat'})
    });
    subscription.unsubscribe();
    client.deactivate();
});

client.debug = str => console.log(str);