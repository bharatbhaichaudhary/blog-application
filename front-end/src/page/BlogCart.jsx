import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const BlogCart = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const SERVER_URI = import.meta.env.VITE_SERVER_URL

  const blogData = async () => {
    try {
      const respose = await axios.get(
        `${SERVER_URI}/api/blog/blogList`
      );

      setData(respose?.data?.blog || []);
      setFilterData(respose?.data?.blog || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    blogData();
  }, []);

  const searchChenge = (e) => {
    const value = e.target.value;
    if (value) {
      const fData = data.filter((item) => {
        return (
          item.title.toLowerCase()?.match(value.toLowerCase()) ||
          item.tags.includes(value)
        );
      });
      setFilterData(fData);
    } else {
      setFilterData(data);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifySelf: "center",
          padding: "30px 0",
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Blogs"
            inputProps={{ "aria-label": "search Blogs" }}
            onChange={searchChenge}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          margin: "20px",
          flexWrap: "wrap",
        }}
      >
        {filterData?.map((item) => (
          <Card
            sx={{
              minWidth: "300px",
              flex: 1,
              minHeight: "280px",
              position: "relative",
            }}
            key={item._id}
          >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {item.content.length <= 100 && item.content}
                  {item.content.length > 100 && (
                    <>
                      {item.content.slice(0, 100)}.....
                      <Link
                        style={{ textDecoration: "none", color: "#0288d1" }}
                        to={`/blog/${item._id}`}
                      >
                        Read More
                      </Link>
                    </>
                  )}
                </Typography>

                <Box
                  display="flex"
                  gap="5px"
                  flexWrap="wrap"
                  sx={{ mt: "10px" }}
                >
                  {item.tags?.map((tag) => (
                    <Chip
                      color="info"
                      variant="outlined"
                      size="small"
                      label={tag}
                    />
                  ))}
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default BlogCart;
