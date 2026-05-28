package com.senyixin.loveuniverse;

import android.Manifest;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.GeolocationPermissions;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebChromeClient.FileChooserParams;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;

public class MainActivity extends Activity {
    private static final int FILE_CHOOSER_REQUEST = 520;
    private static final int LOCATION_REQUEST = 521;
    private static final int NOTIFICATION_REQUEST = 522;

    private WebView webView;
    private LinearLayout statusPanel;
    private TextView statusMessage;
    private ValueCallback<Uri[]> filePathCallback;
    private GeolocationPermissions.Callback geolocationCallback;
    private String geolocationOrigin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ReminderScheduler.createNotificationChannel(this);
        buildLayout();
        configureWebView();
        requestNotificationPermissionIfNeeded();
        PushTokenRegistrar.register(this);
        GetuiPushRegistrar.initialize(this);
        ReminderScheduler.setServerUrl(this, getServerUrl());
        ReminderScheduler.checkServerNoticeAsync(this, null);
        loadDefaultServer();
    }

    @Override
    protected void onResume() {
        super.onResume();
        GetuiPushRegistrar.syncClientId(this);
    }

    private void buildLayout() {
        FrameLayout root = new FrameLayout(this);
        webView = new WebView(this);
        webView.setBackgroundColor(Color.rgb(255, 250, 245));
        root.addView(webView, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));

        statusPanel = new LinearLayout(this);
        statusPanel.setOrientation(LinearLayout.VERTICAL);
        statusPanel.setGravity(Gravity.CENTER);
        statusPanel.setPadding(dp(24), dp(28), dp(24), dp(24));
        statusPanel.setBackgroundColor(Color.rgb(255, 250, 245));

        TextView title = new TextView(this);
        title.setText("给你的小宇宙");
        title.setTextColor(Color.rgb(24, 23, 24));
        title.setTextSize(28);
        title.setGravity(Gravity.CENTER);
        title.setTypeface(android.graphics.Typeface.DEFAULT_BOLD);
        statusPanel.addView(title, matchWrap());

        statusMessage = new TextView(this);
        statusMessage.setText("正在打开她的小宇宙...");
        statusMessage.setTextColor(Color.rgb(113, 105, 108));
        statusMessage.setTextSize(15);
        statusMessage.setGravity(Gravity.CENTER);
        LinearLayout.LayoutParams messageParams = matchWrap();
        messageParams.setMargins(0, dp(12), 0, dp(18));
        statusPanel.addView(statusMessage, messageParams);

        Button retryButton = new Button(this);
        retryButton.setText("重试");
        retryButton.setAllCaps(false);
        retryButton.setOnClickListener(view -> loadDefaultServer());
        LinearLayout.LayoutParams buttonParams = matchWrap();
        buttonParams.setMargins(0, dp(8), 0, 0);
        statusPanel.addView(retryButton, buttonParams);

        root.addView(statusPanel, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        ));
        setContentView(root);
    }

    private void configureWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        webView.addJavascriptInterface(new NotificationBridge(this), "LoveAppNotifications");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                String scheme = uri.getScheme();
                if ("http".equals(scheme) || "https".equals(scheme)) return false;
                openExternal(uri);
                return true;
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                if (request.isForMainFrame()) {
                    showStatus("网站暂时打不开，检查服务器、HTTPS、端口或防火墙后点重试。");
                }
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                if (isValidWebUrl(url)) hideStatus();
            }
        });

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params) {
                if (filePathCallback != null) filePathCallback.onReceiveValue(null);
                filePathCallback = callback;
                try {
                    Intent intent = params.createIntent();
                    startActivityForResult(intent, FILE_CHOOSER_REQUEST);
                    return true;
                } catch (ActivityNotFoundException error) {
                    filePathCallback = null;
                    return false;
                }
            }

            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                geolocationOrigin = origin;
                geolocationCallback = callback;
                if (checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
                        || checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                    callback.invoke(origin, true, false);
                } else {
                    requestPermissions(new String[]{
                            Manifest.permission.ACCESS_FINE_LOCATION,
                            Manifest.permission.ACCESS_COARSE_LOCATION
                    }, LOCATION_REQUEST);
                }
            }
        });
    }

    private void loadDefaultServer() {
        String url = getServerUrl();
        if (!isValidWebUrl(url)) {
            showStatus("App 还没有写入服务器地址，请重新打包。");
            return;
        }
        showStatus("正在打开她的小宇宙...");
        webView.loadUrl(url);
    }

    private String getServerUrl() {
        return normalizeServerUrl(BuildConfig.DEFAULT_SERVER_URL);
    }

    private void showStatus(String message) {
        statusMessage.setText(message);
        statusPanel.setVisibility(View.VISIBLE);
    }

    private void hideStatus() {
        statusPanel.setVisibility(View.GONE);
    }

    private String normalizeServerUrl(String value) {
        String text = value == null ? "" : value.trim();
        while (text.endsWith("/")) text = text.substring(0, text.length() - 1);
        return text;
    }

    private boolean isValidWebUrl(String value) {
        return value != null && (value.startsWith("https://") || value.startsWith("http://"));
    }

    private void openExternal(Uri uri) {
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, uri));
        } catch (ActivityNotFoundException ignored) {
            startActivity(new Intent(Settings.ACTION_SETTINGS));
        }
    }

    private void requestNotificationPermissionIfNeeded() {
        if (Build.VERSION.SDK_INT < 33) return;
        if (checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED) return;
        requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, NOTIFICATION_REQUEST);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != FILE_CHOOSER_REQUEST || filePathCallback == null) return;
        Uri[] results = null;
        if (resultCode == RESULT_OK && data != null) {
            if (data.getClipData() != null) {
                int count = data.getClipData().getItemCount();
                results = new Uri[count];
                for (int i = 0; i < count; i += 1) {
                    results[i] = data.getClipData().getItemAt(i).getUri();
                }
            } else if (data.getData() != null) {
                results = new Uri[]{data.getData()};
            }
        }
        filePathCallback.onReceiveValue(results);
        filePathCallback = null;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode != LOCATION_REQUEST || geolocationCallback == null) return;
        boolean granted = false;
        for (int result : grantResults) granted = granted || result == PackageManager.PERMISSION_GRANTED;
        geolocationCallback.invoke(geolocationOrigin, granted, false);
        geolocationCallback = null;
        geolocationOrigin = null;
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
            return;
        }
        super.onBackPressed();
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    private LinearLayout.LayoutParams matchWrap() {
        return new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
        );
    }
}
