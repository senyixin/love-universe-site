const crypto = require("node:crypto");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const https = require("node:https");
const path = require("node:path");

loadEnvFile(path.resolve(__dirname, ".env"));

const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");

const app = express();
const PORT = Number(process.env.PORT || 5173);
const HOST = process.env.HOST || "0.0.0.0";
const ROOT = __dirname;
const DATA_DIR = path.resolve(ROOT, "data");
const UPLOAD_DIR = path.resolve(ROOT, "uploads", "photos");
const PHOTOS_FILE = path.join(DATA_DIR, "photos.json");
const COUPONS_FILE = path.join(DATA_DIR, "coupons.json");
const COUPON_EVENTS_FILE = path.join(DATA_DIR, "coupon-events.json");
const MOOD_EVENTS_FILE = path.join(DATA_DIR, "mood-events.json");
const GUESTBOOK_FILE = path.join(DATA_DIR, "guestbook.json");
const MAIL_CONFIG_FILE = path.join(DATA_DIR, "mail-config.json");
const SITE_CONTENT_FILE = path.join(DATA_DIR, "site-content.json");
const ADMIN_CONFIG_FILE = path.join(DATA_DIR, "admin-config.json");
const ADMIN_COOKIE = "love_admin_session";
const DEFAULT_ADMIN_KEY = process.env.ADMIN_KEY || "only-you-1314520";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const adminSessions = new Map();
const DEFAULT_CITY = {
  name: "???",
  admin1: "???",
  country: "??",
  latitude: 34.3686,
  longitude: 118.3545,
  adcode: "320381"
};

const DEFAULT_SITE_CONTENT = {
  settings: {
    partnerName: "Shannon",
    yourName: "?",
    heroLine: "??????????????????",
    passcodes: ["0520", "520", "???", "shannon", "Shannon"],
    startDate: "2024-05-20",
    birthday: "2026-08-20",
    nextMeet: "2026-06-01",
    cityName: "???",
    cityLatitude: 34.3686,
    cityLongitude: 118.3545,
    cityAdcode: "320381",
    songUrl: "",
    guestNames: ["?", "?"]
  },
  dailyTools: {
    meetTitle: "????",
    meetDate: dateAfterDays(7),
    meetTime: "18:00",
    meetChecklist: ["??/????", "???/????", "?????", "????????"],
    careCards: ["???????????????", "???????????????", "?????????????????", "????????????", "??????????????", "????????????????????"],
    dailyTasks: ["??????????", "???????????????", "??????????", "?????????????"],
    periodDate: "",
    periodCycleDays: 28,
    periodAvoid: ["????", "??????", "?????"],
    periodWarm: ["?????", "??/?????", "????????"],
    periodMood: "????????????????????????",
    feedingFoods: ["?????", "????", "???", "???", "???", "????"],
    feedingDrinks: ["????", "???", "????", "?????", "???"],
    feedingSnacks: ["??", "???", "???", "??", "???"],
    feedingAvoid: ["??", "??", "????"],
    tripPlace: "???????",
    tripTime: "??",
    tripTransport: "??/?????",
    tripHotel: "??/??????",
    tripNotes: ["?????????", "????????", "????????????"]
  },
  timeline: [
    { date: "2024-05-20", title: "???????", text: "???????????????????????" },
    { date: "2024-08-14", title: "?????????", text: "???????????????????????" },
    { date: "2025-02-14", title: "????????", text: "????????????????????" },
    { date: "2026-05-25", title: "??????", text: "????????????????" }
  ],
  dateIdeas: [
    { title: "?????", time: "2 ??", tags: ["??", "??", "??"], text: "??????????????????????????????????" },
    { title: "??????", time: "90 ??", tags: ["??", "??", "??"], text: "????????????????????????????????" },
    { title: "??????", time: "1 ?", tags: ["??", "??", "??"], text: "????????????????????????????????" },
    { title: "???????", time: "??", tags: ["??", "??", "??"], text: "??????????????????????????????????" },
    { title: "?????", time: "??", tags: ["??", "??", "??"], text: "??????????????????????????" },
    { title: "????", time: "??", tags: ["??", "??", "??"], text: "?????????????????????????????????" },
    { title: "?????", time: "2 ??", tags: ["??", "??", "??"], text: "?????????????????????????????????????" },
    { title: "??????", time: "1 ?", tags: ["??", "??", "??"], text: "????????????????????????????????" },
    { title: "??????", time: "??", tags: ["??", "??", "??"], text: "??????????????????????????????" },
    { title: "?????", time: "??", tags: ["??", "??", "??"], text: "??????????????????????????????" },
    { title: "????????", time: "??", tags: ["??", "??", "??"], text: "???????????????? 9 ???????????????" },
    { title: "?????", time: "1 ?", tags: ["??", "??", "??"], text: "?????????????????????????????" },
    { title: "???????", time: "??", tags: ["??", "??", "??"], text: "?????????????????????????????" },
    { title: "??????", time: "1 ??", tags: ["??", "??", "??"], text: "???? 10 ?????????????????????????????" },
    { title: "??????", time: "1 ??", tags: ["??", "??", "??"], text: "?????????????????????????????" }
  ],
  ideaTools: [
    {
      id: "food-roulette",
      title: "??????",
      text: "?????????????????????????",
      buttonLabel: "??????",
      items: [
        "??", "??", "??", "???", "??", "??", "???", "??", "??", "??", "??", "??",
        "??", "??", "????", "???", "??", "??", "???", "???", "??", "???",
        "???", "????", "???", "?????"
      ]
    }
  ],
  datePlans: [
    { title: "??????", date: dateAfterDays(6), time: "15:00", place: "?????????", budget: "200 ??", checklist: ["????", "?????", "?????"], note: "??????????" },
    { title: "???????", date: dateAfterDays(12), time: "??", place: "??????", budget: "??", checklist: ["???", "?????", "?????"], note: "????????" }
  ],
  foodOptions: [
    { name: "?????", tags: ["??", "??", "??"], spicy: false, warm: true, budget: "mid", distance: "near" },
    { name: "???", tags: ["??", "??", "?????"], spicy: false, warm: true, budget: "high", distance: "normal" },
    { name: "???", tags: ["??", "??", "??"], spicy: true, warm: true, budget: "mid", distance: "normal" },
    { name: "????", tags: ["???", "??", "?"], spicy: false, warm: true, budget: "low", distance: "near" },
    { name: "????", tags: ["??", "??", "???"], spicy: false, warm: true, budget: "mid", distance: "near" },
    { name: "????", tags: ["??", "??", "???"], spicy: false, warm: false, budget: "mid", distance: "near" },
    { name: "???", tags: ["??", "????", "???"], spicy: true, warm: true, budget: "low", distance: "near" },
    { name: "???", tags: ["??", "??", "????"], spicy: false, warm: true, budget: "high", distance: "far" }
  ],
  giftList: [
    { title: "??????", category: "???", detail: "?????????????", priority: "?", note: "???????" },
    { title: "????????", category: "??", detail: "?????????????", priority: "?", note: "?????????????" },
    { title: "???????", category: "??", detail: "????????????????????????", priority: "?", note: "?????????" }
  ],
  places: [
    { id: "place-1", name: "????????", note: "?????????????", x: 25, y: 68 },
    { id: "place-2", name: "??????", note: "??????????????????", x: 58, y: 42 },
    { id: "place-3", name: "???", note: "???????????", x: 76, y: 28 }
  ],
  messageWall: [
    { id: "message-1", title: "????", text: "?????????????????" },
    { id: "message-2", title: "??????", text: "??????????????????????????" }
  ],
  letters: [
    { id: "letter-1", title: "??????", openAt: dateAfterDays(0), body: "{?}?????????????????????????????????????" },
    { id: "letter-2", title: "?????", openAt: dateAfterDays(3), body: "??????????????????????????????????????" },
    { id: "letter-3", title: "?????", openAt: dateAfterDays(7), body: "??????????????????????????????" },
    { id: "letter-4", title: "???????", openAt: dateAfterDays(14), body: "????????????????????????????????????" }
  ]
};

