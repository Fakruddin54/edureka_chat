const socket = io();
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");
let audio = new Audio("ting.mp3");

// for name while no name enter by user
let name;
do {
  name = prompt("Please enter your name: ");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  // If the user presses the "Enter" key on the keyboard
  if (e.key === "Enter") {
    sendMessage(e.target.value);
    // Trigger the button element with a click
    document.getElementById("sendme").click();
  }
});

// for send message to user
function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };
  // Append
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  // Send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// Receive messages
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  audio.play();
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
