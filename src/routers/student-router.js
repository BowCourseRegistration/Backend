import express from "express";
import {
  Signup as StudentSignup,
  StudentLogin,
  SearchAvailableCourses,
  SendContactForm,
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
    await StudentLogin(student);
    res.send("Student Login Success");
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

// Student send contact form to admin function
router.post("/contact", async (req, res) => {
  const newContact = req.body;
  console.log(newContact);
  try {
    await SendContactForm(newContact);
    res.send("Contact form sent");
  } catch (error) {
    console.error("Error during contact form submission:", error);
    res.status(500).send("Contact form submission failed");
  }
});

export default router;
