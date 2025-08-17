package com.learningmanagement.backend.controller;


import com.itextpdf.text.*;
import com.itextpdf.text.Font;
import com.learningmanagement.backend.model.Certificate;
import com.learningmanagement.backend.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.util.List;

import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;

@RestController
@RequestMapping("/certificates")
@CrossOrigin(origins = "http://localhost:5175")
public class CertificateController {

    @Autowired
    private CertificateRepository certificateRepository;

    @PostMapping
    public Certificate saveCertificate(@RequestBody Certificate certificate) {
        return certificateRepository.save(certificate);
    }

    @GetMapping
    public List<Certificate> getAllCertificates() {
        return certificateRepository.findAll();
    }

    @GetMapping("certificate/download/{id}")
    public ResponseEntity<byte[]> downloadCertificate(@PathVariable Long id) throws Exception {
        Certificate cert = certificateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, out);

        document.open();
        Font titleFont = new Font(Font.FontFamily.TIMES_ROMAN, 20, Font.BOLD);
        Font contentFont = new Font(Font.FontFamily.TIMES_ROMAN, 14);

        Paragraph title = new Paragraph("Course Completion Certificate", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);
        document.add(new Paragraph(" "));

        document.add(new Paragraph("This is to certify that " + cert.getStudentName() +
                " has successfully completed the course '" + cert.getCourseName() +
                "' of duration " + cert.getDuration() +
                " starting from " + cert.getStartDate() +
                " to " + cert.getEndDate() + ".", contentFont));

        document.close();

        byte[] pdfBytes = out.toByteArray();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "certificate.pdf");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
}
