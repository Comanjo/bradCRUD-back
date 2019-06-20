const express = require("express");
const app = express();
const port = 4000;
const monk = require("monk");
const cors = require("cors");
const bodyParser = require("body-parser");
// Connection URL
const url =
  "mongodb://brad:badboy1@cluster0-shard-00-00-xyxff.mongodb.net:27017,cluster0-shard-00-01-xyxff.mongodb.net:27017,cluster0-shard-00-02-xyxff.mongodb.net:27017/myfav?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

const db = monk(url);

db.then(() => {
  console.log("Connected correctly to server");
});
const cats = db.get("work");

app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const results = await cats.find();
  res.status(200).send(results);
});
app.get("/:id", async (req, res) => {
  const results = await cats.findOne(req.params.id);
  res.status(200).send(results);
});

app.put("/:id", async (req, res) => {
  const results = await cats.findOneAndUpdate(req.params.id, {
    $set: req.body
  });
  res.status(200).send(results);
});

app.post("/", async (req, res) => {
  const results = await cats.insert(req.body);
  res.status(200).send(results);
});

app.delete("/:id", async (req, res) => {
  const results = await cats.findOneAndDelete(req.params.id);
  res.status(200).send(results);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
