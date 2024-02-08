const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expanseRoutes = require("./routes/expanseRoutes");
const dashbaordRoute = require("./routes/dashbaordRoute");

dotenv.config();

// Middleware
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/incomes", incomeRoutes);
app.use("/api/expenses", expanseRoutes);
app.use("/api/dashboard", dashbaordRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
