const express = require("express");
const connectDB = require("./config/db");
const app = express();
// Connect to DB
connectDB();

// Init middleware
//app.use(express.json({ extended: false })); //allows us to get data from request.body
app.use(express.json()); //pasrse the body to JSON
app.use(express.urlencoded({ extended: true })); // Parse the URL-encoded
//app.get("/", (req, res) => res.send("Hello From App"));

//==Define Routes==//
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Is Up On Port ${PORT}`));
