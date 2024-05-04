const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://deepaksh798:test123@cluster0.zossia9.mongodb.net/"
  )
    .then((client) => {
      console.log("Connected to DB!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log("util :: datatbase : error -> ", err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
