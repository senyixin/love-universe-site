package com.senyixin.loveuniverse;

import android.content.Context;

import com.igexin.sdk.GTIntentService;
import com.igexin.sdk.PushManager;
import com.igexin.sdk.message.GTNotificationMessage;
import com.igexin.sdk.message.GTTransmitMessage;

import org.json.JSONObject;

import java.nio.charset.StandardCharsets;

public class LoveGetuiIntentService extends GTIntentService {
    @Override
    public void onReceiveServicePid(Context context, int pid) {
    }

    @Override
    public void onReceiveClientId(Context context, String clientId) {
        PushTokenRegistrar.registerToken(context, clientId, "getui");
    }

    @Override
    public void onReceiveMessageData(Context context, GTTransmitMessage message) {
        if (message == null) return;
        byte[] payload = message.getPayload();
        if (payload == null || payload.length == 0) return;
        String text = new String(payload, StandardCharsets.UTF_8);
        String id = String.valueOf(System.currentTimeMillis());
        String title = "Love Universe";
        String body = text;
        try {
            JSONObject json = new JSONObject(text);
            id = emptyTo(json.optString("noticeId"), id);
            title = emptyTo(json.optString("title"), title);
            body = emptyTo(json.optString("body"), body);
        } catch (Exception ignored) {
        }
        String taskId = message.getTaskId();
        String messageId = message.getMessageId();
        if (taskId != null && messageId != null) {
            try {
                PushManager.getInstance().sendFeedbackMessage(context, taskId, messageId, 90001);
            } catch (Exception ignored) {
            }
        }
        ReminderScheduler.showServerNotice(context, id, title, body);
    }

    @Override
    public void onReceiveOnlineState(Context context, boolean online) {
    }

    @Override
    public void onReceiveCommandResult(Context context, com.igexin.sdk.message.GTCmdMessage message) {
    }

    @Override
    public void onNotificationMessageArrived(Context context, GTNotificationMessage message) {
    }

    @Override
    public void onNotificationMessageClicked(Context context, GTNotificationMessage message) {
    }

    private static String emptyTo(String value, String fallback) {
        return value == null || value.trim().isEmpty() ? fallback : value.trim();
    }
}
