package com.student.tasktracker.dto;

import com.student.tasktracker.entity.Subject;

public class SubjectResponse {
    private Long id;
    private String name;
    private String color;
    private int taskCount;

    public static SubjectResponse from(Subject subject) {
        SubjectResponse r = new SubjectResponse();
        r.id = subject.getId();
        r.name = subject.getName();
        r.color = subject.getColor();
        r.taskCount = subject.getTasks().size();
        return r;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getColor() { return color; }
    public int getTaskCount() { return taskCount; }
}