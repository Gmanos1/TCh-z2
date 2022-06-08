const keys = require("./keys");

// Express App Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("connect", (client) => {
  client
    .query("create table if not exists kValues (k INT, ts timestamp)")
    .catch((err) => console.error(err));
});

const redis = require("redis");
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const redisPublisher = redisClient.duplicate();

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("select * from kValues order by ts desc");
  res.send(values.rows);
});

app.get("/values/lastFive", async (req, res) => {
  const values = await pgClient.query(
    "select * from kValues order by ts desc limit 5"
  );
  res.send(values.rows);
});

function convertToArrayOfObjects(array) {
  if (array == null) return []
  return Object.entries(array).map((value) => {
    calcTs = value[1].split(",");
    return {
      k: value[0],
      calcValue: calcTs[0],
      ts: calcTs[1],
    };
  });
}

function sortBasedOnTimestamp(a, b) {
  return parseInt(a["ts"]) < parseInt(b["ts"]) ? 1 : -1
}

app.get("/calcValues/all", async (req, res) => {
  redisClient.hgetall("kValues", (err, values) => {
    res.send(convertToArrayOfObjects(values));
  });
});

app.get("/calcValues/lastFive", async (req, res) => {
  redisClient.hgetall("kValues", (err, values) => {
    let entries = convertToArrayOfObjects(values)
    entries.sort(sortBasedOnTimestamp)
    res.send(entries.slice(0, 5));
  });
});

app.post("/values", async (req, res) => {
  const k = req.body.k;

  redisClient.hset("kValues", k, "");
  redisPublisher.publish("insert", k);
  pgClient.query("INSERT INTO kValues(k, ts) VALUES($1, to_timestamp($2))", [
    k,
    Date.now(),
  ]);

  res.send({ working: true });
});

app.listen(5000, (err) => {
  console.log("Listening");
});
