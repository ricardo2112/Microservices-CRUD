const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const songRoutes = require("./routes/songRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/songs", songRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Microservicio corriendo en http://localhost:${PORT}`);
});
