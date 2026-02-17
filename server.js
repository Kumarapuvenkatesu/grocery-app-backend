require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const DBconnection=require('./db');
const app = express();
const port = process.env.PORT ;
const appUrl = process.env.CORS_ORIGIN ;
const ProductRoutes=require("./routes/ProductRoutes");
const path=require('path');
const adminRoutes=require('./routes/adminRoutes');
const userRoutes=require('./routes/userRoutes');
const cartRoutes=require('./routes/cartRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [appUrl],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

DBconnection();
app.use("/admin", adminRoutes);
app.use("/api", ProductRoutes);
app.use("/user", userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/cart", cartRoutes);

app.get('/get', (req, res) => {
  res.send('Hello World! Server is running');
});
app.listen(port,()=>{
  console.log(`Server is running on http://localhost:${port}`);
});