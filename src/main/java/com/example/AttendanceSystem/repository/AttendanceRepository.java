package com.example.AttendanceSystem.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.AttendanceSystem.dto.AttendanceDTO;
import com.example.AttendanceSystem.dto.DateAnalyticsDTO;
import com.example.AttendanceSystem.dto.StudentAttendanceDTO;
import com.example.AttendanceSystem.dto.SubjectAnalyticsDTO;
import com.example.AttendanceSystem.model.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.user.id = :id")
    int totalClasses(@Param("id") int userId);

    @Query("""
        SELECT COUNT(a)
        FROM Attendance a
        WHERE a.user.id = :id AND LOWER(a.status) = 'present'
    """)
    int presentCount(@Param("id") int userId);

    @Query("""
        SELECT COUNT(a)
        FROM Attendance a
        WHERE a.user.id = :id AND LOWER(a.status) = 'absent'
    """)
    int absentCount(@Param("id") int userId);

    @Query("""
        SELECT new com.example.AttendanceSystem.dto.AttendanceDTO(
            a.date,
            a.subject,
            a.status
        )
        FROM Attendance a
        WHERE a.user.id = :id
    """)
    List<AttendanceDTO> attendanceList(@Param("id") int userId);

    boolean existsByUser_IdAndDateAndSubject(
            int userId,
            LocalDate date,
            String subject
    );

    // 🔒 NEW — block same device
    boolean existsByDeviceIdAndDateAndSubject(
            String deviceId,
            LocalDate date,
            String subject
    );

    List<Attendance> findByDateAndSubject(
            LocalDate date,
            String subject
    );

    @Query("""
        SELECT new com.example.AttendanceSystem.dto.AttendanceDTO(
            a.date,
            a.subject,
            u.rollNo,
            u.name,
            a.status
        )
        FROM Attendance a
        JOIN a.user u
        WHERE a.subject = :subject
    """)
    List<AttendanceDTO> attendanceListForTeacher(
            @Param("subject") String subject
    );

    @Query("""
SELECT new com.example.AttendanceSystem.dto.StudentAttendanceDTO(
    u.id,
    u.rollNo,
    u.name,
    u.className,
    COALESCE(a.subject, '-'),
    COALESCE(a.status, 'Absent')
)
FROM User u
LEFT JOIN Attendance a
    ON a.user = u
    AND a.date = CURRENT_DATE
ORDER BY u.rollNo
""")
    List<StudentAttendanceDTO> getStudentTabData();

    @Query("""
    SELECT a FROM Attendance a
    WHERE a.user.rollNo = :rollNo
    AND a.date = CURRENT_DATE
""")
    Optional<Attendance> findByRollNo(@Param("rollNo") String rollNo);

    @Query("""
    SELECT new com.example.AttendanceSystem.dto.AttendanceDTO(
        a.date,
        a.subject,
        u.rollNo,
        u.name,
        a.status
    )
    FROM Attendance a
    JOIN a.user u
    WHERE u.className = :className
    ORDER BY a.date DESC
""")
    List<AttendanceDTO> attendanceReportByClass(@Param("className") String className);

    @Query("""
    SELECT new com.example.AttendanceSystem.dto.SubjectAnalyticsDTO(
        a.subject,
        COUNT(a),
        COALESCE(SUM(CASE WHEN LOWER(a.status) = 'present' THEN 1 ELSE 0 END),0),
        COALESCE(SUM(CASE WHEN LOWER(a.status) = 'absent' THEN 1 ELSE 0 END),0)
    )
    FROM Attendance a
    GROUP BY a.subject
""")
    List<SubjectAnalyticsDTO> getSubjectAnalytics();

    @Query("""
    SELECT new com.example.AttendanceSystem.dto.SubjectAnalyticsDTO(
        u.className,
        COUNT(a),
        SUM(CASE WHEN LOWER(a.status) = 'present' THEN 1 ELSE 0 END),
        SUM(CASE WHEN LOWER(a.status) = 'absent' THEN 1 ELSE 0 END)
    )
    FROM Attendance a
    JOIN a.user u
    GROUP BY u.className
""")
    List<SubjectAnalyticsDTO> getDepartmentAnalytics();

    @Query("""
    SELECT new com.example.AttendanceSystem.dto.DateAnalyticsDTO(
        a.date,
        COUNT(a),
        SUM(CASE WHEN LOWER(a.status) = 'present' THEN 1 ELSE 0 END),
        SUM(CASE WHEN LOWER(a.status) = 'absent' THEN 1 ELSE 0 END)
    )
    FROM Attendance a
    GROUP BY a.date
    ORDER BY a.date
""")
    List<DateAnalyticsDTO> getDateAnalytics();

    @Query("SELECT COUNT(a) FROM Attendance a WHERE LOWER(a.status) = 'present' AND a.date = :today")
    int countPresentByDate(LocalDate today);

    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.date = :today")
    int countTotalByDate(LocalDate today);

        int countByUserId(int userId);

        int countByUserIdAndStatus(int userId, String status);

    }

    