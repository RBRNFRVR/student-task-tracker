Ha, fair enough! Here's a more natural version that looks like you wrote it yourself:
markdown# Database Design
## Student Task Tracker 
**Author:** Prakash Pyakurel
**Course:** BCS430 – Senior Project
**Branch:** feature/task-model

---

## Overview
This app uses MySQL as the database. Spring Boot handles the backend with JPA/Hibernate doing the ORM mapping. There are two main tables: users and tasks.

---

## Tables

### users
Holds student account info for login and profile.

| Column     | Type         | Notes                  |
|------------|--------------|------------------------|
| id         | BIGINT       | PK, auto increment     |
| full_name  | VARCHAR(100) | required               |
| username   | VARCHAR(50)  | unique, required       |
| email      | VARCHAR(100) | unique, required       |
| password   | VARCHAR(255) | required               |
| major      | VARCHAR(100) |                        |
| student_id | VARCHAR(20)  | e.g. STU-2024033       |
| year       | VARCHAR(20)  | e.g. Junior, Senior    |

### tasks
Holds all assignments/tasks created by students.

| Column      | Type         | Notes                            |
|-------------|--------------|----------------------------------|
| id          | BIGINT       | PK, auto increment               |
| title       | VARCHAR(255) | required                         |
| course_name | VARCHAR(100) | e.g. CS201                       |
| due_date    | DATE         |                                  |
| description | TEXT         | optional                         |
| priority    | ENUM         | HIGH, MEDIUM, LOW                |
| status      | ENUM         | PENDING, IN_PROGRESS, COMPLETED  |
| user_id     | BIGINT       | FK → users(id)                   |

---

## Relationships
- A user can have many tasks (One-to-Many)
- Each task belongs to one user through user_id

---

## ERD
users (1) ──────< tasks (many)
users: id, full_name, username, email, password, major, student_id, year

tasks: id, title, course_name, due_date, description, priority, status, user_id
