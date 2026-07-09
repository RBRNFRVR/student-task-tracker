package com.student.tasktracker.controller;

import com.student.tasktracker.dto.TaskRequest;
import com.student.tasktracker.entity.User;
import com.student.tasktracker.service.TaskService;
import com.student.tasktracker.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;

    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<?> getAll(Authentication auth) {
        User user = userService.findByUsername(auth.getName());
        return ResponseEntity.ok(taskService.getAll(user));
    }

    @GetMapping("/summary")
    public ResponseEntity<?> getSummary(Authentication auth) {
        User user = userService.findByUsername(auth.getName());
        return ResponseEntity.ok(taskService.getSummary(user));
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody TaskRequest req, Authentication auth) {
        try {
            User user = userService.findByUsername(auth.getName());
            return ResponseEntity.ok(taskService.create(req, user));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody TaskRequest req, Authentication auth) {
        try {
            User user = userService.findByUsername(auth.getName());
            return ResponseEntity.ok(taskService.update(id, req, user));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Authentication auth) {
        try {
            User user = userService.findByUsername(auth.getName());
            taskService.delete(id, user);
            return ResponseEntity.ok(Map.of("message", "Deleted"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}