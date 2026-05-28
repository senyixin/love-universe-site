package com.senyixin.loveuniverse;

import android.Manifest;
import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;

import org.json.JSONArray;
import org.json.JSONObject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

public final class ReminderScheduler {
    public static final String EXTRA_TITLE = "title";
    public static final String EXTRA_BODY = "body";
    public static final String EXTRA_NOTIFICATION_ID = "notification_id";
    public static final String EXTRA_KIND = "kind";

    private static final String CHANNEL_ID = "love_universe_reminders";
    private static final String PREFS = "love_universe_notifications";
    private static final String KEY_CONFIG = "config_json";
    private static final int CARE_REQUEST = 1001;
    private static final int TASK_REQUEST = 1002;
    private static final int PERIOD_START_REQUEST = 1101;
    private static final int PERIOD_END_REQUEST = 1102;
    private static final int TRIP_BASE_REQUEST = 1200;

    private ReminderScheduler() {
    }

    public static void configure(Context context, String json) {
        Context appContext = context.getApplicationContext();
        SharedPreferences prefs = appContext.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        prefs.edit().putString(KEY_CONFIG, json == null ? "{}" : json).apply();
        scheduleFromJson(appContext, json);
    }

    public static void rescheduleSaved(Context context) {
        Context appContext = context.getApplicationContext();
        String json = appContext.getSharedPreferences(PREFS, Context.MODE_PRIVATE).getString(KEY_CONFIG, "{}");
        scheduleFromJson(appContext, json);
    }

