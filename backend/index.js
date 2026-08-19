const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

