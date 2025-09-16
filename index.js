const express = require("express");
const app = express();
const config = require("./config");
const Router = require("./routes");
const port = config.app.port;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Project is running fine");
});
app.use("/api", Router);

app.listen(port, () => {
  console.log(`server started at port number ${port}`);
});
