const socket = io();

let user;

const chatBox = document.getElementById("chatBox");

Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingresa tu nombre de usuario",
  inputValidator: (value) => {
    return !value && "Debes escribir tu nombre de usuario";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
});

chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", {
        user: user,
        message: chatBox.value,
      });
      chatBox.value = "";
    }
  }
});

socket.on("messageLogs", (data) => {
    let log = document.getElementById("messageLogs");
    let messages = "";

    data.forEach((message) => {
        messages = messages + `<p><strong>${message.user}:</strong> dice: ${message.message}</p> <br>`;
    })

    log.innerHTML = messages;
});