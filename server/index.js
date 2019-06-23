require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/user");
const imagesRoutes = require("./routes/images");
const housesRoutes = require("./routes/houses");
const filtersRoutes = require("./routes/filters");
const bodyParser = require("body-parser");
const port = 3000;

// ACCESS CONTROL
app.use(cors());

// Middleware for accepting form and JSON data
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use("/user", userRoutes);
app.use("/images", imagesRoutes);
app.use("/houses", housesRoutes);
app.use("/filters", filtersRoutes);

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
