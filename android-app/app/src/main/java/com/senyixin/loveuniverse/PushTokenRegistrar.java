package com.senyixin.loveuniverse;

import android.content.Context;

import com.google.firebase.messaging.FirebaseMessaging;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public final class PushTokenRegistrar {
    private PushTokenRegistrar() {
    }

    public static void register(Context context) {
        Context appContext = context.getApplicationContext();
        try {
            FirebaseMessaging.getInstance().getToken().addOnCompleteListener(task -> {
                if (!task.isSuccessful() || task.getResult() == null) return;
                registerToken(appContext, task.getResult());
            });
        } catch (Exception ignored) {
            // Firebase config is optional; local reminders and polling still work without it.
        }
    }

    public static void registerToken(Context context, String token) {
        if (token == null || token.trim().isEmpty()) return;
        Context appContext = context.getApplicationContext();
        new Thread(() -> postToken(appContext, token.trim())).start();
    }

    private static void postToken(Context context, String token) {
        String serverUrl = normalizeServerUrl(BuildConfig.DEFAULT_SERVER_URL);
        if (serverUrl.isEmpty()) return;
        HttpURLConnection connection = null;
        try {
            URL url = new URL(serverUrl + "/api/push/register");
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setConnectTimeout(8000);
            connection.setReadTimeout(8000);
            connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
            connection.setDoOutput(true);
            String body = "{"
                    + "\"token\":\"" + jsonEscape(token) + "\","
                    + "\"platform\":\"android\","
                    + "\"appVersion\":\"" + jsonEscape(BuildConfig.VERSION_NAME) + "\""
                    + "}";
            byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
            connection.setFixedLengthStreamingMode(bytes.length);
            try (OutputStream output = connection.getOutputStream()) {
                output.write(bytes);
            }
            connection.getResponseCode();
        } catch (Exception ignored) {
        } finally {
            if (connection != null) connection.disconnect();
        }
    }

    private static String normalizeServerUrl(String value) {
        String text = value == null ? "" : value.trim();
        while (text.endsWith("/")) {
            text = text.substring(0, text.length() - 1);
        }
        if (!text.startsWith("http://") && !text.startsWith("https://")) return "";
        return text;
    }

    private static String jsonEscape(String value) {
        return String.valueOf(value)
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r");
    }
}
