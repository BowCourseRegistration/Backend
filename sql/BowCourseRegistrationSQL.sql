-- CREATING STUDENT TABLE

CREATE TABLE Student (
  studentID INT PRIMARY KEY,
  email NVARCHAR(100) NOT NULL UNIQUE,
  password NVARCHAR(255) NOT NULL,
  program NVARCHAR(50),
  firstName NVARCHAR(50),
  lastName NVARCHAR(50),
  phone NVARCHAR(20),
  dob DATE,
  username NVARCHAR(50) NOT NULL,
  programID INT,
  FOREIGN KEY (programID) REFERENCES Program(programID)
);

-- CREATING COURSE TABLE

CREATE TABLE Course (
  courseCode NVARCHAR(50) PRIMARY KEY,
  courseName NVARCHAR(100),
  startingDate DATE,
  endingDate DATE,
  fees DECIMAL(10,2),
  description NVARCHAR(MAX),
  termID INT,
  FOREIGN KEY (termID) REFERENCES Term(termID)
);

-- CREATING PROGRAM TABLE

CREATE TABLE Program (
  programID INT PRIMARY KEY,
  programName NVARCHAR(50)
);

-- CREATING TERM TABLE

CREATE TABLE Term (
  termID INT PRIMARY KEY,
  startDate DATE,
  endDate DATE
);

-- CREATING REGISTRATION TABLE

CREATE TABLE Registration (
  registrationID INT PRIMARY KEY,
  studentID INT,
  courseCode NVARCHAR(50),
  termID INT,
  FOREIGN KEY (studentID) REFERENCES Student(studentID),
  FOREIGN KEY (courseCode) REFERENCES Course(courseCode),
  FOREIGN KEY (termID) REFERENCES Term(termID)
);

-- CREATING ADMIN TABLE

CREATE TABLE Admin (
  adminID INT PRIMARY KEY,
  username NVARCHAR(50) NOT NULL,
  password NVARCHAR(255) NOT NULL
);

-- CREATING CONTACTFORM TABLE

CREATE TABLE ContactForm (
  formID INT PRIMARY KEY,
  studentID INT,
  message NVARCHAR(MAX),
  FOREIGN KEY (studentID) REFERENCES Student(studentID)
);



-- INSERTING DATA FOR TERM
INSERT INTO Term (termID, startDate, endDate)
VALUES
(1, '2023-09-01', '2023-12-20'),
(2, '2024-01-05', '2024-05-02'),
(3, '2024-09-01', '2024-12-20'),
(4, '2025-01-05', '2025-05-02');

-- INSERTING DATA FOR PROGRAM
INSERT INTO Program (programID, programName)
VALUES
(1, 'Certificate'),
(2, 'Post-Diploma'),
(3, 'Diploma');

-- INSERTING DATA FOR CERTIFICATE TERM1 COURSES
INSERT INTO Course (courseCode, courseName, startingDate, endingDate, fees, description, termID)
VALUES
('CertPr111', 'Certificate Project Management1', '2023-09-01', '2023-12-20', 700.00, 'Course Description', 1),
('CertC++111', 'Certificate C++ Programming Fundamentals', '2023-09-01', '2023-12-20', 720.00, 'Course Description', 1),
('CertCompM1111', 'Certificate Computer Maintenance', '2023-09-01', '2023-12-20', 780.00, 'Course Description', 1),
('CertIS1111', 'Certificate Information Security1', '2023-09-01', '2023-12-20', 790.00, 'Course Description', 1);

-- INSERTING DATA FOR CERTIFICATE TERM2 COURSES
INSERT INTO Course (courseCode, courseName, startingDate, endingDate, fees, description, termID)
VALUES
('CertNet222', 'Certificate Networking', '2024-01-05', '2024-05-02', 710.00, 'Course Description', 2),
('CertWeb222', 'Certificate Web Technology', '2024-01-05', '2024-05-02', 795.00, 'Course Description', 2),
('CertPro222', 'Certificate Project Management', '2024-01-05', '2024-05-02', 730.00, 'Course Description', 2);

-- INSERTING DATA FOR POST-DIPLOMA TERM3 COURSES
INSERT INTO Course (courseCode, courseName, startingDate, endingDate, fees, description, termID)
VALUES
('PostDipPr333', 'Post-Diploma Advanced Project Management1', '2024-09-01', '2024-12-20', 750.00, 'Course Description', 3),
('PostDipC++333', 'Post-Diploma Advanced C++ Programming Fundamentals', '2024-09-01', '2024-12-20', 740.00, 'Course Description', 3),
('PostDipCompM333', 'Post-Diploma Advanced Computer Maintenance', '2024-09-01', '2024-12-20', 720.00, 'Course Description', 3),
('PostDipIS333', 'Post-Diploma Advanced Information Security1', '2024-09-01', '2024-12-20', 710.00, 'Course Description', 3);

