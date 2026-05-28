package com.senyixin.loveuniverse;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import com.igexin.sdk.IUserLoggerInterface;
import com.igexin.sdk.PushManager;

public final class GetuiPushRegistrar {
    private static final String TAG = "GetuiPushDebug";
    private static final long[] CID_RETRY_DELAYS_MS = new long[]{1000L, 3000L, 8000L, 15000L, 30000L, 60000L};
    private static final Handler MAIN_HANDLER = new Handler(Looper.getMainLooper());

    private GetuiPushRegistrar() {
    }

    public static void initialize(Context context) {
        if (context == null) return;
        Context appContext = context.getApplicationContext();
        try {
            PushManager.getInstance().preInit(appContext);
            installDebugLogger(appContext);
            PushManager.getInstance().initialize(appContext);
            PushManager.getInstance().registerPushIntentService(appContext, LoveGetuiIntentService.class);
            PushManager.getInstance().turnOnPush(appContext);
            checkManifest(appContext);
            syncClientId(appContext);
            retryClientId(appContext);
        } catch (Throwable ignored) {
            // The web app and local reminders still work if Getui cannot start on this device.
        }
    }

    public static void syncClientId(Context context) {
        if (context == null) return;
        Context appContext = context.getApplicationContext();
        new Thread(() -> {
            try {
                String clientId = PushManager.getInstance().getClientid(appContext);
                if (clientId != null && !clientId.trim().isEmpty()) {
                    PushTokenRegistrar.registerToken(appContext, clientId.trim(), "getui");
                }
            } catch (Throwable ignored) {
            }
        }).start();
    }

    private static void installDebugLogger(Context context) {
        if (!BuildConfig.DEBUG) return;
        try {
            PushManager.getInstance().setDebugLogger(context, new IUserLoggerInterface() {
                @Override
                public void log(String message) {
                    Log.i(TAG, String.valueOf(message));
                }
            });
        } catch (Throwable error) {
            Log.w(TAG, "setDebugLogger failed", error);
        }
    }

    private static void checkManifest(Context context) {
        if (!BuildConfig.DEBUG) return;
        try {
            PushManager.getInstance().checkManifest(context);
        } catch (Exception error) {
            Log.e(TAG, "Getui manifest check failed", error);
        }
    }

    private static void retryClientId(Context appContext) {
        for (long delay : CID_RETRY_DELAYS_MS) {
            MAIN_HANDLER.postDelayed(() -> syncClientId(appContext), delay);
        }
    }
}
