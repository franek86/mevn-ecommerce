//Imports
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const connectDB = require("./database/db");

const port = process.env.PORT || 5000;
const dotenv = require("dotenv");

//routes
const authRoutes = require("./routes/auth");
const usersRoute = require("./routes/users");
const brandRoute = require("./routes/brands");
const categoryRoute = require("./routes/category");
const productsRoute = require("./routes/products");
const homeSliderRoute = require("./routes/homeSlider");

dotenv.config();

//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cookieParser());

//call connect to databsae
connectDB();

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", usersRoute);
app.use("/api/brands", brandRoute);
app.use("/api/category", categoryRoute);
app.use("/api/products", productsRoute);
app.use("/api/slider", homeSliderRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
