const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const cors = require('cors');

const { errorHandler } = require('./middleware/errorMiddleware');

const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
