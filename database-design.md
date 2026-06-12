# Database Design

## Task model fields

| Field      | Type      | Notes                       |
|------------|-----------|-----------------------------|
| id         | Long      | Primary key, auto-increment |
| title      | String    | Task name                   |
| courseName | String    | Associated course           |
| dueDate    | LocalDate | When it's due               |
| priority   | String    | LOW, MEDIUM, HIGH           |
| status     | String    | PENDING, IN_PROGRESS, DONE  |