import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const AdminBlog = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const SERVER_URI = import.meta.env.VITE_SERVER_URL;

  const blogData = async () => {
    try {
      const respose = await axios.get(
        `${SERVER_URI}/api/blog/blogListByUser`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setData(respose?.data?.blog || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    blogData();
  }, []);

  const deletBlog = async (id) => {
    try {
      await axios.delete(`${SERVER_URI}/api/blog/blogDelete/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      const fData = data.filter((item) => item._id !== id);
      console.log(fData);
      setData(fData);
    } catch (error) {
      console.log("deletBlog", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          margin: "20px",
          flexWrap: "wrap",
        }}
      >
        {data?.map((item) => (
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

                <Box display="flex" gap="5px" flexWrap="wrap" mt="10px">
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
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button
                variant="contained"
                component={Link}
                to={`/edite-blog/${item._id}`}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button
                onClick={() => deletBlog(item._id)}
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default AdminBlog;
