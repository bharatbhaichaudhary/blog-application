import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";

function AddBlog() {
  const [input, setInput] = useState({ title: "", tags: "", content: "" });
  const token = localStorage.getItem("token");
  const handelChenge = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post(
      "http://localhost:4000/api/blog/blogAdd",
      input,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    alert("Add success");
    setInput({ title: "", tags: "", content: "" });
    try {
    } catch (error) {
      console.log("addBlogError", error);
    }
  };

  return (
    <>
      <Box>
        <form
          style={{
            backgroundColor: "#FFF",
            width: "600px",
            display: "flex",
            flexDirection: "column",
            margin: "40px auto",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <h2 style={{ textAlign: "center", color: "black" }}>Add New Blog</h2>
          <TextField
            id="outlined-basic"
            label="title"
            variant="outlined"
            sx={{ marginTop: "20px" }}
            onChange={handelChenge}
            value={input.title}
            name="title"
          />
          <TextField
            id="outlined-basic"
            label="Tegs"
            variant="outlined"
            sx={{ marginTop: "20px" }}
            onChange={handelChenge}
            value={input.tags}
            name="tags"
          />

          <TextField
            id="outlined-multiline-static"
            label="Content"
            multiline
            rows={4}
            defaultValue="Add Content"
            sx={{ marginTop: "20px" }}
            onChange={handelChenge}
            value={input.content}
            name="content"
          />
          <Button
            variant="contained"
            sx={{ marginTop: "20px" }}
            onClick={handelSubmit}
          >
            Contained
          </Button>
        </form>
      </Box>
    </>
  );
}

export default AddBlog;
