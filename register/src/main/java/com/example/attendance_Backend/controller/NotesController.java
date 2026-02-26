package com.example.attendance_Backend.controller;

import com.example.attendance_Backend.model.Notes;
import com.example.attendance_Backend.repository.NotesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*")
public class NotesController {

    @Autowired
    private NotesRepository notesRepository;

    // Folder where files will be stored
    private static final String UPLOAD_DIR = "uploads/";

    // ✅ 1️⃣ Upload Notes (Teacher)
    @PostMapping("/upload")
public ResponseEntity<String> uploadNotes(
        @RequestParam("file") MultipartFile file,
        @RequestParam("subject") String subject) {

    try {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please select a file");
        }

        String uploadDir = System.getProperty("user.dir") + "/uploads/";
        File directory = new File(uploadDir);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String uniqueFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String filePath = uploadDir + uniqueFileName;

        file.transferTo(new File(filePath));

        Notes notes = new Notes();
        notes.setSubject(subject);
        notes.setFileName(file.getOriginalFilename());
        notes.setFilePath(filePath);
        notes.setUploadTime(LocalDateTime.now());

        notesRepository.save(notes);

        return ResponseEntity.ok("Notes uploaded successfully ✅");

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.internalServerError()
                .body("File upload failed ❌");
    }
}
    // ✅ 2️⃣ Get All Notes (Student View)
    @GetMapping("/all")
    public List<Notes> getAllNotes() {
        return notesRepository.findAll();
    }

    // ✅ 3️⃣ Delete Notes (Optional - Teacher)
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteNotes(@PathVariable Long id) {

        return notesRepository.findById(id)
                .map(note -> {

                    // Delete file from folder
                    File file = new File(note.getFilePath());
                    if (file.exists()) {
                        file.delete();
                    }

                    notesRepository.deleteById(id);

                    return ResponseEntity.ok("Notes deleted successfully ✅");
                })
                .orElse(ResponseEntity.badRequest()
                        .body("Notes not found ❌"));
    }
}