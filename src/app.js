// inicializacion de la app
const express = require("express");
const app = express();
const PORT = 8080;
const exphbs = require("express-handlebars");
const viewsRouter = require("./routes/views.router.js");
const socket = require("socket.io");
app.use(express.static("./src/public"));
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/", viewsRouter);


const httpServer = app.listen(PORT);

const io = new socket.Server(httpServer);

let messages = [];

io.on("connection", (socket) => {
  console.log("el cliente se conecto");

  socket.on("message", (data) => {
    messages.push(data);
    io.emit("messageLogs", messages);
  })
});
