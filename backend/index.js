const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

const app = express();
app.use(express.json());
const PORT = 5000;

connectToMongo();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/note"));
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
