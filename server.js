require("dotenv").config();
const express = require("express");
const path = require("path");

const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";

//need middle express.urlencoded middleware

//req.body.author
//req.body.body
const reactAuthorization = process.env.SECRET;
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticDir));

const mongoose = require("mongoose");
const uri = `mongodb+srv://react-chat-app:${reactAuthorization}@cluster0.hofkl.mongodb.net/React-Chat?retryWrites=true&w=majority`;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on(`error`, console.error.bind(console, "connection error"));

const messageSchema = new mongoose.Schema({
  author: String,
  body: String,
  when: String,
});

const Message = mongoose.model("Message", messageSchema);
const PetMessage = mongoose.model("Pet", messageSchema )
const GameMessage = mongoose.model("Games", messageSchema)
///:db/:coll
app.post("/create/message/home", async (req, res) => {
  let messageDate = new Date();
  let hours = ((messageDate.getHours() + 11) % 12) + 1;
  let minutes = (messageDate.getMinutes()<10?`0`:``) + messageDate.getMinutes();
  
  console.log(req.body.body.length)
  let newEntry = Message({
    author: req.body.author,
    body: req.body.body,
    when: hours + ":" + minutes,
  });

  await newEntry.save();

  
  res.redirect("/");
});
app.post("/create/message/pets", async (req, res) => {
  let messageDate = new Date()
  let hours = ((messageDate.getHours() + 11) %12) + 1;
  let minutes = (messageDate.getMinutes()<10?`0`:``) + messageDate.getMinutes()
let newEntry = PetMessage({
  author: req.body.author,
  body: req.body.body,
  when: hours + ":" + minutes
})

await newEntry.save()
res.redirect('/rooms/pets')
})
app.post("/create/message/games", async (req, res) => {
  let messageDate = new Date()
  let hours = ((messageDate.getHours() + 11) %12) + 1;
  let minutes = (messageDate.getMinutes()<10?`0`:``) + messageDate.getMinutes()
let newEntry = GameMessage({
  author: req.body.author,
  body: req.body.body,
  when: hours + ":" + minutes
})

await newEntry.save()
res.redirect('/rooms/games')
})





app.get("/messages", async (req, res) => {
  let allMessages = await Message.find({});

  res.send(allMessages);
});

app.get("/pets", async (req, res) => {
  let allMessages = await PetMessage.find({});

  res.send(allMessages);
});

app.get("/games", async (req, res) => {
  let allMessages = await GameMessage.find({});

  res.send(allMessages);
});




app.listen(port, () => {
  console.log("listening on port: " + port);
});
