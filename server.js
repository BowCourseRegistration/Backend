import express, { json, urlencoded } from "express";
import { fileURLToPath } from "url";
import path from "path";
import {
    AddCourse,
    DeleteCourse,
    SearchCourse,
    SearchStudentsByProgram,
    AdminLogin,
    getContactForms,  // Added import for getContactForms
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

// ... (other routes)

//view contact forms '/admin/contactform'
app.get("/admin/contactform", async function (req, res) {
    try {
        // Using the getContactForms function from db.js to retrieve contact forms
        const contactForms = await getContactForms();

        res.json({ contactForms });
    } catch (error) {
        console.error("Error retrieving contact forms:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//create contact form '/contactform'
app.post("/contactform", async function (req, res) {
    
});

// ... (other routes)

/* DB */
//MSSQL
//MONGODB

app.listen(port, function () {
    console.log(`Server is running on ${port}`);
});
