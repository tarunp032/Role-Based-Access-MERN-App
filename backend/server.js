const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 4000;

const mongoURL = "mongodb://localhost:27017/test";

mongoose.connect(mongoURL);
app.use(express.json());
app.use(cors()); 

const userRoutes = require('./router/userRouter')
const productRoutes = require('./router/productRouter')

app.use('/user', userRoutes)
app.use('/product',productRoutes)
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
