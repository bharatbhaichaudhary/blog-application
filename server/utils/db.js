const mongoose = require("mongoose");

const URI = process.env.MONGODB_URL;

const conectDb = async () => {
  try {
    mongoose.connect(URI);
    console.log("Conect DB is sucssefull");
  } catch (error) {
    console.log(error);
  }
};

module.exports = conectDb;
