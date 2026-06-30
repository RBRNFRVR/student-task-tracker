package com.student.tasktracker.repository;

import com.student.tasktracker.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    List<Subject> findByUserIdOrderByNameAsc(Long userId);
    boolean existsByNameAndUserId(String name, Long userId);
}
