import express from "express";
import {
  Signup as StudentSignup,
  StudentLogin,
  SearchAvailableCourses,
} from "../db.js";

const router = express.Router();

// Student signup route
router.post("/signup", async (req, res) => {
  const newStudent = req.body;
  try {
    const result = await StudentSignup(newStudent);
    res.send(result);
  } catch (error) {
    console.error("Error during student signup:", error);
    res.status(500).send("Student signup failed");
  }
});

// Student login route
router.post("/login", async (req, res) => {
  const student = req.body;
  try {
    const result = await StudentLogin(student);
    console.log(result);
    if (result.message) {
      res.send(result);
    } else {
      throw err;
    }
  } catch (error) {
    console.error("Error during student login:", error);
    res.status(500).send("Student Login Failed");
  }
});

// Search available courses for students route
router.get("/searchcourses/:keyword", async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const searchResults = await SearchAvailableCourses(keyword);
    res.json({ results: searchResults });
  } catch (error) {
    console.error("Error during course search:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
