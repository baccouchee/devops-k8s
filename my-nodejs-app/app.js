const express = require("express");
const morgan = require("morgan");
const { Pool } = require("pg");
const path = require("path");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Importing routes
const itemRoutes = require("./routes/items");

// settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Add this line to parse JSON bodies
app.use(cors()); // Add this line to enable CORS

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Middleware to add pool to req
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Routes
app.use("/", itemRoutes);

// Static files
app.use(express.static(path.join(__dirname, "public")));

const port = app.get("port");
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
