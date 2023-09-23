package com.tracker.parcel.service.impl;

import com.tracker.parcel.entity.Notification;
import com.tracker.parcel.service.NotificationService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@Service
@AllArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final JavaMailSender mailSender;

    @Override
    public String sendNotification(@RequestBody Notification notification) {
        String from = "package.tracker.project@gmail.com";
        String to = "liliia.pohorielova@nure.ua";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        try {
            helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(to); //TODO: change to notification.getEmail()
            helper.setSubject("Your package has been delivered!");
            helper.setText("<b>Recipient: </b>" + notification.getRecipient()+ "<br>" +
                "<b>E-mail: </b>" + notification.getEmail() + "<br>" +
                "<b>Package: </b>" + notification.getPackageTitle() + "<br>" +
                "<b>Message: </b>" + notification.getMessage() + "<br>" +
                "<br><b>© PackageTracker </b>", true);
            mailSender.send(message);
        } catch (MessagingException e) {
            log.error("Error during sending notification: {}", e.getMessage());
        }
        log.info("Notification with id = {} has been sent successfully", notification.getId());
        return "Success!";
    }
}
