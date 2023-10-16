const express = require("express");
const morgan = require("morgan");
require("dotenv").config({ path: "config.env" });

const dbConnection = require("./config/database");
dbConnection();

const categoryRoute = require("./routes/category.route");

// express app
const app = express();

// Middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Routes
app.use("/api/v1/categories", categoryRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
