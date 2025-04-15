package com.example.course.service;

import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.ByteArrayOutputStream;
import org.springframework.stereotype.Service;

@Service
public class CertificateService {

    public byte[] generateCertificate(Long userId, Long courseId) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try {
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();
            document.add(new Paragraph("Certificate of Completion"));
            document.add(new Paragraph("User ID: " + userId));
            document.add(new Paragraph("Course ID: " + courseId));
            document.close();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate certificate", e);
        }
        return out.toByteArray();
    }
}
