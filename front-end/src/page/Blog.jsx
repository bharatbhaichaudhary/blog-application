import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const Blog = () => {
  const [blogData, setBlogData] = useState({})
  console.log("blogData", blogData);
  
  const parmas = useParams()

  const getBlogDetail = async ()=>{
try {
  const respons = await axios.get(`http://localhost:4000/api/blog/${parmas.id}`)
  setBlogData(respons.data.blog);
  
} catch (error) {
  console.log(error);
  
}
  }
  useEffect(()=>{
  getBlogDetail()
  },[parmas])
  return (
    <Box>
      <Card sx={{ maxWidth: "95vw", margin:"20px auto"}}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {blogData.title}
          </Typography>
          <Typography variant="p" component="div" sx={{ color: "green", fontSize:"20px" }}>
          {blogData.content}
          </Typography>
          <Typography variant="h6" component="div" sx={{ color: "text.secondary" }}>
          {blogData.tags}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Blog;
