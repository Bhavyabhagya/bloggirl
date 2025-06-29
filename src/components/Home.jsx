import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const defaultBlogs = [
    {
      _id: 'default1',
      title: 'Travel',
      content: 'Travel the world!!!!!',
      img_url: 'travel.jpg'
    },
    {
      _id: 'default2',
      title: 'Art',
      content: 'Art!!!!!!!!!!!!!',
      img_url: 'art.jpg'
    },
    {
      _id: 'default3',
      title: 'Food',
      content: 'Food is Art!!!!',
      img_url: 'food.jpg'
    }
  ];

  useEffect(() => {
    axios.get('http://localhost:3000/get')
      .then((res) => {
        const combinedBlogs = [...defaultBlogs, ...res.data];
        setBlogs(combinedBlogs);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setBlogs(defaultBlogs);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:3000/${id}")
      .then(() => {
        alert("Deleted successfully!");
        setBlogs(prev => prev.filter(blog => blog._id !== id));
      })
      .catch((err) => {
        console.error("Delete failed:", err);
      });
  };

  const handleUpdate = (blog) => {
    navigate('/add', { state: { val: blog } });
  };

  return (
    <div>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          {blogs.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={item.img_url}
                  alt={item.title}
                />
                <CardContent>
                  <Typography variant="caption" color="text.secondary">
                    {item.title}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" color="error" onClick={() => handleDelete(item._id)}>
                    DELETE
                  </Button>
                  <Button size="small" variant="contained" color="primary" onClick={() => handleUpdate(item)}>
                    UPDATE
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
