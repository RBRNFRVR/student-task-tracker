Student Task Tracker

A full-stack task management web app built for students to organize coursework, deadlines, and priorities across their classes. Built as a senior capstone project (BCS430) by a five-person team.

Features
Create, update, complete, and delete tasks tied to specific courses
Track task priority (High/Medium/Low) and status (Not Started/In Progress/Completed)
Comment on tasks for progress notes
User authentication and per-user task isolation
Course and subject management via REST API
Responsive UI with dynamic rendering, due-date formatting, and inline status cycling
Tech Stack
Backend: Java 17, Spring Boot, Spring Security, Maven
Database: H2 (file-based), verified via H2 console
Frontend: HTML, CSS, vanilla JavaScript
Testing: Postman (API verification), manual GIVEN/WHEN/THEN test plan (15 test cases)
Architecture
Entities: Task, User, Course, TaskComment, with Priority and Status enums
Package structure: com.student.tasktracker.entity / .controller / .dto
Database: Four core tables — USERS, COURSES, TASKS, TASK_COMMENTS — auto-created via Spring Data JPA
REST API: CRUD endpoints for tasks and subjects (/api/tasks, subject endpoints via SubjectController)
My Contributions (Prakash Pyakurel — Database & Task Model Lead)
Designed and implemented the core backend entities: Task, User, Course, and TaskComment, plus supporting Priority/Status enums
Diagnosed and fixed an H2 reserved-keyword conflict (year → academicYear) that was breaking schema generation
Led a package restructuring migration across the team's codebase (com.example.studenttasktracker.model → com.student.tasktracker.entity) to resolve naming inconsistencies between branches
Built SubjectResponse.java (DTO) and SubjectController.java, exposing four REST endpoints for subject data
Wrote 20+ JavaScript functions powering the frontend (renderTasks, taskCard, cycleStatus, confirmDelete, performDelete, formatDue, priorityLabel, statusLabel, and others)
Verified database schema and data integrity directly via the H2 console and validated full CRUD functionality using Postman
Authored the final sprint's core deliverables: README.md, SubjectResponse.java, SubjectController.java, and the frontend JS layer — all merged into the shared repo
Presented the project's final Release Plan and User Stories, including a live demo of the Subject endpoints, task delete flow, and UI formatting helpers
Running Locally
bash
# Clone the repo
git clone https://github.com/RBRNFRVR/student-task-tracker.git
cd student-task-tracker

# Build and run
mvn clean install
mvn spring-boot:run

The app will start on http://localhost:8080.

To inspect the database directly, open the H2 console at http://localhost:8080/h2-console using JDBC URL:

jdbc:h2:file:./data/tasktracker
API Endpoints (Sample)
Method	Endpoint	Description
GET	/api/tasks	List all tasks
POST	/api/tasks	Create a new task
PUT	/api/tasks/{id}	Update an existing task
DELETE	/api/tasks/{id}	Delete a task
GET	/api/subjects	List subjects
Team

Built by a five-person team: Prakash Pyakurel, Joseph, Anmol, Jeremy, and Jesse — as part of the BCS430 Senior Project capstone.

Project Documentation

The full development process included sprint-based documentation: a Level 0 Data Flow Diagram, a Feature-Driven Development (FDD) plan, a database design document, and a 15-case test plan following GIVEN/WHEN/THEN structure, in addition to a recorded project demo.