    public static void createNotificationChannel(Context context) {
        if (Build.VERSION.SDK_INT < 26) return;
        NotificationManager manager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager == null) return;
        NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "小宇宙提醒",
                NotificationManager.IMPORTANCE_DEFAULT
        );
        channel.setDescription("关心卡、每日任务、身体照顾和见面提醒");
        manager.createNotificationChannel(channel);
    }

    public static void showNotification(Context context, int notificationId, String title, String body) {
        if (Build.VERSION.SDK_INT >= 33
                && context.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        createNotificationChannel(context);
        NotificationManager manager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager == null) return;

        Intent openIntent = new Intent(context, MainActivity.class);
        openIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent openPendingIntent = PendingIntent.getActivity(
                context,
                notificationId,
                openIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | immutableFlag()
        );

        Notification.Builder builder = Build.VERSION.SDK_INT >= 26
                ? new Notification.Builder(context, CHANNEL_ID)
                : new Notification.Builder(context);
        builder
                .setSmallIcon(R.drawable.ic_launcher)
                .setContentTitle(emptyTo(title, "给你的小宇宙"))
                .setContentText(emptyTo(body, "今天也要好好照顾自己。"))
                .setStyle(new Notification.BigTextStyle().bigText(emptyTo(body, "今天也要好好照顾自己。")))
                .setContentIntent(openPendingIntent)
                .setAutoCancel(true)
                .setShowWhen(true);
        if (Build.VERSION.SDK_INT >= 21) builder.setColor(0xFFD65370);
        manager.notify(notificationId, builder.build());
    }

    private static void scheduleFromJson(Context context, String json) {
        cancelAll(context);
        JSONObject config;
        try {
            config = new JSONObject(json == null ? "{}" : json);
        } catch (Exception ignored) {
            return;
        }
        if (!config.optBoolean("enabled", true)) return;

        String partnerName = emptyTo(config.optString("partnerName"), "她");
        scheduleDaily(
                context,
                CARE_REQUEST,
                "care",
                "今日关心卡",
                pickToday(config.optJSONArray("careCards"), "今天记得喝水，早点休息。"),
                config.optString("careReminderTime", "21:00")
        );
        scheduleDaily(
                context,
                TASK_REQUEST,
                "task",
                "每日任务小纸条",
                pickToday(config.optJSONArray("dailyTasks"), "今天给自己一个小任务，也给我一点消息。"),
                config.optString("taskReminderTime", "10:00")
        );
        schedulePeriod(context, config, partnerName);
        scheduleTrip(context, config);
    }

    private static void scheduleDaily(Context context, int requestCode, String kind, String title, String body, String time) {
        int[] hm = parseTime(time, 21, 0);
        Calendar target = Calendar.getInstance();
        target.set(Calendar.HOUR_OF_DAY, hm[0]);
        target.set(Calendar.MINUTE, hm[1]);
        target.set(Calendar.SECOND, 0);
        target.set(Calendar.MILLISECOND, 0);
        if (target.getTimeInMillis() <= System.currentTimeMillis()) {
            target.add(Calendar.DAY_OF_YEAR, 1);
        }

        PendingIntent intent = pendingReminder(context, requestCode, kind, title, body, requestCode);
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (alarmManager == null) return;
        alarmManager.setInexactRepeating(
                AlarmManager.RTC_WAKEUP,
                target.getTimeInMillis(),
                AlarmManager.INTERVAL_DAY,
                intent
        );
    }

    private static void schedulePeriod(Context context, JSONObject config, String partnerName) {
        int startDay = clampDay(config.optInt("periodStartDay", 5));
        int endDay = clampDay(config.optInt("periodEndDay", 10));
        int[] hm = parseTime(config.optString("periodReminderTime", "09:00"), 9, 0);
        Calendar start = nextMonthDay(startDay, hm[0], hm[1]);
        Calendar end = nextMonthDay(endDay, hm[0], hm[1]);
        if (end.getTimeInMillis() <= start.getTimeInMillis()) end.add(Calendar.MONTH, 1);

        scheduleOneShot(
                context,
                PERIOD_START_REQUEST,
                "period",
                "身体照顾提醒",
                partnerName + "的照顾期快到啦，记得少冰少辣、多热水。",
                start.getTimeInMillis()
        );
        scheduleOneShot(
                context,
                PERIOD_END_REQUEST,
                "period",
                "身体照顾提醒",
                "预计今天结束，记得温柔一点问问她状态。",
                end.getTimeInMillis()
        );
    }

    private static void scheduleTrip(Context context, JSONObject config) {
        long tripTime = parseLocalDateTime(config.optString("tripDateTime"));
        if (tripTime <= 0) return;
        JSONArray offsets = config.optJSONArray("tripReminderHours");
        if (offsets == null || offsets.length() == 0) offsets = new JSONArray().put(24).put(3);
        String place = emptyTo(config.optString("tripPlace"), "下次见面的地方");
        for (int i = 0; i < offsets.length() && i < 6; i += 1) {
            int hours = Math.max(0, offsets.optInt(i, 0));
            long triggerAt = tripTime - hours * 60L * 60L * 1000L;
            if (triggerAt <= System.currentTimeMillis()) continue;
            String body = hours <= 0
                    ? "见面时间到啦，地点：" + place
                    : "距离见面还有约 " + hours + " 小时，地点：" + place;
            scheduleOneShot(context, TRIP_BASE_REQUEST + i, "trip", "见面提醒", body, triggerAt);
        }
    }

    private static void scheduleOneShot(Context context, int requestCode, String kind, String title, String body, long triggerAt) {
        PendingIntent intent = pendingReminder(context, requestCode, kind, title, body, requestCode);
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (alarmManager == null) return;
        if (Build.VERSION.SDK_INT >= 23) {
            alarmManager.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAt, intent);
        } else {
            alarmManager.set(AlarmManager.RTC_WAKEUP, triggerAt, intent);
        }
    }

    private static PendingIntent pendingReminder(Context context, int requestCode, String kind, String title, String body, int notificationId) {
        Intent intent = new Intent(context, ReminderReceiver.class);
        intent.putExtra(EXTRA_KIND, kind);
        intent.putExtra(EXTRA_TITLE, title);
        intent.putExtra(EXTRA_BODY, body);
        intent.putExtra(EXTRA_NOTIFICATION_ID, notificationId);
        return PendingIntent.getBroadcast(
                context,
                requestCode,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT | immutableFlag()
        );
    }

    private static void cancelAll(Context context) {
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (alarmManager == null) return;
        int[] requestCodes = new int[]{CARE_REQUEST, TASK_REQUEST, PERIOD_START_REQUEST, PERIOD_END_REQUEST};
        for (int requestCode : requestCodes) {
            alarmManager.cancel(pendingReminder(context, requestCode, "", "", "", requestCode));
        }
        for (int i = 0; i < 6; i += 1) {
            int requestCode = TRIP_BASE_REQUEST + i;
            alarmManager.cancel(pendingReminder(context, requestCode, "", "", "", requestCode));
        }
    }

    private static Calendar nextMonthDay(int day, int hour, int minute) {
        Calendar target = Calendar.getInstance();
        target.set(Calendar.DAY_OF_MONTH, Math.min(day, target.getActualMaximum(Calendar.DAY_OF_MONTH)));
        target.set(Calendar.HOUR_OF_DAY, hour);
        target.set(Calendar.MINUTE, minute);
        target.set(Calendar.SECOND, 0);
        target.set(Calendar.MILLISECOND, 0);
        if (target.getTimeInMillis() <= System.currentTimeMillis()) {
            target.add(Calendar.MONTH, 1);
            target.set(Calendar.DAY_OF_MONTH, Math.min(day, target.getActualMaximum(Calendar.DAY_OF_MONTH)));
        }
        return target;
    }

    private static long parseLocalDateTime(String value) {
        if (value == null || value.trim().isEmpty()) return 0;
        try {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm", Locale.CHINA);
            return format.parse(value.trim()).getTime();
        } catch (ParseException ignored) {
            return 0;
        }
    }

    private static int[] parseTime(String value, int fallbackHour, int fallbackMinute) {
        if (value != null && value.matches("^([01]\\d|2[0-3]):[0-5]\\d$")) {
            return new int[]{
                    Integer.parseInt(value.substring(0, 2)),
                    Integer.parseInt(value.substring(3, 5))
            };
        }
        return new int[]{fallbackHour, fallbackMinute};
    }

    private static String pickToday(JSONArray array, String fallback) {
        if (array == null || array.length() == 0) return fallback;
        int day = Calendar.getInstance().get(Calendar.DAY_OF_YEAR);
        return emptyTo(array.optString(Math.abs(day) % array.length()), fallback);
    }

    private static int clampDay(int day) {
        return Math.max(1, Math.min(31, day));
    }

    private static String emptyTo(String value, String fallback) {
        return value == null || value.trim().isEmpty() ? fallback : value.trim();
    }

    private static int immutableFlag() {
        return Build.VERSION.SDK_INT >= 23 ? PendingIntent.FLAG_IMMUTABLE : 0;
    }
}