const DEFAULT_COUPONS = [
  { title: "??????", text: "????????????????????", totalQuantity: 2 },
  { title: "??????", text: "??????????????", totalQuantity: 3 },
  { title: "?????", text: "???????????", totalQuantity: 1 },
  { title: "?????", text: "????????????????", totalQuantity: 2 }
];

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
ensureJsonFile(PHOTOS_FILE, []);
ensureJsonFile(COUPONS_FILE, DEFAULT_COUPONS.map(createCoupon));
ensureJsonFile(COUPON_EVENTS_FILE, []);
ensureJsonFile(MOOD_EVENTS_FILE, []);
ensureJsonFile(GUESTBOOK_FILE, []);
ensureJsonFile(MAIL_CONFIG_FILE, {});
ensureJsonFile(SITE_CONTENT_FILE, DEFAULT_SITE_CONTENT);
ensureJsonFile(ADMIN_CONFIG_FILE, createAdminConfig(DEFAULT_ADMIN_KEY));

const mimeToExt = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif"
};

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = mimeToExt[file.mimetype] || path.extname(file.originalname).toLowerCase() || ".jpg";
    cb(null, `${Date.now()}-${crypto.randomUUID()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (mimeToExt[file.mimetype]) {
      cb(null, true);
      return;
    }
    cb(new Error("??? jpg?png?webp?gif ???"));
  }
});

app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static(path.join(ROOT, "uploads"), {
  maxAge: "1d",
  immutable: false
}));

app.post("/api/admin/login", async (req, res, next) => {
  try {
    const key = String(req.body?.key || "");
    if (!key || !(await verifyAdminKey(key))) {
      res.json({ ok: false });
      return;
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + SESSION_TTL_MS;
    adminSessions.set(token, expiresAt);
    res.setHeader("Set-Cookie", `${ADMIN_COOKIE}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_MS / 1000}`);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.post("/api/admin/logout", (req, res) => {
  const token = getCookie(req, ADMIN_COOKIE);
  if (token) adminSessions.delete(token);
  res.setHeader("Set-Cookie", `${ADMIN_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
  res.json({ ok: true });
});

app.get("/api/photos", async (_req, res, next) => {
  try {
    const photos = await readPhotos();
    res.json({ photos });
  } catch (error) {
    next(error);
  }
});

app.get("/api/content", async (_req, res, next) => {
  try {
    const content = await readSiteContent();
    res.json({ content });
  } catch (error) {
    next(error);
  }
});

app.get("/api/guestbook", async (_req, res, next) => {
  try {
    const entries = await readGuestbook();
    res.json({ entries: entries.filter((entry) => entry.visible !== false).slice(0, 50) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/guestbook", async (req, res, next) => {
  try {
    const entry = normalizeGuestbookEntry({
      name: req.body?.name,
      message: req.body?.message,
      createdAt: new Date().toISOString(),
      visible: true
    });
    if (!entry.message) {
      res.status(400).json({ error: "?????????" });
      return;
    }
    const entries = await readGuestbook();
    entries.unshift(entry);
    await writeGuestbook(entries);
    await recordSignalEvent({
      moodKey: "guestbook",
      label: "???",
      response: `${entry.name}?${entry.message}`,
      subject: "??????????",
      lines: [
        `???${entry.name}`,
        `???${formatDateTime(entry.createdAt)}`,
        `???${entry.message}`
      ]
    });
    res.status(201).json({ entry });
  } catch (error) {
    next(error);
  }
});

app.get("/api/geocode", async (req, res, next) => {
  try {
    const city = cleanText(req.query.city, "");
    if (!city) {
      res.status(400).json({ error: "??????" });
      return;
    }
    const amapKey = getAmapKey();
    if (!amapKey) {
      res.json({ results: fallbackGeocode(city), fallback: true, error: "??????? Key?" });
      return;
    }

    const results = await geocodeCityWithAmap(city, amapKey);
    res.json({ results, source: "amap" });
  } catch (error) {
    const fallback = fallbackGeocode(req.query.city);
    if (fallback.length) {
      res.json({ results: fallback, fallback: true });
      return;
    }
    next(error);
  }
});

app.get("/api/weather", async (req, res) => {
  const latitude = Number(req.query.latitude);
  const longitude = Number(req.query.longitude);
  const placeName = cleanText(req.query.place, DEFAULT_CITY.name);

  try {
    const amapKey = getAmapKey();
    if (!amapKey) throw new Error("??????? Key?");
    const location = await resolveAmapWeatherLocation({
      amapKey,
      adcode: req.query.adcode || req.query.city,
      city: req.query.city,
      placeName,
      latitude,
      longitude
    });
    const daily = await fetchAmapWeather(location.adcode, amapKey);
    res.json({ placeName: location.placeName || placeName, daily, fallback: false, source: "amap" });
  } catch {
    res.json({ placeName, daily: buildFallbackWeather(), fallback: true });
  }
});

app.post("/api/photos", upload.single("photo"), async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "????????" });
      return;
    }

    const photos = await readPhotos();
    const now = new Date().toISOString();
    const photo = {
      id: crypto.randomUUID(),
      title: cleanText(req.body.title, "????"),
      date: cleanText(req.body.date, "???????????????????"),
      src: `/uploads/photos/${req.file.filename}`,
      filename: req.file.filename,
      createdAt: now,
      updatedAt: now
    };

    photos.unshift(photo);
    await writePhotos(photos);
    res.status(201).json({ photo });
  } catch (error) {
    if (req.file) await safeDelete(req.file.filename);
    next(error);
  }
});

app.put("/api/photos/:id", upload.single("photo"), async (req, res, next) => {
  try {
    const photos = await readPhotos();
    const photo = photos.find((item) => item.id === req.params.id);
    if (!photo) {
      if (req.file) await safeDelete(req.file.filename);
      res.status(404).json({ error: "?????????" });
      return;
    }

    const oldFilename = photo.filename;
    photo.title = cleanText(req.body.title, photo.title);
    photo.date = cleanText(req.body.date, photo.date);
    photo.updatedAt = new Date().toISOString();

    if (req.file) {
      photo.src = `/uploads/photos/${req.file.filename}`;
      photo.filename = req.file.filename;
    }

    await writePhotos(photos);
    if (req.file && oldFilename && oldFilename !== req.file.filename) {
      await safeDelete(oldFilename);
    }
    res.json({ photo });
  } catch (error) {
    if (req.file) await safeDelete(req.file.filename);
    next(error);
  }
});

