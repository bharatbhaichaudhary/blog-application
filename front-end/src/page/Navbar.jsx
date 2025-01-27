import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SummarizeTwoToneIcon from "@mui/icons-material/SummarizeTwoTone";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const naviget = useNavigate();
  const token = localStorage.getItem("token");

  const Logout = () => {
    localStorage.removeItem("token");
    naviget("/");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, width: "100vw" }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="blog"
            >
              <SummarizeTwoToneIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Blog
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <NavLink
                style={({ isActive }) =>
                  isActive
                    ? { color: "white" }
                    : { textDecoration: "none", color: "white" }
                }
                to={"/"}
              >
                Home
              </NavLink>
              {token ? (
                <>
                  <NavLink
                    style={({ isActive }) =>
                      isActive
                        ? { color: "white" }
                        : { textDecoration: "none", color: "white" }
                    }
                    to={"/admin-blog"}
                  >
                    Admin Page
                  </NavLink>
                  <NavLink
                    style={({ isActive }) =>
                      isActive
                        ? { color: "white" }
                        : { textDecoration: "none", color: "white" }
                    }
                    to={"/add-blog"}
                  >
                    New Blog
                  </NavLink>
                  <Button color="error" onClick={Logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <NavLink
                  style={({ isActive }) =>
                    isActive
                      ? { color: "white" }
                      : { textDecoration: "none", color: "white" }
                  }
                  to={"/login"}
                >
                  Login
                </NavLink>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
