const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./src/config/db");
const router = require("./src/route/student.route");

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.send('welcome to home page');
})

app.use('/api/student', router);


app.listen(PORT, () => {
    connectDb();
    console.log(`Server running on port ${PORT}...`)
})