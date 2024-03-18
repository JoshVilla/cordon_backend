const { MongoClient } = require("mongodb");
let dbConnection;
const url = "mongodb+srv://test:Test123@cluster0.y3kde2g.mongodb.net/cordon_db?retryWrites=true&w=majority"
module.exports = {
  connectToDb: (cb) => {
    // MongoClient.connect("mongodb://localhost:27017/cordon_db")
    MongoClient.connect(url)
      .then((client) => {
        dbConnection = client.db();
        return cb()
      })
      .catch((err) => {
        console.log(err);
        return cb(err)
      });
  },
  getDb: () => dbConnection,
};