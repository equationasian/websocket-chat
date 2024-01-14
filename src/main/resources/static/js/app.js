const client = new StompJs.Client();
client.brokerURL = "ws://localhost:8080/websockets";

const connectCallback = (message) => {
    appendMessage(JSON.parse(message.body));
};

client.onConnect = (frame) => {
    console.log("Connected: " + frame);
    client.subscribe("/topic/channel", connectCallback);
    chatHistory.insertAdjacentHTML("beforeend", "<p class='connect-message'>" + frame.headers["user-name"] + " has joined the chat.</p>");
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