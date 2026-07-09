# Student Task Tracker

## About the Project

Student Task Tracker is a web application that helps college students organize their assignments, subjects, and deadlines. Instead of keeping track of everything on paper or using multiple apps, students can manage all of their coursework in one place.

This project was created for our **BCS430 Senior Project** at **Farmingdale State College**. We built the application using **Spring Boot** for the backend and **HTML, CSS, and JavaScript** for the frontend.

---

# Team Members

| Name | Contribution |
|------|--------------|
| Joseph | Project setup, UserRepository, SecurityConfig, UserService, HTML |
| Anmol | User Entity, TaskRepository, TaskRequest, TaskService, CSS |
| Jeremy | Task Entity, SubjectRepository, SubjectRequest, SubjectService, CSS |
| Jesse | Subject Entity, TaskResponse, AuthController, TaskController, JavaScript |
| Prakash | README, SubjectResponse, SubjectController, JavaScript for Task and Subject CRUD |

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

# Main Features

### User Authentication
- Register a new account
- Login and logout
- Secure password encryption using BCrypt
- Spring Security authentication

### Task Management
- Create tasks
- Edit tasks
- Delete tasks
- Set priority (High, Medium, Low)
- Update task status
- Assign tasks to subjects
- Add due dates
- Filter and search tasks

### Subject Management
- Add new subjects
- Edit subjects
- Delete subjects
- Assign colors to each subject
- View the number of tasks for every subject

### Dashboard
- Personalized welcome message
- View task statistics
- Display upcoming assignments
- Quick overview of completed and pending work

---

# Getting Started

## Requirements

Before running the project, make sure you have:

- Java 17 or later
- Maven 3.6 or later

## Running the Project

Clone the repository and navigate to the project folder.

Run the following command:

```bash
mvn spring-boot:run
```

Once the application starts, open your browser and visit:

```
http://localhost:8080
```

---

# First Time Using the Application

1. Register a new account.
2. Login using your account.
3. Create your subjects.
4. Add tasks for each subject.
5. Track your assignments using the dashboard.

---

# Project Structure

```
src
└── main
    ├── java
    │   └── com.student.tasktracker
    │       ├── config
    │       ├── controller
    │       ├── dto
    │       ├── entity
    │       ├── repository
    │       ├── service
    │       └── TaskTrackerApplication.java
    │
    └── resources
        ├── static
        │   ├── css
        │   ├── js
        │   └── index.html
        └── application.properties
```

---

# REST API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login |
| POST | /api/auth/logout | Logout |
| GET | /api/auth/me | Get current user |

## Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/{id} | Update a task |
| DELETE | /api/tasks/{id} | Delete a task |
| GET | /api/tasks/summary | Get task summary |

## Subjects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/subjects | Get all subjects |
| POST | /api/subjects | Create a subject |
| PUT | /api/subjects/{id} | Update a subject |
| DELETE | /api/subjects/{id} | Delete a subject |

---

# Database

This project uses an **H2 file-based database**, so your data is saved even after restarting the application.

**H2 Console**

```
http://localhost:8080/h2-console
```

**JDBC URL**

```
jdbc:h2:file:./data/tasktracker
```

**Username**

```
sa
```

**Password**

Leave the password blank.

---

# Git Workflow

Our team used GitHub to collaborate throughout the project.

- `main` contains the stable version of the project.
- `dev` is used for development.
- Each team member creates their own feature branch.
- Changes are merged into `dev` using pull requests.
- After testing, the final version is merged into `main`.

---

# Future Improvements

Some features we would like to add in the future include:

- Email reminders for upcoming assignments
- Calendar integration
- File uploads for assignments
- Dark mode
- Mobile responsive design
- Notifications

---

# Acknowledgements

This application was developed as part of the **BCS430 Senior Project** at **Farmingdale State College**.

Working on this project gave our team experience with GitHub collaboration, Agile development, REST APIs, Spring Boot, and frontend development using HTML, CSS, and JavaScript.