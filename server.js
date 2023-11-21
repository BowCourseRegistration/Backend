import express, { json, urlencoded } from "express";
import { fileURLToPath } from "url";
import path from "path";
import {
  AddCourse,
  DeleteCourse,
  SearchCourse,
  SearchStudentsByProgram,
  AdminLogin,
} from "../backend/db.js";
import cors from "cors";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 5070;

app.use(cors({ origin: true, credentials: true }));

app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.end("Connected with React.js");
});

/* student  */
/* admin */
//login '/admin/login'
app.post("/admin/login", async function (req, res) {
  const admin = req.body;
  try {
    await AdminLogin(admin);
    res.send("Admin Login Success");
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).send("Admin Login Failed");
  }
});
//add course  '/admin/addcourse'
app.post("/admin/addcourse", async function (req, res) {
  const newCourse = req.body;
  await AddCourse(newCourse);
  res.send("Added a course");
});
//search course '/admin/searchcourse'
app.get("/admin/searchcourses/:keyword", async function (req, res) {
  try {
    const keyword = req.params.keyword;
    const searchResults = await SearchCourse(keyword);

    res.json({ results: searchResults });
  } catch (error) {
    console.error("Error during course search:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete course '/admin/deletecourse'
app.delete("/admin/deletecourses/:id", async function (req, res) {
  const id = req.params.id;
  await DeleteCourse(id);
  res.send("Deleted a course");
});

//search student by program '/admin/searchstudent'
app.get("/admin/searchstudents/:program", async function (req, res) {
  try {
    const program = req.params.program;
    const searchResults = await SearchStudentsByProgram(program);

    res.json({ results: searchResults });
  } catch (error) {
    console.error("Error during course search:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//view contact forms '/admin/contactform'

//create contact form '/contactform'

/* DB */
//MSSQL
//MONGODB

app.listen(port, function () {
  console.log(`Server is running on ${port}`);
});
