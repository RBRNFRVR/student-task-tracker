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
mvn spring-boot:run
```

After the application starts, open your browser and go to:

```
http://localhost:8080
```

---

# Using the Application

1. Register a new account.
2. Login using your account.
3. Add your subjects.
4. Start creating and managing your tasks.

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

---

# About the Project

This project was completed as part of the BCS430 Senior Project course. Throughout development, our team practiced Agile development, Git version control, collaboration, and full-stack web application development using Spring Boot and JavaScript.
