import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import adminRouter from "./routers/admin-router.js";
import studentRouter from "./routers/student-router.js";

const { json, urlencoded } = bodyParser;
const app = express();
const port = 5070;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/admin", (req, res) => {
  res.end("This is for admin");
});

app.get("/student", (req, res) => {
  res.end("This is for student");
});

// API routes
app.use("/admin", adminRouter);
app.use("/student", studentRouter);

app.get("/", (req, res) => {
  res.end("Connected with React.js");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
