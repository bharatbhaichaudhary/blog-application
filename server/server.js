const cors = require("cors");
const express = require("express");
require("dotenv").config();

const userRoute = require("./routes/user.rout");
const blogRouter = require("./routes/blog.route");
const conectDb = require("./utils/db");
const Blog = require("./models/blog.model");

const app = express();

conectDb();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints

app.get("/", (req, res) => {
  res.send("dskjc");
});
app.get("/api", (req, res) => {
  res.send("dskjc/api");
});
app.get("/blog", async (req, res) => {
  try {
    
    const blog = await Blog.find();

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
app.use("/api/user", userRoute);
app.use("/api/blog", blogRouter);

app.listen(4000, () => {
  console.log("backend sucssesfull");
});
