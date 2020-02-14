const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "Treasuro";

mongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("did not connect to database");
    }
    console.log("Connected");
    const db = client.db(databaseName);
  }
);
