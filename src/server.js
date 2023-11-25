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

// API routes
app.use("/admin", adminRouter);
app.use("/student", studentRouter);

app.get("/", (req, res) => {
  res.end("Connected with React.js");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});


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

