const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRouter = require("./routers/todoRouter");
require("dotenv").config();

const app = express();
const PORT = 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todo-backend";

app.use(cors());
app.use(express.json());
app.use("/", todoRouter);

app.get("/", (req, res) => {
  res.send("Todo backend server is running");
});

app.post("/", todoRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("연결 성공");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB 연결 실패:", error.message);
    process.exit(1);
  });
