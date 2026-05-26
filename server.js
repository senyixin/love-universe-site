const crypto = require("node:crypto");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");
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
const MAIL_CONFIG_FILE = path.join(DATA_DIR, "mail-config.json");
const SITE_CONTENT_FILE = path.join(DATA_DIR, "site-content.json");
const ADMIN_CONFIG_FILE = path.join(DATA_DIR, "admin-config.json");
const ADMIN_COOKIE = "love_admin_session";
const DEFAULT_ADMIN_KEY = process.env.ADMIN_KEY || "only-you-1314520";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const adminSessions = new Map();

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
    songUrl: ""
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

app.use(express.json());
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
    const record = {
      id: crypto.randomUUID(),
      moodKey: cleanText(req.body?.moodKey, ""),
      label,
      response: responseText,
      createdAt: new Date().toISOString()
    };
    const events = await readJson(MOOD_EVENTS_FILE, []);
    const event = { ...record, emailStatus: "not_configured" };
    try {
      const sent = await sendNotificationEmail({
        subject: `??????${label}`,
        lines: [
          `???${label}`,
          `???${formatDateTime(record.createdAt)}`,
          responseText ? `?????${responseText}` : ""
        ].filter(Boolean)
      });
      event.emailStatus = sent ? "sent" : "not_configured";
    } catch (error) {
      event.emailStatus = "failed";
      event.emailError = error.message;
    }
    events.unshift(event);
    await writeJson(MOOD_EVENTS_FILE, events.slice(0, 200));
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
    effectiveDate: coupon.effectiveDate,
    expiryDate: coupon.expiryDate,
    status,
    useHistory: coupon.useHistory.slice(0, 5)
  };
}

function toAdminCoupon(coupon) {
  return {
    ...toPublicCoupon(coupon),
    sortOrder: coupon.sortOrder,
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
    songUrl: String(settings.songUrl || "").trim()
  };
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

function todayKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
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
