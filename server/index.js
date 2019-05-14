const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const mysqlConnection = require("./connection");
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/user", userRoutes);

app.listen(port, () => {
  mysqlConnection.connect(() => console.log("connected"));
  console.log(`Example app listening on port ${port}!`);
});
