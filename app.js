require("dotenv").config();
const express = require("express");
const connect = require("./services/mongodb");
const app = express();
const port = 3001;
const path = require("path");

var cors = require("cors");

var whitelist = ["http://localhost:3000"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));

app.get("/user", (req, res) =>
  res.send(
    JSON.stringify({
      userId: "asdsadsa",
      firstName: "Stefan",
      wallet: { stars: 10 }
    })
  )
);

app.get("/abc", (req, res) => res.send("Hello World!"));

connect()
  .then(db => {
    console.log("connected to mongodb");
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch(err => {
    console.error("mongodb connection failed", err);
  });

app.get("*", function(request, response) {
  response.sendFile(path.join(__dirname, "build/index.html"));
});
