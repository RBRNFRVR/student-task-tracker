package com.student.tasktracker.dto;

import com.student.tasktracker.entity.Task;
import java.time.LocalDateTime;

public class TaskResponse {
    private Long id;
    private String title;
    private String description;
    private LocalDateTime dueDate;
    private String priority;
    private String status;
    private Integer estimatedMinutes;
    private LocalDateTime createdAt;
    private Long subjectId;
    private String subjectName;
    private String subjectColor;

    public static TaskResponse from(Task task) {
        TaskResponse r = new TaskResponse();
        r.id = task.getId();
        r.title = task.getTitle();
        r.description = task.getDescription();
        r.dueDate = task.getDueDate();
        r.priority = task.getPriority().name();
        r.status = task.getStatus().name();
        r.estimatedMinutes = task.getEstimatedMinutes();
        r.createdAt = task.getCreatedAt();
        if (task.getSubject() != null) {
            r.subjectId = task.getSubject().getId();
            r.subjectName = task.getSubject().getName();
            r.subjectColor = task.getSubject().getColor();
        }
        return r;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public LocalDateTime getDueDate() { return dueDate; }
    public String getPriority() { return priority; }
    public String getStatus() { return status; }
    public Integer getEstimatedMinutes() { return estimatedMinutes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public Long getSubjectId() { return subjectId; }
    public String getSubjectName() { return subjectName; }
    public String getSubjectColor() { return subjectColor; }
}
