const client = new StompJs.Client();
client.brokerURL = "ws://localhost:8080/websockets";

const connectCallback = (message) => {
    appendMessage(JSON.parse(message.body).content);
};

client.onConnect = (frame) => {
    console.log("Connected: " + frame);
    client.subscribe("/topic/channel", connectCallback);
};

client.onStompError = (frame) => {
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
};

const chatHistory = document.querySelector(".chat-history");
function appendMessage(message) {
    chatHistory.insertAdjacentHTML("beforeend", "<p>" + message + "</p>");
}

client.activate();

const textBox = document.getElementById("input-message");
const sendButton = document.getElementById("send-message");

sendButton.addEventListener("click", () => {
    const message = JSON.stringify(textBox.innerHTML);
    client.publish({
        destination: "/topic/channel",
        body: message
    });
});