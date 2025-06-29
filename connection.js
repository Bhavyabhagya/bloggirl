const mongoose = require("mongoose");
//Write missing code here
mongoose
  .connect(
  "mongodb+srv://bhavyamurali:bhagyamurali@cluster0.l82npok.mongodb.net/monsoon?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
