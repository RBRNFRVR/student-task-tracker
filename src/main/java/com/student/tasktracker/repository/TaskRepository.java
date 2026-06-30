package com.student.tasktracker.repository;

import com.student.tasktracker.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t LEFT JOIN FETCH t.subject WHERE t.user.id = :userId ORDER BY t.dueDate ASC NULLS LAST, t.priority ASC")
    List<Task> findByUserIdWithSubject(@Param("userId") Long userId);

    @Query("SELECT t FROM Task t LEFT JOIN FETCH t.subject WHERE t.user.id = :userId AND t.subject.id = :subjectId ORDER BY t.dueDate ASC NULLS LAST")
    List<Task> findByUserIdAndSubjectId(@Param("userId") Long userId, @Param("subjectId") Long subjectId);

    @Query("SELECT t FROM Task t LEFT JOIN FETCH t.subject WHERE t.id = :id AND t.user.id = :userId")
    Optional<Task> findByIdAndUserId(@Param("id") Long id, @Param("userId") Long userId);

    long countByUserIdAndStatus(Long userId, Task.Status status);
}