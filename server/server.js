const cors = require("cors");
const express = require("express");
require("dotenv").config();

const userRoute = require("./routes/user.rout");
const blogRouter = require("./routes/blog.route");
const conectDb = require("./utils/db");

const app = express();

conectDb();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints

app.get("/", (req, res) => {
  res.send("dskjc");
});
app.use("/api/user", userRoute);
app.use("/api/blog", blogRouter);

app.listen(4000, () => {
  console.log("backend sucssesfull");
});
