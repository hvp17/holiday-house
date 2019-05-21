require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/user");
const imagesRoutes = require("./routes/images");
const housesRoutes = require("./routes/houses");
const bodyParser = require("body-parser");
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded());

app.use("/user", userRoutes);
app.use("/images", imagesRoutes);
app.use("/houses", housesRoutes);

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
