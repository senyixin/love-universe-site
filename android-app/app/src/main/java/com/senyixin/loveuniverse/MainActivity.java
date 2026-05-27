package com.senyixin.loveuniverse;

import android.app.Activity;
import android.app.AlertDialog;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.os.Bundle;
import android.text.InputType;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.HorizontalScrollView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.OutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MainActivity extends Activity {
    private static final String PREFS = "love_native_prefs";
    private static final int INK = Color.rgb(24, 23, 24);
    private static final int MUTED = Color.rgb(113, 105, 108);
    private static final int PAPER = Color.rgb(255, 250, 245);
    private static final int PAPER_STRONG = Color.WHITE;
    private static final int LINE = Color.rgb(232, 222, 214);
    private static final int ROSE = Color.rgb(214, 83, 112);
    private static final int TEAL = Color.rgb(15, 118, 110);
    private static final int TEAL_DARK = Color.rgb(13, 79, 75);
    private static final int LAVENDER = Color.rgb(120, 101, 183);

    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private final List<JSONObject> coupons = new ArrayList<>();
    private final List<JSONObject> dateIdeas = new ArrayList<>();
    private final List<JSONObject> datePlans = new ArrayList<>();
    private final List<JSONObject> gifts = new ArrayList<>();
    private final List<JSONObject> messages = new ArrayList<>();
    private final List<JSONObject> letters = new ArrayList<>();
    private final List<JSONObject> guestbook = new ArrayList<>();
    private final List<String> passcodes = new ArrayList<>();

    private FrameLayout root;
    private ScrollView appView;
    private LinearLayout appContent;
    private EditText passcodeInput;
    private TextView entryMessage;
    private TextView weatherStatus;
    private LinearLayout weatherList;
    private LinearLayout couponList;
    private LinearLayout guestbookList;

    private JSONObject settings = new JSONObject();
    private JSONObject content = new JSONObject();
    private String serverUrl;
    private int ideaIndex = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        serverUrl = normalizeServerUrl(BuildConfig.DEFAULT_SERVER_URL);
        buildRoot();
        showLoading("正在连接服务器...");
        loadInitialData();
    }

    @Override
    protected void onDestroy() {
        executor.shutdownNow();
        super.onDestroy();
    }

    private void buildRoot() {
        root = new FrameLayout(this);
        root.setBackgroundColor(PAPER);
        setContentView(root);
    }

    private void loadInitialData() {
        executor.execute(() -> {
            try {
                JSONObject data = getJson("/api/content");
                content = data.optJSONObject("content");
                if (content == null) content = new JSONObject();
                settings = content.optJSONObject("settings");
                if (settings == null) settings = new JSONObject();
                readContentLists();
                loadCouponsSync();
                loadGuestbookSync();
                runOnUiThread(() -> {
                    if (isUnlocked()) showApp();
                    else showEntry();
                });
            } catch (Exception error) {
                runOnUiThread(() -> showError("服务器暂时连不上，检查地址或服务后重试。", true));
            }
        });
    }

    private void readContentLists() {
        passcodes.clear();
        JSONArray passcodeArray = settings.optJSONArray("passcodes");
        if (passcodeArray != null) {
            for (int i = 0; i < passcodeArray.length(); i += 1) {
                String value = passcodeArray.optString(i, "").trim();
                if (!value.isEmpty()) passcodes.add(value);
            }
        }
        readList(content.optJSONArray("dateIdeas"), dateIdeas);
        readList(content.optJSONArray("datePlans"), datePlans);
        readList(content.optJSONArray("giftList"), gifts);
        readList(content.optJSONArray("messageWall"), messages);
        readList(content.optJSONArray("letters"), letters);
        ideaIndex = Math.max(0, new Date().getDate() % Math.max(1, dateIdeas.size()));
    }

    private void readList(JSONArray array, List<JSONObject> target) {
        target.clear();
        if (array == null) return;
        for (int i = 0; i < array.length(); i += 1) {
            JSONObject item = array.optJSONObject(i);
            if (item != null) target.add(item);
        }
    }

    private void loadCouponsSync() {
        try {
            JSONObject data = getJson("/api/coupons");
            readList(data.optJSONArray("coupons"), coupons);
        } catch (Exception ignored) {
            coupons.clear();
        }
    }

    private void loadGuestbookSync() {
        try {
            JSONObject data = getJson("/api/guestbook");
            readList(data.optJSONArray("entries"), guestbook);
        } catch (Exception ignored) {
            guestbook.clear();
        }
    }

    private void showLoading(String message) {
        root.removeAllViews();
        LinearLayout loadingView = new LinearLayout(this);
        loadingView.setOrientation(LinearLayout.VERTICAL);
        loadingView.setGravity(Gravity.CENTER);
        loadingView.setPadding(dp(28), dp(28), dp(28), dp(28));
        loadingView.setBackgroundColor(PAPER);

        ProgressBar progress = new ProgressBar(this);
        loadingView.addView(progress, wrap());

        TextView title = label("给你的小宇宙", 28, INK, true);
        title.setGravity(Gravity.CENTER);
        LinearLayout.LayoutParams titleParams = wrap();
        titleParams.setMargins(0, dp(18), 0, dp(8));
        loadingView.addView(title, titleParams);

        TextView text = label(message, 15, MUTED, false);
        text.setGravity(Gravity.CENTER);
        loadingView.addView(text, wrap());

        root.addView(loadingView, match());
    }

    private void showError(String message, boolean canRetry) {
        root.removeAllViews();
        LinearLayout panel = new LinearLayout(this);
        panel.setOrientation(LinearLayout.VERTICAL);
        panel.setGravity(Gravity.CENTER);
        panel.setPadding(dp(28), dp(28), dp(28), dp(28));
        panel.setBackgroundColor(PAPER);
        TextView title = label("没有连上小宇宙", 26, INK, true);
        title.setGravity(Gravity.CENTER);
        panel.addView(title, wrap());
        TextView text = label(message, 15, MUTED, false);
        text.setGravity(Gravity.CENTER);
        LinearLayout.LayoutParams textParams = wrap();
        textParams.setMargins(0, dp(12), 0, dp(18));
        panel.addView(text, textParams);
        if (canRetry) {
            Button retry = primaryButton("重新连接");
            retry.setOnClickListener(v -> {
                showLoading("正在重新连接...");
                loadInitialData();
            });
            panel.addView(retry, wrap());
        }
        root.addView(panel, match());
    }

    private void showEntry() {
        root.removeAllViews();
        LinearLayout card = new LinearLayout(this);
        card.setOrientation(LinearLayout.VERTICAL);
        card.setPadding(dp(22), dp(24), dp(22), dp(22));
        card.setBackground(cardBg(Color.rgb(34, 34, 36), Color.rgb(70, 58, 62)));

        TextView eyebrow = label("PRIVATE UNIVERSE", 12, Color.rgb(191, 220, 204), true);
        card.addView(eyebrow, wrap());

        TextView title = label("只给她看的地方", 32, Color.WHITE, true);
        LinearLayout.LayoutParams titleParams = wrap();
        titleParams.setMargins(0, dp(8), 0, dp(12));
        card.addView(title, titleParams);

        TextView copy = label("把暗号说给这扇门听，里面全是偏心和认真。", 15, Color.rgb(226, 218, 219), false);
        copy.setLineSpacing(dp(4), 1);
        card.addView(copy, wrap());

        passcodeInput = new EditText(this);
        passcodeInput.setSingleLine(true);
        passcodeInput.setHint("输入暗号");
        passcodeInput.setTextColor(Color.WHITE);
        passcodeInput.setHintTextColor(Color.rgb(180, 174, 176));
        passcodeInput.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
        passcodeInput.setBackground(inputBg(Color.rgb(48, 48, 50), Color.rgb(84, 76, 78)));
        passcodeInput.setPadding(dp(14), 0, dp(14), 0);
        LinearLayout.LayoutParams inputParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(52));
        inputParams.setMargins(0, dp(22), 0, dp(12));
        card.addView(passcodeInput, inputParams);

        Button enter = primaryButton("进入");
        enter.setOnClickListener(v -> tryEnter());
        card.addView(enter, wrap());

        entryMessage = label("输入只属于你们的暗号。", 13, Color.rgb(200, 190, 192), false);
        LinearLayout.LayoutParams msgParams = wrap();
        msgParams.setMargins(0, dp(12), 0, 0);
        card.addView(entryMessage, msgParams);

        root.addView(card, centeredCard());
    }

    private void tryEnter() {
        String value = normalizePasscode(passcodeInput.getText().toString());
        boolean ok = false;
        for (String passcode : passcodes) {
            if (normalizePasscode(passcode).equals(value)) {
                ok = true;
                break;
            }
        }
        if (!ok) {
            entryMessage.setText("门听见了，但还想再确认一次。");
            return;
        }
        getSharedPreferences(PREFS, MODE_PRIVATE).edit().putBoolean("unlocked", true).apply();
        showApp();
    }

    private boolean isUnlocked() {
        return getSharedPreferences(PREFS, MODE_PRIVATE).getBoolean("unlocked", false);
    }

    private void showApp() {
        root.removeAllViews();
        appView = new ScrollView(this);
        appView.setFillViewport(false);
        appView.setBackgroundColor(PAPER);
        appContent = new LinearLayout(this);
        appContent.setOrientation(LinearLayout.VERTICAL);
        appContent.setPadding(dp(18), dp(18), dp(18), dp(34));
        appView.addView(appContent, matchWrap());
        root.addView(appView, match());

        buildHero();
        buildWeather();
        buildSignals();
        buildIdeas();
        buildCoupons();
        buildGuestbook();
        buildMessagesAndLetters();
    }

    private void buildHero() {
        LinearLayout hero = card();
        hero.setBackground(cardBg(TEAL_DARK, TEAL));
        TextView eyebrow = label("FOR " + partnerName(), 12, Color.rgb(191, 220, 204), true);
        hero.addView(eyebrow, wrap());
        TextView title = label(partnerName() + "的小宇宙", 31, Color.WHITE, true);
        LinearLayout.LayoutParams titleParams = wrap();
        titleParams.setMargins(0, dp(8), 0, dp(12));
        hero.addView(title, titleParams);
        TextView line = label(settings.optString("heroLine", "今天也想认真地，把世界温柔地递给你。"), 16, Color.rgb(235, 246, 242), false);
        line.setLineSpacing(dp(4), 1);
        hero.addView(line, wrap());
        TextView days = label("在一起 " + daysSince(settings.optString("startDate", "")) + " 天", 14, Color.WHITE, true);
        days.setPadding(dp(12), dp(8), dp(12), dp(8));
        days.setBackground(chipBg(Color.argb(34, 255, 255, 255), Color.argb(80, 255, 255, 255)));
        LinearLayout.LayoutParams daysParams = wrap();
        daysParams.setMargins(0, dp(18), 0, 0);
        hero.addView(days, daysParams);
        appContent.addView(hero, sectionParams());
    }

    private void buildWeather() {
        LinearLayout section = section("她那边的天空", "SEVEN DAYS");
        weatherStatus = label("正在读取天气...", 14, MUTED, false);
        section.addView(weatherStatus, wrap());
        HorizontalScrollView scroller = new HorizontalScrollView(this);
        scroller.setHorizontalScrollBarEnabled(false);
        weatherList = new LinearLayout(this);
        weatherList.setOrientation(LinearLayout.HORIZONTAL);
        scroller.addView(weatherList, wrap());
        LinearLayout.LayoutParams scrollParams = wrap();
        scrollParams.setMargins(0, dp(12), 0, 0);
        section.addView(scroller, scrollParams);
        appContent.addView(section, sectionParams());
        loadWeather();
    }

    private void loadWeather() {
        executor.execute(() -> {
            try {
                String adcode = settings.optString("cityAdcode", "");
                String city = settings.optString("cityName", "新沂市");
                String path = "/api/weather?place=" + enc(city) + "&city=" + enc(adcode.isEmpty() ? city : adcode);
                JSONObject data = getJson(path);
                runOnUiThread(() -> renderWeather(data));
            } catch (Exception error) {
                runOnUiThread(() -> renderWeather(buildFallbackWeather()));
            }
        });
    }

    private void renderWeather(JSONObject data) {
        weatherList.removeAllViews();
        JSONObject daily = data.optJSONObject("daily");
        JSONArray times = daily == null ? null : daily.optJSONArray("time");
        if (times == null || times.length() == 0) {
            weatherStatus.setText("天气暂时没有数据。");
            return;
        }
        weatherStatus.setText(data.optString("placeName", settings.optString("cityName", "新沂市")) + " · 未来 " + times.length() + " 天");
        JSONArray min = daily.optJSONArray("temperature_2m_min");
        JSONArray max = daily.optJSONArray("temperature_2m_max");
        JSONArray rain = daily.optJSONArray("precipitation_probability_max");
        JSONArray text = daily.optJSONArray("weather_text");
        for (int i = 0; i < Math.min(7, times.length()); i += 1) {
            LinearLayout card = miniCard(dp(132));
            card.addView(label(i == 0 ? "今天" : weekday(times.optString(i)), 13, MUTED, true), wrap());
            TextView temp = label(Math.round(min == null ? 0 : min.optDouble(i)) + "° / " + Math.round(max == null ? 0 : max.optDouble(i)) + "°", 20, INK, true);
            LinearLayout.LayoutParams tempParams = wrap();
            tempParams.setMargins(0, dp(10), 0, dp(6));
            card.addView(temp, tempParams);
            card.addView(label(text == null ? "天气变化" : text.optString(i, "天气变化"), 14, TEAL_DARK, false), wrap());
            card.addView(label("降雨 " + (rain == null ? 0 : rain.optInt(i, 0)) + "%", 13, MUTED, false), wrap());
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(dp(132), ViewGroup.LayoutParams.WRAP_CONTENT);
            params.setMargins(0, 0, dp(10), 0);
            weatherList.addView(card, params);
        }
    }

    private JSONObject buildFallbackWeather() {
        try {
            JSONObject data = new JSONObject();
            JSONObject daily = new JSONObject();
            JSONArray times = new JSONArray();
            JSONArray min = new JSONArray();
            JSONArray max = new JSONArray();
            JSONArray rain = new JSONArray();
            JSONArray text = new JSONArray();
            String[] labels = {"多云", "多云", "阴", "小雨", "多云", "晴", "阵雨"};
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd", Locale.CHINA);
            long now = System.currentTimeMillis();
            for (int i = 0; i < 7; i += 1) {
                times.put(format.format(new Date(now + i * 86400000L)));
                int base = 24 + (i % 3);
                min.put(base - 3);
                max.put(base + 4);
                rain.put(new int[]{20, 30, 35, 55, 25, 10, 45}[i]);
                text.put(labels[i]);
            }
            daily.put("time", times);
            daily.put("temperature_2m_min", min);
            daily.put("temperature_2m_max", max);
            daily.put("precipitation_probability_max", rain);
            daily.put("weather_text", text);
            data.put("placeName", settings.optString("cityName", "新沂市") + " · 临时参考");
            data.put("daily", daily);
            return data;
        } catch (Exception ignored) {
            return new JSONObject();
        }
    }

    private void buildSignals() {
        LinearLayout section = section("互动信号站", "SIGNALS");
        LinearLayout row = new LinearLayout(this);
        row.setOrientation(LinearLayout.HORIZONTAL);
        row.addView(signalButton("要抱抱", "她点了要抱抱", "抱抱信号已经发给我。", "hug"), new LinearLayout.LayoutParams(0, dp(96), 1));
        row.addView(space(dp(10), 1), new LinearLayout.LayoutParams(dp(10), 1));
        row.addView(signalButton("想你了", "她点了想你雷达", "想你信号已经发给我。", "miss"), new LinearLayout.LayoutParams(0, dp(96), 1));
        section.addView(row, wrap());
        Button status = secondaryButton("写现在的心情");
        status.setOnClickListener(v -> showMoodDialog());
        LinearLayout.LayoutParams statusParams = wrap();
        statusParams.setMargins(0, dp(10), 0, 0);
        section.addView(status, statusParams);
        appContent.addView(section, sectionParams());
    }

    private View signalButton(String title, String label, String toast, String key) {
        TextView view = label(title, 16, Color.WHITE, true);
        view.setGravity(Gravity.CENTER);
        view.setBackground(cardBg(key.equals("hug") ? ROSE : LAVENDER, key.equals("hug") ? ROSE : LAVENDER));
        view.setOnClickListener(v -> postSignal(key, label, title, toast));
        return view;
    }

    private void showMoodDialog() {
        LinearLayout box = new LinearLayout(this);
        box.setOrientation(LinearLayout.VERTICAL);
        box.setPadding(dp(6), dp(6), dp(6), 0);
        final EditText status = new EditText(this);
        status.setHint("比如：今天有点累，想被抱一下。");
        status.setMinLines(3);
        status.setGravity(Gravity.TOP);
        box.addView(status, matchWrap());
        new AlertDialog.Builder(this)
                .setTitle("现在的心情")
                .setView(box)
                .setNegativeButton("取消", null)
                .setPositiveButton("发给我", (dialog, which) -> {
                    String message = status.getText().toString().trim();
                    if (message.isEmpty()) message = "她打开了今日状态灯。";
                    postSignal("status", "今日状态灯", message, "状态灯已经发给我。");
                })
                .show();
    }

    private void postSignal(String key, String label, String response, String okText) {
        executor.execute(() -> {
            try {
                JSONObject body = new JSONObject();
                body.put("moodKey", key);
                body.put("label", label);
                body.put("response", response);
                postJson("/api/mood-events", body);
                runOnUiThread(() -> toast(okText));
            } catch (Exception error) {
                runOnUiThread(() -> toast("暂时没有发出去，再试一次。"));
            }
        });
    }

    private void buildIdeas() {
        LinearLayout section = section("愿望和约会", "LITTLE PLANS");
        renderCurrentIdea(section);
        if (!datePlans.isEmpty()) {
            TextView sub = label("约会计划表", 18, INK, true);
            LinearLayout.LayoutParams subParams = wrap();
            subParams.setMargins(0, dp(16), 0, dp(8));
            section.addView(sub, subParams);
            for (int i = 0; i < Math.min(3, datePlans.size()); i += 1) {
                JSONObject plan = datePlans.get(i);
                section.addView(simpleInfoCard(plan.optString("title"), plan.optString("date") + " · " + plan.optString("time"), plan.optString("place") + "\n预算：" + plan.optString("budget")), smallGap());
            }
        }
        if (!gifts.isEmpty()) {
            TextView sub = label("礼物备忘", 18, INK, true);
            LinearLayout.LayoutParams subParams = wrap();
            subParams.setMargins(0, dp(16), 0, dp(8));
            section.addView(sub, subParams);
            for (int i = 0; i < Math.min(3, gifts.size()); i += 1) {
                JSONObject gift = gifts.get(i);
                section.addView(simpleInfoCard(gift.optString("title"), gift.optString("category") + " · 优先级 " + gift.optString("priority"), gift.optString("detail")), smallGap());
            }
        }
        appContent.addView(section, sectionParams());
    }

    private void renderCurrentIdea(LinearLayout section) {
        JSONObject idea = dateIdeas.isEmpty() ? new JSONObject() : dateIdeas.get(ideaIndex % dateIdeas.size());
        LinearLayout card = simpleInfoCard(
                idea.optString("title", "今天的约会灵感"),
                idea.optString("time", "随时"),
                idea.optString("text", "后台可以继续添加她喜欢的约会方式。")
        );
        section.addView(card, smallGap());
        Button draw = primaryButton("换一个灵感");
        draw.setOnClickListener(v -> {
            if (dateIdeas.isEmpty()) return;
            ideaIndex = (ideaIndex + 1) % dateIdeas.size();
            showApp();
        });
        section.addView(draw, smallGap());
    }

    private void buildCoupons() {
        LinearLayout section = section("专属小票券", "COUPONS");
        couponList = new LinearLayout(this);
        couponList.setOrientation(LinearLayout.VERTICAL);
        section.addView(couponList, wrap());
        appContent.addView(section, sectionParams());
        renderCoupons();
    }

    private void renderCoupons() {
        couponList.removeAllViews();
        if (coupons.isEmpty()) {
            couponList.addView(label("还没有小票券。", 14, MUTED, false), wrap());
            return;
        }
        for (JSONObject coupon : coupons) {
            LinearLayout card = card();
            card.addView(label(coupon.optString("title", "小票券"), 18, INK, true), wrap());
            TextView desc = label(coupon.optString("text", ""), 14, MUTED, false);
            desc.setLineSpacing(dp(3), 1);
            card.addView(desc, smallGap());
            card.addView(label("可领 " + coupon.optInt("availableQuantity") + " · 已领 " + coupon.optInt("claimedQuantity") + " · 已用 " + coupon.optInt("usedQuantity"), 13, TEAL_DARK, true), smallGap());
            LinearLayout actions = new LinearLayout(this);
            actions.setOrientation(LinearLayout.HORIZONTAL);
            Button claim = secondaryButton("领取");
            claim.setEnabled(coupon.optInt("availableQuantity") > 0);
            claim.setOnClickListener(v -> runCouponAction(coupon.optString("id"), "claim"));
            Button use = primaryButton("使用");
            use.setEnabled(coupon.optInt("claimedQuantity") > 0);
            use.setOnClickListener(v -> runCouponAction(coupon.optString("id"), "use"));
            actions.addView(claim, new LinearLayout.LayoutParams(0, dp(46), 1));
            actions.addView(space(dp(10), 1), new LinearLayout.LayoutParams(dp(10), 1));
            actions.addView(use, new LinearLayout.LayoutParams(0, dp(46), 1));
            card.addView(actions, smallGap());
            couponList.addView(card, smallGap());
        }
    }

    private void runCouponAction(String id, String action) {
        executor.execute(() -> {
            try {
                postJson("/api/coupons/" + enc(id) + "/" + action, new JSONObject());
                loadCouponsSync();
                runOnUiThread(() -> {
                    renderCoupons();
                    toast(action.equals("claim") ? "已经领取一张。" : "已经登记使用。");
                });
            } catch (Exception error) {
                runOnUiThread(() -> toast("小票券暂时操作失败。"));
            }
        });
    }

    private void buildGuestbook() {
        LinearLayout section = section("双向留言本", "GUESTBOOK");
        EditText name = new EditText(this);
        name.setSingleLine(true);
        name.setHint("昵称");
        name.setBackground(inputBg(PAPER_STRONG, LINE));
        name.setPadding(dp(12), 0, dp(12), 0);
        section.addView(name, inputParams());
        EditText message = new EditText(this);
        message.setHint("写给我的话");
        message.setMinLines(3);
        message.setGravity(Gravity.TOP);
        message.setBackground(inputBg(PAPER_STRONG, LINE));
        message.setPadding(dp(12), dp(10), dp(12), dp(10));
        section.addView(message, inputParams());
        Button send = primaryButton("写进留言本");
        send.setOnClickListener(v -> sendGuestbook(name.getText().toString(), message.getText().toString(), message));
        section.addView(send, smallGap());
        guestbookList = new LinearLayout(this);
        guestbookList.setOrientation(LinearLayout.VERTICAL);
        section.addView(guestbookList, smallGap());
        appContent.addView(section, sectionParams());
        renderGuestbook();
    }

    private void sendGuestbook(String name, String message, EditText input) {
        if (message.trim().isEmpty()) {
            toast("先写一点想说的话。");
            return;
        }
        executor.execute(() -> {
            try {
                JSONObject body = new JSONObject();
                body.put("name", name.trim().isEmpty() ? partnerName() : name.trim());
                body.put("message", message.trim());
                postJson("/api/guestbook", body);
                loadGuestbookSync();
                runOnUiThread(() -> {
                    input.setText("");
                    renderGuestbook();
                    toast("已经写进留言本。");
                });
            } catch (Exception error) {
                runOnUiThread(() -> toast("留言暂时没有写进去。"));
            }
        });
    }

    private void renderGuestbook() {
        guestbookList.removeAllViews();
        if (guestbook.isEmpty()) {
            guestbookList.addView(label("这里还空着，她写下第一句后就会出现。", 14, MUTED, false), wrap());
            return;
        }
        for (int i = 0; i < Math.min(5, guestbook.size()); i += 1) {
            JSONObject entry = guestbook.get(i);
            String body = entry.optString("message", "");
            String reply = entry.optString("reply", "");
            if (!reply.isEmpty()) body += "\n我的回复：" + reply;
            guestbookList.addView(simpleInfoCard(entry.optString("name", "她"), formatTime(entry.optString("createdAt")), body), smallGap());
        }
    }

    private void buildMessagesAndLetters() {
        LinearLayout section = section("留言墙和未来信", "FUTURE MAIL");
        for (JSONObject message : messages) {
            section.addView(simpleInfoCard(message.optString("title"), "", message.optString("text")), smallGap());
        }
        for (JSONObject letter : letters) {
            String openAt = letter.optString("openAt", "");
            String body = isUnlockedDate(openAt) ? letter.optString("body", "") : "这封信还在路上，" + openAt + " 后再拆。";
            section.addView(simpleInfoCard(letter.optString("title"), openAt, body), smallGap());
        }
        appContent.addView(section, sectionParams());
    }

    private LinearLayout section(String title, String eyebrow) {
        LinearLayout section = new LinearLayout(this);
        section.setOrientation(LinearLayout.VERTICAL);
        section.setPadding(0, dp(2), 0, 0);
        TextView eye = label(eyebrow, 12, TEAL, true);
        section.addView(eye, wrap());
        TextView head = label(title, 25, INK, true);
        LinearLayout.LayoutParams headParams = wrap();
        headParams.setMargins(0, dp(5), 0, dp(12));
        section.addView(head, headParams);
        return section;
    }

    private LinearLayout simpleInfoCard(String title, String meta, String body) {
        LinearLayout card = card();
        card.addView(label(title, 17, INK, true), wrap());
        if (!meta.isEmpty()) card.addView(label(meta, 13, TEAL_DARK, false), smallGap());
        TextView text = label(body, 14, MUTED, false);
        text.setLineSpacing(dp(3), 1);
        card.addView(text, smallGap());
        return card;
    }

    private LinearLayout card() {
        LinearLayout card = new LinearLayout(this);
        card.setOrientation(LinearLayout.VERTICAL);
        card.setPadding(dp(16), dp(16), dp(16), dp(16));
        card.setBackground(cardBg(PAPER_STRONG, LINE));
        return card;
    }

    private LinearLayout miniCard(int width) {
        LinearLayout card = card();
        card.setMinimumWidth(width);
        return card;
    }

    private TextView label(String text, int sp, int color, boolean bold) {
        TextView view = new TextView(this);
        view.setText(text == null ? "" : text);
        view.setTextSize(sp);
        view.setTextColor(color);
        view.setIncludeFontPadding(true);
        if (bold) view.setTypeface(Typeface.DEFAULT_BOLD);
        return view;
    }

    private Button primaryButton(String text) {
        Button button = new Button(this);
        button.setText(text);
        button.setAllCaps(false);
        button.setTextColor(Color.WHITE);
        button.setTextSize(15);
        button.setTypeface(Typeface.DEFAULT_BOLD);
        button.setBackground(cardBg(ROSE, ROSE));
        return button;
    }

    private Button secondaryButton(String text) {
        Button button = new Button(this);
        button.setText(text);
        button.setAllCaps(false);
        button.setTextColor(TEAL_DARK);
        button.setTextSize(15);
        button.setTypeface(Typeface.DEFAULT_BOLD);
        button.setBackground(cardBg(Color.rgb(232, 243, 238), Color.rgb(191, 220, 204)));
        return button;
    }

    private View space(int width, int height) {
        View view = new View(this);
        view.setMinimumWidth(width);
        view.setMinimumHeight(height);
        return view;
    }

    private GradientDrawable cardBg(int fill, int stroke) {
        GradientDrawable drawable = new GradientDrawable();
        drawable.setColor(fill);
        drawable.setCornerRadius(dp(8));
        drawable.setStroke(dp(1), stroke);
        return drawable;
    }

    private GradientDrawable chipBg(int fill, int stroke) {
        GradientDrawable drawable = cardBg(fill, stroke);
        drawable.setCornerRadius(dp(999));
        return drawable;
    }

    private GradientDrawable inputBg(int fill, int stroke) {
        return cardBg(fill, stroke);
    }

    private LinearLayout.LayoutParams sectionParams() {
        LinearLayout.LayoutParams params = matchWrap();
        params.setMargins(0, 0, 0, dp(28));
        return params;
    }

    private LinearLayout.LayoutParams smallGap() {
        LinearLayout.LayoutParams params = matchWrap();
        params.setMargins(0, dp(8), 0, 0);
        return params;
    }

    private LinearLayout.LayoutParams inputParams() {
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        params.setMargins(0, 0, 0, dp(10));
        return params;
    }

    private FrameLayout.LayoutParams centeredCard() {
        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        params.gravity = Gravity.CENTER;
        params.setMargins(dp(22), 0, dp(22), 0);
        return params;
    }

    private FrameLayout.LayoutParams match() {
        return new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
    }

    private LinearLayout.LayoutParams wrap() {
        return new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
    }

    private LinearLayout.LayoutParams matchWrap() {
        return new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
    }

    private JSONObject getJson(String path) throws Exception {
        HttpURLConnection connection = openConnection(path, "GET");
        return readJsonResponse(connection);
    }

    private JSONObject postJson(String path, JSONObject body) throws Exception {
        HttpURLConnection connection = openConnection(path, "POST");
        connection.setRequestProperty("Content-Type", "application/json; charset=utf-8");
        connection.setDoOutput(true);
        byte[] bytes = body.toString().getBytes(StandardCharsets.UTF_8);
        try (OutputStream output = connection.getOutputStream()) {
            output.write(bytes);
        }
        return readJsonResponse(connection);
    }

    private HttpURLConnection openConnection(String path, String method) throws Exception {
        URL url = new URL(serverUrl + path);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod(method);
        connection.setConnectTimeout(9000);
        connection.setReadTimeout(9000);
        connection.setRequestProperty("Accept", "application/json");
        return connection;
    }

    private JSONObject readJsonResponse(HttpURLConnection connection) throws Exception {
        int status = connection.getResponseCode();
        BufferedReader reader = new BufferedReader(new InputStreamReader(
                status >= 200 && status < 300 ? connection.getInputStream() : connection.getErrorStream(),
                StandardCharsets.UTF_8
        ));
        StringBuilder builder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) builder.append(line);
        if (status < 200 || status >= 300) throw new IllegalStateException("HTTP " + status);
        return new JSONObject(builder.toString());
    }

    private String normalizeServerUrl(String value) {
        String text = value == null ? "" : value.trim();
        while (text.endsWith("/")) text = text.substring(0, text.length() - 1);
        return text;
    }

    private String normalizePasscode(String value) {
        return value == null ? "" : value.trim().replaceAll("\\s+", "").toLowerCase(Locale.ROOT);
    }

    private String partnerName() {
        return settings.optString("partnerName", "她");
    }

    private String enc(String value) {
        try {
            return java.net.URLEncoder.encode(value == null ? "" : value, "UTF-8");
        } catch (Exception ignored) {
            return "";
        }
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    private void toast(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }

    private int daysSince(String value) {
        try {
            Date start = new SimpleDateFormat("yyyy-MM-dd", Locale.CHINA).parse(value);
            long diff = new Date().getTime() - (start == null ? new Date() : start).getTime();
            return Math.max(1, (int) (diff / 86400000L) + 1);
        } catch (Exception ignored) {
            return 1;
        }
    }

    private boolean isUnlockedDate(String value) {
        try {
            Date target = new SimpleDateFormat("yyyy-MM-dd", Locale.CHINA).parse(value);
            return target == null || !target.after(new Date());
        } catch (Exception ignored) {
            return true;
        }
    }

    private String weekday(String value) {
        try {
            Date date = new SimpleDateFormat("yyyy-MM-dd", Locale.CHINA).parse(value);
            return new SimpleDateFormat("E", Locale.CHINA).format(date == null ? new Date() : date);
        } catch (Exception ignored) {
            return value;
        }
    }

    private String formatTime(String value) {
        try {
            Date date = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US).parse(value);
            return new SimpleDateFormat("MM-dd HH:mm", Locale.CHINA).format(date == null ? new Date() : date);
        } catch (Exception ignored) {
            return "";
        }
    }
}
