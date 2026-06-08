# Student Task Tracker

A simple fullstack student assignment/task tracker built with Java, Spring Boot, Maven, H2 Database, HTML, CSS, and JavaScript.

## Tech Stack

- Java 17
- Spring Boot
- Maven
- H2 Database
- Spring Data JPA
- HTML/CSS/JavaScript

## How to Run

1. Clone the repo.

2. Go to `src/main/java/com/example/studenttasktracker/studenttasktracker` and run `StudentTaskTrackerApplication.java` or press the play button on top.

   **WARNING:** It is ok to see error messages on `localhost:8080`, controllers are missing.

3. Open H2 Database Manager and connect to `localhost:8080/h2-console`.

4. Database Info:

   JDBC URL: `jdbc:h2:mem:taskdb`  
   Username: `sa`  
   Password: leave blank

## Branch Workflow

- `main` is the stable branch.
- `dev` is the team working branch.
- Do not push directly to `main` unless you are the GitHub lead.
- Create feature branches from `dev`.
- Open pull requests back into `dev`.

## GitHub Actions

This project uses GitHub Actions to check that the Spring Boot Maven project builds successfully.

The workflow runs on:

- Pushes to `dev`
- Pushes to `main`
- Pull requests into `dev`

Semantic release runs only on `main`.