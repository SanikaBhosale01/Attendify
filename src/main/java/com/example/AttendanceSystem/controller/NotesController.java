package com.example.AttendanceSystem.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.AttendanceSystem.model.Notes;
import com.example.AttendanceSystem.repository.NotesRepository;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*")
public class NotesController {

    @Autowired
    private NotesRepository notesRepository;

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/upload")
    public ResponseEntity<String> uploadNotes(
            @RequestParam("file") MultipartFile file,
            @RequestParam("subject") String subject) {

        try {
            if (file.isEmpty()) return ResponseEntity.badRequest().body("Please select a file");

            String uploadDir = System.getProperty("user.dir") + "/" + UPLOAD_DIR;
            File directory = new File(uploadDir);
            if (!directory.exists()) directory.mkdirs();

            String uniqueFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, uniqueFileName);
            file.transferTo(filePath.toFile());

            Notes notes = new Notes();
            notes.setSubject(subject);
            notes.setFileName(file.getOriginalFilename());
            notes.setFilePath(filePath.toString());
            notes.setFileUrl("/" + UPLOAD_DIR + uniqueFileName);
            notes.setUploadTime(LocalDateTime.now());
            notesRepository.save(notes);

            return ResponseEntity.ok("Notes uploaded successfully ✅");

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("File upload failed ❌");
        }
    }

    @GetMapping("/all")
    public List<Notes> getAllNotes() {
        return notesRepository.findAll();
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadNote(@PathVariable Long id) throws IOException {
        Notes note = notesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        File file = new File(note.getFilePath());
        if (!file.exists()) throw new RuntimeException("File not found on server");

        Resource resource = new UrlResource(file.toPath().toUri());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + note.getFileName() + "\"")
                .header(HttpHeaders.CONTENT_TYPE, "application/octet-stream")
                .body(resource);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteNotes(@PathVariable Long id) {
        return notesRepository.findById(id)
                .map(note -> {
                    File file = new File(note.getFilePath());
                    if (file.exists()) file.delete();
                    notesRepository.deleteById(id);
                    return ResponseEntity.ok("Notes deleted successfully ✅");
                })
                .orElse(ResponseEntity.badRequest().body("Notes not found ❌"));
    }
}