package com.senyixin.loveuniverse;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class ReminderReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        String title = intent.getStringExtra(ReminderScheduler.EXTRA_TITLE);
        String body = intent.getStringExtra(ReminderScheduler.EXTRA_BODY);
        int notificationId = intent.getIntExtra(ReminderScheduler.EXTRA_NOTIFICATION_ID, 520);
        ReminderScheduler.showNotification(context, notificationId, title, body);

        String kind = intent.getStringExtra(ReminderScheduler.EXTRA_KIND);
        if ("period".equals(kind) || "trip".equals(kind)) {
            ReminderScheduler.rescheduleSaved(context);
        }
    }
}
