const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

async function connectToDb() {
  const url = process.env.DB_URL || 'mongodb://localhost:27017/issuetracker';
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at: ', url);
  db = client.db();
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getNextSequence, getDb };