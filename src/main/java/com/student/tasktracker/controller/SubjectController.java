package com.student.tasktracker.controller;

import com.student.tasktracker.dto.SubjectRequest;
import com.student.tasktracker.entity.User;
import com.student.tasktracker.service.SubjectService;
import com.student.tasktracker.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {

    private final SubjectService subjectService;
    private final UserService userService;

    public SubjectController(SubjectService subjectService, UserService userService) {
        this.subjectService = subjectService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<?> getAll(Authentication auth) {
        User user = userService.findByUsername(auth.getName());
        return ResponseEntity.ok(subjectService.getAll(user));
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody SubjectRequest req, Authentication auth) {
        try {
            User user = userService.findByUsername(auth.getName());
            return ResponseEntity.ok(subjectService.create(req, user));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody SubjectRequest req, Authentication auth) {
        try {
            User user = userService.findByUsername(auth.getName());
            return ResponseEntity.ok(subjectService.update(id, req, user));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Authentication auth) {
        try {
            User user = userService.findByUsername(auth.getName());
            subjectService.delete(id, user);
            return ResponseEntity.ok(Map.of("message", "Deleted"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}