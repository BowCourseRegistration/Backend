import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import flash from "connect-flash";
import cors from "cors";
import bodyParser from "body-parser";
import adminRouter from "./routers/admin-router.js";
import studentRouter from "./routers/student-router.js";
import { AdminLogin, GetAdminByUsername, GetStudentByUsername } from "./db.js";

const { json, urlencoded } = bodyParser;
const app = express();
const port = 5070;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  session({
    secret: "web", // Change this to a secure secret key
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(
  "admin",
  new LocalStrategy(async (username, password, done) => {
    try {
      const userInfo = await GetAdminByUsername(username);
      if (!userInfo[0].adminID) {
        return done(null, false, { message: "Incorrect role" });
      }

      if (!userInfo || !userInfo.recordset) {
        return done(null, false, { message: "Incorrect username or password" });
      }

      if (userInfo.recordset.length === 0) {
        return done(null, false, { message: "Incorrect username or password" });
      }

      const admin = userInfo.recordset[0];

      if (admin.password != password) {
        return done(null, false, { message: "Incorrect username or password" });
      }

      return done(null, admin);
    } catch (error) {
      return done(error);
    }
  })
);
passport.use(
  "student",
  new LocalStrategy(async (username, password, done) => {
    try {
      const userInfo = await GetStudentByUsername(username);
      if (!userInfo[0].studentID) {
        return done(null, false, { message: "Incorrect role" });
      }

      if (!userInfo || !userInfo.recordset) {
        return done(null, false, { message: "Incorrect username or password" });
      }

      if (userInfo.recordset.length === 0) {
        return done(null, false, { message: "Incorrect username or password" });
      }

      const student = userInfo.recordset[0];
      const match = await bcrypt.compare(
        student.password,
        result.recordset[0].password
      );

      if (!match) {
        return done(null, false, { message: "Incorrect username or password" });
      }

      return done(null, student);
    } catch (error) {
      return done(error);
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id); // Assuming user has an 'id' property
});

passport.deserializeUser(async (id, done) => {
  try {
    // Fetch the user from the database based on the id
    const user = await GetAdminById(id); // Implement this function based on your database structure
    done(null, user);
  } catch (error) {
    done(error);
  }
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

/* //view contact forms '/admin/contactform'
app.get("/admin/contactform", async function (req, res) {
  try {
    // Using the getContactForms function from db.js to retrieve contact forms
    const contactForms = await getContactForms();

    res.json({ contactForms });
  } catch (error) {
    console.error("Error retrieving contact forms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}); */