app.delete("/api/photos/:id", async (req, res, next) => {
  try {
    const photos = await readPhotos();
    const index = photos.findIndex((item) => item.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ error: "?????????" });
      return;
    }

    const [photo] = photos.splice(index, 1);
    await writePhotos(photos);
    if (photo.filename) await safeDelete(photo.filename);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.get("/api/coupons", async (_req, res, next) => {
  try {
    const coupons = await readCoupons();
    res.json({ coupons: coupons.map(toPublicCoupon) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/coupons/:id/claim", async (req, res, next) => {
  try {
    const coupons = await readCoupons();
    const coupon = coupons.find((item) => item.id === req.params.id);
    if (!coupon) {
      res.status(404).json({ error: "??????????" });
      return;
    }

    const status = couponStatus(coupon);
    if (!status.usable || availableQuantity(coupon) <= 0) {
      res.status(400).json({ error: status.reason || "??????????" });
      return;
    }

    coupon.claimedQuantity += 1;
    coupon.updatedAt = new Date().toISOString();
    await writeCoupons(coupons);
    res.json({ coupon: toPublicCoupon(coupon) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/coupons/:id/use", async (req, res, next) => {
  try {
    const result = await useCoupon(req.params.id, {
      actor: "?",
      note: cleanText(req.body?.note, "???????????")
    });
    if (result.error) {
      res.status(result.status || 400).json({ error: result.error });
      return;
    }
    res.json({ coupon: toPublicCoupon(result.coupon), record: result.record });
  } catch (error) {
    next(error);
  }
});

app.post("/api/mood-events", async (req, res, next) => {
  try {
    const label = cleanText(req.body?.label, "????");
    const responseText = cleanText(req.body?.response, "");
    const event = await recordSignalEvent({
      moodKey: cleanText(req.body?.moodKey, "signal"),
      label,
      response: responseText,
      subject: signalEmailSubject(label),
      lines: [
        signalEmailIntro(label),
        `???${formatDateTime(new Date().toISOString())}`,
        responseText ? `?????${responseText}` : ""
      ].filter(Boolean)
    });
    res.json({ ok: true, event: { ...event, emailError: undefined } });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/coupons", requireAdmin, async (_req, res, next) => {
  try {
    const coupons = await readCoupons();
    res.json({ coupons: coupons.map(toAdminCoupon) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/admin/coupons", requireAdmin, async (req, res, next) => {
  try {
    const coupons = await readCoupons();
    const minOrder = coupons.reduce((min, item) => Math.min(min, item.sortOrder), 0);
    const coupon = createCoupon({ ...(req.body || {}), sortOrder: minOrder - 10 });
    coupons.unshift(coupon);
    await writeCoupons(sortCoupons(coupons));
    res.status(201).json({ coupon: toAdminCoupon(coupon) });
  } catch (error) {
    next(error);
  }
});

app.put("/api/admin/coupons/:id", requireAdmin, async (req, res, next) => {
  try {
    const coupons = await readCoupons();
    const coupon = coupons.find((item) => item.id === req.params.id);
    if (!coupon) {
      res.status(404).json({ error: "??????????" });
      return;
    }

    updateCoupon(coupon, req.body || {});
    await writeCoupons(coupons);
    res.json({ coupon: toAdminCoupon(coupon) });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/admin/coupons/:id", requireAdmin, async (req, res, next) => {
  try {
    const coupons = await readCoupons();
    const nextCoupons = coupons.filter((coupon) => coupon.id !== req.params.id);
    if (nextCoupons.length === coupons.length) {
      res.status(404).json({ error: "??????????" });
      return;
    }
    await writeCoupons(nextCoupons);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.post("/api/admin/coupons/:id/return", requireAdmin, async (req, res, next) => {
  try {
    const coupons = await readCoupons();
    const coupon = coupons.find((item) => item.id === req.params.id);
    if (!coupon) {
      res.status(404).json({ error: "??????????" });
      return;
    }

    const quantity = Math.max(1, Math.floor(Number(req.body?.quantity || 1)));
    coupon.claimedQuantity = Math.max(0, coupon.claimedQuantity - quantity);
    coupon.updatedAt = new Date().toISOString();
    await writeCoupons(coupons);
    res.json({ coupon: toAdminCoupon(coupon) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/admin/coupons/:id/use", requireAdmin, async (req, res, next) => {
  try {
    const result = await useCoupon(req.params.id, {
      actor: "???",
      note: cleanText(req.body?.note, "??????????")
    });
    if (result.error) {
      res.status(result.status || 400).json({ error: result.error });
      return;
    }
    res.json({ coupon: toAdminCoupon(result.coupon), record: result.record });
  } catch (error) {
    next(error);
  }
});

app.post("/api/admin/coupons/:id/pin", requireAdmin, async (req, res, next) => {
  try {
    const coupons = await readCoupons();
    const coupon = coupons.find((item) => item.id === req.params.id);
    if (!coupon) {
      res.status(404).json({ error: "??????????" });
      return;
    }
    coupon.pinned = Boolean(req.body?.pinned);
    coupon.sortOrder = topSortOrderFor(coupons, coupon.pinned, coupon.id);
    coupon.updatedAt = new Date().toISOString();
    await writeCoupons(coupons);
    res.json({ coupon: toAdminCoupon(coupon) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/admin/coupons/:id/move", requireAdmin, async (req, res, next) => {
  try {
    const coupons = sortCoupons(await readCoupons());
    const index = coupons.findIndex((item) => item.id === req.params.id);
    if (index === -1) {
      res.status(404).json({ error: "??????????" });
      return;
    }
    const direction = req.body?.direction === "down" ? 1 : -1;
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= coupons.length) {
      res.json({ coupon: toAdminCoupon(coupons[index]) });
      return;
    }
    if (Boolean(coupons[index].pinned) !== Boolean(coupons[nextIndex].pinned)) {
      res.json({ coupon: toAdminCoupon(coupons[index]) });
      return;
    }
    [coupons[index], coupons[nextIndex]] = [coupons[nextIndex], coupons[index]];
    renumberCouponOrders(coupons);
    coupons[index].updatedAt = new Date().toISOString();
    coupons[nextIndex].updatedAt = new Date().toISOString();
    await writeCoupons(coupons);
    res.json({ coupon: toAdminCoupon(coupons[nextIndex]) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/coupon-events", requireAdmin, async (_req, res, next) => {
  try {
    const events = await readJson(COUPON_EVENTS_FILE, []);
    res.json({ events: events.slice(0, 30) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/mood-events", requireAdmin, async (_req, res, next) => {
  try {
    const events = await readJson(MOOD_EVENTS_FILE, []);
    res.json({ events: events.slice(0, 30) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/content", requireAdmin, async (_req, res, next) => {
  try {
    const content = await readSiteContent();
    res.json({ content });
  } catch (error) {
    next(error);
  }
});

app.put("/api/admin/content", requireAdmin, async (req, res, next) => {
  try {
    const content = normalizeSiteContent(req.body?.content || req.body || {});
    await writeJson(SITE_CONTENT_FILE, content);
    res.json({ content });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/guestbook", requireAdmin, async (_req, res, next) => {
  try {
    const entries = await readGuestbook();
    res.json({ entries });
  } catch (error) {
    next(error);
  }
});

app.put("/api/admin/guestbook/:id", requireAdmin, async (req, res, next) => {
  try {
    const entries = await readGuestbook();
    const entry = entries.find((item) => item.id === req.params.id);
    if (!entry) {
      res.status(404).json({ error: "?????????" });
      return;
    }
    entry.reply = cleanText(req.body?.reply, "");
    entry.visible = req.body?.visible !== false;
    entry.repliedAt = entry.reply ? new Date().toISOString() : "";
    await writeGuestbook(entries);
    res.json({ entry });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/admin/guestbook/:id", requireAdmin, async (req, res, next) => {
  try {
    const entries = await readGuestbook();
    const nextEntries = entries.filter((entry) => entry.id !== req.params.id);
    if (nextEntries.length === entries.length) {
      res.status(404).json({ error: "?????????" });
      return;
    }
    await writeGuestbook(nextEntries);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/backup", requireAdmin, async (_req, res, next) => {
  try {
    const backup = await buildBackup();
    res.setHeader("Content-Disposition", `attachment; filename=love-universe-backup-${todayKey()}.json`);
    res.json(backup);
  } catch (error) {
    next(error);
  }
});

app.post("/api/admin/backup", requireAdmin, async (req, res, next) => {
  try {
    const result = await restoreBackup(req.body || {});
    res.json(result);
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/security", requireAdmin, async (_req, res, next) => {
  try {
    const config = await readAdminConfig();
    res.json({
      config: {
        hasPassword: Boolean(config.hash),
        updatedAt: config.updatedAt || ""
      }
    });
  } catch (error) {
    next(error);
  }
});

app.put("/api/admin/security", requireAdmin, async (req, res, next) => {
  try {
    const currentKey = String(req.body?.currentKey || "");
    const newKey = String(req.body?.newKey || "").trim();
    if (!(await verifyAdminKey(currentKey))) {
      res.status(400).json({ error: "??????????" });
      return;
    }
    if (newKey.length < 6) {
      res.status(400).json({ error: "??????? 6 ??" });
      return;
    }

    const nextConfig = createAdminConfig(newKey);
    await writeJson(ADMIN_CONFIG_FILE, nextConfig);
    res.json({
      config: {
        hasPassword: true,
        updatedAt: nextConfig.updatedAt
      }
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/admin/mail-config", requireAdmin, async (_req, res, next) => {
  try {
    const config = await readMailConfig();
    res.json({ config: publicMailConfig(config) });
  } catch (error) {
    next(error);
  }
});

app.put("/api/admin/mail-config", requireAdmin, async (req, res, next) => {
  try {
    const current = await readMailConfig();
    const incoming = req.body || {};
    const nextConfig = {
      provider: "qq",
      enabled: Boolean(incoming.enabled),
      smtpHost: "smtp.qq.com",
      smtpPort: 465,
      secure: true,
      smtpUser: cleanText(incoming.smtpUser, current.smtpUser || ""),
      smtpPass: cleanText(incoming.smtpPass, current.smtpPass || ""),
      from: cleanText(incoming.from, incoming.smtpUser || current.from || current.smtpUser || ""),
      to: cleanText(incoming.to, current.to || ""),
      updatedAt: new Date().toISOString()
    };
    await writeJson(MAIL_CONFIG_FILE, nextConfig);
    res.json({ config: publicMailConfig(nextConfig) });
  } catch (error) {
    next(error);
  }
});

app.use(express.static(ROOT));

app.use((error, _req, res, _next) => {
  const message = error instanceof multer.MulterError
    ? "?????????????"
    : error.message || "????????";
  res.status(400).json({ error: message });
});

function requireAdmin(req, res, next) {
  const token = getCookie(req, ADMIN_COOKIE);
  const expiresAt = token ? adminSessions.get(token) : 0;
  if (!token || !expiresAt || expiresAt < Date.now()) {
    if (token) adminSessions.delete(token);
    res.status(401).json({ error: "???????" });
    return;
  }
  adminSessions.set(token, Date.now() + SESSION_TTL_MS);
  next();
}

async function useCoupon(id, options) {
  const coupons = await readCoupons();
  const coupon = coupons.find((item) => item.id === id);
  if (!coupon) return { status: 404, error: "??????????" };

  const status = couponStatus(coupon);
  if (!status.usable) return { status: 400, error: status.reason };
  if (coupon.claimedQuantity <= 0) return { status: 400, error: "????????????" };

  const record = {
    id: crypto.randomUUID(),
    couponId: coupon.id,
    couponTitle: coupon.title,
    actor: options.actor,
    note: options.note,
    usedAt: new Date().toISOString()
  };

  coupon.claimedQuantity -= 1;
  coupon.useHistory.unshift(record);
  coupon.updatedAt = record.usedAt;
  await writeCoupons(coupons);
  await recordCouponEvent(record, coupon);
  return { coupon, record };
}

async function recordCouponEvent(record, coupon) {
  const events = await readJson(COUPON_EVENTS_FILE, []);
  const event = { ...record, emailStatus: "not_configured" };
  try {
    const sent = await sendCouponUseEmail(record, coupon);
    event.emailStatus = sent ? "sent" : "not_configured";
  } catch (error) {
    event.emailStatus = "failed";
    event.emailError = error.message;
  }
  events.unshift(event);
  await writeJson(COUPON_EVENTS_FILE, events.slice(0, 200));
}

async function recordSignalEvent({ moodKey, label, response, subject, lines }) {
  const record = {
    id: crypto.randomUUID(),
    moodKey: cleanText(moodKey, "signal"),
    label: cleanText(label, "????"),
    response: cleanText(response, ""),
    createdAt: new Date().toISOString()
  };
  const events = await readJson(MOOD_EVENTS_FILE, []);
  const event = { ...record, emailStatus: "not_configured" };
  try {
    const sent = await sendNotificationEmail({
      subject: cleanText(subject, signalEmailSubject(record.label)),
      lines: Array.isArray(lines) && lines.length
        ? lines
        : [signalEmailIntro(record.label), `???${formatDateTime(record.createdAt)}`, record.response].filter(Boolean)
    });
    event.emailStatus = sent ? "sent" : "not_configured";
  } catch (error) {
    event.emailStatus = "failed";
    event.emailError = error.message;
  }
  events.unshift(event);
  await writeJson(MOOD_EVENTS_FILE, events.slice(0, 300));
  return event;
}

function signalEmailSubject(label) {
  if (label === "????") return "????";
  if (label === "???") return "???????";
  if (label === "?????") return "????????";
  if (label === "???") return "??????????";
  return `????????${label}`;
}

function signalEmailIntro(label) {
  if (label === "????") return "???????????";
  if (label === "???") return "???????????";
  if (label === "?????") return "???????????";
  if (label === "???") return "?????????????";
  return `?????${label}`;
}

async function sendCouponUseEmail(record, coupon) {
  return sendNotificationEmail({
    subject: `????????${coupon.title}`,
    lines: [
      `????${coupon.title}`,
      `????${record.actor}`,
      `?????${formatDateTime(record.usedAt)}`,
      `???${record.note || "?"}`,
      `????????${availableQuantity(coupon)}`,
      `?????????${coupon.claimedQuantity}`
    ]
  });
}

async function sendNotificationEmail({ subject, lines }) {
  const saved = await readMailConfig();
  const host = saved.enabled ? saved.smtpHost : process.env.SMTP_HOST;
  const user = saved.enabled ? saved.smtpUser : process.env.SMTP_USER;
  const pass = saved.enabled ? saved.smtpPass : process.env.SMTP_PASS;
  const to = saved.enabled ? saved.to : process.env.ADMIN_EMAIL_TO;
  if (!host || !user || !pass || !to) return false;

  const port = Number(saved.enabled ? saved.smtpPort : (process.env.SMTP_PORT || 587));
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: saved.enabled ? Boolean(saved.secure) : port === 465,
    auth: { user, pass }
  });
  const from = saved.enabled ? (saved.from || user) : (process.env.SMTP_FROM || user);
  const body = lines.join("\n");
  await transporter.sendMail({
    from,
    to,
    subject,
    text: body,
    html: asciiOnlyHtml(lines),
    textEncoding: "base64",
    headers: {
      "MIME-Version": "1.0",
      "Content-Language": "zh-CN"
    }
  });
  return true;
}

function asciiOnlyHtml(lines) {
  const body = lines.map((line) => `<p>${toHtmlEntities(line)}</p>`).join("");
  return [
    "<!doctype html>",
    "<html>",
    "<head><meta charset=\"UTF-8\"></head>",
    "<body>",
    "<div style=\"font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Microsoft YaHei',sans-serif;line-height:1.8;color:#1f2933;\">",
    body,
    "</div>",
    "</body>",
    "</html>"
  ].join("");
}

function toHtmlEntities(value) {
  return String(value || "").replace(/[\s\S]/gu, (char) => {
    if (char === "\n") return "<br>";
    if (char === "&") return "&amp;";
    if (char === "<") return "&lt;";
    if (char === ">") return "&gt;";
    if (char === '"') return "&quot;";
    if (char === "'") return "&#039;";
    const code = char.codePointAt(0);
    if (code >= 32 && code <= 126) return char;
    return `&#x${code.toString(16)};`;
  });
}

function createCoupon(input, index = 0) {
  const now = new Date().toISOString();
  const coupon = {
    id: input.id || crypto.randomUUID(),
    title: cleanText(input.title, "?????"),
    text: cleanText(input.text, "?????????????"),
    totalQuantity: Math.max(0, Math.floor(Number(input.totalQuantity ?? input.total ?? 1))),
    claimedQuantity: Math.max(0, Math.floor(Number(input.claimedQuantity || 0))),
    pinned: Boolean(input.pinned),
    sortOrder: Number.isFinite(Number(input.sortOrder)) ? Number(input.sortOrder) : index * 10,
    effectiveDate: normalizeDate(input.effectiveDate),
    expiryDate: normalizeDate(input.expiryDate),
    useHistory: Array.isArray(input.useHistory) ? input.useHistory : [],
    createdAt: input.createdAt || now,
    updatedAt: input.updatedAt || now
  };
  ensureCouponBounds(coupon);
  return coupon;
}

function updateCoupon(coupon, input) {
  coupon.title = cleanText(input.title, coupon.title);
  coupon.text = cleanText(input.text, coupon.text);
  coupon.totalQuantity = Math.max(0, Math.floor(Number(input.totalQuantity ?? coupon.totalQuantity)));
  coupon.pinned = Boolean(input.pinned);
  coupon.effectiveDate = normalizeDate(input.effectiveDate);
  coupon.expiryDate = normalizeDate(input.expiryDate);
  coupon.updatedAt = new Date().toISOString();
  ensureCouponBounds(coupon);
}

function ensureCouponBounds(coupon) {
  const used = coupon.useHistory.length;
  const minTotal = used + coupon.claimedQuantity;
  if (coupon.totalQuantity < minTotal) coupon.totalQuantity = minTotal;
}

function toPublicCoupon(coupon) {
  const status = couponStatus(coupon);
  return {
    id: coupon.id,
    title: coupon.title,
    text: coupon.text,
    totalQuantity: coupon.totalQuantity,
    claimedQuantity: coupon.claimedQuantity,
    usedQuantity: coupon.useHistory.length,
    availableQuantity: availableQuantity(coupon),
    pinned: Boolean(coupon.pinned),
    sortOrder: Number.isFinite(Number(coupon.sortOrder)) ? Number(coupon.sortOrder) : 0,
    effectiveDate: coupon.effectiveDate,
    expiryDate: coupon.expiryDate,
    status,
    useHistory: coupon.useHistory.slice(0, 5)
  };
}

function toAdminCoupon(coupon) {
  return {
    ...toPublicCoupon(coupon),
    sortOrder: Number.isFinite(Number(coupon.sortOrder)) ? Number(coupon.sortOrder) : 0,
    createdAt: coupon.createdAt,
    updatedAt: coupon.updatedAt
  };
}

function couponStatus(coupon) {
  const today = todayKey();
  if (coupon.effectiveDate && coupon.effectiveDate > today) {
    return { usable: false, label: "???", reason: `??? ${coupon.effectiveDate} ???` };
  }
  if (coupon.expiryDate && coupon.expiryDate < today) {
    return { usable: false, label: "???", reason: "????????" };
  }
  return { usable: true, label: "???", reason: "" };
}

function availableQuantity(coupon) {
  return Math.max(0, coupon.totalQuantity - coupon.claimedQuantity - coupon.useHistory.length);
}

async function readPhotos() {
  return readJson(PHOTOS_FILE, []);
}

async function writePhotos(photos) {
  return writeJson(PHOTOS_FILE, photos);
}

async function readGuestbook() {
  const entries = await readJson(GUESTBOOK_FILE, []);
  return entries.map(normalizeGuestbookEntry).filter((entry) => entry.message);
}

async function writeGuestbook(entries) {
  return writeJson(GUESTBOOK_FILE, entries.map(normalizeGuestbookEntry).filter((entry) => entry.message).slice(0, 300));
}

async function readCoupons() {
  const coupons = await readJson(COUPONS_FILE, []);
  return sortCoupons(coupons.map((coupon, index) => createCoupon(coupon, index)));
}

async function writeCoupons(coupons) {
  return writeJson(COUPONS_FILE, renumberCouponOrders(sortCoupons(coupons)));
}

function sortCoupons(coupons) {
  return [...coupons].sort((a, b) => {
    if (Boolean(a.pinned) !== Boolean(b.pinned)) return a.pinned ? -1 : 1;
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return String(a.createdAt || "").localeCompare(String(b.createdAt || ""));
  });
}

function renumberCouponOrders(coupons) {
  coupons.forEach((coupon, index) => {
    coupon.sortOrder = index * 10;
  });
  return coupons;
}

function getAmapKey() {
  return cleanText(process.env.AMAP_WEATHER_KEY || process.env.GAODE_WEATHER_KEY || process.env.AMAP_KEY, "");
}

async function geocodeCityWithAmap(city, amapKey) {
  const params = new URLSearchParams({
    key: amapKey,
    address: cleanText(city, DEFAULT_CITY.name),
    output: "JSON"
  });
  const data = await fetchJson(`https://restapi.amap.com/v3/geocode/geo?${params}`, 8000);
  assertAmapOk(data, "????????");
  return (Array.isArray(data.geocodes) ? data.geocodes : [])
    .map((item) => normalizeAmapGeocode(item))
    .filter(Boolean);
}

async function reverseGeocodeWithAmap(latitude, longitude, amapKey) {
  const params = new URLSearchParams({
    key: amapKey,
    location: `${longitude},${latitude}`,
    extensions: "base",
    output: "JSON"
  });
  const data = await fetchJson(`https://restapi.amap.com/v3/geocode/regeo?${params}`, 8000);
  assertAmapOk(data, "?????????");
  const component = data.regeocode?.addressComponent || {};
  const adcode = normalizeAdcode(component.adcode);
  if (!adcode) return null;
  return {
    adcode,
    placeName: formatPlaceName({
      name: cleanText(component.district || component.city || component.province, DEFAULT_CITY.name),
      admin1: joinClean([component.province, component.city]),
      country: "??"
    })
  };
}

async function resolveAmapWeatherLocation({ amapKey, adcode, city, placeName, latitude, longitude }) {
  const directAdcode = normalizeAdcode(adcode);
  if (directAdcode) {
    return { adcode: directAdcode, placeName: cleanText(placeName, DEFAULT_CITY.name) };
  }

  if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
    const reversed = await reverseGeocodeWithAmap(latitude, longitude, amapKey).catch(() => null);
    if (reversed?.adcode) return reversed;
  }

  const cityText = cleanText(city || placeName, DEFAULT_CITY.name);
  const geocodes = await geocodeCityWithAmap(cityText, amapKey).catch(() => []);
  if (geocodes[0]?.adcode) {
    return { adcode: geocodes[0].adcode, placeName: formatPlaceName(geocodes[0]) };
  }

  const fallback = fallbackGeocode(cityText)[0] || DEFAULT_CITY;
  return { adcode: fallback.adcode, placeName: formatPlaceName(fallback) };
}

async function fetchAmapWeather(adcode, amapKey) {
  const params = new URLSearchParams({
    key: amapKey,
    city: adcode,
    extensions: "all",
    output: "JSON"
  });
  const data = await fetchJson(`https://restapi.amap.com/v3/weather/weatherInfo?${params}`, 10000);
  assertAmapOk(data, "????????");
  const forecast = Array.isArray(data.forecasts) ? data.forecasts[0] : null;
  if (!forecast || !Array.isArray(forecast.casts) || !forecast.casts.length) {
    throw new Error("?????????");
  }
  return transformAmapForecast(forecast);
}

function transformAmapForecast(forecast) {
  const daily = {
    time: [],
    weather_code: [],
    weather_text: [],
    wind: [],
    temperature_2m_max: [],
    temperature_2m_min: [],
    precipitation_probability_max: [],
    sunrise: [],
    sunset: []
  };

  forecast.casts.forEach((cast) => {
    const date = normalizeDate(cast.date) || dateKey(new Date());
    const weatherText = combineAmapWeather(cast);
    const dayTemp = normalizeTemperature(cast.daytemp_float ?? cast.daytemp, 24);
    const nightTemp = normalizeTemperature(cast.nighttemp_float ?? cast.nighttemp, dayTemp);
    daily.time.push(date);
    daily.weather_code.push(amapWeatherCode(weatherText));
    daily.weather_text.push(weatherText);
    daily.wind.push(combineAmapWind(cast));
    daily.temperature_2m_max.push(Math.max(dayTemp, nightTemp));
    daily.temperature_2m_min.push(Math.min(dayTemp, nightTemp));
    daily.precipitation_probability_max.push(amapRainChance(weatherText));
    daily.sunrise.push(`${date}T06:00`);
    daily.sunset.push(`${date}T18:30`);
  });

  return daily;
}

function normalizeAmapGeocode(item) {
  if (!item || typeof item !== "object") return null;
  const location = parseAmapLocation(item.location);
  const adcode = normalizeAdcode(item.adcode);
  if (!location || !adcode) return null;
  return {
    name: cleanText(item.district || item.city || item.formatted_address, DEFAULT_CITY.name),
    admin1: joinClean([item.province, item.city]),
    country: "??",
    latitude: location.latitude,
    longitude: location.longitude,
    adcode
  };
}

function parseAmapLocation(location) {
  const [longitude, latitude] = String(location || "").split(",").map(Number);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  return { latitude, longitude };
}

function assertAmapOk(data, message) {
  if (data?.status === "1") return;
  throw new Error(data?.info || message);
}

function combineAmapWeather(cast) {
  const day = cleanText(cast.dayweather, "");
  const night = cleanText(cast.nightweather, "");
  if (day && night && day !== night) return `${day}?${night}`;
  return day || night || "????";
}

function combineAmapWind(cast) {
  const day = cleanText(cast.daywind, "");
  const night = cleanText(cast.nightwind, "");
  const power = cleanText(cast.daypower || cast.nightpower, "");
  const wind = day && night && day !== night ? `${day}?${night}?` : day ? `${day}?` : night ? `${night}?` : "";
  return joinClean([wind, power ? `${power}?` : ""]);
}

function amapWeatherCode(text) {
  const value = String(text || "");
  if (value.includes("?")) return 95;
  if (value.includes("?") || value.includes("??")) return 71;
  if (value.includes("??") || value.includes("??")) return 65;
  if (value.includes("??")) return 63;
  if (value.includes("?")) return 61;
  if (value.includes("?") || value.includes("?") || value.includes("?") || value.includes("?")) return 45;
  if (value.includes("?")) return 3;
  if (value.includes("?")) return 2;
  if (value.includes("?")) return 0;
  return 3;
}

function amapRainChance(text) {
  const value = String(text || "");
  if (value.includes("?") || value.includes("??")) return 95;
  if (value.includes("??")) return 85;
  if (value.includes("??")) return 65;
  if (value.includes("?")) return 55;
  if (value.includes("?")) return 45;
  if (value.includes("?")) return 25;
  if (value.includes("?")) return 15;
  return 8;
}

function normalizeTemperature(value, fallback) {
  const number = Number(String(value ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(number) ? number : fallback;
}

function normalizeAdcode(value) {
  const text = String(value || "").trim();
  return /^\d{6}$/.test(text) ? text : "";
}

function formatPlaceName(place) {
  return joinClean([place?.name, place?.admin1, place?.country]) || DEFAULT_CITY.name;
}

function joinClean(values) {
  return values
    .flatMap((value) => Array.isArray(value) ? value : [value])
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .filter((value, index, list) => list.indexOf(value) === index)
    .join(" ? ");
}

function buildFallbackWeather() {
  const now = new Date();
  const daily = {
    time: [],
    weather_code: [],
    weather_text: [],
    wind: [],
    temperature_2m_max: [],
    temperature_2m_min: [],
    precipitation_probability_max: [],
    sunrise: [],
    sunset: []
  };
  const codes = [1, 2, 3, 61, 2, 0, 80];
  const rain = [20, 30, 35, 55, 25, 10, 45];
  for (let index = 0; index < 7; index += 1) {
    const date = new Date(now);
    date.setDate(now.getDate() + index);
    const key = dateKey(date);
    const base = 24 + (index % 3);
    daily.time.push(key);
    daily.weather_code.push(codes[index]);
    daily.weather_text.push(["??", "??", "?", "??", "??", "?", "??"][index]);
    daily.wind.push("??");
    daily.temperature_2m_max.push(base + 4);
    daily.temperature_2m_min.push(base - 3);
    daily.precipitation_probability_max.push(rain[index]);
    daily.sunrise.push(`${key}T05:05`);
    daily.sunset.push(`${key}T19:12`);
  }
  return daily;
}

function fallbackGeocode(city) {
  const text = String(city || "").trim().toLowerCase();
  if (!text) return [];
  if (text.includes("??") || text.includes("xinyi")) {
    return [{
      name: "???",
      admin1: "???",
      country: "??",
      latitude: 34.3686,
      longitude: 118.3545,
      adcode: "320381"
    }];
  }
  return [];
}

function topSortOrderFor(coupons, pinned, excludeId = "") {
  const sameGroup = coupons.filter((coupon) => Boolean(coupon.pinned) === Boolean(pinned) && coupon.id !== excludeId);
  const minOrder = sameGroup.reduce((min, coupon) => Math.min(min, Number(coupon.sortOrder) || 0), 0);
  return minOrder - 10;
}

async function readMailConfig() {
  const value = await readObjectJson(MAIL_CONFIG_FILE, {});
  return {
    provider: value.provider || "qq",
    enabled: Boolean(value.enabled),
    smtpHost: value.smtpHost || "smtp.qq.com",
    smtpPort: Number(value.smtpPort || 465),
    secure: value.secure !== false,
    smtpUser: value.smtpUser || "",
    smtpPass: value.smtpPass || "",
    from: value.from || value.smtpUser || "",
    to: value.to || "",
    updatedAt: value.updatedAt || ""
  };
}

function publicMailConfig(config) {
  return {
    provider: config.provider || "qq",
    enabled: Boolean(config.enabled),
    smtpHost: config.smtpHost || "smtp.qq.com",
    smtpPort: Number(config.smtpPort || 465),
    secure: config.secure !== false,
    smtpUser: config.smtpUser || "",
    hasPassword: Boolean(config.smtpPass),
    from: config.from || config.smtpUser || "",
    to: config.to || "",
    updatedAt: config.updatedAt || ""
  };
}

async function buildBackup() {
  return {
    version: 2,
    exportedAt: new Date().toISOString(),
    content: await readSiteContent(),
    coupons: await readJson(COUPONS_FILE, []),
    photos: await readPhotos(),
    guestbook: await readGuestbook(),
    couponEvents: await readJson(COUPON_EVENTS_FILE, []),
    moodEvents: await readJson(MOOD_EVENTS_FILE, []),
    mailConfig: publicMailConfig(await readMailConfig()),
    note: "?????????? QQ ??????"
  };
}

async function restoreBackup(payload) {
  const source = payload?.content || payload?.coupons || payload?.photos || payload?.guestbook
    ? payload
    : payload?.backup || {};
  const result = [];

  if (source.content) {
    const content = normalizeSiteContent(source.content);
    await writeJson(SITE_CONTENT_FILE, content);
    result.push("????");
  }
  if (Array.isArray(source.coupons)) {
    const coupons = source.coupons.map((coupon, index) => createCoupon(coupon, index));
    await writeCoupons(coupons);
    result.push("???");
  }
  if (Array.isArray(source.photos)) {
    await writePhotos(source.photos.map(normalizePhotoBackup).filter(Boolean));
    result.push("?????");
  }
  if (Array.isArray(source.guestbook)) {
    await writeGuestbook(source.guestbook);
    result.push("?????");
  }
  if (Array.isArray(source.couponEvents)) {
    await writeJson(COUPON_EVENTS_FILE, source.couponEvents.slice(0, 300));
    result.push("?????");
  }
  if (Array.isArray(source.moodEvents)) {
    await writeJson(MOOD_EVENTS_FILE, source.moodEvents.slice(0, 300));
    result.push("????");
  }

  return { ok: true, restored: result };
}

function normalizePhotoBackup(photo = {}) {
  const filename = cleanText(photo.filename, "");
  const src = cleanText(photo.src, filename ? `/uploads/photos/${filename}` : "");
  if (!src) return null;
  return {
    id: cleanText(photo.id, crypto.randomUUID()),
    title: cleanText(photo.title, "??"),
    date: cleanText(photo.date, ""),
    src,
    filename,
    createdAt: cleanText(photo.createdAt, new Date().toISOString()),
    updatedAt: cleanText(photo.updatedAt, new Date().toISOString())
  };
}

async function readSiteContent() {
  const value = await readObjectJson(SITE_CONTENT_FILE, DEFAULT_SITE_CONTENT);
  const content = normalizeSiteContent(value);
  await writeJson(SITE_CONTENT_FILE, content);
  return content;
}

function normalizeSiteContent(input = {}) {
  return {
    settings: normalizeSiteSettings(input.settings),
    timeline: normalizeArray(input.timeline, DEFAULT_SITE_CONTENT.timeline, normalizeTimelineItem),
    dateIdeas: normalizeArray(input.dateIdeas, DEFAULT_SITE_CONTENT.dateIdeas, normalizeDateIdea),
    ideaTools: normalizeArray(input.ideaTools, DEFAULT_SITE_CONTENT.ideaTools, normalizeIdeaTool),
    datePlans: normalizeArray(input.datePlans, DEFAULT_SITE_CONTENT.datePlans, normalizeDatePlan),
    foodOptions: normalizeArray(input.foodOptions, DEFAULT_SITE_CONTENT.foodOptions, normalizeFoodOption),
    giftList: normalizeArray(input.giftList, DEFAULT_SITE_CONTENT.giftList, normalizeGiftItem),
    dailyTools: normalizeDailyTools(input.dailyTools),
    places: normalizeArray(input.places, DEFAULT_SITE_CONTENT.places, normalizePlace),
    messageWall: normalizeArray(input.messageWall, DEFAULT_SITE_CONTENT.messageWall, normalizeMessage),
    letters: normalizeArray(input.letters, DEFAULT_SITE_CONTENT.letters, normalizeLetter)
  };
}

function normalizeSiteSettings(settings = {}) {
  const fallback = DEFAULT_SITE_CONTENT.settings;
  const passcodes = Array.isArray(settings.passcodes)
    ? settings.passcodes.map((item) => String(item || "").trim()).filter(Boolean)
    : fallback.passcodes;
  const guestNames = Array.isArray(settings.guestNames)
    ? settings.guestNames.map((item) => String(item || "").trim()).filter(Boolean)
    : fallback.guestNames;
  return {
    partnerName: cleanText(settings.partnerName, fallback.partnerName),
    yourName: cleanText(settings.yourName, fallback.yourName),
    heroLine: cleanText(settings.heroLine, fallback.heroLine),
    passcodes: passcodes.length ? passcodes : fallback.passcodes,
    startDate: normalizeDate(settings.startDate) || fallback.startDate,
    birthday: normalizeDate(settings.birthday) || fallback.birthday,
    nextMeet: normalizeDate(settings.nextMeet) || fallback.nextMeet,
    cityName: cleanText(settings.cityName, fallback.cityName),
    cityLatitude: normalizeCoordinate(settings.cityLatitude, fallback.cityLatitude, -90, 90),
    cityLongitude: normalizeCoordinate(settings.cityLongitude, fallback.cityLongitude, -180, 180),
    cityAdcode: normalizeAdcode(settings.cityAdcode) || fallback.cityAdcode,
    songUrl: String(settings.songUrl || "").trim(),
    guestNames: guestNames.length ? guestNames : fallback.guestNames
  };
}

function normalizeDailyTools(value = {}) {
  const fallback = DEFAULT_SITE_CONTENT.dailyTools;
  return {
    meetTitle: cleanText(value.meetTitle, fallback.meetTitle),
    meetDate: normalizeDate(value.meetDate) || fallback.meetDate,
    meetTime: normalizeTime(value.meetTime) || fallback.meetTime,
    meetChecklist: normalizeTextList(value.meetChecklist, fallback.meetChecklist),
    careCards: normalizeTextList(value.careCards, fallback.careCards),
    dailyTasks: normalizeTextList(value.dailyTasks, fallback.dailyTasks),
    periodDate: normalizeDate(value.periodDate) || "",
    periodCycleDays: Math.max(1, Math.min(90, Number(value.periodCycleDays) || fallback.periodCycleDays)),
    periodAvoid: normalizeTextList(value.periodAvoid || value.bodyCare, fallback.periodAvoid),
    periodWarm: normalizeTextList(value.periodWarm, fallback.periodWarm),
    periodMood: cleanText(value.periodMood, fallback.periodMood),
    feedingFoods: normalizeTextList(value.feedingFoods || value.feedingSuggestions, fallback.feedingFoods),
    feedingDrinks: normalizeTextList(value.feedingDrinks, fallback.feedingDrinks),
    feedingSnacks: normalizeTextList(value.feedingSnacks, fallback.feedingSnacks),
    feedingAvoid: normalizeTextList(value.feedingAvoid, fallback.feedingAvoid),
    tripPlace: cleanText(value.tripPlace, fallback.tripPlace),
    tripTime: cleanText(value.tripTime, fallback.tripTime),
    tripTransport: cleanText(value.tripTransport, fallback.tripTransport),
    tripHotel: cleanText(value.tripHotel, fallback.tripHotel),
    tripNotes: normalizeTextList(value.tripNotes || value.tripMemo, fallback.tripNotes)
  };
}

function normalizeTextList(value, fallback) {
  const source = Array.isArray(value) ? value : String(value || "").split(/[\n?,]/);
  const list = source.map((item) => String(item || "").trim()).filter(Boolean);
  return list.length ? list.slice(0, 80) : fallback;
}

function normalizeArray(input, fallback, mapper) {
  const source = Array.isArray(input) ? input : fallback;
  return source.map(mapper).filter(Boolean);
}

function normalizeTimelineItem(item = {}) {
  return {
    id: cleanText(item.id, crypto.randomUUID()),
    date: normalizeDate(item.date) || todayKey(),
    title: cleanText(item.title, "????"),
    text: cleanText(item.text, "????????")
  };
}

function normalizeDateIdea(item = {}) {
  const tags = Array.isArray(item.tags)
    ? item.tags.map((tag) => String(tag || "").trim()).filter(Boolean)
    : String(item.tags || "").split(/[?,]/).map((tag) => tag.trim()).filter(Boolean);
  return {
    id: cleanText(item.id, crypto.randomUUID()),
    title: cleanText(item.title, "??????"),
    time: cleanText(item.time, "??"),
    tags: tags.slice(0, 6),
    text: cleanText(item.text, "????????????")
  };
}

function normalizeIdeaTool(item = {}) {
  const items = Array.isArray(item.items)
    ? item.items.map((value) => String(value || "").trim()).filter(Boolean)
    : String(item.items || "").split(/[\n?,]/).map((value) => value.trim()).filter(Boolean);
  return {
    id: cleanText(item.id, crypto.randomUUID()),
    title: cleanText(item.title, "??????"),
    text: cleanText(item.text, "???????????????"),
    buttonLabel: cleanText(item.buttonLabel, "?????"),
    items: items.slice(0, 200)
  };
}

function normalizeDatePlan(item = {}) {
  const checklist = Array.isArray(item.checklist)
    ? item.checklist.map((value) => String(value || "").trim()).filter(Boolean)
    : String(item.checklist || "").split(/[\n?,]/).map((value) => value.trim()).filter(Boolean);
  return {
    id: cleanText(item.id, crypto.randomUUID()),
    title: cleanText(item.title, "??????"),
    date: normalizeDate(item.date) || todayKey(),
    time: cleanText(item.time, "??"),
    place: cleanText(item.place, "????"),
    budget: cleanText(item.budget, "??"),
    checklist: checklist.slice(0, 20),
    note: cleanText(item.note, "?????????")
  };
}

function normalizeFoodOption(item = {}) {
  const tags = Array.isArray(item.tags)
    ? item.tags.map((value) => String(value || "").trim()).filter(Boolean)
    : String(item.tags || "").split(/[?,]/).map((value) => value.trim()).filter(Boolean);
  return {
    id: cleanText(item.id, crypto.randomUUID()),
    name: cleanText(item.name, "????"),
    tags: tags.slice(0, 8),
    spicy: Boolean(item.spicy),
    warm: item.warm !== false,
    budget: ["low", "mid", "high"].includes(item.budget) ? item.budget : "mid",
    distance: ["near", "normal", "far"].includes(item.distance) ? item.distance : "normal"
  };
}

function normalizeGiftItem(item = {}) {
  return {
    id: cleanText(item.id, crypto.randomUUID()),
    title: cleanText(item.title, "??????"),
    category: cleanText(item.category, "??"),
    detail: cleanText(item.detail, "?????????"),
    priority: cleanText(item.priority, "?"),
    note: cleanText(item.note, "")
  };
}

function normalizeGuestbookEntry(item = {}) {
  return {
    id: cleanText(item.id, crypto.randomUUID()),
    name: cleanText(item.name, "?"),
    message: cleanText(item.message, ""),
    reply: cleanText(item.reply, ""),
    createdAt: cleanText(item.createdAt, new Date().toISOString()),
    repliedAt: cleanText(item.repliedAt, ""),
    visible: item.visible !== false
  };
}

function normalizePlace(item = {}) {
  return {
    id: cleanText(item.id, crypto.randomUUID()),
    name: cleanText(item.name, "????"),
    note: cleanText(item.note, "?????????"),
    x: normalizeCoordinate(item.x, 50, 4, 96),
    y: normalizeCoordinate(item.y, 50, 4, 96)
  };
}

function normalizeMessage(item = {}) {
  return {
    id: cleanText(item.id, crypto.randomUUID()),
    title: cleanText(item.title, "????"),
    text: cleanText(item.text, "??????????")
  };
}

function normalizeLetter(item = {}) {
  const unlockAfterDays = Math.max(0, Math.floor(Number(item.unlockAfterDays || 0)));
  return {
    id: cleanText(item.id, crypto.randomUUID()),
    title: cleanText(item.title, "?????"),
    openAt: normalizeDate(item.openAt) || dateAfterDays(unlockAfterDays),
    unlockAfterDays,
    body: cleanText(item.body, "?????????")
  };
}

function normalizeCoordinate(value, fallback, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Number(number.toFixed(4))));
}

async function readAdminConfig() {
  const config = await readObjectJson(ADMIN_CONFIG_FILE, {});
  if (config.hash && config.salt) return config;
  const legacyKey = config.adminKey || DEFAULT_ADMIN_KEY;
  const nextConfig = createAdminConfig(legacyKey);
  await writeJson(ADMIN_CONFIG_FILE, nextConfig);
  return nextConfig;
}

function createAdminConfig(secret) {
  const salt = crypto.randomBytes(16).toString("hex");
  return {
    algorithm: "scrypt",
    salt,
    hash: crypto.scryptSync(String(secret || DEFAULT_ADMIN_KEY), salt, 64).toString("hex"),
    updatedAt: new Date().toISOString()
  };
}

async function verifyAdminKey(secret) {
  const config = await readAdminConfig();
  const key = String(secret || "");
  if (!key || !config.hash || !config.salt) return false;
  const attempt = crypto.scryptSync(key, config.salt, 64);
  const expected = Buffer.from(config.hash, "hex");
  return expected.length === attempt.length && crypto.timingSafeEqual(expected, attempt);
}

async function readJson(file, fallback) {
  try {
    const raw = await fsp.readFile(file, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;
  const raw = fs.readFileSync(file, "utf8");
  raw.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const equals = trimmed.indexOf("=");
    if (equals <= 0) return;
    const key = trimmed.slice(0, equals).trim();
    const value = trimmed.slice(equals + 1).trim().replace(/^['"]|['"]$/g, "");
    if (key && process.env[key] === undefined) process.env[key] = value;
  });
}

async function fetchJson(url, timeoutMs) {
  if (typeof fetch !== "function") return fetchJsonWithHttps(url, timeoutMs);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "Accept": "application/json",
        "User-Agent": "love-universe-site/1.0"
      }
    });
    if (!response.ok) throw new Error(`???????${response.status}`);
    return response.json();
  } finally {
    clearTimeout(timer);
  }
}

function fetchJsonWithHttps(url, timeoutMs) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        "Accept": "application/json",
        "User-Agent": "love-universe-site/1.0"
      },
      timeout: timeoutMs
    }, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        body += chunk;
      });
      response.on("end", () => {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          reject(new Error(`???????${response.statusCode}`));
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    });
    req.on("timeout", () => {
      req.destroy(new Error("??????"));
    });
    req.on("error", reject);
  });
}

async function readObjectJson(file, fallback) {
  try {
    const raw = await fsp.readFile(file, "utf8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

async function writeJson(file, value) {
  const temp = `${file}.${process.pid}.tmp`;
  await fsp.writeFile(temp, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await fsp.rename(temp, file);
}

async function safeDelete(filename) {
  const target = path.resolve(UPLOAD_DIR, filename);
  const uploadRoot = `${UPLOAD_DIR}${path.sep}`;
  if (!target.startsWith(uploadRoot)) return;
  await fsp.unlink(target).catch(() => {});
}

function ensureJsonFile(file, value) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  }
}

function cleanText(value, fallback) {
  const text = String(value || "").trim();
  return text || fallback;
}

function normalizeDate(value) {
  const text = String(value || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : "";
}

function normalizeTime(value) {
  const text = String(value || "").trim();
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(text) ? text : "";
}

function todayKey() {
  return dateKey(new Date());
}

function dateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function dateAfterDays(days) {
  const date = new Date();
  date.setDate(date.getDate() + Math.max(0, Number(days) || 0));
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDateTime(value) {
  return new Date(value).toLocaleString("zh-CN", { hour12: false });
}

function getCookie(req, name) {
  const cookie = req.headers.cookie || "";
  const match = cookie.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : "";
}

app.listen(PORT, HOST, () => {
  console.log(`Love universe site running at http://${HOST}:${PORT}`);
});
