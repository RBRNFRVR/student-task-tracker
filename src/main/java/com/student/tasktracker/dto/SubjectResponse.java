package com.student.tasktracker.dto;

import com.student.tasktracker.entity.Subject;

public class SubjectResponse {

    private final Long id;
    private final String name;
    private final String color;
    private final int taskCount;

    private SubjectResponse(Long id, String name, String color, int taskCount) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.taskCount = taskCount;
    }

    public static SubjectResponse from(Subject subject) {
        return new SubjectResponse(
                subject.getId(),
                subject.getName(),
                subject.getColor(),
                subject.getTasks().size()
        );
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getColor() {
        return color;
    }

    public int getTaskCount() {
        return taskCount;
    }
}