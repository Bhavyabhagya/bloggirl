import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  // ✅ Define blogs state
  const [blogs, setBlogs] = useState([]);

  // ✅ Fetch blogs on mount
  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
      });
  }, []);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addData = () => {
    axios
      .post("http://localhost:3001/add", inputs)
      .then((res) => {
        alert(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error adding blog:", err);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Form Section */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={inputs.title}
          onChange={inputHandler}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Content"
          name="content"
          value={inputs.content}
          onChange={inputHandler}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Image URL"
          name="img_url"
          value={inputs.img_url}
          onChange={inputHandler}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={addData}>
          Add Blog
        </Button>
      </Box>

    
    </div>
  );
};

export default Add;

