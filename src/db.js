import sql from "mssql";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const config = {
  server: "localhost",
  port: 57000,
  user: "user",
  password: "user",
  database: "BowCourseRegistration",
  options: {
    trustServerCertificate: true,
  },
};

// Function to handle common database connection setup and closing
const executeQuery = async (query, params) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();

    // Add parameters to the request
    if (params) {
      params.forEach(({ name, type, value }) => {
        request.input(name, type, value);
      });
    }
    // Execute the query and return the result
    const result = await request.query(query);
    return result.recordset;
  } catch (err) {
    console.error("Error executing query:", err);
    throw err;
  } finally {
    await sql.close();
  }
};

// Admin Login function
export const AdminLogin = async function (admin) {
  const { username, password } = admin;
  const query = `
    SELECT * FROM Admin
    WHERE username = @username
    AND password = @password
    `;

  try {
    const result = await executeQuery(query, [
      { name: "username", type: sql.NVarChar, value: username },
      { name: "password", type: sql.NVarChar, value: password },
    ]);
    console.log(result);

    return { message: "success", role: "admin" };
  } catch (err) {
    console.error("Error Admin Login", err);
    throw err;
  }
};

// Add Course function
export const AddCourse = async function (course) {
  const query = `
    INSERT INTO dbo.Course (courseCode, courseName, startingDate, endingDate, fees, description, termID)
    VALUES (@courseCode, @courseName, @startingDate, @endingDate, @fees, @description, @termID)
    `;

  try {
    await executeQuery(query, [
      { name: "courseCode", type: sql.NVarChar, value: course.courseCode },
      { name: "courseName", type: sql.NVarChar, value: course.courseName },
      { name: "startingDate", type: sql.Date, value: course.startingDate },
      { name: "endingDate", type: sql.Date, value: course.endingDate },
      { name: "fees", type: sql.Decimal, value: course.fees },
      { name: "description", type: sql.NVarChar, value: course.description },
      { name: "termID", type: sql.Int, value: course.termID },
    ]);

    console.log("Course added successfully");
  } catch (err) {
    console.error("Error adding course:", err);
    throw err;
  }
};

// Search Course function
export const SearchCourse = async function (keyword) {
  const query = `
        SELECT * FROM Course
        WHERE courseCode LIKE '%' + @keyword + '%'
        OR courseName LIKE '%' + @keyword + '%'
    `;

  try {
    return await executeQuery(query, [
      { name: "keyword", type: sql.NVarChar, value: keyword },
    ]);
  } catch (err) {
    throw err;
  }
};

// Delete Course function
export const DeleteCourse = async function (courseCode) {
  const query = `
    DELETE FROM Course
    WHERE courseCode = @courseCode
    `;

  try {
    await executeQuery(query, [
      { name: "courseCode", type: sql.NAV, value: courseCode },
    ]);
    console.log("Course deleted successfully");
  } catch (err) {
    console.error("Error deleting course:", err);
    throw err;
  }
};

// Search Student by Program function
export const SearchStudentsByProgram = async function (program) {
  const query = `
    SELECT * FROM Student
    WHERE program = @program
    `;

  try {
    return await executeQuery(query, [
      { name: "program", type: sql.NVarChar, value: program },
    ]);
  } catch (err) {
    throw err;
  }
};

// Update Course by courseCode function
export const UpdateCourseBycourseCode = async function (
  courseCode,
  updateData
) {
  const query = `
    UPDATE Course
    SET courseCode = @courseCode,
    courseName = @courseName,
    startingDate = @startingDate,
    endingDate = @endingDate,
    fees = @fees,
    description = @description,
    termID = @termID
    WHERE courseCode = @courseCode
    `;

  try {
    await executeQuery(query, [
      { name: "courseCode", type: sql.NVarChar, value: updateData.courseCode },
      { name: "courseName", type: sql.NVarChar, value: updateData.courseName },
      { name: "startingDate", type: sql.Date, value: updateData.startingDate },
      { name: "endingDate", type: sql.Date, value: updateData.endingDate },
      { name: "fees", type: sql.Decimal, value: updateData.fees },
      {
        name: "description",
        type: sql.NVarChar,
        value: updateData.description,
      },
      { name: "termID", type: sql.Int, value: updateData.termID },
    ]);
  } catch (err) {
    throw err;
  }
};

// STUDENT SECTION
//

// Student Signup function
export const Signup = async function (newStudent) {
  try {
    await sql.connect(config);

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(newStudent.password, 10);

    // Generate a unique ID for the student (Starting with 4 and followed by 5 random digits)
    const studentID = "4" + Math.floor(10000 + Math.random() * 90000);
    const query = `
    INSERT INTO Student (studentID, email, password, program, firstName, lastName, phone, dob, username, programID)
    VALUES (@studentID, @email, @password, @program, @firstName, @lastName, @phone, @dob, @username, @programID)
    `;

    const request = new sql.Request();

    request.input("studentID", sql.INT, studentID);
    request.input("email", sql.NVarChar, newStudent.email);
    request.input("password", sql.NVarChar, hashedPassword);
    request.input("program", sql.NVarChar, newStudent.program);
    request.input("firstName", sql.NVarChar, newStudent.firstName);
    request.input("lastName", sql.NVarChar, newStudent.lastName);
    request.input("phone", sql.NVarChar, newStudent.phone);
    request.input("dob", sql.Date, newStudent.dob);
    request.input("username", sql.NVarChar, newStudent.username);
    request.input("programID", sql.INT, newStudent.programID);

    await request.query(query);

    return "Student signed up successfully";
  } catch (err) {
    console.error("Error signing up student:", err);
    throw err;
  } finally {
    await sql.close();
  }
};

// Student Login function

export const StudentLogin = async function (student) {
  try {
    await sql.connect(config);
    const query = `
        SELECT * FROM Student
        WHERE username = @username
    `;

    const request = new sql.Request();
    request.input("username", sql.NVarChar, student.username);
    const result = await request.query(query);

    if (result.recordset.length > 0) {
      const match = await bcrypt.compare(
        student.password,
        result.recordset[0].password
      );
      if (match) {
        return "Login success";
      } else {
        throw new Error("Invalid credentials");
      }
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    console.error("Error during student login:", err);
    throw err;
  } finally {
    await sql.close();
  }
};

// Search Available Courses function
export const SearchAvailableCourses = async function (keyword) {
  const query = `
    SELECT * FROM Course
    WHERE courseCode LIKE '%' + @keyword + '%'
    OR courseName LIKE '%' + @keyword + '%'
    `;

  try {
    return await executeQuery(query, [
      { name: "keyword", type: sql.NVarChar, value: keyword },
    ]);
  } catch (err) {
    throw err;
  } finally {
    await sql.close();
  }
};
