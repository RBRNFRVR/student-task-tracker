# Student Task Tracker

Student Task Tracker is a web-based application that helps college students keep track of assignments, subjects, and deadlines in one place. The goal of this project is to make it easier for students to stay organized and manage their school work.

This project was developed for the BCS430 Senior Project at Farmingdale State College.

**Live Demo:** [student-task-tracker-onxv.onrender.com](https://student-task-tracker-onxv.onrender.com/)

---

# Team Members

| Team Member | Contribution |
|-------------|--------------|
| Joseph | Project setup, UserRepository, SecurityConfig, UserService, HTML |
| Anmol | User Entity, TaskRepository, TaskRequest, TaskService, CSS |
| Jeremy | Task Entity, SubjectRepository, SubjectRequest, SubjectService, CSS |
| Jesse | Subject Entity, TaskResponse, AuthController, TaskController, JavaScript |
| Prakash | README, SubjectResponse, SubjectController, JavaScript for Task & Subject CRUD |

---

# Technologies Used

- Java 17
- Spring Boot 3.2.5
- Spring Security
- Spring Data JPA
- H2 Database
- Maven
- HTML
- CSS
- JavaScript

---

# Features

### User Authentication
- Register a new account
- Login and logout
- Password encryption using BCrypt
- Secure authentication with Spring Security

### Task Management
- Add new tasks
- Edit existing tasks
- Delete tasks
- Set task priority (High, Medium, Low)
- Track task status
- Assign tasks to subjects
- Set due dates
- Search and filter tasks

### Subject Management
- Create subjects
- Edit subjects
- Delete subjects
- Assign colors to subjects
- View the number of tasks in each subject

### Dashboard
- Personalized greeting
- View total tasks
- See completed and incomplete tasks
- Display upcoming assignments

---

# Getting Started

## Requirements

Before running the project, make sure you have:

- Java 17 or newer
- Maven 3.6 or newer

## Running the Project

Open the project folder and run:

```bash
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
```

After the application starts, open your browser and go to:

```
http://localhost:8080
```

---

# Using the Application
The app will start on http://localhost:8080.

1. Register a new account.
2. Login using your account.
3. Add your subjects.
4. Start creating and managing your tasks.
To inspect the database directly, open the H2 console at http://localhost:8080/h2-console using JDBC URL:

---

# Project Structure

```
src
├── main
│   ├── java
│   │   └── com.student.tasktracker
│   │       ├── config
│   │       ├── controller
│   │       ├── dto
│   │       ├── entity
│   │       ├── repository
│   │       ├── service
│   │       └── TaskTrackerApplication.java
│   └── resources
│       ├── static
│       │   ├── css
│       │   ├── js
│       │   └── index.html
│       └── application.properties
```

---

# REST API

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| POST | /api/auth/logout |
| GET | /api/auth/me |

## Tasks

| Method | Endpoint |
|---------|----------|
| GET | /api/tasks |
| POST | /api/tasks |
| PUT | /api/tasks/{id} |
| DELETE | /api/tasks/{id} |
| GET | /api/tasks/summary |

## Subjects

| Method | Endpoint |
|---------|----------|
| GET | /api/subjects |
| POST | /api/subjects |
| PUT | /api/subjects/{id} |
| DELETE | /api/subjects/{id} |

---

# Database

The project uses an H2 database to store application data.

H2 Console:

```
http://localhost:8080/h2-console
```

JDBC URL:

```
jdbc:h2:file:./data/tasktracker
```

Username:

```
sa
```

Password:

```
Leave blank
```

---

# Git Workflow

Our team used GitHub to manage the project.

- `main` contains the stable version.
- `dev` is used for development.
- Every member creates a feature branch from `dev`.
- Changes are merged into `dev` through pull requests.
- Only tested code is merged into `main`.
API Endpoints (Sample)
Method	Endpoint	Description
GET	/api/tasks	List all tasks
POST	/api/tasks	Create a new task
PUT	/api/tasks/{id}	Update an existing task
DELETE	/api/tasks/{id}	Delete a task
GET	/api/subjects	List subjects
Team

---
Built by a five-person team: Prakash Pyakurel, Joseph, Anmol, Jeremy, and Jesse — as part of the BCS430 Senior Project capstone.

# About the Project
Project Documentation

This project was completed as part of the BCS430 Senior Project course. Throughout development, our team practiced Agile development, Git version control, collaboration, and full-stack web application development using Spring Boot and JavaScript.
The full development process included sprint-based documentation: a Level 0 Data Flow Diagram, a Feature-Driven Development (FDD) plan, a database design document, and a 15-case test plan following GIVEN/WHEN/THEN structure, in addition to a recorded project demo.
