package com.senyixin.loveuniverse;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.Map;

public class LoveFirebaseMessagingService extends FirebaseMessagingService {
    @Override
    public void onNewToken(String token) {
        super.onNewToken(token);
        PushTokenRegistrar.registerToken(this, token);
    }

    @Override
    public void onMessageReceived(RemoteMessage message) {
        super.onMessageReceived(message);
        Map<String, String> data = message.getData();
        String id = value(data.get("noticeId"), String.valueOf(System.currentTimeMillis()));
        String title = value(data.get("title"), "给你的小宇宙");
        String body = value(data.get("body"), "我给你发了一条小宇宙提醒，打开 App 看看吧。");
        if (message.getNotification() != null) {
            title = value(message.getNotification().getTitle(), title);
            body = value(message.getNotification().getBody(), body);
        }
        ReminderScheduler.showServerNotice(this, id, title, body);
    }

    private static String value(String text, String fallback) {
        return text == null || text.trim().isEmpty() ? fallback : text.trim();
    }
}
