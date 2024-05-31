const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./userRoute");
const assetRoutes = require("./assetRoute");
const purchaseRoutes = require("./purchaseRoute");
const dotenv=require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/purchases", purchaseRoutes);


// Start server
const PORT = 4000;


app.get("/", (req, res) => {
    res.send("3D Assets Contractor!");
  });
  
  app.listen(PORT, () => {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("Database and Server connected successfully"))
      .catch((error) => console.log(error));
  });
  