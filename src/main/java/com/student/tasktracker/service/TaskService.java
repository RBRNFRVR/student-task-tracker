package com.student.tasktracker.service;

import com.student.tasktracker.dto.TaskRequest;
import com.student.tasktracker.dto.TaskResponse;
import com.student.tasktracker.entity.*;
import com.student.tasktracker.repository.SubjectRepository;
import com.student.tasktracker.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TaskService {

    private final TaskRepository taskRepo;
    private final SubjectRepository subjectRepo;

    public TaskService(TaskRepository taskRepo, SubjectRepository subjectRepo) {
        this.taskRepo = taskRepo;
        this.subjectRepo = subjectRepo;
    }

    public List<TaskResponse> getAll(User user) {
        return taskRepo.findByUserIdWithSubject(user.getId())
                .stream().map(TaskResponse::from).toList();
    }

    public TaskResponse create(TaskRequest req, User user) {
        Task task = new Task();
        applyRequest(task, req, user);
        return TaskResponse.from(taskRepo.save(task));
    }

    public TaskResponse update(Long id, TaskRequest req, User user) {
        Task task = taskRepo.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        applyRequest(task, req, user);
        return TaskResponse.from(taskRepo.save(task));
    }

    public void delete(Long id, User user) {
        Task task = taskRepo.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        taskRepo.delete(task);
    }

    public Map<String, Long> getSummary(User user) {
        long total = taskRepo.countByUserIdAndStatus(user.getId(), Task.Status.NOT_STARTED)
                + taskRepo.countByUserIdAndStatus(user.getId(), Task.Status.IN_PROGRESS)
                + taskRepo.countByUserIdAndStatus(user.getId(), Task.Status.COMPLETED);
        return Map.of(
                "total", total,
                "notStarted", taskRepo.countByUserIdAndStatus(user.getId(), Task.Status.NOT_STARTED),
                "inProgress", taskRepo.countByUserIdAndStatus(user.getId(), Task.Status.IN_PROGRESS),
                "completed", taskRepo.countByUserIdAndStatus(user.getId(), Task.Status.COMPLETED)
        );
    }

    private void applyRequest(Task task, TaskRequest req, User user) {
        task.setTitle(req.getTitle());
        task.setDescription(req.getDescription());
        task.setDueDate(req.getDueDate());
        task.setUser(user);
        if (req.getPriority() != null)
            task.setPriority(Task.Priority.valueOf(req.getPriority()));
        if (req.getStatus() != null)
            task.setStatus(Task.Status.valueOf(req.getStatus()));
        task.setEstimatedMinutes(req.getEstimatedMinutes());
        if (req.getSubjectId() != null) {
            subjectRepo.findById(req.getSubjectId())
                    .filter(s -> s.getUser().getId().equals(user.getId()))
                    .ifPresent(task::setSubject);
        } else {
            task.setSubject(null);
        }
    }
}
