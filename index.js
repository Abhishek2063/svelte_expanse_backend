const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expanseRoutes = require('./routes/expanseRoutes');

dotenv.config();

// Middleware
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes); 
app.use('/api/incomes', incomeRoutes); 
app.use('/api/expenses', expanseRoutes); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
