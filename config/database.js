const mongoose = require("mongoose");

const dbconnection = () => {
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to MongoDB");
  });
};

module.exports = dbconnection;
