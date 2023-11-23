import express from 'express';
import {
    AdminLogin,
    AddCourse,
    SearchCourse,
    DeleteCourse,
    SearchStudentsByProgram,
    UpdateCourseBycourseCode,
} from '../db.js';

const router = express.Router();
// Admin login route
router.post('/admin/login', async (req, res) => {
    const admin = req.body;
    try {
        await AdminLogin(admin);
        res.send('Admin Login Success');
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).send('Admin Login Failed');
    }
});

// Add course route
router.post('/admin/addcourse', async (req, res) => {
    const newCourse = req.body;
    try {
        await AddCourse(newCourse);
        res.send('Added a course');
    } catch (error) {
        console.error('Error during course addition:', error);
        res.status(500).send('Failed to add course');
    }
});

// Search course route
router.get('/admin/searchcourses/:keyword', async (req, res) => {
    try {
        const keyword = req.params.keyword;
        const searchResults = await SearchCourse(keyword);
        res.json({ results: searchResults });
    } catch (error) {
        console.error('Error during course search:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete course route
router.delete('/admin/deletecourse/:courseCode', async (req, res) => {
    const courseCode = req.params.courseCode;
    try {
        await DeleteCourse(courseCode);
        res.send('Deleted a course');
    } catch (error) {
        console.error('Error during course deletion:', error);
        res.status(500).send('Failed to delete course');
    }
});

// Search students by program route
router.get('/admin/searchstudents/:program', async (req, res) => {
    try {
        const program = req.params.program;
        const searchResults = await SearchStudentsByProgram(program);
        res.json({ results: searchResults });
    } catch (error) {
        console.error('Error during student search:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update course by courseCode route
router.put('/admin/updatecourse/:courseCode', async (req, res) => {
    const courseCode = req.params.courseCode;
    const updatedData = req.body;
    try {
        await UpdateCourseBycourseCode(courseCode, updatedData);
        res.send('Updated a course');
    } catch (error) {
        console.error('Error during course update:', error);
        res.status(500).send('Failed to update course');
    }
});

export default router;