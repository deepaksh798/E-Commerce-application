const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        //update the product
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log("models :: product :: save -> ", result);
      })
      .catch((err) => {
        console.log("models :: product :: save : error -> ", err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log("models :: product :: fetchAll -> ", products);
        return products;
      })
      .catch((err) => {
        console.log("models :: product :: fetchAll : error -> ", err);
      });
  }
  static findByPk(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log("models :: findByPk -> ", product);
        return product;
      })
      .catch((err) => {
        console.log("models :: product :: findByPk : error -> ", err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        console.log("Deleted!");
      })
      .catch((err) => {
        console.log("models :: product :: deleteById : error -> ", err);
      });
  }
}

module.exports = Product;
