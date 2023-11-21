import sql from "mssql";

export const config = {
  server: "localhost",
  port: 57000,
  user: "user",
  password: "user",
  database: "DBconnectionTest",
  options: {
    trustServerCertificate: true,
  },
};

export const AdminLogin = async function (admin) {
  try {
    await sql.connect(config);

    const { email, password } = admin;

    const query = `SELECT * FROM Admins 
                    WHERE email = @email 
                    AND password = @password`;

    const request = new sql.Request();
    request.input("email", sql.NVarChar, email);
    request.input("password", sql.NVarChar, password);

    const result = await request.query(query);

    if (result.recordset.length > 0) {
      return "Login success";
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    console.error("Error Admin Login", err);
    throw err;
  } finally {
    await sql.close();
  }
};

export const AddCourse = async function (course) {
  try {
    await sql.connect(config);

    // Define the data to insert
    const newCourse = {
      courseCode: course.courseCode,
      courseName: course.courseName,
      term: course.term,
      fee: course.fee,
      description: course.description,
    };
    // Prepare the SQL query
    const query = `
              INSERT INTO dbo.Courses (courseCode, courseName, term, fee, description)
              VALUES (@courseCode, @courseName, @term, @fee, @description)
            `;

    // Create a new request object
    const request = new sql.Request();

    // Add parameters to the request
    request.input("courseCode", sql.NVarChar, course.courseCode);
    request.input("courseName", sql.NVarChar, course.courseName);
    request.input("term", sql.Int, course.term);
    request.input("fee", sql.Decimal, course.fee);
    request.input("description", sql.NVarChar, course.description);

    // Execute the query
    const result = await request.query(query);

    console.log("Course inserted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    // Close the database connection
    await sql.close();
  }
};

export const SearchCourse = async function (keyword) {
  try {
    await sql.connect(config);

    const query = `
          SELECT * FROM Courses
          WHERE courseCode LIKE '%' + @keyword + '%'
             OR courseName LIKE '%' + @keyword + '%'
        `;

    const request = new sql.Request();
    request.input("keyword", sql.NVarChar, keyword);

    const result = await request.query(query);
    return result.recordset;
  } catch (err) {
    throw err;
  } finally {
    await sql.close();
  }
};

export const DeleteCourse = async function (id) {
  try {
    await sql.connect(config);
    const query = "DELETE FROM Courses WHERE id = @id"; // Replace with your table name
    const request = new sql.Request();
    request.input("id", sql.Int, id);
    await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    await sql.close();
  }
};

export const SearchStudentsByProgram = async function (program) {
  try {
    await sql.connect(config);

    const query = `
          SELECT * FROM Students
          WHERE program = @program
        `;

    const request = new sql.Request();
    request.input("program", sql.NVarChar, program);

    const result = await request.query(query);
    return result.recordset;
  } catch (err) {
    throw err;
  } finally {
    await sql.close();
  }
};

export const updateCourseById = async function (id, updatedData) {
  try {
    await sql.connect(config);
    console.log(updatedData);

    // Define the SQL query to update the row
    const query = `
          UPDATE Course
          SET courseCode = @courseCode, courseName = @courseName, term = @term, fee = @fee, description = @description
          WHERE id = @id
        `;

    // Create a new request object
    const request = new sql.Request();

    // Add parameters to the request
    request.input("courseCode", sql.NVarChar, updatedData.courseCode);
    request.input("courseName", sql.NVarChar, updatedData.courseName);
    request.input("term", sql.Int, updatedData.term);
    request.input("fee", sql.Decimal, updatedData.fee);
    request.input("description", sql.NVarChar, updatedData.description);

    // Execute the query
    await request.query(query);
  } catch (err) {
    throw err;
  } finally {
    await sql.close();
  }
};
