const express = require("express");
const app = express();
const nameRoute = require("./routes/nameRoute");

// Use the name route
app.use("/", nameRoute);

// Server configuration
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
