package com.student.tasktracker.service;

import com.student.tasktracker.dto.SubjectRequest;
import com.student.tasktracker.dto.SubjectResponse;
import com.student.tasktracker.entity.Subject;
import com.student.tasktracker.entity.User;
import com.student.tasktracker.repository.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepo;

    public SubjectService(SubjectRepository subjectRepo) {
        this.subjectRepo = subjectRepo;
    }

    public List<SubjectResponse> getAll(User user) {
        return subjectRepo.findByUserIdOrderByNameAsc(user.getId())
                .stream().map(SubjectResponse::from).toList();
    }

    public SubjectResponse create(SubjectRequest req, User user) {
        if (subjectRepo.existsByNameAndUserId(req.getName(), user.getId()))
            throw new IllegalArgumentException("Subject already exists");
        Subject s = new Subject();
        s.setName(req.getName());
        if (req.getColor() != null) s.setColor(req.getColor());
        s.setUser(user);
        return SubjectResponse.from(subjectRepo.save(s));
    }

    public SubjectResponse update(Long id, SubjectRequest req, User user) {
        Subject s = subjectRepo.findById(id)
                .filter(sub -> sub.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new IllegalArgumentException("Subject not found"));
        s.setName(req.getName());
        if (req.getColor() != null) s.setColor(req.getColor());
        return SubjectResponse.from(subjectRepo.save(s));
    }

    public void delete(Long id, User user) {
        Subject s = subjectRepo.findById(id)
                .filter(sub -> sub.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new IllegalArgumentException("Subject not found"));
        subjectRepo.delete(s);
    }
}

