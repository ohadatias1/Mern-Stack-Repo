const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("Hello From App"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Is Up On Port ${PORT}`));
