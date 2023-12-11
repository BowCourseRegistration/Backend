import express from "express";
import passport from "passport";
import {
  Signup as StudentSignup,
  SearchAvailableCourses,
  SearchAvailableCourses2,
  SendContactForm, FetchTerms, FetchCoursesByTerm,
  RegisterCourse,
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
router.post(
  "/login",
  passport.authenticate("student", {
    successRedirect: "/student/",
    failureRedirect: "/",
    failureFlash: true,
  })
);

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

router.get("/coursesbyterm/", async (req, res) => {
  try {
    const termID = req.query.termID;
    const searchResults = await SearchAvailableCourses2(termID);
    res.json({ results: searchResults });
  } catch (error) {
    console.error("Error during course search:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Student select course route
// search all terms route
router.get("/searchterms", async (req, res) => {
  try {
    const terms = await FetchTerms();
    res.json({ results: terms });
  } catch (error) {
    console.error("Error during course search:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Search all courses for a specific term
router.get("/coursesbyterm/:termID", async (req, res) => {
  try {
    const termID = req.params.termID;
    const courses = await FetchCoursesByTerm(termID);
    res.json({ results: courses });
  } catch (error) {
    console.error("Error during course search:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Student register course route
router.post("/registercourse", async (req, res) => {
  const newCourse = req.body;
  try {
    await RegisterCourse(newCourse);
    res.send("Registered a course");
  } catch (error) {
    console.error("Error during course registration:", error);
    res.status(500).send("Failed to register course");
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
