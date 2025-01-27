import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });

  const neviget = useNavigate();

  const handelChenge = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "http://localhost:4000/api/user/login",
        input
      );

      localStorage.setItem("token", data.data.token);
      neviget("/admin-blog");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form
        style={{
          width: "350px",
          display: "flex",
          flexDirection: "column",
          margin: "50px auto",
          padding: "10px 30px 30px 30px",
          borderRadius: "7px",
          backgroundColor: "#FFF",
        }}
      >
        <h4 style={{ textAlign: "center", fontSize: "22px", color: "black" }}>
          Login
        </h4>
        <TextField
          id="outlined-basic"
          label="email"
          variant="outlined"
          sx={{
            marginTop: "20px",
            backgroundColor: "white",
            borderRadius: "7px",
          }}
          onChange={handelChenge}
          value={input.email}
          name="email"
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          sx={{
            marginTop: "20px",
            backgroundColor: "white",
            borderRadius: "7px",
          }}
          onChange={handelChenge}
          value={input.password}
          name="password"
        />
        <Button
          variant="contained"
          sx={{ marginTop: "20px", width: "100%" }}
          onClick={handelSubmit}
        >
          Login
        </Button>

        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <Link to="/register" style={{ textDecoration: "none" }}>
            Register
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
