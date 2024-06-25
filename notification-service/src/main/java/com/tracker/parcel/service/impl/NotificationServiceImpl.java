package com.tracker.parcel.service.impl;

import com.tracker.parcel.entity.Notification;
import com.tracker.parcel.service.NotificationService;
import jakarta.mail.MessagingException;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Properties;

@Slf4j
@Service
@AllArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final JavaMailSender mailSender;

    @Override
    public String sendNotification(Notification notification) {
        String from = "package.tracker.project@gmail.com";
        String to = "liliia.pohorielova@nure.ua";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        try {
            helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(to); //TODO: change to notification.getEmail()
            helper.setSubject("Your package '" + notification.getPackageTitle() + "' has been delivered!");
            helper.setText("<b>Recipient: </b>" + notification.getRecipient( )+ "<br>" +
                "<b>E-mail: </b>" + to + "<br>" +
                "<b>Package: </b>" + notification.getPackageTitle() + "<br>" +
                "<b>Message: </b> You can pick up the parcel at branch " + notification.getMessage() + "<br>" +
                "<br><b>© Package Tracker </b>", true);
            mailSender.send(message);
        } catch (MessagingException e) {
            log.error("Error during sending notification: {}", e.getMessage());
        }
        log.info("Notification with id = {} has been sent successfully", notification.getId());
        return "Success!";
    }
}
