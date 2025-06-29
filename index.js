const express = require("express");
const cors = require("cors");

require('./connection');
const mongoose = require("mongoose");
const BlogModel = require('./model');
//Write missing code here

const app = express();
var PORT = 3001;
app.use(express.json());
app.use(cors());



//Write your POST API here
app.post('/add', async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // ⬅ Add this
    const blog = new BlogModel(req.body);
    await blog.save();
    res.status(201).json({ message: "Blog added successfully" });
  } catch (error) {
    console.error("POST /add error:", error); // ⬅ Add this
    res.status(500).json({ error: "Failed to create blog" });
  }
});
 
app.get("/get", async (req, res) => {
  try {
    let data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

// delete 
app.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await BlogModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

// update 
app.put('/:id', async (req,res) =>{
        try {
                await BlogModel.findByIdAndUpdate(req.params.id,req.body);
                res.send(" data updated")
        }catch (error){
                        res.send(error);
                       }
});




app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
