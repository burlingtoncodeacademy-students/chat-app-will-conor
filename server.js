require("dotenv").config();
const express = require("express");
const path = require("path");

const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";
//var for our uri's password, set up in .env so as to not send it up to github
const reactAuthorization = process.env.SECRET;
app.use(express.urlencoded({ extended: true }));
//set up static server
app.use(express.static(staticDir));
//import mongoose
const mongoose = require("mongoose");
//set up the path for our database connection, inserting our password var instead of the actual password
const uri = `mongodb+srv://react-chat-app:${reactAuthorization}@cluster0.hofkl.mongodb.net/React-Chat?retryWrites=true&w=majority`;
//use mongoose to connect to the db
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on(`error`, console.error.bind(console, "connection error"));
//set up a schema for the messages in our database
const messageSchema = new mongoose.Schema({
  author: String,
  body: String,
  when: String,
});
//create different models for each "room" in the chat app. This creates unique collections for each room
const Message = mongoose.model("Message", messageSchema);
const PetMessage = mongoose.model("Pet", messageSchema);
const GameMessage = mongoose.model("Games", messageSchema);
//post request for when a message is created in the "home" room
app.post("/create/message/home", async (req, res) => {
  //creates a new date var at the time the message is sent
  let messageDate = new Date();
  //formats the hours into a 12 hour clock
  let hours = ((messageDate.getHours() + 11) % 12) + 1;
  //formats the minutes to include a zero if the minutes count is below 10, so you dont get weird numbers like 12:2 instead of 12:02
  let minutes =
    (messageDate.getMinutes() < 10 ? `0` : ``) + messageDate.getMinutes();

  //var that takes the request data from the POST and inserts it into the proper Schema format
  let newEntry = Message({
    author: req.body.author,
    body: req.body.body,
    when: hours + ":" + minutes,
  });
  //saves the entry to the database
  await newEntry.save();

  //sends the user back to the page where the post came from
  res.redirect("/");
});

//post request from the pets room
app.post("/create/message/pets", async (req, res) => {
  //creates a new date var at the time the message is sent
  let messageDate = new Date();
  //formats the hours into a 12 hour clock
  let hours = ((messageDate.getHours() + 11) % 12) + 1;
  //formats the minutes to always be 2 numbers
  let minutes =
    (messageDate.getMinutes() < 10 ? `0` : ``) + messageDate.getMinutes();
  //inserts the data from the request into the proper Schema format
  let newEntry = PetMessage({
    author: req.body.author,
    body: req.body.body,
    when: hours + ":" + minutes,
  });
  //saves the entry to the database
  await newEntry.save();
  //sends the user back to where the post came from
  res.redirect("/rooms/pets");
});
//post request from the games room
app.post("/create/message/games", async (req, res) => {
  //creates a new date var at the time the message is sent
  let messageDate = new Date();
  //formats the hours into a 12 hour clock
  let hours = ((messageDate.getHours() + 11) % 12) + 1;
  //formats the minutes to always be 2 numbers
  let minutes =
    (messageDate.getMinutes() < 10 ? `0` : ``) + messageDate.getMinutes();
  //inserts the data from the request into the proper Schema format
  let newEntry = GameMessage({
    author: req.body.author,
    body: req.body.body,
    when: hours + ":" + minutes,
  });
  //saves the entry to the database
  await newEntry.save();
  //sends the user back to where the post came from
  res.redirect("/rooms/games");
});
//get request for the messages from the home page
app.get("/messages", async (req, res) => {
  //finds all of the home page messages in the database
  let allMessages = await Message.find({});
  //sends them back to the page that fetched them
  res.send(allMessages);
});
//get request for the messages on the pet page
app.get("/pets", async (req, res) => {

  let allMessages = await PetMessage.find({});

  res.send(allMessages);
});
//get request for the messages on the games page
app.get("/games", async (req, res) => {
  //finds all the messages in the game message collection in the database
  let allMessages = await GameMessage.find({});
//sends them back to the page that fetched them
  res.send(allMessages);
});


//tells the server what port is should be on
app.listen(port, () => {
  console.log("listening on port: " + port);
});
