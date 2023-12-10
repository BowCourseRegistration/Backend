import express from "express";
import passport from "passport";
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
/* router.post("/login", async (req, res) => {
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
}); */
router.post(
  "/login",
  passport.authenticate("admin", {
    successRedirect: "/admin/",
    failureRedirect: "/",
    failureFlash: true,
  })
);
/* router.post("/login", async (req, res, next) => {
  passport.authenticate("admin", async (err, user, info) => {
    try {
      if (err) {
        throw err;
      }

      if (!user) {
        // Custom handling for failed authentication
        return res.status(401).json({ message: "Authentication failed" });
      }

      // If authentication is successful, you can perform additional actions
      // For example, you might want to generate a token, set cookies, etc.
      console.log("user: ", user);
      return res.json({ message: "Authentication successful", user });
    } catch (error) {
      console.error("Error during admin login:", error);
      res.status(500).json({ message: "Admin Login Failed" });
    }
  })(req, res, next);
}); */

// Add course route
router.post("/addcourse", async (req, res) => {
  const course = req.body;
  console.log("course : ", course);
  const newCourse = {
    courseCode: course.courseCode,
    courseName: course.courseName,
    startingDate: "",
    endingDate: "",
    fees: course.fees,
    description: course.description,
    termID: 0,
  };
  switch (course.term) {
    case "term1":
      (newCourse.termID = 1),
        (newCourse.startingDate = "2023-09-01"),
        (newCourse.endingDate = "2023-12-20");
      break;
    case "term2":
      (newCourse.termID = 2),
        (newCourse.startingDate = "2024-01-05"),
        (newCourse.endingDate = "2024-05-02");
      break;
    case "term3":
      (newCourse.termID = 3),
        (newCourse.startingDate = "2024-09-01"),
        (newCourse.endingDate = "2024-12-20");
      break;
    case "term4":
      (newCourse.termID = 4),
        (newCourse.startingDate = "2025-01-05"),
        (newCourse.endingDate = "2025-05-02");
      break;
  }

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
