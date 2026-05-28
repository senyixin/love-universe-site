package com.senyixin.loveuniverse;

import android.content.Context;
import android.webkit.JavascriptInterface;

public class NotificationBridge {
    private final Context appContext;

    public NotificationBridge(Context context) {
        this.appContext = context.getApplicationContext();
    }

    @JavascriptInterface
    public boolean isAvailable() {
        return true;
    }

    @JavascriptInterface
    public void configure(String json) {
        ReminderScheduler.configure(appContext, json);
    }

    @JavascriptInterface
    public void showServerNotice(String id, String title, String message) {
        ReminderScheduler.showServerNotice(appContext, id, title, message);
    }

    @JavascriptInterface
    public void showTest(String message) {
        String body = message == null || message.trim().isEmpty()
                ? "通知功能已经打开啦。"
                : message.trim();
        ReminderScheduler.showNotification(appContext, 9520, "给你的小宇宙", body);
    }
}
