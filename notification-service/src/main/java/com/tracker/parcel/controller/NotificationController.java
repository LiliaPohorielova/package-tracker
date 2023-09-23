package com.tracker.parcel.controller;

import com.tracker.parcel.entity.Notification;
import com.tracker.parcel.service.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notifications")
@AllArgsConstructor
public class NotificationController {

    private NotificationService notificationService;

    //TODO: getNotificationById, getAllNotifications, updateNotification, deleteNotification

    @PostMapping("/send")
    public String sendNotification(@RequestBody Notification notification) {
        return notificationService.sendNotification(notification);
    }
}
