import express from "express";
import {
  AdminLogin,
  AddCourse,
  SearchCourse,
  DeleteCourse,
  SearchStudentsByProgram,
  UpdateCourseBycourseCode,
  ReceiveContactForm,
} from "../db.js";

const router = express.Router();
// Admin login route
router.post("/login", async (req, res) => {
  const admin = req.body;
  try {
    const result = await AdminLogin(admin);
    if (result.message == "success") {
      res.send(result);
    } else {
      throw err;
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).send("Admin Login Failed");
  }
});

// Add course route
router.post("/addcourse", async (req, res) => {
  const newCourse = req.body;
  try {
    await AddCourse(newCourse);
    res.send("Added a course");
  } catch (error) {
    console.error("Error during course addition:", error);
    res.status(500).send("Failed to add course");
  }
});

// Search course route
router.get("/searchcourses/:keyword", async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const searchResults = await SearchCourse(keyword);
    res.json({ results: searchResults });
  } catch (error) {
    console.error("Error during course search:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete course route
router.delete("/deletecourse/:courseCode", async (req, res) => {
  const courseCode = req.params.courseCode;
  try {
    await DeleteCourse(courseCode);
    res.send("Deleted a course");
  } catch (error) {
    console.error("Error during course deletion:", error);
    res.status(500).send("Failed to delete course");
  }
});

// Search students by program route
router.get("/searchstudents/:program", async (req, res) => {
  try {
    const program = req.params.program;
    const searchResults = await SearchStudentsByProgram(program);
    res.json({ results: searchResults });
  } catch (error) {
    console.error("Error during student search:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update course by courseCode route
router.put("/updatecourse/:courseCode", async (req, res) => {
  const courseCode = req.params.courseCode;
  const updatedData = req.body;
  try {
    await UpdateCourseBycourseCode(courseCode, updatedData);
    res.send("Updated a course");
  } catch (error) {
    console.error("Error during course update:", error);
    res.status(500).send("Failed to update course");
  }
});

// Admin receive contact form from student function
router.get("/contact", async (req, res) => {
  try {
    const contactForm = await ReceiveContactForm();
    res.json({ results: contactForm });
  } catch (error) {
    console.error("Error during contact form submission:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
