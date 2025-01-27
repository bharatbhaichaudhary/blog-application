const Blog = require("../models/blog.model");
const jwt = require("jsonwebtoken");

const blogListByUser = async (req, res) => {
  try {
    const user = req.user;
    const blog = await Blog.find({ userId: user.id });

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const blogList = async (req, res) => {
  try {
    const blog = await Blog.find();

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const blogById = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById({ _id: id });
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const blogAdd = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const user = req.user;

    if (!title || !content || !tags) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }

    const blogData = {
      title,
      tags,
      content,
      userId: user.id,
    };

    await Blog.create(blogData);

    res.status(200).json({ success: true, message: "Blog Added" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const blogEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const editBlogData = req.body;

    await Blog.updateOne({ _id: id }, { $set: editBlogData });

    return res.status(200).json({ success: true, message: "success" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const blogDelete = async (req, res) => {
  try {
    console.log(111);
    const id = req.params.id;
    await Blog.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ success: true, message: "Blog Deleted Successful" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  blogList,
  blogAdd,
  blogEdit,
  blogById,
  blogDelete,
  blogListByUser,
};
