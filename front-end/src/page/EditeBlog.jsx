import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditeBlog() {
  const [input, setInput] = useState({ title: "", tags: "", content: "" });
  const parmas = useParams();
  const navigate = useNavigate();
  const handelChenge = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const getBlogDetail = async () => {
    try {
      const respons = await axios.get(
        `http://localhost:4000/api/blog/${parmas.id}`
      );
      setInput(respons.data.blog);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogDetail();
  }, [parmas]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.put(
      `http://localhost:4000/api/blog/blogEdit/${parmas.id}`,
      input,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    alert("Edit success");
    navigate("/admin-blog");
    try {
    } catch (error) {
      console.log("addBlogError", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "wheat",
          width: "100vw",
          height: "100vh",
          padding: "100px",
        }}
      >
        <form
          style={{
            width: "700px",
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
            padding: "5px 10px 10px 10px",
            borderRadius: "4px",
          }}
        >
          <h4
            style={{ textAlign: "center", fontSize: "22px", color: "#827717" }}
          >
            Edite Blog
          </h4>
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
            Edit
          </Button>
        </form>
      </Box>
    </>
  );
}

export default EditeBlog;
