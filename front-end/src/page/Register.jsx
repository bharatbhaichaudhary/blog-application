import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [input, setInput] = useState({ username: "", email: "", password: "" });

  const SERVER_URI = import.meta.env.VITE_SERVER_URL

  const handelChenge = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${SERVER_URI}/api/user/register`, input);
      setInput({ username: "", email: "", password: "" });
      alert("register success");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      style={{
        width: "350px",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        margin: "30px auto",
        padding: "10px 30px 30px 30px",
        borderRadius: "4px",
      }}
    >
      <h4 style={{ textAlign: "center", fontSize: "22px", color: "black" }}>
        Register
      </h4>
      <TextField
        id="outlined-basic"
        label="User name"
        variant="outlined"
        sx={{ marginTop: "20px" }}
        onChange={handelChenge}
        value={input.username}
        name="username"
      />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        sx={{ marginTop: "20px" }}
        onChange={handelChenge}
        value={input.email}
        name="email"
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        sx={{ marginTop: "20px" }}
        onChange={handelChenge}
        value={input.password}
        name="password"
      />
      <Button
        variant="contained"
        sx={{ marginTop: "20px" }}
        onClick={handelSubmit}
      >
        Register
      </Button>

      <div style={{ textAlign: "right", marginTop: "10px" }}>
        <Link to="/login" style={{ textDecoration: "none" }}>
          Login
        </Link>
      </div>
    </form>
  );
};

export default Register;
