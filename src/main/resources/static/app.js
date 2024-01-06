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
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

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
            destination: "/topic/channel",
            body: JSON.stringify({content: textBox.value})
    });
    textBox.value = "";
});