require("dotenv").config();
const express = require("express");
const path = require("path");

const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";

app.use(express.static(staticDir));

const mongoose = require("mongoose");
const uri = "mongodb+srv://react-chat-app:reactchat123@cluster0.hofkl.mongodb.net/React-Chat?retryWrites=true&w=majority"
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on(`error`, console.error.bind(console, "connection error"));



const messageSchema = new mongoose.Schema({
  author: String,
  body: String,
  when: Date,
});

const Message = mongoose.model('Message', messageSchema)
///:db/:coll
app.post("/create/message", async (req, res) => {
  let messageDate = new Date()
  let newEntry = Message({
    author: req.author
    body: req.body
    when: messageDate
  });

  await newEntry.save()

  /* let collection = await dbConnect(req.params.db, req.params.coll);
  await collection.insertOne(newEntry);
 */
  res.redirect("/");
});
app.get();

app.listen(port, () => {
  console.log("listening on port: " + port);
});