-- INSERTING DATA FOR POST-DIPLOMA TERM4 COURSES
INSERT INTO Course (courseCode, courseName, startingDate, endingDate, fees, description, termID)
VALUES
('PostDipNet444', 'Post-Diploma Advanced Networking', '2025-01-05', '2025-05-02', 760.00, 'Course Description', 4),
('PostDipWeb444', 'Post-Diploma Advanced Web Technology', '2025-01-05', '2025-05-02', 740.00, 'Course Description', 4),
('PostDipPro444', 'Post-Diploma Advanced Project Management', '2025-01-05', '2025-05-02', 770.00, 'Course Description', 4);

-- INSERTING DATA FOR DIPLOMA TERM1 COURSES
INSERT INTO Course (courseCode, courseName, startingDate, endingDate, fees, description, termID)
VALUES
('Pr111', 'Project Management1', '2023-09-01', '2023-12-20', 700.00, 'Course Description', 1),
('C++111', 'C++ Programming Fundamentals', '2023-09-01', '2023-12-20', 720.00, 'Course Description', 1),
('CompM1111', 'Computer Maintenance', '2023-09-01', '2023-12-20', 780.00, 'Course Description', 1),
('IS1111', 'Information Security1', '2023-09-01', '2023-12-20', 790.00, 'Course Description', 1);

-- INSERTING DATA FOR DIPLOMA TERM2 COURSES
INSERT INTO Course (courseCode, courseName, startingDate, endingDate, fees, description, termID)
VALUES
('Net222', 'Networking', '2024-01-05', '2024-05-02', 710.00, 'Course Description', 2),
('Web222', 'Web Technology', '2024-01-05', '2024-05-02', 795.00, 'Course Description', 2),
('Pro222', 'Project Management', '2024-01-05', '2024-05-02', 730.00, 'Course Description', 2);

-- INSERTING DATA FOR DIPLOMA TERM3 COURSES
INSERT INTO Course (courseCode, courseName, startingDate, endingDate, fees, description, termID)
VALUES
('Pr333', 'Advanced Project Management1', '2024-09-01', '2024-12-20', 750.00, 'Course Description', 3),
('C++333', 'Advanced C++ Programming Fundamentals', '2024-09-01', '2024-12-20', 740.00, 'Course Description', 3),
('CompM333', 'Advanced Computer Maintenance', '2024-09-01', '2024-12-20', 720.00, 'Course Description', 3),
('IS333', 'Advanced Information Security1', '2024-09-01', '2024-12-20', 710.00, 'Course Description', 3);

-- INSERTING DATA FOR DIPLOMA TERM4 COURSES
INSERT INTO Course (courseCode, courseName, startingDate, endingDate, fees, description, termID)
VALUES
('Net444', 'Advanced Networking', '2025-01-05', '2025-05-02', 760.00, 'Course Description', 4),
('Web444', 'Advanced Web Technology', '2025-01-05', '2025-05-02', 740.00, 'Course Description', 4),
('Pro444', 'Advanced Project Management', '2025-01-05', '2025-05-02', 770.00, 'Course Description', 4);

-- INSERTING SAMPLE DATA FOR STUDENTS
INSERT INTO Student (studentID, email, password, programID, firstName, lastName, phone, dob, username)
VALUES 
(1, 'john@example.com', 'hashedpassword', 1, 'John', 'Doe', '1234567890', '1990-01-01', 'johndoe'),
(2, 'jane@example.com', 'hashedpassword', 2, 'Jane', 'Smith', '9876543210', '1995-03-15', 'janesmith'),
(3, 'bob@example.com', 'hashedpassword', 3, 'Bob', 'Johnson', '5551234567', '1988-07-20', 'bobjohnson');

-- INSERTING SAMPLE DATA FOR SUPERADMIN
INSERT INTO Admin (adminID, username, password) VALUES (1, 'superadmin', 'sapassword');

-- INSERTING SAMPLE DATA FOR STAFFADMIN
INSERT INTO Admin (adminID, username, password) VALUES (2, 'staffadmin', 'staffpassword');


