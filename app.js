const STORE_KEY = "love-universe-state-v1";

const dayKey = (date = new Date()) => {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const daysFromNow = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return dayKey(d);
};

const COUPLE_WISH_TEXTS = [
  "??????????",
  "??????????",
  "???????????",
  "?????????",
  "????????",
  "???????",
  "???????????",
  "??????",
  "??????",
  "???????",
  "????????",
  "???????",
  "??????????",
  "?????????",
  "????????",
  "???????????",
  "??????????",
  "??????????",
  "???????",
  "?????????",
  "??????????",
  "???????",
  "?????????",
  "????????",
  "??????",
  "????????",
  "????????????",
  "??????????",
  "???????",
  "????????",
  "?????",
  "???????????",
  "???????",
  "???????????",
  "??????",
  "????????",
  "?????????",
  "???????",
  "????????",
  "?????????",
  "??????????",
  "?????",
  "??????? vlog",
  "????????",
  "???????",
  "???????????",
  "?????????",
  "??????",
  "???????",
  "??????????",
  "??????",
  "?????????????",
  "???????????",
  "?????????",
  "?????????",
  "??????????",
  "???????",
  "???????",
  "????????",
  "????????????",
  "???????????",
  "???????????",
  "??????????",
  "?????",
  "?????????",
  "?????",
  "?????????",
  "???????????",
  "??????????",
  "???????????",
  "?????????",
  "??????????",
  "????????",
  "???????",
  "?????????",
  "????????",
  "???????????",
  "????????",
  "?????? 10 ???",
  "???????????",
  "????????????",
  "?????????????",
  "???????????",
  "???????????????",
  "??????????",
  "???????????",
  "??????????",
  "???????????",
  "??????????",
  "?????????????",
  "?????????",
  "??????",
  "????????????",
  "??????????",
  "?????????",
  "?????? 7 ?????",
  "?????????",
  "??????????",
  "????????????",
  "???? 100 ??????"
];

const DEFAULTS = {
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
    meetDate: daysFromNow(7),
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
  dialogLines: [
    { from: "me", text: "{?}???????????????" },
    { from: "her", text: "??????????" },
    { from: "me", text: "?????????????????????????" },
    { from: "me", text: "???????????????????????" },
    { from: "her", text: "????????" },
    { from: "me", text: "????????????????????????" }
  ],
  quotes: [
    "???????????????",
    "?????????????????????",
    "??????????????",
    "?????????????????????",
    "?????????????????????",
    "???????????????????",
    "???????????????"
  ],
  timeline: [
    { date: "2024-05-20", title: "???????", text: "???????????????????????" },
    { date: "2024-08-14", title: "?????????", text: "???????????????????????" },
    { date: "2025-02-14", title: "????????", text: "????????????????????" },
    { date: "2026-05-25", title: "??????", text: "????????????????" }
  ],
  photos: [
    { id: "rainy-cafe", title: "????", date: "?????????", src: "assets/photos/photo-rainy-cafe.webp" },
    { id: "travel-morning", title: "??????", date: "????????????", src: "assets/photos/photo-travel-morning.webp" },
    { id: "park-picnic", title: "????", date: "?????????????", src: "assets/photos/photo-park-picnic.webp" }
  ],
  moods: {
    happy: { label: "??", icon: "smile", response: "???????????????????????????????????????" },
    tired: { label: "??", icon: "cloud-rain", response: "?????????????????????????????????" },
    miss: { label: "??", icon: "heart", response: "?????????????????????????????" },
    angry: { label: "??", icon: "frown", response: "?????????????????????????????????" },
    sleepy: { label: "???", icon: "moon", response: "???????????????????????????????????" },
    hug: { label: "???", icon: "hand-heart", response: "?????????????????????????" }
  },
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
    { id: "plan-1", title: "??????", date: daysFromNow(6), time: "15:00", place: "?????????", budget: "200 ??", checklist: ["????", "?????", "?????"], note: "??????????" },
    { id: "plan-2", title: "???????", date: daysFromNow(12), time: "??", place: "??????", budget: "??", checklist: ["???", "?????", "?????"], note: "????????" }
  ],
  foodOptions: [
    { id: "food-1", name: "?????", tags: ["??", "??", "??"], spicy: false, warm: true, budget: "mid", distance: "near" },
    { id: "food-2", name: "???", tags: ["??", "??", "?????"], spicy: false, warm: true, budget: "high", distance: "normal" },
    { id: "food-3", name: "???", tags: ["??", "??", "??"], spicy: true, warm: true, budget: "mid", distance: "normal" },
    { id: "food-4", name: "????", tags: ["???", "??", "?"], spicy: false, warm: true, budget: "low", distance: "near" },
    { id: "food-5", name: "????", tags: ["??", "??", "???"], spicy: false, warm: true, budget: "mid", distance: "near" },
    { id: "food-6", name: "????", tags: ["??", "??", "???"], spicy: false, warm: false, budget: "mid", distance: "near" },
    { id: "food-7", name: "???", tags: ["??", "????", "???"], spicy: true, warm: true, budget: "low", distance: "near" },
    { id: "food-8", name: "???", tags: ["??", "??", "????"], spicy: false, warm: true, budget: "high", distance: "far" }
  ],
  giftList: [
    { id: "gift-1", title: "??????", category: "???", detail: "?????????????", priority: "?", note: "???????" },
    { id: "gift-2", title: "????????", category: "??", detail: "?????????????", priority: "?", note: "?????????????" },
    { id: "gift-3", title: "???????", category: "??", detail: "????????????????????????", priority: "?", note: "?????????" }
  ],
  wishes: COUPLE_WISH_TEXTS.map((text, index) => ({ id: `couple-100-${String(index + 1).padStart(3, "0")}`, text, done: false })),
  coupons: [
    { id: "coupon-1", title: "??????", text: "????????????????????" },
    { id: "coupon-2", title: "??????", text: "??????????????" },
    { id: "coupon-3", title: "?????", text: "???????????" },
    { id: "coupon-4", title: "?????", text: "????????????????" }
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
    { id: "letter-1", title: "??????", openAt: daysFromNow(0), unlockAfterDays: 0, body: "{?}?????????????????????????????????????" },
    { id: "letter-2", title: "?????", openAt: daysFromNow(3), unlockAfterDays: 3, body: "??????????????????????????????????????" },
    { id: "letter-3", title: "?????", openAt: daysFromNow(7), unlockAfterDays: 7, body: "??????????????????????????????" },
    { id: "letter-4", title: "???????", openAt: daysFromNow(14), unlockAfterDays: 14, body: "????????????????????????????????????" }
  ]
};

const state = loadState();
let chatIndex = 0;
let selectedMood = "";
let musicState = { audio: null, playing: false, timer: null, ctx: null };
let secretClicks = 0;
let typedSecret = "";
let photoPreviewUrl = "";
let adminEditingCouponId = "";
let albumExpanded = false;
let albumLoaded = false;
let selectedDateIdea = null;
let selectedFoodOption = null;
const ideaToolResults = {};
const expandedPanels = {
  idea: false,
  wishes: false,
  coupons: false
};
const adminEditors = {
  timeline: "",
  idea: "",
  ideaTool: "",
  datePlan: "",
  food: "",
  gift: "",
  place: "",
  message: "",
  letter: ""
};

function loadState() {
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
  } catch {
    saved = {};
  }

  return {
    unlocked: false,
    settings: { ...DEFAULTS.settings },
    serverPhotos: [],
    coupons: [],
    adminCoupons: [],
    adminEvents: [],
    mailConfig: null,
    securityConfig: null,
    timeline: DEFAULTS.timeline.map((item) => ({ ...item })),
    dateIdeas: DEFAULTS.dateIdeas.map((item) => ({ ...item, tags: [...item.tags] })),
    ideaTools: DEFAULTS.ideaTools.map((item) => ({ ...item, items: [...item.items] })),
    datePlans: DEFAULTS.datePlans.map((item) => ({ ...item, checklist: [...item.checklist] })),
    foodOptions: DEFAULTS.foodOptions.map((item) => ({ ...item, tags: [...item.tags] })),
    giftList: DEFAULTS.giftList.map((item) => ({ ...item })),
    dailyTools: cloneDailyTools(DEFAULTS.dailyTools),
    messageWall: DEFAULTS.messageWall.map((item) => ({ ...item })),
    letters: DEFAULTS.letters.map((item) => ({ ...item })),
    wishes: normalizeWishes(saved.wishes, saved.wishlistVersion),
    places: saved.places || DEFAULTS.places,
    guestbook: []
  };
}

function cloneDailyTools(tools) {
  return {
    ...tools,
    meetChecklist: [...tools.meetChecklist],
    careCards: [...tools.careCards],
    dailyTasks: [...tools.dailyTasks],
    periodAvoid: [...tools.periodAvoid],
    periodWarm: [...tools.periodWarm],
    feedingFoods: [...tools.feedingFoods],
    feedingDrinks: [...tools.feedingDrinks],
    feedingSnacks: [...tools.feedingSnacks],
    feedingAvoid: [...tools.feedingAvoid],
    tripNotes: [...tools.tripNotes]
  };
}

function normalizeWishes(savedWishes, version) {
  const defaults = DEFAULTS.wishes.map((wish) => ({ ...wish }));
  if (!Array.isArray(savedWishes) || !savedWishes.length) return defaults;

  const savedById = new Map(savedWishes.map((wish) => [wish.id, wish]));
  const mergedDefaults = defaults.map((wish) => ({
    ...wish,
    done: Boolean(savedById.get(wish.id)?.done)
  }));

  const defaultIds = new Set(defaults.map((wish) => wish.id));
  const custom = savedWishes
    .filter((wish) => !defaultIds.has(wish.id))
    .map((wish) => ({
      id: wish.id || `wish-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      text: wish.text,
      done: Boolean(wish.done)
    }))
    .filter((wish) => wish.text);

  if (version === 2 && savedWishes.length >= defaults.length) {
    return [...mergedDefaults, ...custom];
  }

  return [...mergedDefaults, ...custom];
}

function applyContent(content) {
  if (!content || typeof content !== "object") return;
  state.settings = {
    ...state.settings,
    ...(content.settings || {})
  };
  state.timeline = normalizeTimeline(content.timeline);
  state.dateIdeas = normalizeDateIdeas(content.dateIdeas);
  state.ideaTools = normalizeIdeaTools(content.ideaTools);
  state.datePlans = normalizeDatePlans(content.datePlans);
  state.foodOptions = normalizeFoodOptions(content.foodOptions);
  state.giftList = normalizeGiftList(content.giftList);
  state.dailyTools = normalizeDailyTools(content.dailyTools);
  state.places = normalizePlaces(content.places);
  state.messageWall = normalizeMessages(content.messageWall);
  state.letters = normalizeLetters(content.letters);
}

function normalizeDailyTools(value = {}) {
  const fallback = DEFAULTS.dailyTools;
  return {
    meetTitle: String(value.meetTitle || fallback.meetTitle),
    meetDate: normalizeDateInput(value.meetDate) || state.settings.nextMeet || fallback.meetDate,
    meetTime: normalizeTimeInput(value.meetTime) || fallback.meetTime,
    meetChecklist: normalizeTextList(value.meetChecklist, fallback.meetChecklist),
    careCards: normalizeTextList(value.careCards, fallback.careCards),
    dailyTasks: normalizeTextList(value.dailyTasks, fallback.dailyTasks),
    periodDate: normalizeDateInput(value.periodDate) || "",
    periodCycleDays: Math.max(1, Math.min(90, Number(value.periodCycleDays) || fallback.periodCycleDays)),
    periodAvoid: normalizeTextList(value.periodAvoid || value.bodyCare, fallback.periodAvoid),
    periodWarm: normalizeTextList(value.periodWarm, fallback.periodWarm),
    periodMood: String(value.periodMood || fallback.periodMood),
    feedingFoods: normalizeTextList(value.feedingFoods || value.feedingSuggestions, fallback.feedingFoods),
    feedingDrinks: normalizeTextList(value.feedingDrinks, fallback.feedingDrinks),
    feedingSnacks: normalizeTextList(value.feedingSnacks, fallback.feedingSnacks),
    feedingAvoid: normalizeTextList(value.feedingAvoid, fallback.feedingAvoid),
    tripPlace: String(value.tripPlace || fallback.tripPlace),
    tripTime: String(value.tripTime || fallback.tripTime),
    tripTransport: String(value.tripTransport || fallback.tripTransport),
    tripHotel: String(value.tripHotel || fallback.tripHotel),
    tripNotes: normalizeTextList(value.tripNotes || value.tripMemo, fallback.tripNotes)
  };
}

function normalizeTextList(value, fallback) {
  const source = Array.isArray(value) ? value : String(value || "").split(/[\n?,]/);
  const list = source.map((item) => String(item || "").trim()).filter(Boolean);
  return list.length ? list : [...fallback];
}

function normalizeTimeline(items) {
  const source = Array.isArray(items) ? items : DEFAULTS.timeline;
  return source.map((item) => ({
    id: item.id || `timeline-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    date: normalizeDateInput(item.date) || dayKey(),
    title: String(item.title || "????"),
    text: String(item.text || "????????")
  }));
}

function normalizeDateIdeas(items) {
  const source = Array.isArray(items) ? items : DEFAULTS.dateIdeas;
  return source.map((item) => ({
    id: item.id || `idea-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: String(item.title || "??????"),
    time: String(item.time || "??"),
    tags: Array.isArray(item.tags)
      ? item.tags.map((tag) => String(tag || "").trim()).filter(Boolean)
      : String(item.tags || "").split(/[?,]/).map((tag) => tag.trim()).filter(Boolean),
    text: String(item.text || "????????????")
  }));
}

function normalizeIdeaTools(items) {
  const source = Array.isArray(items) ? items : DEFAULTS.ideaTools;
  return source.map((item) => ({
    id: item.id || `idea-tool-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: String(item.title || "??????"),
    text: String(item.text || "???????????????"),
    buttonLabel: String(item.buttonLabel || "?????"),
    items: Array.isArray(item.items)
      ? item.items.map((value) => String(value || "").trim()).filter(Boolean)
      : String(item.items || "").split(/[\n?,]/).map((value) => value.trim()).filter(Boolean)
  })).filter((item) => item.items.length);
}

function normalizeDatePlans(items) {
  const source = Array.isArray(items) ? items : DEFAULTS.datePlans;
  return source.map((item) => ({
    id: item.id || `plan-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: String(item.title || "??????"),
    date: normalizeDateInput(item.date) || dayKey(),
    time: String(item.time || "??"),
    place: String(item.place || "????"),
    budget: String(item.budget || "??"),
    checklist: Array.isArray(item.checklist)
      ? item.checklist.map((value) => String(value || "").trim()).filter(Boolean)
      : String(item.checklist || "").split(/[\n?,]/).map((value) => value.trim()).filter(Boolean),
    note: String(item.note || "")
  }));
}

function normalizeFoodOptions(items) {
  const source = Array.isArray(items) ? items : DEFAULTS.foodOptions;
  return source.map((item) => ({
    id: item.id || `food-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: String(item.name || "????"),
    tags: Array.isArray(item.tags)
      ? item.tags.map((value) => String(value || "").trim()).filter(Boolean)
      : String(item.tags || "").split(/[?,]/).map((value) => value.trim()).filter(Boolean),
    spicy: Boolean(item.spicy),
    warm: item.warm !== false,
    budget: ["low", "mid", "high"].includes(item.budget) ? item.budget : "mid",
    distance: ["near", "normal", "far"].includes(item.distance) ? item.distance : "normal"
  }));
}

function normalizeGiftList(items) {
  const source = Array.isArray(items) ? items : DEFAULTS.giftList;
  return source.map((item) => ({
    id: item.id || `gift-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: String(item.title || "??????"),
    category: String(item.category || "??"),
    detail: String(item.detail || "?????????"),
    priority: String(item.priority || "?"),
    note: String(item.note || "")
  }));
}

function normalizeGuestbook(entries) {
  const source = Array.isArray(entries) ? entries : [];
  return source.map((entry) => ({
    id: entry.id || `guest-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: String(entry.name || "?"),
    message: String(entry.message || ""),
    reply: String(entry.reply || ""),
    createdAt: String(entry.createdAt || ""),
    repliedAt: String(entry.repliedAt || ""),
    visible: entry.visible !== false
  })).filter((entry) => entry.message);
}

function normalizePlaces(items) {
  const source = Array.isArray(items) ? items : DEFAULTS.places;
  return source.map((item) => ({
    id: item.id || `place-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: String(item.name || "????"),
    note: String(item.note || "?????????"),
    x: clampPercent(item.x, 50),
    y: clampPercent(item.y, 50)
  }));
}

function normalizeMessages(items) {
  const source = Array.isArray(items) ? items : DEFAULTS.messageWall;
  return source.map((item) => ({
    id: item.id || `message-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: String(item.title || "????"),
    text: String(item.text || "??????????")
  }));
}

function normalizeLetters(items) {
  const source = Array.isArray(items) ? items : DEFAULTS.letters;
  return source.map((item) => {
    const unlockAfterDays = Math.max(0, Math.floor(Number(item.unlockAfterDays || 0)));
    return {
      id: item.id || `letter-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: String(item.title || "?????"),
      openAt: normalizeDateInput(item.openAt) || daysFromNow(unlockAfterDays),
      unlockAfterDays,
      body: String(item.body || "?????????")
    };
  });
}

function normalizeDateInput(value) {
  const text = String(value || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : "";
}

function normalizeTimeInput(value) {
  const text = String(value || "").trim();
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(text) ? text : "";
}

function clampPercent(value, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(4, Math.min(96, Number(number.toFixed(1))));
}

function persist() {
  localStorage.setItem(STORE_KEY, JSON.stringify({
    wishes: state.wishes,
    wishlistVersion: 2,
    places: state.places
  }));
}

function $(selector, root = document) {
  return root.querySelector(selector);
}

function $all(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons({
      attrs: {
        width: 20,
        height: 20,
        "stroke-width": 2
      }
    });
  }
}

function personalize(text) {
  return String(text)
    .replaceAll("{?}", state.settings.partnerName || "?")
    .replaceAll("{?}", state.settings.yourName || "?");
}

function daysBetween(from, to = new Date()) {
  const start = new Date(`${from}T00:00:00`);
  const end = new Date(dayKey(to) + "T00:00:00");
  if (Number.isNaN(start.getTime())) return 1;
  return Math.max(1, Math.floor((end - start) / 86400000) + 1);
}

function daysUntil(dateString, annual = false) {
  if (!dateString) return null;
  const now = new Date(dayKey() + "T00:00:00");
  let target = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(target.getTime())) return null;
  if (annual) {
    target.setFullYear(now.getFullYear());
    if (target < now) target.setFullYear(now.getFullYear() + 1);
  }
  return Math.ceil((target - now) / 86400000);
}

function timeUntilText(dateString, timeString = "00:00") {
  const date = normalizeDateInput(dateString);
  if (!date) return "";
  const time = normalizeTimeInput(timeString) || "00:00";
  const target = new Date(`${date}T${time}:00`);
  if (Number.isNaN(target.getTime())) return "";
  const diff = target - new Date();
  if (diff <= 0) return "??????????";
  const hoursTotal = Math.ceil(diff / 3600000);
  const days = Math.floor(hoursTotal / 24);
  const hours = hoursTotal % 24;
  if (days <= 0) return `?? ${hours} ????`;
  return `?? ${days} ? ${hours} ????`;
}

function formatDate(dateString) {
  const d = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString("zh-CN", { month: "long", day: "numeric" });
}

function formatDateTime(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "????";
  return d.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}

async function init() {
  bindEntry();
  bindNavigation();
  bindDialogControls();
  bindWeather();
  bindAlbum();
  bindMood();
  bindDailyTools();
  bindPlans();
  bindPracticalTools();
  bindGuestbook();
  bindMap();
  bindLetters();
  bindMusic();
  bindEasterEgg();
  bindAdmin();
  await loadContent();
  renderAll();
  loadCoupons();
  loadGuestbook();

  if (state.unlocked) {
    unlock(false);
  }

  refreshIcons();
}

async function loadContent(admin = false) {
  try {
    const response = await fetch(admin ? "/api/admin/content" : "/api/content");
    if (response.status === 401) {
      showEntry();
      return false;
    }
    if (!response.ok) throw new Error("content");
    const data = await response.json();
    applyContent(data.content || {});
    return true;
  } catch {
    return false;
  }
}

function bindEntry() {
  const entryForm = $("#entryForm");
  const passcodeInput = $("#passcodeInput");
  entryForm.querySelector("button[type='submit']").addEventListener("pointerdown", tryStartEntryMusic);
  passcodeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") tryStartEntryMusic();
  });

  $("#entryForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = passcodeInput;
    const key = input.value;

    if (isPasscodeValid(key)) {
      state.unlocked = true;
      persist();
      await startMusic({ auto: true });
      unlock(true);
      input.value = "";
      return;
    }

    if (await tryAdminLogin(key)) {
      input.value = "";
      showAdmin(true);
      return;
    }

    const panel = $(".entry-panel");
    panel.classList.remove("is-wrong");
    void panel.offsetWidth;
    panel.classList.add("is-wrong");
    $("#entryMessage").textContent = "??????????????";
  });
}

function tryStartEntryMusic() {
  if (isPasscodeValid($("#passcodeInput").value)) {
    startMusic({ auto: true });
  }
}

async function tryAdminLogin(key) {
  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key })
    });
    const data = await response.json().catch(() => ({}));
    return Boolean(data.ok);
  } catch {
    return false;
  }
}

function isPasscodeValid(value) {
  const normalized = normalizePasscode(value);
  const passcodes = state.settings.passcodes || [];
  return passcodes.some((code) => normalizePasscode(code) === normalized);
}

function normalizePasscode(value) {
  return String(value || "").trim().replace(/\s+/g, "").toLowerCase();
}

function unlock(animated) {
  $("#adminApp").hidden = true;
  $("#app").hidden = false;
  $("#entry").classList.add("is-unlocked");
  if (!animated) {
    $("#entry").style.display = "none";
  } else {
    window.setTimeout(() => {
      $("#entry").style.display = "none";
    }, 280);
  }
  startMusic({ auto: true });
}

async function showAdmin(animated) {
  state.unlocked = false;
  persist();
  $("#app").hidden = true;
  $("#adminApp").hidden = false;
  $("#entry").classList.add("is-unlocked");
  if (!animated) {
    $("#entry").style.display = "none";
  } else {
    window.setTimeout(() => {
      $("#entry").style.display = "none";
    }, 280);
  }
  await Promise.all([loadAdminCoupons(), loadAdminEvents(), loadMailConfig(), loadAdminContent(), loadSecurityConfig(), loadServerPhotos(), loadGuestbook(true)]);
}

function showEntry() {
  $("#app").hidden = true;
  $("#adminApp").hidden = true;
  $("#entry").style.display = "grid";
  $("#entry").classList.remove("is-unlocked");
}

function bindNavigation() {
  $all("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = $(button.dataset.scrollTarget);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderAll() {
  renderPersonalText();
  renderCounters();
  renderDailyQuote();
  renderDailyTools();
  renderGuestNameOptions();
  renderTimeline();
  renderAlbum();
  renderMoods();
  renderDateIdea();
  renderIdeaTools();
  renderPracticalTools();
  renderWishes();
  renderCoupons();
  renderMap();
  renderMessages();
  renderGuestbook();
  renderLetters();
  fillSettingsForm();
  refreshIcons();
}

function renderDailyTools() {
  const tools = state.dailyTools || DEFAULTS.dailyTools;
  const pick = (list, salt = "") => list[Math.abs(hashCode(`${dayKey()}-${salt}-${list.join("|")}`)) % list.length] || "";
  const care = pick(tools.careCards, "care");
  const task = pick(tools.dailyTasks, "task");
  const food = pick(tools.feedingFoods, "food");
  const drink = pick(tools.feedingDrinks, "drink");
  const snack = pick(tools.feedingSnacks, "snack");
  const countdown = timeUntilText(tools.meetDate, tools.meetTime);
  const periodMeta = tools.periodDate
    ? `?? ${formatDate(tools.periodDate)} ? ?? ${tools.periodCycleDays} ?`
    : "????????????????";

  $("#careCard").innerHTML = dailyCardHtml("heart", "?????", care, "????????????????");
  $("#meetCountdownCard").innerHTML = dailyCardHtml(
    "calendar-heart",
    tools.meetTitle || "????",
    `${countdown || "???????????"}${dailyListHtml(tools.meetChecklist)}`,
    tools.meetDate ? `${tools.meetDate} ${tools.meetTime || ""}` : "",
    true
  );
  $("#dailyTaskCard").innerHTML = dailyCardHtml(
    "check-circle-2",
    "???????",
    `${escapeHtml(task)}<button class="daily-action-button" type="button" data-daily-signal="task" data-daily-text="${escapeHtml(task)}">??????</button>`,
    "?????????????",
    true
  );
  $("#periodCareCard").innerHTML = dailyCardHtml(
    "thermometer-sun",
    "??/??????",
    `${dailyListHtml(tools.periodAvoid, "??")}${dailyListHtml(tools.periodWarm, "??")}${escapeHtml(tools.periodMood)}`,
    periodMeta,
    true
  );
  $("#feedingCard").innerHTML = dailyCardHtml(
    "utensils",
    "??????",
    `${dailyListHtml([`??${food}`, `??${drink}`, `????${snack}`])}${dailyListHtml(tools.feedingAvoid, "??")}`,
    "?????????????????????",
    true
  );
  $("#tripMemoCard").innerHTML = dailyCardHtml(
    "route",
    "????/????",
    dailyListHtml([
      `???${tools.tripPlace}`,
      `???${tools.tripTime}`,
      `??/???${tools.tripTransport}`,
      `??/????${tools.tripHotel}`,
      ...tools.tripNotes
    ]),
    "???????????",
    true
  );
  refreshIcons();
}

function bindDailyTools() {
  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-daily-signal]");
    if (!button) return;
    const text = button.dataset.dailyText || "";
    button.disabled = true;
    button.textContent = "?????...";
    await sendSignal({
      moodKey: "daily-task",
      label: "???????",
      response: `?????????${text}`
    }, "???????????");
    button.textContent = "?????";
  });
}

function dailyCardHtml(icon, title, body, meta, rawBody = false) {
  return `
    <div class="daily-card-head"><i data-lucide="${icon}"></i><span>${escapeHtml(title)}</span></div>
    <strong>${rawBody ? body : escapeHtml(body)}</strong>
    <p>${escapeHtml(meta || "")}</p>
  `;
}

function dailyListHtml(list, label = "") {
  return `<span class="daily-list">${label ? `<em>${escapeHtml(label)}</em>` : ""}${normalizeTextList(list, []).map((item) => `<b>${escapeHtml(item)}</b>`).join("")}</span>`;
}

function renderGuestNameOptions() {
  const select = $("#guestNameSelect");
  if (!select) return;
  const names = normalizeTextList(state.settings.guestNames, [state.settings.partnerName || "?", state.settings.yourName || "?"]);
  select.innerHTML = names.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("");
}

function renderPersonalText() {
  $all("[data-partner-name]").forEach((node) => {
    node.textContent = state.settings.partnerName || "?";
  });
  $("#heroLine").textContent = personalize(state.settings.heroLine);
}

function renderCounters() {
  const together = daysBetween(state.settings.startDate);
  $("#heroDays").textContent = `? ${together} ?`;
  $("#anniversaryText").textContent = `????? ${together} ?`;

  const meet = daysUntil(state.settings.nextMeet);
  $("#meetText").textContent = meet === null ? "??????" : meet <= 0 ? "????" : `?? ${meet} ?`;

  const birthday = daysUntil(state.settings.birthday, true);
  $("#birthdayText").textContent = birthday === null ? "??????" : birthday === 0 ? "????" : `?? ${birthday} ?`;
}

function renderDailyQuote() {
  const index = Math.abs(hashCode(dayKey())) % DEFAULTS.quotes.length;
  $("#dailyQuote").textContent = personalize(DEFAULTS.quotes[index]);
}

function hashCode(value) {
  return String(value).split("").reduce((acc, char) => ((acc << 5) - acc) + char.charCodeAt(0), 0);
}

function bindDialogControls() {
  $("#nextLineButton").addEventListener("click", revealNextLine);
  $("#replayDialogButton").addEventListener("click", () => {
    chatIndex = 0;
    $("#chatList").innerHTML = "";
    revealNextLine();
  });
}

function revealNextLine() {
  const list = $("#chatList");
  if (chatIndex >= DEFAULTS.dialogLines.length) {
    chatIndex = 0;
    list.innerHTML = "";
  }
  const line = DEFAULTS.dialogLines[chatIndex];
  chatIndex += 1;

  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${line.from === "me" ? "me" : "her"}`;
  bubble.innerHTML = `
    <span class="chat-from">${line.from === "me" ? state.settings.yourName : state.settings.partnerName}</span>
    <span>${escapeHtml(personalize(line.text))}</span>
  `;
  list.appendChild(bubble);
  list.scrollTop = list.scrollHeight;
}

function bindWeather() {
  $("#locationButton").addEventListener("click", () => {
    if (!navigator.geolocation) {
      $("#weatherStatus").textContent = "????????????????????";
      return;
    }

    $("#weatherStatus").textContent = "??????????...";
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => loadWeather(coords.latitude, coords.longitude, "????"),
      () => {
        $("#weatherStatus").textContent = "??????????????";
        loadWeather(state.settings.cityLatitude, state.settings.cityLongitude, state.settings.cityName, {
          adcode: state.settings.cityAdcode
        });
      },
      { enableHighAccuracy: true, timeout: 9000, maximumAge: 900000 }
    );
  });

  $("#cityForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = $("#cityInput").value.trim();
    if (!city) return;
    $("#weatherStatus").textContent = `??? ${city}...`;
    try {
      const response = await fetch(`/api/geocode?city=${encodeURIComponent(city)}`);
      if (!response.ok) throw new Error("city");
      const data = await response.json();
      const match = data.results && data.results[0];
      if (!match) {
        $("#weatherStatus").textContent = "????????????????";
        return;
      }
      state.settings.cityName = [match.name, match.admin1, match.country].filter(Boolean).join(" ? ");
      state.settings.cityLatitude = match.latitude;
      state.settings.cityLongitude = match.longitude;
      state.settings.cityAdcode = match.adcode || "";
      loadWeather(match.latitude, match.longitude, state.settings.cityName, {
        adcode: match.adcode,
        city: city
      });
    } catch {
      $("#weatherStatus").textContent = "?????????????????";
    }
  });
}

async function loadWeather(latitude, longitude, placeName, options = {}) {
  $("#weatherStatus").textContent = `???? ${placeName || "????"} ???????...`;
  try {
    const params = new URLSearchParams({
      latitude: latitude ?? "",
      longitude: longitude ?? "",
      place: placeName || "????"
    });
    if (options.adcode) params.set("adcode", options.adcode);
    if (options.city || placeName) params.set("city", options.city || placeName || "");
    const response = await fetch(`/api/weather?${params}`);
    if (!response.ok) throw new Error("weather");
    const data = await response.json();
    renderWeather(data.daily, data.placeName || placeName, data.fallback);
  } catch {
    renderWeather(buildFallbackWeather(), placeName || state.settings.cityName, true);
  }
}

function renderWeather(daily, placeName, fallback = false) {
  if (!daily || !Array.isArray(daily.time) || !daily.time.length) {
    renderWeather(buildFallbackWeather(), placeName || state.settings.cityName, true);
    return;
  }
  const cards = daily.time.map((date, index) => {
    const code = daily.weather_code[index];
    const max = Math.round(daily.temperature_2m_max[index]);
    const min = Math.round(daily.temperature_2m_min[index]);
    const rain = daily.precipitation_probability_max[index] ?? 0;
    const info = weatherInfo(code, daily.weather_text?.[index]);
    const wind = daily.wind?.[index];
    return `
      <article class="weather-card">
        <div class="weather-day">
          <span>${index === 0 ? "??" : weekday(date)}</span>
          <span>${formatDate(date)}</span>
        </div>
        <div class="weather-icon"><i data-lucide="${info.icon}"></i></div>
        <strong class="weather-temp">${min}? / ${max}?</strong>
        <div class="weather-meta">
          <span>${escapeHtml(info.label)}</span>
          <span>?? ${rain}%</span>
          <span>${wind ? escapeHtml(wind) : `?? ${shortTime(daily.sunset[index])}`}</span>
        </div>
      </article>
    `;
  }).join("");

  $("#weatherGrid").innerHTML = cards;
  $("#weatherStatus").textContent = fallback
    ? `${placeName || "????"} ? ??????????????`
    : `${placeName || "????"} ? ?? ${daily.time.length} ?`;
  $("#weatherCare").innerHTML = fallback
    ? `<i data-lucide="umbrella"></i><span>?????????????????????????????</span>`
    : `<i data-lucide="${careIcon(daily)}"></i><span>${weatherCare(daily)}</span>`;
  refreshIcons();
}

function buildFallbackWeather() {
  const times = [];
  const codes = [];
  const maxTemps = [];
  const minTemps = [];
  const rains = [];
  const sunrise = [];
  const sunset = [];
  const now = new Date();
  for (let index = 0; index < 7; index += 1) {
    const date = new Date(now);
    date.setDate(now.getDate() + index);
    times.push(dayKey(date));
    codes.push([1, 2, 3, 61, 2, 0, 80][index]);
    const base = 24 + (index % 3);
    maxTemps.push(base + 4);
    minTemps.push(base - 3);
    rains.push([20, 30, 35, 55, 25, 10, 45][index]);
    sunrise.push(`${dayKey(date)}T05:05`);
    sunset.push(`${dayKey(date)}T19:12`);
  }
  return {
    time: times,
    weather_code: codes,
    temperature_2m_max: maxTemps,
    temperature_2m_min: minTemps,
    precipitation_probability_max: rains,
    sunrise,
    sunset
  };
}

function weatherInfo(code, text = "") {
  const label = String(text || "").trim();
  if (label) return { label, icon: weatherTextIcon(label) };
  if (code === 0) return { label: "?", icon: "sun" };
  if ([1, 2, 3].includes(code)) return { label: "??", icon: "cloud-sun" };
  if ([45, 48].includes(code)) return { label: "??", icon: "cloud-fog" };
  if ([51, 53, 55, 56, 57].includes(code)) return { label: "??", icon: "cloud-drizzle" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { label: "??", icon: "cloud-rain" };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: "??", icon: "snowflake" };
  if ([95, 96, 99].includes(code)) return { label: "??", icon: "cloud-lightning" };
  return { label: "????", icon: "cloud" };
}

function weatherTextIcon(text) {
  if (text.includes("?")) return "cloud-lightning";
  if (text.includes("?") || text.includes("??")) return "snowflake";
  if (text.includes("?")) return text.includes("??") ? "cloud-drizzle" : "cloud-rain";
  if (text.includes("?") || text.includes("?") || text.includes("?") || text.includes("?")) return "cloud-fog";
  if (text.includes("?")) return "cloud";
  if (text.includes("?")) return "cloud-sun";
  if (text.includes("?")) return "sun";
  return "cloud";
}

function weatherCare(daily) {
  const code = daily.weather_code[0];
  const max = daily.temperature_2m_max[0];
  const min = daily.temperature_2m_min[0];
  const rain = daily.precipitation_probability_max[0] ?? 0;
  const info = weatherInfo(code, daily.weather_text?.[0]);

  if (info.label === "??") return "??????????????????????????????";
  if (rain >= 55 || info.label.includes("?")) return "??????????????????????????";
  if (info.label.includes("?")) return "???????????????????????????";
  if (max >= 33) return "????????????????????????";
  if (min <= 8) return "???????????????????????????";
  if (info.label === "?") return "????????????????????????????";
  return "?????????????????????????????????";
}

function careIcon(daily) {
  const code = daily.weather_code[0];
  const text = daily.weather_text?.[0] || "";
  const rain = daily.precipitation_probability_max[0] ?? 0;
  if (text) return weatherTextIcon(text);
  if ([95, 96, 99].includes(code)) return "cloud-lightning";
  if (rain >= 55 || [61, 63, 65, 80, 81, 82].includes(code)) return "umbrella";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snowflake";
  if (daily.temperature_2m_max[0] >= 33) return "glass-water";
  if (daily.temperature_2m_min[0] <= 8) return "shirt";
  return "sparkles";
}

function weekday(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("zh-CN", { weekday: "short" });
}

function shortTime(dateTime) {
  const d = new Date(dateTime);
  if (Number.isNaN(d.getTime())) return "--:--";
  return d.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
}

function renderTimeline() {
  $("#timelineList").innerHTML = state.timeline.map((item) => `
    <article class="timeline-item">
      <span class="timeline-dot"><i data-lucide="sparkle"></i></span>
      <div class="timeline-content">
        <time>${item.date}</time>
        <h3>${escapeHtml(personalize(item.title))}</h3>
        <p>${escapeHtml(personalize(item.text))}</p>
      </div>
    </article>
  `).join("");
}

function bindAlbum() {
  $("#revealAlbumButton").addEventListener("click", async () => {
    albumExpanded = !albumExpanded;
    if (albumExpanded && !albumLoaded) await loadServerPhotos();
    renderAlbum();
  });
  $("#addPhotoButton").addEventListener("click", () => openPhotoEditor());
  $("#closePhotoButton").addEventListener("click", () => $("#photoDialog").close());
  $("#photoForm").addEventListener("submit", savePhotoFromForm);
  $("#photoForm").elements.photoImage.addEventListener("change", updatePhotoPreview);

  $("#albumGrid").addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-edit-photo]");
    if (editButton) {
      openPhotoEditor(editButton.dataset.editPhoto);
      return;
    }

    const removeButton = event.target.closest("[data-remove-photo]");
    if (!removeButton) return;
    deleteServerPhoto(removeButton.dataset.removePhoto);
  });
}

async function loadServerPhotos() {
  try {
    const response = await fetch("/api/photos");
    if (!response.ok) throw new Error("photos");
    const data = await response.json();
    state.serverPhotos = Array.isArray(data.photos) ? data.photos : [];
    albumLoaded = true;
    renderAlbum();
    renderAdminPhotos();
  } catch {
    state.serverPhotos = [];
    albumLoaded = false;
    renderAlbum("??????????????????? Node ??????????");
    renderAdminPhotos("??????????");
  }
}

function getAlbumPhotos() {
  const serverPhotos = state.serverPhotos.map((photo) => ({
    ...photo,
    custom: true,
    server: true
  }));
  const defaultPhotos = DEFAULTS.photos.map((photo) => ({
    ...photo,
    custom: false,
    server: false
  }));
  return [...serverPhotos, ...defaultPhotos];
}

function openPhotoEditor(photoId = "") {
  const form = $("#photoForm");
  const photo = photoId ? state.serverPhotos.find((item) => item.id === photoId) : null;
  form.photoId.value = photo?.id || "";
  form.elements.photoImage.value = "";
  form.elements.photoImage.required = !photo;
  form.photoTitle.value = photo?.title || "";
  form.photoDate.value = photo?.date || "";
  $("#photoDialogTitle").textContent = photo ? "???????" : "????";
  $("#photoMessage").textContent = photo
    ? "??????????????????????????????"
    : "???????????????????????????";
  showPhotoPreview(photo?.src || "");
  $("#photoDialog").showModal();
  refreshIcons();
}

async function savePhotoFromForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const id = form.photoId.value.trim();
  const title = form.photoTitle.value.trim();
  const date = form.photoDate.value.trim();
  const file = form.elements.photoImage.files[0];

  if (!title) {
    $("#photoMessage").textContent = "??????";
    return;
  }

  if (!id && !file) {
    $("#photoMessage").textContent = "???????????";
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("date", date || "???????????????????");

  const submit = form.querySelector("button[type='submit']");
  submit.disabled = true;
  $("#photoMessage").textContent = file ? "?????????????..." : "????????...";

  try {
    if (file) {
      const optimized = await optimizeImageFile(file);
      formData.append("photo", optimized.blob, optimized.filename);
      $("#photoMessage").textContent = `??? ${formatBytes(file.size)} ? ${formatBytes(optimized.blob.size)}?????...`;
    }
    const response = await fetch(id ? `/api/photos/${encodeURIComponent(id)}` : "/api/photos", {
      method: id ? "PUT" : "POST",
      body: formData
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "save");
    await loadServerPhotos();
    $("#photoDialog").close();
  } catch {
    $("#photoMessage").textContent = "???????? Node ?????????????? jpg/png/webp/gif?";
  } finally {
    submit.disabled = false;
  }
}

async function deleteServerPhoto(id) {
  try {
    const response = await fetch(`/api/photos/${encodeURIComponent(id)}`, { method: "DELETE" });
    if (!response.ok) throw new Error("delete");
    await loadServerPhotos();
  } catch {
    console.error("?????????");
  }
}

function updatePhotoPreview(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl);
  photoPreviewUrl = URL.createObjectURL(file);
  showPhotoPreview(photoPreviewUrl);
}

function showPhotoPreview(src) {
  const figure = $("#photoPreview");
  const img = $("#photoPreview img");
  if (!src) {
    figure.hidden = true;
    img.removeAttribute("src");
    return;
  }
  img.src = src;
  figure.hidden = false;
}

async function optimizeImageFile(file) {
  if (!file || file.type === "image/gif") {
    return { blob: file, filename: file?.name || "photo.gif" };
  }

  const bitmap = await createImageBitmap(file);
  const maxSide = 1600;
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { alpha: false });
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const blob = await new Promise((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", 0.78);
  });
  if (!blob || blob.size >= file.size) {
    return { blob: file, filename: file.name };
  }
  const baseName = file.name.replace(/\.[^.]+$/, "") || "photo";
  return { blob, filename: `${baseName}-optimized.jpg` };
}

function formatBytes(bytes) {
  const value = Number(bytes || 0);
  if (value >= 1024 * 1024) return `${(value / 1024 / 1024).toFixed(1)} MB`;
  if (value >= 1024) return `${Math.round(value / 1024)} KB`;
  return `${value} B`;
}

function renderAlbum(message = "") {
  $("#addPhotoButton").hidden = !albumExpanded;
  $("#revealAlbumButton").innerHTML = albumExpanded
    ? `<i data-lucide="chevrons-up"></i><span>??????</span>`
    : `<i data-lucide="images"></i><span>??????</span>`;
  if (!albumExpanded) {
    $("#albumGrid").innerHTML = `
      <article class="album-teaser">
        <i data-lucide="images"></i>
        <div>
          <h3>??????</h3>
          <p>?????????????????????</p>
        </div>
      </article>
    `;
    refreshIcons();
    return;
  }

  const photos = getAlbumPhotos();
  const notice = message ? `
    <article class="album-notice">
      <i data-lucide="server-off"></i>
      <span>${escapeHtml(message)}</span>
    </article>
  ` : "";
  $("#albumGrid").innerHTML = notice + photos.map((photo) => `
    <article class="photo-card">
      ${photo.server ? `
        <div class="photo-actions">
          <button class="icon-button" data-edit-photo="${photo.id}" type="button" aria-label="????"><i data-lucide="pencil"></i></button>
          <button class="icon-button" data-remove-photo="${photo.id}" type="button" aria-label="????"><i data-lucide="x"></i></button>
        </div>
        <span class="photo-badge">???</span>
      ` : ""}
      <img src="${photo.src}" alt="${escapeHtml(photo.title)}" loading="lazy">
      <div class="photo-info">
        <h3>${escapeHtml(photo.title)}</h3>
        <p>${escapeHtml(photo.date || "")}</p>
      </div>
    </article>
  `).join("");
  refreshIcons();
}

function renderAdminPhotos(message = "") {
  const list = $("#adminPhotoList");
  if (!list) return;
  if (message) {
    list.innerHTML = `<p class="admin-empty">${escapeHtml(message)}</p>`;
    return;
  }
  list.innerHTML = state.serverPhotos.length ? state.serverPhotos.map((photo) => `
    <article class="admin-photo-card">
      <img src="${photo.src}" alt="${escapeHtml(photo.title)}" loading="lazy">
      <div>
        <strong>${escapeHtml(photo.title)}</strong>
        <p>${escapeHtml(photo.date || "")}</p>
      </div>
      <div class="admin-content-actions">
        <button class="secondary-button" data-edit-photo="${photo.id}" type="button">
          <i data-lucide="pencil"></i>
          <span>??</span>
        </button>
        <button class="ghost-button danger" data-remove-photo="${photo.id}" type="button">
          <i data-lucide="trash-2"></i>
          <span>??</span>
        </button>
      </div>
    </article>
  `).join("") : `<p class="admin-empty">?????????????</p>`;
  refreshIcons();
}

function bindMood() {
  $("#moodGrid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-signal-action]");
    if (!button) return;
    const action = button.dataset.signalAction;
    if (action === "status") {
      openMoodDialog();
      return;
    }
    sendQuickSignal(action);
  });
  $("#closeMoodDialogButton").addEventListener("click", closeMoodDialog);
  $("#cancelMoodDialogButton").addEventListener("click", closeMoodDialog);
  $("#moodCallForm").addEventListener("submit", sendMoodCall);
}

function renderMoods() {
  $("#moodGrid").innerHTML = `
    <button class="mood-button" type="button" data-signal-action="hug">
      <i data-lucide="hand-heart"></i>
      <span>???</span>
    </button>
    <button class="mood-button" type="button" data-signal-action="miss">
      <i data-lucide="radar"></i>
      <span>????</span>
    </button>
    <button class="mood-button" type="button" data-signal-action="status">
      <i data-lucide="traffic-cone"></i>
      <span>?????</span>
    </button>
  `;
  refreshIcons();
}

function openMoodDialog() {
  $("#moodDialogMessage").textContent = "";
  $("#moodCallInput").value = "";
  $("#moodDialog").showModal();
  window.setTimeout(() => $("#moodCallInput").focus(), 40);
  refreshIcons();
}

function closeMoodDialog() {
  $("#moodDialog").close();
}

async function sendQuickSignal(action) {
  const configs = {
    hug: {
      moodKey: "hug",
      label: "???",
      response: "?????????????",
      ok: "???????????"
    },
    miss: {
      moodKey: "miss",
      label: "????",
      response: "???????",
      ok: "???????????????"
    }
  };
  const config = configs[action];
  if (!config) return;
  await sendSignal(config, config.ok);
}

async function sendMoodCall(event) {
  event.preventDefault();
  const input = $("#moodCallInput");
  const mood = $("#moodStatusSelect").value;
  const message = input.value.trim();
  if (!mood && !message) {
    $("#moodDialogMessage").textContent = "??????????????????";
    return;
  }
  $("#moodDialogMessage").textContent = "?????...";
  await sendSignal({
    moodKey: "status",
    label: "?????",
    response: [mood ? `???${mood}` : "", message ? `???${message}` : ""].filter(Boolean).join("?")
  }, "?????????????????????", true);
}

async function sendSignal(payload, okText, closeDialog = false) {
  try {
    const response = await fetch("/api/mood-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    if (response.status === 404) throw new Error("????????????????????");
    if (!response.ok || data.ok === false) throw new Error(data.error || "????");
    selectedMood = payload.moodKey;
    $("#moodResponse").innerHTML = `<i data-lucide="heart-handshake"></i><span>${escapeHtml(okText)}</span>`;
    if (closeDialog) closeMoodDialog();
    refreshIcons();
  } catch (error) {
    if (closeDialog) {
      $("#moodDialogMessage").textContent = error.message || "?????????????";
    } else {
      $("#moodResponse").innerHTML = `<i data-lucide="wifi-off"></i><span>${escapeHtml(error.message || "?????????????")}</span>`;
      refreshIcons();
    }
  }
}

function bindPlans() {
  $("#drawIdeaButton").addEventListener("click", () => renderDateIdea(true));
  $("#toggleIdeaDetailsButton").addEventListener("click", () => {
    expandedPanels.idea = !expandedPanels.idea;
    renderDateIdea(false, selectedDateIdea);
  });
  $("#toggleWishListButton").addEventListener("click", () => {
    expandedPanels.wishes = !expandedPanels.wishes;
    renderWishes();
  });
  $("#toggleCouponListButton").addEventListener("click", () => {
    expandedPanels.coupons = !expandedPanels.coupons;
    renderCoupons();
  });
  $("#ideaToolList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-idea-tool-draw]");
    if (!button) return;
    drawIdeaTool(button.dataset.ideaToolDraw);
  });
  $("#wishForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("#wishInput");
    const text = input.value.trim();
    if (!text) return;
    state.wishes.unshift({ id: `wish-${Date.now()}`, text, done: false });
    input.value = "";
    persist();
    renderWishes();
  });

  $("#wishList").addEventListener("change", (event) => {
    const input = event.target.closest("[data-wish-toggle]");
    if (!input) return;
    const wish = state.wishes.find((item) => item.id === input.dataset.wishToggle);
    if (wish) wish.done = input.checked;
    persist();
    renderWishes();
  });

  $("#wishList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-wish]");
    if (!button) return;
    state.wishes = state.wishes.filter((wish) => wish.id !== button.dataset.removeWish);
    persist();
    renderWishes();
  });

  $("#couponList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-coupon-action]");
    if (!button) return;
    runCouponAction(button.dataset.coupon, button.dataset.couponAction);
  });
}

function renderDateIdea(random = false, forcedIdea = null) {
  const ideas = state.dateIdeas.length ? state.dateIdeas : DEFAULTS.dateIdeas;
  const index = random ? Math.floor(Math.random() * ideas.length) : Math.abs(hashCode(dayKey())) % ideas.length;
  const idea = forcedIdea || ideas[index];
  selectedDateIdea = idea;
  $("#dateIdeaCard").innerHTML = `
    <h4>${idea.title}</h4>
    <p class="idea-summary">${expandedPanels.idea ? escapeHtml(idea.text) : "????????????????????"}</p>
    <div class="idea-tags">
      <span>${idea.time}</span>
      ${idea.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
    </div>
  `;
  $("#toggleIdeaDetailsButton").innerHTML = expandedPanels.idea
    ? `<i data-lucide="chevrons-up"></i><span>????</span>`
    : `<i data-lucide="chevrons-down"></i><span>????</span>`;
  refreshIcons();
}

function renderIdeaTools() {
  $("#ideaToolList").innerHTML = state.ideaTools.map((tool) => `
    <article class="idea-tool-card">
      <div>
        <h4>${escapeHtml(tool.title)}</h4>
        <p>${escapeHtml(tool.text)}</p>
        ${ideaToolResults[tool.id] ? `<strong class="idea-tool-result">${escapeHtml(ideaToolResults[tool.id])}</strong>` : ""}
      </div>
      <button class="secondary-button" type="button" data-idea-tool-draw="${tool.id}">
        <i data-lucide="dice-5"></i>
        <span>${escapeHtml(tool.buttonLabel)}</span>
      </button>
    </article>
  `).join("");
  refreshIcons();
}

function drawIdeaTool(id) {
  const tool = state.ideaTools.find((item) => item.id === id);
  if (!tool || !tool.items.length) return;
  const index = Math.floor(Math.random() * tool.items.length);
  ideaToolResults[id] = tool.items[index];
  renderIdeaTools();
}

function bindPracticalTools() {
  $("#drawFoodButton").addEventListener("click", drawFoodOption);
  ["foodNoSpicy", "foodWarmOnly", "foodBudgetFilter", "foodDistanceFilter"].forEach((id) => {
    $(`#${id}`).addEventListener("change", () => {
      selectedFoodOption = null;
      renderFoodRoulette();
    });
  });
}

function renderPracticalTools() {
  renderDatePlans();
  renderFoodRoulette();
  renderGiftList();
}

function renderDatePlans() {
  const plans = [...state.datePlans].sort((a, b) => String(a.date).localeCompare(String(b.date)));
  $("#datePlanList").innerHTML = plans.length ? plans.map((plan) => `
    <article class="practical-card">
      <div class="practical-card-head">
        <strong>${escapeHtml(plan.title)}</strong>
        <span>${formatDate(plan.date)} ? ${escapeHtml(plan.time)}</span>
      </div>
      <p>${escapeHtml(plan.place)} ? ?? ${escapeHtml(plan.budget)}</p>
      ${plan.checklist?.length ? `<ul>${plan.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
      ${plan.note ? `<em>${escapeHtml(plan.note)}</em>` : ""}
    </article>
  `).join("") : `<p class="folded-note">?????????????????</p>`;
}

function renderFoodRoulette() {
  const food = selectedFoodOption || filteredFoodOptions()[0];
  $("#foodResult").innerHTML = food
    ? `
      <strong>${escapeHtml(food.name)}</strong>
      <span>${food.tags.map((tag) => escapeHtml(tag)).join(" / ")}</span>
      <p>${budgetLabel(food.budget)} ? ${distanceLabel(food.distance)} ? ${food.spicy ? "???" : "????"} ? ${food.warm ? "??" : "??"}</p>
    `
    : `<p>???????????????????</p>`;
}

function drawFoodOption() {
  const options = filteredFoodOptions();
  if (!options.length) {
    selectedFoodOption = null;
    renderFoodRoulette();
    return;
  }
  selectedFoodOption = options[Math.floor(Math.random() * options.length)];
  renderFoodRoulette();
}

function filteredFoodOptions() {
  const noSpicy = $("#foodNoSpicy").checked;
  const warmOnly = $("#foodWarmOnly").checked;
  const budget = $("#foodBudgetFilter").value;
  const distance = $("#foodDistanceFilter").value;
  return state.foodOptions.filter((food) => {
    if (noSpicy && food.spicy) return false;
    if (warmOnly && !food.warm) return false;
    if (budget !== "any" && food.budget !== budget) return false;
    if (distance !== "any" && food.distance !== distance) return false;
    return true;
  });
}

function renderGiftList() {
  $("#giftList").innerHTML = state.giftList.length ? state.giftList.map((gift) => `
    <article class="practical-card gift-card">
      <div class="practical-card-head">
        <strong>${escapeHtml(gift.title)}</strong>
        <span>${escapeHtml(gift.category)} ? ??? ${escapeHtml(gift.priority)}</span>
      </div>
      <p>${escapeHtml(gift.detail)}</p>
      ${gift.note ? `<em>${escapeHtml(gift.note)}</em>` : ""}
    </article>
  `).join("") : `<p class="folded-note">????????????????????</p>`;
}

function budgetLabel(value) {
  return { low: "???", mid: "???", high: "???" }[value] || "????";
}

function distanceLabel(value) {
  return { near: "??", normal: "???", far: "?????" }[value] || "????";
}

function renderWishes() {
  const doneCount = state.wishes.filter((wish) => wish.done).length;
  const total = state.wishes.length || 1;
  $("#wishProgressText").textContent = `??? ${doneCount} / ${total}`;
  $("#wishProgressBar").style.width = `${Math.round((doneCount / total) * 100)}%`;

  $("#toggleWishListButton").innerHTML = expandedPanels.wishes
    ? `<i data-lucide="chevrons-up"></i><span>??????</span>`
    : `<i data-lucide="chevrons-down"></i><span>??????</span>`;
  if (!expandedPanels.wishes) {
    $("#wishList").innerHTML = `<p class="folded-note">??????????????????????</p>`;
    refreshIcons();
    return;
  }

  $("#wishList").innerHTML = state.wishes.map((wish) => `
    <label class="wish-item ${wish.done ? "done" : ""}">
      <input type="checkbox" data-wish-toggle="${wish.id}" ${wish.done ? "checked" : ""}>
      <span>${escapeHtml(wish.text)}</span>
      <button class="icon-button" type="button" data-remove-wish="${wish.id}" aria-label="????">
        <i data-lucide="trash-2"></i>
      </button>
    </label>
  `).join("");
  refreshIcons();
}

async function loadCoupons() {
  try {
    const response = await fetch("/api/coupons");
    if (!response.ok) throw new Error("coupons");
    const data = await response.json();
    state.coupons = normalizeCouponList(data.coupons);
  } catch {
    state.coupons = DEFAULTS.coupons.map((coupon, index) => ({
      ...coupon,
      totalQuantity: 1,
      claimedQuantity: 0,
      usedQuantity: 0,
      availableQuantity: 1,
      pinned: false,
      sortOrder: index * 10,
      effectiveDate: "",
      expiryDate: "",
      status: { usable: true, label: "????", reason: "" },
      useHistory: []
    }));
  }
  renderCoupons();
}

function normalizeCouponList(coupons) {
  const list = Array.isArray(coupons) ? coupons : [];
  return list.map((coupon, index) => ({
    ...coupon,
    totalQuantity: numberOr(coupon.totalQuantity, 0),
    claimedQuantity: numberOr(coupon.claimedQuantity, 0),
    usedQuantity: numberOr(coupon.usedQuantity, Array.isArray(coupon.useHistory) ? coupon.useHistory.length : 0),
    availableQuantity: numberOr(coupon.availableQuantity, 0),
    pinned: Boolean(coupon.pinned),
    sortOrder: numberOr(coupon.sortOrder, index * 10),
    status: coupon.status || { usable: true, label: "???", reason: "" },
    useHistory: Array.isArray(coupon.useHistory) ? coupon.useHistory : []
  }));
}

function numberOr(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

async function runCouponAction(id, action) {
  const button = $(`[data-coupon="${CSS.escape(id)}"][data-coupon-action="${CSS.escape(action)}"]`);
  if (button) button.disabled = true;
  try {
    const response = await fetch(`/api/coupons/${encodeURIComponent(id)}/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "????");
    await loadCoupons();
  } catch (error) {
    const coupon = state.coupons.find((item) => item.id === id);
    if (coupon) coupon.inlineMessage = error.message;
    renderCoupons();
  } finally {
    if (button) button.disabled = false;
  }
}

function renderCoupons() {
  $("#toggleCouponListButton").innerHTML = expandedPanels.coupons
    ? `<i data-lucide="chevrons-up"></i><span>?????</span>`
    : `<i data-lucide="chevrons-down"></i><span>?????</span>`;
  if (!expandedPanels.coupons) {
    const available = state.coupons.reduce((sum, coupon) => sum + Number(coupon.availableQuantity || 0), 0);
    const claimed = state.coupons.reduce((sum, coupon) => sum + Number(coupon.claimedQuantity || 0), 0);
    $("#couponList").innerHTML = `
      <article class="folded-note">
        ??? ${state.coupons.length} ???????? ${available} ???????? ${claimed} ??
      </article>
    `;
    refreshIcons();
    return;
  }

  $("#couponList").innerHTML = state.coupons.map((coupon) => {
    const active = Boolean(coupon.status?.usable);
    const canClaim = active && coupon.availableQuantity > 0;
    const canUse = active && coupon.claimedQuantity > 0;
    const latest = coupon.useHistory?.[0];
    return `
      <article class="coupon-item rich-coupon">
        <div>
          <div class="coupon-title-row">
            <h4>${escapeHtml(coupon.title)}</h4>
            <div class="coupon-title-badges">
              ${coupon.pinned ? `<span class="coupon-pin-badge">??</span>` : ""}
              <span class="coupon-status ${active ? "is-live" : "is-muted"}">${escapeHtml(coupon.status?.label || "???")}</span>
            </div>
          </div>
          <p>${escapeHtml(coupon.text)}</p>
          <div class="coupon-stats">
            <span>?? ${coupon.availableQuantity}</span>
            <span>?? ${coupon.claimedQuantity}</span>
            <span>?? ${coupon.usedQuantity}</span>
          </div>
          <div class="coupon-dates">
            <span>???${coupon.effectiveDate || "??"}</span>
            <span>???${coupon.expiryDate || "??"}</span>
          </div>
          ${latest ? `<p class="coupon-used-time">?????${formatDateTime(latest.usedAt)}</p>` : ""}
          ${coupon.inlineMessage ? `<p class="coupon-error">${escapeHtml(coupon.inlineMessage)}</p>` : ""}
        </div>
        <div class="coupon-actions">
          <button class="secondary-button" type="button" data-coupon="${coupon.id}" data-coupon-action="claim" ${canClaim ? "" : "disabled"}>
            <i data-lucide="ticket"></i>
            <span>??</span>
          </button>
          <button class="primary-button" type="button" data-coupon="${coupon.id}" data-coupon-action="use" ${canUse ? "" : "disabled"}>
            <i data-lucide="stamp"></i>
            <span>??</span>
          </button>
        </div>
      </article>
    `;
  }).join("");
  refreshIcons();
}

function bindAdmin() {
  $("#adminLogoutButton").addEventListener("click", async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    showEntry();
  });
  $("#refreshAdminCouponsButton").addEventListener("click", loadAdminCoupons);
  $("#refreshAdminEventsButton").addEventListener("click", loadAdminEvents);
  $("#refreshGuestbookButton").addEventListener("click", () => loadGuestbook(true));
  $("#refreshMailConfigButton").addEventListener("click", loadMailConfig);
  $("#mailConfigForm").addEventListener("submit", saveMailConfig);
  $("#securityForm").addEventListener("submit", saveSecurityConfig);
  $("#siteSettingsForm").addEventListener("submit", saveSiteSettings);
  $("#dailyToolsAdminForm").addEventListener("submit", saveDailyTools);
  $("#timelineAdminForm").addEventListener("submit", saveAdminTimeline);
  $("#ideaAdminForm").addEventListener("submit", saveAdminIdea);
  $("#ideaToolAdminForm").addEventListener("submit", saveAdminIdeaTool);
  $("#datePlanAdminForm").addEventListener("submit", saveAdminDatePlan);
  $("#foodAdminForm").addEventListener("submit", saveAdminFood);
  $("#giftAdminForm").addEventListener("submit", saveAdminGift);
  $("#placeAdminForm").addEventListener("submit", saveAdminPlace);
  $("#messageAdminForm").addEventListener("submit", saveAdminMessage);
  $("#letterAdminForm").addEventListener("submit", saveAdminLetter);
  $("#backupExportButton").addEventListener("click", exportBackup);
  $("#backupImportForm").addEventListener("submit", importBackup);
  $("#adminAddPhotoButton").addEventListener("click", () => openPhotoEditor());
  $("#resetTimelineFormButton").addEventListener("click", resetTimelineForm);
  $("#resetIdeaFormButton").addEventListener("click", resetIdeaForm);
  $("#resetIdeaToolFormButton").addEventListener("click", resetIdeaToolForm);
  $("#resetDatePlanFormButton").addEventListener("click", resetDatePlanForm);
  $("#resetFoodFormButton").addEventListener("click", resetFoodForm);
  $("#resetGiftFormButton").addEventListener("click", resetGiftForm);
  $("#resetPlaceFormButton").addEventListener("click", resetPlaceForm);
  $("#resetMessageFormButton").addEventListener("click", resetMessageForm);
  $("#resetLetterFormButton").addEventListener("click", resetLetterForm);
  $("#resetCouponFormButton").addEventListener("click", resetAdminCouponForm);
  $("#couponAdminForm").addEventListener("submit", saveAdminCoupon);
  $("#adminCouponList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-admin-coupon-action]");
    if (!button) return;
    runAdminCouponAction(button.dataset.adminCouponAction, button.dataset.adminCoupon);
  });
  $("#adminTimelineList").addEventListener("click", (event) => handleAdminContentAction(event, "timeline"));
  $("#adminIdeaList").addEventListener("click", (event) => handleAdminContentAction(event, "idea"));
  $("#adminIdeaToolList").addEventListener("click", (event) => handleAdminContentAction(event, "ideaTool"));
  $("#adminDatePlanList").addEventListener("click", (event) => handleAdminContentAction(event, "datePlan"));
  $("#adminFoodList").addEventListener("click", (event) => handleAdminContentAction(event, "food"));
  $("#adminGiftList").addEventListener("click", (event) => handleAdminContentAction(event, "gift"));
  $("#adminPlaceList").addEventListener("click", (event) => handleAdminContentAction(event, "place"));
  $("#adminMessageList").addEventListener("click", (event) => handleAdminContentAction(event, "message"));
  $("#adminLetterList").addEventListener("click", (event) => handleAdminContentAction(event, "letter"));
  $("#adminGuestbookList").addEventListener("click", handleAdminGuestbookAction);
  $("#adminPhotoList").addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-edit-photo]");
    if (editButton) {
      openPhotoEditor(editButton.dataset.editPhoto);
      return;
    }
    const removeButton = event.target.closest("[data-remove-photo]");
    if (removeButton) deleteServerPhoto(removeButton.dataset.removePhoto);
  });
}

async function loadAdminContent() {
  const loaded = await loadContent(true);
  if (loaded) {
    renderAll();
    renderAdminContent();
  }
}

async function loadSecurityConfig() {
  try {
    const response = await fetch("/api/admin/security");
    if (response.status === 401) {
      showEntry();
      return;
    }
    if (!response.ok) throw new Error("security");
    const data = await response.json();
    state.securityConfig = data.config || {};
    $("#securityMessage").textContent = state.securityConfig.updatedAt
      ? `?????${formatDateTime(state.securityConfig.updatedAt)}`
      : "?????????????????????";
  } catch {
    $("#securityMessage").textContent = "???????????????";
  }
}

async function saveSecurityConfig(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const currentKey = form.currentKey.value;
  const newKey = form.newKey.value.trim();
  const confirmKey = form.confirmKey.value.trim();
  if (newKey !== confirmKey) {
    $("#securityMessage").textContent = "??????????????";
    return;
  }

  $("#securityMessage").textContent = "????????...";
  try {
    const response = await fetch("/api/admin/security", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentKey, newKey })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "????");
    form.reset();
    state.securityConfig = data.config || {};
    $("#securityMessage").textContent = "???????????????????";
  } catch (error) {
    $("#securityMessage").textContent = error.message;
  }
}

async function saveSiteSettings(event) {
  event.preventDefault();
  const form = event.currentTarget;
  state.settings = {
    ...state.settings,
    partnerName: form.partnerName.value.trim() || DEFAULTS.settings.partnerName,
    yourName: form.yourName.value.trim() || DEFAULTS.settings.yourName,
    startDate: form.startDate.value || DEFAULTS.settings.startDate,
    birthday: form.birthday.value || "",
    nextMeet: form.nextMeet.value || "",
    heroLine: form.heroLine.value.trim() || DEFAULTS.settings.heroLine,
    cityName: form.cityName.value.trim() || DEFAULTS.settings.cityName,
    cityLatitude: Number(form.cityLatitude.value || DEFAULTS.settings.cityLatitude),
    cityLongitude: Number(form.cityLongitude.value || DEFAULTS.settings.cityLongitude),
    cityAdcode: form.cityAdcode.value.trim() || DEFAULTS.settings.cityAdcode,
    songUrl: form.songUrl.value.trim(),
    guestNames: normalizeTextList(form.guestNames.value, [form.partnerName.value.trim(), form.yourName.value.trim()]),
    passcodes: form.passcodes.value
      .split(/[?,]/)
      .map((item) => item.trim())
      .filter(Boolean)
  };
  if (!state.settings.passcodes.length) state.settings.passcodes = DEFAULTS.settings.passcodes;

  try {
    await saveAdminContent("#siteSettingsMessage", "???????????");
    fillSettingsForm();
  } catch (error) {
    $("#siteSettingsMessage").textContent = error.message;
  }
}

function renderAdminContent() {
  renderAdminTimeline();
  renderAdminIdeas();
  renderAdminIdeaTools();
  renderAdminDatePlans();
  renderAdminFoods();
  renderAdminGifts();
  renderAdminPlaces();
  renderAdminMessages();
  renderAdminLetters();
  fillDailyToolsForm();
}

function contentPayload() {
  return {
    settings: state.settings,
    timeline: state.timeline,
    dateIdeas: state.dateIdeas,
    ideaTools: state.ideaTools,
    datePlans: state.datePlans,
    foodOptions: state.foodOptions,
    giftList: state.giftList,
    dailyTools: state.dailyTools,
    places: state.places,
    messageWall: state.messageWall,
    letters: state.letters
  };
}

async function saveAdminContent(messageSelector, successText = "??????????????????") {
  if (messageSelector) $(messageSelector).textContent = "????????...";
  const response = await fetch("/api/admin/content", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: contentPayload() })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "????");
  applyContent(data.content || {});
  renderAll();
  renderAdminContent();
  if (messageSelector) $(messageSelector).textContent = successText;
}

function handleAdminContentAction(event, type) {
  const button = event.target.closest("[data-admin-content-action]");
  if (!button || button.dataset.adminContentType !== type) return;
  const id = button.dataset.adminContentId;
  const action = button.dataset.adminContentAction;
  if (action === "edit") {
    fillContentForm(type, id);
    return;
  }
  if (action === "delete") {
    deleteContentItem(type, id);
    return;
  }
  if (action === "move-up" || action === "move-down") {
    moveContentItem(type, id, action === "move-up" ? -1 : 1);
  }
}

function fillContentForm(type, id) {
  if (type === "timeline") {
    const item = state.timeline.find((entry) => entry.id === id);
    if (!item) return;
    adminEditors.timeline = id;
    const form = $("#timelineAdminForm");
    form.timelineId.value = id;
    form.date.value = item.date || "";
    form.title.value = item.title || "";
    form.text.value = item.text || "";
    $("#timelineAdminTitle").textContent = "????";
    $("#timelineAdminMessage").textContent = "";
    return;
  }

  if (type === "idea") {
    const item = state.dateIdeas.find((entry) => entry.id === id);
    if (!item) return;
    adminEditors.idea = id;
    const form = $("#ideaAdminForm");
    form.ideaId.value = id;
    form.title.value = item.title || "";
    form.time.value = item.time || "";
    form.tags.value = (item.tags || []).join(", ");
    form.text.value = item.text || "";
    $("#ideaAdminTitle").textContent = "??????";
    $("#ideaAdminMessage").textContent = "";
    return;
  }

  if (type === "ideaTool") {
    const item = state.ideaTools.find((entry) => entry.id === id);
    if (!item) return;
    adminEditors.ideaTool = id;
    const form = $("#ideaToolAdminForm");
    form.ideaToolId.value = id;
    form.title.value = item.title || "";
    form.buttonLabel.value = item.buttonLabel || "";
    form.text.value = item.text || "";
    form.items.value = (item.items || []).join("\n");
    $("#ideaToolAdminTitle").textContent = "??????";
    $("#ideaToolAdminMessage").textContent = "";
    return;
  }

  if (type === "datePlan") {
    const item = state.datePlans.find((entry) => entry.id === id);
    if (!item) return;
    adminEditors.datePlan = id;
    const form = $("#datePlanAdminForm");
    form.datePlanId.value = id;
    form.title.value = item.title || "";
    form.date.value = item.date || "";
    form.time.value = item.time || "";
    form.place.value = item.place || "";
    form.budget.value = item.budget || "";
    form.checklist.value = (item.checklist || []).join("\n");
    form.note.value = item.note || "";
    $("#datePlanAdminTitle").textContent = "??????";
    $("#datePlanAdminMessage").textContent = "";
    return;
  }

  if (type === "food") {
    const item = state.foodOptions.find((entry) => entry.id === id);
    if (!item) return;
    adminEditors.food = id;
    const form = $("#foodAdminForm");
    form.foodId.value = id;
    form.name.value = item.name || "";
    form.tags.value = (item.tags || []).join(", ");
    form.spicy.checked = Boolean(item.spicy);
    form.warm.checked = item.warm !== false;
    form.budget.value = item.budget || "mid";
    form.distance.value = item.distance || "normal";
    $("#foodAdminTitle").textContent = "????";
    $("#foodAdminMessage").textContent = "";
    return;
  }

  if (type === "gift") {
    const item = state.giftList.find((entry) => entry.id === id);
    if (!item) return;
    adminEditors.gift = id;
    const form = $("#giftAdminForm");
    form.giftId.value = id;
    form.title.value = item.title || "";
    form.category.value = item.category || "";
    form.priority.value = item.priority || "";
    form.detail.value = item.detail || "";
    form.note.value = item.note || "";
    $("#giftAdminTitle").textContent = "??????";
    $("#giftAdminMessage").textContent = "";
    return;
  }

  if (type === "place") {
    const item = state.places.find((entry) => entry.id === id);
    if (!item) return;
    adminEditors.place = id;
    const form = $("#placeAdminForm");
    form.placeId.value = id;
    form.name.value = item.name || "";
    form.note.value = item.note || "";
    form.x.value = item.x ?? "";
    form.y.value = item.y ?? "";
    $("#placeAdminTitle").textContent = "??????";
    $("#placeAdminMessage").textContent = "";
    return;
  }

  if (type === "message") {
    const item = state.messageWall.find((entry) => entry.id === id);
    if (!item) return;
    adminEditors.message = id;
    const form = $("#messageAdminForm");
    form.messageId.value = id;
    form.title.value = item.title || "";
    form.text.value = item.text || "";
    $("#messageAdminTitle").textContent = "????";
    $("#messageAdminMessage").textContent = "";
    return;
  }

  if (type === "letter") {
    const item = state.letters.find((entry) => entry.id === id);
    if (!item) return;
    adminEditors.letter = id;
    const form = $("#letterAdminForm");
    form.letterId.value = id;
    form.title.value = item.title || "";
    form.unlockDays.value = Math.max(0, daysUntil(item.openAt) || 0);
    form.body.value = item.body || "";
    $("#letterAdminTitle").textContent = "?????";
    $("#letterAdminMessage").textContent = "";
  }
}

async function deleteContentItem(type, id) {
  const configs = {
    timeline: { list: "timeline", label: "????", message: "#timelineAdminMessage" },
    idea: { list: "dateIdeas", label: "??????", message: "#ideaAdminMessage" },
    ideaTool: { list: "ideaTools", label: "??????", message: "#ideaToolAdminMessage" },
    datePlan: { list: "datePlans", label: "??????", message: "#datePlanAdminMessage" },
    food: { list: "foodOptions", label: "????", message: "#foodAdminMessage" },
    gift: { list: "giftList", label: "??????", message: "#giftAdminMessage" },
    place: { list: "places", label: "??????", message: "#placeAdminMessage" },
    message: { list: "messageWall", label: "????", message: "#messageAdminMessage" },
    letter: { list: "letters", label: "?????", message: "#letterAdminMessage" }
  };
  const config = configs[type];
  if (!config || !window.confirm(`??${config.label}?`)) return;
  state[config.list] = state[config.list].filter((item) => item.id !== id);
  try {
    await saveAdminContent(config.message, "???????");
    resetContentForm(type, false);
  } catch (error) {
    $(config.message).textContent = error.message;
  }
}

async function moveContentItem(type, id, direction) {
  const configs = {
    timeline: { list: "timeline", message: "#timelineAdminMessage" },
    datePlan: { list: "datePlans", message: "#datePlanAdminMessage" },
    gift: { list: "giftList", message: "#giftAdminMessage" },
    place: { list: "places", message: "#placeAdminMessage" },
    message: { list: "messageWall", message: "#messageAdminMessage" },
    letter: { list: "letters", message: "#letterAdminMessage" }
  };
  const config = configs[type];
  if (!config) return;
  const list = state[config.list];
  const index = list.findIndex((item) => item.id === id);
  const nextIndex = index + direction;
  if (index < 0 || nextIndex < 0 || nextIndex >= list.length) return;
  [list[index], list[nextIndex]] = [list[nextIndex], list[index]];
  try {
    await saveAdminContent(config.message, "??????????");
  } catch (error) {
    $(config.message).textContent = error.message;
  }
}

async function saveAdminTimeline(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const id = form.timelineId.value || `timeline-${Date.now()}`;
  const item = {
    id,
    date: form.date.value || dayKey(),
    title: form.title.value.trim(),
    text: form.text.value.trim()
  };
  upsertContentItem("timeline", item);
  try {
    await saveAdminContent("#timelineAdminMessage");
    resetTimelineForm(false);
  } catch (error) {
    $("#timelineAdminMessage").textContent = error.message;
  }
}

async function saveAdminIdea(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const id = form.ideaId.value || `idea-${Date.now()}`;
  const item = {
    id,
    title: form.title.value.trim(),
    time: form.time.value.trim(),
    tags: form.tags.value.split(/[?,]/).map((tag) => tag.trim()).filter(Boolean),
    text: form.text.value.trim()
  };
  upsertContentItem("idea", item);
  try {
    await saveAdminContent("#ideaAdminMessage");
    resetIdeaForm(false);
  } catch (error) {
    $("#ideaAdminMessage").textContent = error.message;
  }
}

async function saveAdminIdeaTool(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const id = form.ideaToolId.value || `idea-tool-${Date.now()}`;
  const item = {
    id,
    title: form.title.value.trim(),
    text: form.text.value.trim(),
    buttonLabel: form.buttonLabel.value.trim(),
    items: form.items.value.split(/[\n?,]/).map((value) => value.trim()).filter(Boolean)
  };
  upsertContentItem("ideaTool", item);
  try {
    await saveAdminContent("#ideaToolAdminMessage");
    resetIdeaToolForm(false);
  } catch (error) {
    $("#ideaToolAdminMessage").textContent = error.message;
  }
}

async function saveAdminDatePlan(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const id = form.datePlanId.value || `plan-${Date.now()}`;
  upsertContentItem("datePlan", {
    id,
    title: form.title.value.trim(),
    date: form.date.value || dayKey(),
    time: form.time.value.trim() || "??",
    place: form.place.value.trim() || "????",
    budget: form.budget.value.trim() || "??",
    checklist: form.checklist.value.split(/[\n?,]/).map((item) => item.trim()).filter(Boolean),
    note: form.note.value.trim()
  });
  try {
    await saveAdminContent("#datePlanAdminMessage");
    resetDatePlanForm(false);
  } catch (error) {
    $("#datePlanAdminMessage").textContent = error.message;
  }
}

async function saveAdminFood(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const id = form.foodId.value || `food-${Date.now()}`;
  upsertContentItem("food", {
    id,
    name: form.name.value.trim(),
    tags: form.tags.value.split(/[?,]/).map((item) => item.trim()).filter(Boolean),
    spicy: form.spicy.checked,
    warm: form.warm.checked,
    budget: form.budget.value,
    distance: form.distance.value
  });
  try {
    await saveAdminContent("#foodAdminMessage");
    resetFoodForm(false);
  } catch (error) {
    $("#foodAdminMessage").textContent = error.message;
  }
}

async function saveAdminGift(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const id = form.giftId.value || `gift-${Date.now()}`;
  upsertContentItem("gift", {
    id,
    title: form.title.value.trim(),
    category: form.category.value.trim(),
    detail: form.detail.value.trim(),
    priority: form.priority.value.trim() || "?",
    note: form.note.value.trim()
  });
  try {
    await saveAdminContent("#giftAdminMessage");
    resetGiftForm(false);
  } catch (error) {
    $("#giftAdminMessage").textContent = error.message;
  }
}

async function saveAdminPlace(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const id = form.placeId.value || `place-${Date.now()}`;
  const seed = Math.abs(hashCode(`${form.name.value}-${id}`));
  const item = {
    id,
    name: form.name.value.trim(),
    note: form.note.value.trim(),
    x: form.x.value ? clampPercent(form.x.value, 50) : 16 + (seed % 68),
    y: form.y.value ? clampPercent(form.y.value, 50) : 22 + ((seed >> 3) % 58)
  };
  upsertContentItem("place", item);
  try {
    await saveAdminContent("#placeAdminMessage");
    resetPlaceForm(false);
  } catch (error) {
    $("#placeAdminMessage").textContent = error.message;
  }
}

async function saveAdminMessage(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const id = form.messageId.value || `message-${Date.now()}`;
  const item = {
    id,
    title: form.title.value.trim(),
    text: form.text.value.trim()
  };
  upsertContentItem("message", item);
  try {
    await saveAdminContent("#messageAdminMessage");
    resetMessageForm(false);
  } catch (error) {
    $("#messageAdminMessage").textContent = error.message;
  }
}

async function saveAdminLetter(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const days = Math.max(0, Math.floor(Number(form.unlockDays.value || 0)));
  const id = form.letterId.value || `letter-${Date.now()}`;
  const item = {
    id,
    title: form.title.value.trim(),
    openAt: daysFromNow(days),
    unlockAfterDays: days,
    body: form.body.value.trim()
  };
  upsertContentItem("letter", item);
  try {
    await saveAdminContent("#letterAdminMessage");
    resetLetterForm(false);
  } catch (error) {
    $("#letterAdminMessage").textContent = error.message;
  }
}

function upsertContentItem(type, item) {
  const configs = {
    timeline: "timeline",
    idea: "dateIdeas",
    ideaTool: "ideaTools",
    datePlan: "datePlans",
    food: "foodOptions",
    gift: "giftList",
    place: "places",
    message: "messageWall",
    letter: "letters"
  };
  const listName = configs[type];
  const list = state[listName];
  const index = list.findIndex((entry) => entry.id === item.id);
  if (index === -1) {
    list.unshift(item);
  } else {
    list[index] = item;
  }
}

function resetContentForm(type, clearMessage = true) {
  if (type === "timeline") return resetTimelineForm(clearMessage);
  if (type === "idea") return resetIdeaForm(clearMessage);
  if (type === "ideaTool") return resetIdeaToolForm(clearMessage);
  if (type === "datePlan") return resetDatePlanForm(clearMessage);
  if (type === "food") return resetFoodForm(clearMessage);
  if (type === "gift") return resetGiftForm(clearMessage);
  if (type === "place") return resetPlaceForm(clearMessage);
  if (type === "message") return resetMessageForm(clearMessage);
  return resetLetterForm(clearMessage);
}

function resetTimelineForm(clearMessage = true) {
  adminEditors.timeline = "";
  const form = $("#timelineAdminForm");
  form.reset();
  form.timelineId.value = "";
  form.date.value = dayKey();
  $("#timelineAdminTitle").textContent = "????";
  if (clearMessage) $("#timelineAdminMessage").textContent = "";
}

function resetIdeaForm(clearMessage = true) {
  adminEditors.idea = "";
  const form = $("#ideaAdminForm");
  form.reset();
  form.ideaId.value = "";
  $("#ideaAdminTitle").textContent = "??????";
  if (clearMessage) $("#ideaAdminMessage").textContent = "";
}

function resetIdeaToolForm(clearMessage = true) {
  adminEditors.ideaTool = "";
  const form = $("#ideaToolAdminForm");
  form.reset();
  form.ideaToolId.value = "";
  $("#ideaToolAdminTitle").textContent = "??????";
  if (clearMessage) $("#ideaToolAdminMessage").textContent = "";
}

function resetDatePlanForm(clearMessage = true) {
  adminEditors.datePlan = "";
  const form = $("#datePlanAdminForm");
  form.reset();
  form.datePlanId.value = "";
  form.date.value = dayKey();
  $("#datePlanAdminTitle").textContent = "??????";
  if (clearMessage) $("#datePlanAdminMessage").textContent = "";
}

function resetFoodForm(clearMessage = true) {
  adminEditors.food = "";
  const form = $("#foodAdminForm");
  form.reset();
  form.foodId.value = "";
  form.warm.checked = true;
  form.budget.value = "mid";
  form.distance.value = "normal";
  $("#foodAdminTitle").textContent = "????";
  if (clearMessage) $("#foodAdminMessage").textContent = "";
}

function resetGiftForm(clearMessage = true) {
  adminEditors.gift = "";
  const form = $("#giftAdminForm");
  form.reset();
  form.giftId.value = "";
  form.priority.value = "?";
  $("#giftAdminTitle").textContent = "??????";
  if (clearMessage) $("#giftAdminMessage").textContent = "";
}

function resetPlaceForm(clearMessage = true) {
  adminEditors.place = "";
  const form = $("#placeAdminForm");
  form.reset();
  form.placeId.value = "";
  $("#placeAdminTitle").textContent = "??????";
  if (clearMessage) $("#placeAdminMessage").textContent = "";
}

function resetMessageForm(clearMessage = true) {
  adminEditors.message = "";
  const form = $("#messageAdminForm");
  form.reset();
  form.messageId.value = "";
  $("#messageAdminTitle").textContent = "????";
  if (clearMessage) $("#messageAdminMessage").textContent = "";
}

function resetLetterForm(clearMessage = true) {
  adminEditors.letter = "";
  const form = $("#letterAdminForm");
  form.reset();
  form.letterId.value = "";
  form.unlockDays.value = 0;
  $("#letterAdminTitle").textContent = "?????";
  if (clearMessage) $("#letterAdminMessage").textContent = "";
}

function renderAdminTimeline() {
  $("#adminTimelineList").innerHTML = state.timeline.length ? state.timeline.map((item, index, list) => `
    <article class="admin-content-card">
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.date)}</span>
        <p>${escapeHtml(item.text)}</p>
      </div>
      ${adminContentButtons("timeline", item.id, index, list.length, true)}
    </article>
  `).join("") : `<p class="admin-empty">??????</p>`;
  refreshIcons();
}

function renderAdminIdeas() {
  $("#adminIdeaList").innerHTML = state.dateIdeas.length ? state.dateIdeas.map((item) => `
    <article class="admin-content-card">
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.time)} ? ${(item.tags || []).map(escapeHtml).join(" / ")}</span>
        <p>${escapeHtml(item.text)}</p>
      </div>
      ${adminContentButtons("idea", item.id)}
    </article>
  `).join("") : `<p class="admin-empty">????????</p>`;
  refreshIcons();
}

function renderAdminIdeaTools() {
  $("#adminIdeaToolList").innerHTML = state.ideaTools.length ? state.ideaTools.map((item) => `
    <article class="admin-content-card">
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.buttonLabel)} ? ${(item.items || []).length} ???</span>
        <p>${escapeHtml(item.text)}</p>
      </div>
      ${adminContentButtons("ideaTool", item.id)}
    </article>
  `).join("") : `<p class="admin-empty">????????</p>`;
  refreshIcons();
}

function renderAdminDatePlans() {
  $("#adminDatePlanList").innerHTML = state.datePlans.length ? state.datePlans.map((item, index, list) => `
    <article class="admin-content-card">
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.date)} ? ${escapeHtml(item.time)} ? ${escapeHtml(item.place)}</span>
        <p>${escapeHtml(item.note || item.budget)}</p>
      </div>
      ${adminContentButtons("datePlan", item.id, index, list.length, true)}
    </article>
  `).join("") : `<p class="admin-empty">????????</p>`;
  refreshIcons();
}

function renderAdminFoods() {
  $("#adminFoodList").innerHTML = state.foodOptions.length ? state.foodOptions.map((item) => `
    <article class="admin-content-card">
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <span>${budgetLabel(item.budget)} ? ${distanceLabel(item.distance)} ? ${item.spicy ? "???" : "??"} ? ${item.warm ? "??" : "??"}</span>
        <p>${(item.tags || []).map(escapeHtml).join(" / ")}</p>
      </div>
      ${adminContentButtons("food", item.id)}
    </article>
  `).join("") : `<p class="admin-empty">??????</p>`;
  refreshIcons();
}

function renderAdminGifts() {
  $("#adminGiftList").innerHTML = state.giftList.length ? state.giftList.map((item, index, list) => `
    <article class="admin-content-card">
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.category)} ? ??? ${escapeHtml(item.priority)}</span>
        <p>${escapeHtml(item.detail)}</p>
      </div>
      ${adminContentButtons("gift", item.id, index, list.length, true)}
    </article>
  `).join("") : `<p class="admin-empty">????????</p>`;
  refreshIcons();
}

function renderAdminPlaces() {
  $("#adminPlaceList").innerHTML = state.places.length ? state.places.map((item, index, list) => `
    <article class="admin-content-card">
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <span>?? ${item.x}% / ${item.y}%</span>
        <p>${escapeHtml(item.note)}</p>
      </div>
      ${adminContentButtons("place", item.id, index, list.length, true)}
    </article>
  `).join("") : `<p class="admin-empty">????????</p>`;
  refreshIcons();
}

function renderAdminMessages() {
  $("#adminMessageList").innerHTML = state.messageWall.length ? state.messageWall.map((item, index, list) => `
    <article class="admin-content-card">
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.text)}</p>
      </div>
      ${adminContentButtons("message", item.id, index, list.length, true)}
    </article>
  `).join("") : `<p class="admin-empty">??????</p>`;
  refreshIcons();
}

function renderAdminLetters() {
  $("#adminLetterList").innerHTML = state.letters.length ? state.letters.map((item, index, list) => {
    const diff = Math.max(0, daysUntil(item.openAt) || 0);
    return `
      <article class="admin-content-card">
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <span>${diff > 0 ? `?? ${diff} ???` : "?????"} ? ${escapeHtml(item.openAt)}</span>
          <p>${escapeHtml(item.body)}</p>
        </div>
        ${adminContentButtons("letter", item.id, index, list.length, true)}
      </article>
    `;
  }).join("") : `<p class="admin-empty">???????</p>`;
  refreshIcons();
}

function adminContentButtons(type, id, index = 0, total = 0, sortable = false) {
  return `
    <div class="admin-content-actions">
      ${sortable ? `
        <button class="ghost-button" type="button" data-admin-content-type="${type}" data-admin-content-id="${id}" data-admin-content-action="move-up" ${index <= 0 ? "disabled" : ""}>
          <i data-lucide="arrow-up"></i>
          <span>??</span>
        </button>
        <button class="ghost-button" type="button" data-admin-content-type="${type}" data-admin-content-id="${id}" data-admin-content-action="move-down" ${index >= total - 1 ? "disabled" : ""}>
          <i data-lucide="arrow-down"></i>
          <span>??</span>
        </button>
      ` : ""}
      <button class="secondary-button" type="button" data-admin-content-type="${type}" data-admin-content-id="${id}" data-admin-content-action="edit">
        <i data-lucide="pencil"></i>
        <span>??</span>
      </button>
      <button class="ghost-button danger" type="button" data-admin-content-type="${type}" data-admin-content-id="${id}" data-admin-content-action="delete">
        <i data-lucide="trash-2"></i>
        <span>??</span>
      </button>
    </div>
  `;
}

async function loadMailConfig() {
  try {
    const response = await fetch("/api/admin/mail-config");
    if (response.status === 401) {
      showEntry();
      return;
    }
    if (!response.ok) throw new Error("mail");
    const data = await response.json();
    state.mailConfig = data.config || null;
    fillMailConfigForm(state.mailConfig);
  } catch {
    $("#mailConfigMessage").textContent = "?????????????";
  }
}

async function saveMailConfig(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const payload = {
    enabled: form.enabled.checked,
    smtpUser: form.smtpUser.value.trim(),
    smtpPass: form.smtpPass.value.trim(),
    to: form.to.value.trim(),
    from: form.from.value.trim()
  };
  $("#mailConfigMessage").textContent = "????????...";
  try {
    const response = await fetch("/api/admin/mail-config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "????");
    state.mailConfig = data.config;
    fillMailConfigForm(data.config);
    $("#mailConfigMessage").textContent = data.config.hasPassword
      ? "???????????????????? QQ ???????"
      : "????????????????????";
  } catch (error) {
    $("#mailConfigMessage").textContent = error.message;
  }
}

function fillMailConfigForm(config) {
  const form = $("#mailConfigForm");
  if (!form || !config) return;
  form.enabled.checked = Boolean(config.enabled);
  form.smtpUser.value = config.smtpUser || "";
  form.smtpPass.value = "";
  form.to.value = config.to || "";
  form.from.value = config.from || config.smtpUser || "";
  $("#mailConfigMessage").textContent = config.hasPassword
    ? `QQ ????????????????????${config.updatedAt ? `?????${formatDateTime(config.updatedAt)}` : ""}`
    : "QQ ???????????? SMTP????????";
}

async function loadAdminCoupons() {
  try {
    const response = await fetch("/api/admin/coupons");
    if (response.status === 401) {
      showEntry();
      return;
    }
    if (!response.ok) throw new Error("load");
    const data = await response.json();
    state.adminCoupons = normalizeCouponList(data.coupons);
    renderAdminCoupons();
    await loadCoupons();
  } catch {
    $("#adminCouponList").innerHTML = `<p class="admin-empty">?????????????</p>`;
  }
}

async function loadAdminEvents() {
  try {
    const [couponResponse, moodResponse] = await Promise.all([
      fetch("/api/admin/coupon-events"),
      fetch("/api/admin/mood-events")
    ]);
    if (couponResponse.status === 401 || moodResponse.status === 401) {
      showEntry();
      return;
    }
    if (!couponResponse.ok || !moodResponse.ok) throw new Error("events");
    const [couponData, moodData] = await Promise.all([
      couponResponse.json(),
      moodResponse.json()
    ]);
    const couponEvents = Array.isArray(couponData.events)
      ? couponData.events.map((event) => ({ ...event, type: "coupon", time: event.usedAt }))
      : [];
    const moodEvents = Array.isArray(moodData.events)
      ? moodData.events.map((event) => ({ ...event, type: "mood", time: event.createdAt }))
      : [];
    state.adminEvents = [...couponEvents, ...moodEvents]
      .sort((a, b) => new Date(b.time || 0) - new Date(a.time || 0))
      .slice(0, 40);
    renderAdminEvents();
  } catch {
    $("#adminEventList").innerHTML = `<p class="admin-empty">???????????</p>`;
  }
}

function renderAdminCoupons() {
  $("#adminCouponList").innerHTML = state.adminCoupons.length ? state.adminCoupons.map((coupon, index, list) => {
    const active = Boolean(coupon.status?.usable);
    const canMoveUp = index > 0 && Boolean(list[index - 1]?.pinned) === Boolean(coupon.pinned);
    const canMoveDown = index < list.length - 1 && Boolean(list[index + 1]?.pinned) === Boolean(coupon.pinned);
    const sortOrder = numberOr(coupon.sortOrder, index * 10);
    return `
      <article class="admin-coupon-card">
        <div class="admin-coupon-main">
          <div class="coupon-title-row">
            <h3>${escapeHtml(coupon.title)}</h3>
            <div class="coupon-title-badges">
              ${coupon.pinned ? `<span class="coupon-pin-badge">??</span>` : ""}
              <span class="coupon-status ${active ? "is-live" : "is-muted"}">${escapeHtml(coupon.status?.label || "???")}</span>
            </div>
          </div>
          <p>${escapeHtml(coupon.text)}</p>
          <div class="coupon-stats">
            <span>?? ${coupon.totalQuantity}</span>
            <span>?? ${coupon.availableQuantity}</span>
            <span>?? ${coupon.claimedQuantity}</span>
            <span>?? ${coupon.usedQuantity}</span>
            <span>?? ${sortOrder}</span>
          </div>
          <div class="coupon-dates">
            <span>???${coupon.effectiveDate || "??"}</span>
            <span>???${coupon.expiryDate || "??"}</span>
          </div>
          ${coupon.useHistory?.length ? `<p class="coupon-used-time">?????${formatDateTime(coupon.useHistory[0].usedAt)}</p>` : ""}
        </div>
        <div class="admin-coupon-actions">
          <button class="secondary-button" type="button" data-admin-coupon="${coupon.id}" data-admin-coupon-action="edit">
            <i data-lucide="pencil"></i><span>??</span>
          </button>
          <button class="ghost-button" type="button" data-admin-coupon="${coupon.id}" data-admin-coupon-action="${coupon.pinned ? "unpin" : "pin"}">
            <i data-lucide="${coupon.pinned ? "pin-off" : "pin"}"></i><span>${coupon.pinned ? "????" : "??"}</span>
          </button>
          <button class="ghost-button" type="button" data-admin-coupon="${coupon.id}" data-admin-coupon-action="up" ${canMoveUp ? "" : "disabled"}>
            <i data-lucide="arrow-up"></i><span>??</span>
          </button>
          <button class="ghost-button" type="button" data-admin-coupon="${coupon.id}" data-admin-coupon-action="down" ${canMoveDown ? "" : "disabled"}>
            <i data-lucide="arrow-down"></i><span>??</span>
          </button>
          <button class="ghost-button" type="button" data-admin-coupon="${coupon.id}" data-admin-coupon-action="return" ${coupon.claimedQuantity > 0 ? "" : "disabled"}>
            <i data-lucide="undo-2"></i><span>?? 1</span>
          </button>
          <button class="ghost-button" type="button" data-admin-coupon="${coupon.id}" data-admin-coupon-action="use" ${coupon.claimedQuantity > 0 && active ? "" : "disabled"}>
            <i data-lucide="stamp"></i><span>?? 1</span>
          </button>
          <button class="ghost-button danger" type="button" data-admin-coupon="${coupon.id}" data-admin-coupon-action="delete">
            <i data-lucide="trash-2"></i><span>??</span>
          </button>
        </div>
      </article>
    `;
  }).join("") : `<p class="admin-empty">???????</p>`;
  refreshIcons();
}

function renderAdminEvents() {
  $("#adminEventList").innerHTML = state.adminEvents.length ? state.adminEvents.map((event) => {
    if (event.type === "mood") {
      return `
        <article class="admin-event-card">
          <strong>???${escapeHtml(event.label || "??")}</strong>
          <span>${formatDateTime(event.createdAt)} ? ??????</span>
          <p>${escapeHtml(event.response || "")}</p>
          <em>???${emailStatusText(event.emailStatus)}${event.emailError ? ` ? ${escapeHtml(event.emailError)}` : ""}</em>
        </article>
      `;
    }
    return `
      <article class="admin-event-card">
        <strong>${escapeHtml(event.couponTitle)}</strong>
        <span>${formatDateTime(event.usedAt)} ? ${escapeHtml(event.actor || "?")}</span>
        <p>${escapeHtml(event.note || "")}</p>
        <em>???${emailStatusText(event.emailStatus)}${event.emailError ? ` ? ${escapeHtml(event.emailError)}` : ""}</em>
      </article>
    `;
  }).join("") : `<p class="admin-empty">?????????????????????????????????????</p>`;
}

function renderAdminGuestbook() {
  const list = $("#adminGuestbookList");
  if (!list) return;
  list.innerHTML = state.guestbook.length ? state.guestbook.map((entry) => `
    <article class="admin-content-card">
      <div>
        <strong>${escapeHtml(entry.name)} ? ${entry.createdAt ? formatDateTime(entry.createdAt) : "????"}</strong>
        <p>${escapeHtml(entry.message)}</p>
        ${entry.reply ? `<span>????${escapeHtml(entry.reply)}</span>` : `<span>?????</span>`}
      </div>
      <div class="admin-content-actions">
        <button class="secondary-button" type="button" data-guestbook-action="reply" data-guestbook-id="${entry.id}">
          <i data-lucide="reply"></i><span>??</span>
        </button>
        <button class="ghost-button" type="button" data-guestbook-action="hide" data-guestbook-id="${entry.id}">
          <i data-lucide="${entry.visible ? "eye-off" : "eye"}"></i><span>${entry.visible ? "??" : "??"}</span>
        </button>
        <button class="ghost-button danger" type="button" data-guestbook-action="delete" data-guestbook-id="${entry.id}">
          <i data-lucide="trash-2"></i><span>??</span>
        </button>
      </div>
    </article>
  `).join("") : `<p class="admin-empty">????????</p>`;
  refreshIcons();
}

async function handleAdminGuestbookAction(event) {
  const button = event.target.closest("[data-guestbook-action]");
  if (!button) return;
  const id = button.dataset.guestbookId;
  const entry = state.guestbook.find((item) => item.id === id);
  if (!entry) return;
  const action = button.dataset.guestbookAction;
  if (action === "reply") {
    const reply = window.prompt("???????", entry.reply || "");
    if (reply === null) return;
    await updateGuestbookEntry(entry, { reply, visible: entry.visible });
    return;
  }
  if (action === "hide") {
    await updateGuestbookEntry(entry, { reply: entry.reply, visible: !entry.visible });
    return;
  }
  if (action === "delete" && window.confirm("???????")) {
    await deleteGuestbookEntry(entry.id);
  }
}

async function updateGuestbookEntry(entry, payload) {
  $("#guestbookAdminMessage").textContent = "???????...";
  try {
    const response = await fetch(`/api/admin/guestbook/${encodeURIComponent(entry.id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "????");
    $("#guestbookAdminMessage").textContent = "???????";
    await loadGuestbook(true);
  } catch (error) {
    $("#guestbookAdminMessage").textContent = error.message;
  }
}

async function deleteGuestbookEntry(id) {
  $("#guestbookAdminMessage").textContent = "????...";
  try {
    const response = await fetch(`/api/admin/guestbook/${encodeURIComponent(id)}`, { method: "DELETE" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "????");
    $("#guestbookAdminMessage").textContent = "????";
    await loadGuestbook(true);
  } catch (error) {
    $("#guestbookAdminMessage").textContent = error.message;
  }
}

async function exportBackup() {
  $("#backupMessage").textContent = "??????...";
  try {
    const response = await fetch("/api/admin/backup");
    if (!response.ok) throw new Error("????");
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `love-universe-backup-${dayKey()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    $("#backupMessage").textContent = "????????";
  } catch (error) {
    $("#backupMessage").textContent = error.message || "????";
  }
}

async function importBackup(event) {
  event.preventDefault();
  const file = event.currentTarget.backupFile.files[0];
  if (!file) {
    $("#backupMessage").textContent = "??????? JSON ???";
    return;
  }
  if (!window.confirm("????????????????????????????????")) return;
  $("#backupMessage").textContent = "??????...";
  try {
    const text = await file.text();
    const backup = JSON.parse(text);
    const response = await fetch("/api/admin/backup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(backup)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "????");
    $("#backupMessage").textContent = `????${(data.restored || []).join("?") || "????????"}`;
    await Promise.all([loadAdminContent(), loadAdminCoupons(), loadAdminEvents(), loadGuestbook(true), loadServerPhotos()]);
  } catch (error) {
    $("#backupMessage").textContent = error.message || "???????????? JSON ???";
  }
}

async function saveAdminCoupon(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const payload = {
    title: form.title.value.trim(),
    text: form.text.value.trim(),
    totalQuantity: Number(form.totalQuantity.value || 0),
    effectiveDate: form.effectiveDate.value,
    expiryDate: form.expiryDate.value,
    pinned: form.pinned.checked
  };
  const id = form.couponId.value.trim();
  $("#adminCouponMessage").textContent = "????...";
  try {
    const response = await fetch(id ? `/api/admin/coupons/${encodeURIComponent(id)}` : "/api/admin/coupons", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "????");
    $("#adminCouponMessage").textContent = "??????????????????";
    resetAdminCouponForm(false);
    await loadAdminCoupons();
  } catch (error) {
    $("#adminCouponMessage").textContent = error.message;
  }
}

async function runAdminCouponAction(action, id) {
  const coupon = state.adminCoupons.find((item) => item.id === id);
  if (!coupon) return;
  if (action === "edit") {
    fillAdminCouponForm(coupon);
    return;
  }
  if (action === "delete" && !window.confirm(`???${coupon.title}??`)) return;

  const routes = {
    delete: { method: "DELETE", url: `/api/admin/coupons/${encodeURIComponent(id)}` },
    pin: { method: "POST", url: `/api/admin/coupons/${encodeURIComponent(id)}/pin`, body: { pinned: true } },
    unpin: { method: "POST", url: `/api/admin/coupons/${encodeURIComponent(id)}/pin`, body: { pinned: false } },
    up: { method: "POST", url: `/api/admin/coupons/${encodeURIComponent(id)}/move`, body: { direction: "up" } },
    down: { method: "POST", url: `/api/admin/coupons/${encodeURIComponent(id)}/move`, body: { direction: "down" } },
    return: { method: "POST", url: `/api/admin/coupons/${encodeURIComponent(id)}/return`, body: { quantity: 1 } },
    use: { method: "POST", url: `/api/admin/coupons/${encodeURIComponent(id)}/use`, body: { note: "??????????" } }
  };
  const route = routes[action];
  if (!route) return;

  try {
    const response = await fetch(route.url, {
      method: route.method,
      headers: route.body ? { "Content-Type": "application/json" } : undefined,
      body: route.body ? JSON.stringify(route.body) : undefined
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "????");
    await Promise.all([loadAdminCoupons(), loadAdminEvents()]);
  } catch (error) {
    $("#adminCouponMessage").textContent = error.message;
  }
}

function fillAdminCouponForm(coupon) {
  const form = $("#couponAdminForm");
  adminEditingCouponId = coupon.id;
  form.couponId.value = coupon.id;
  form.title.value = coupon.title;
  form.text.value = coupon.text;
  form.totalQuantity.value = coupon.totalQuantity;
  form.effectiveDate.value = coupon.effectiveDate || "";
  form.expiryDate.value = coupon.expiryDate || "";
  form.pinned.checked = Boolean(coupon.pinned);
  $("#adminFormTitle").textContent = "?????";
  $("#adminCouponMessage").textContent = "";
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetAdminCouponForm(clearMessage = true) {
  const form = $("#couponAdminForm");
  adminEditingCouponId = "";
  form.reset();
  form.couponId.value = "";
  form.totalQuantity.value = 1;
  form.pinned.checked = false;
  $("#adminFormTitle").textContent = "?????";
  if (clearMessage) $("#adminCouponMessage").textContent = "";
}

function emailStatusText(status) {
  if (status === "sent") return "???";
  if (status === "failed") return "????";
  return "??? SMTP????????";
}

function bindMap() {
  $("#placeForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = $("#placeInput").value.trim();
    const note = $("#placeNoteInput").value.trim();
    if (!name) return;
    const seed = Math.abs(hashCode(`${name}-${Date.now()}`));
    state.places.unshift({
      id: `place-${Date.now()}`,
      name,
      note: note || "?????????",
      x: 16 + (seed % 68),
      y: 22 + ((seed >> 3) % 58)
    });
    $("#placeInput").value = "";
    $("#placeNoteInput").value = "";
    persist();
    renderMap();
  });
}

function renderMap() {
  $("#memoryMap").innerHTML = state.places.map((place) => `
    <span class="map-pin" style="left:${place.x}%; top:${place.y}%;">
      <button type="button" title="${escapeHtml(place.name)}" aria-label="${escapeHtml(place.name)}">
        <i data-lucide="heart"></i>
      </button>
    </span>
  `).join("");

  $("#placeList").innerHTML = state.places.map((place) => `
    <article class="place-card">
      <h3>${escapeHtml(place.name)}</h3>
      <p>${escapeHtml(place.note)}</p>
    </article>
  `).join("");
  refreshIcons();
}

function bindGuestbook() {
  $("#guestbookForm").addEventListener("submit", saveGuestbookEntry);
}

async function loadGuestbook(admin = false) {
  try {
    const response = await fetch(admin ? "/api/admin/guestbook" : "/api/guestbook");
    if (response.status === 401) {
      showEntry();
      return;
    }
    if (!response.ok) throw new Error("guestbook");
    const data = await response.json();
    state.guestbook = normalizeGuestbook(data.entries);
    renderGuestbook();
    renderMessages();
    renderAdminGuestbook();
  } catch {
    renderGuestbook("??????????????????????");
  }
}

async function saveGuestbookEntry(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const payload = {
    name: form.guestName.value.trim() || (state.settings.partnerName || "?"),
    message: form.guestMessage.value.trim()
  };
  if (!payload.message) {
    $("#guestbookMessage").textContent = "?????????";
    return;
  }
  $("#guestbookMessage").textContent = "???????...";
  try {
    const response = await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    if (response.status === 404) throw new Error("?????????????????????");
    if (!response.ok) throw new Error(data.error || "????");
    form.reset();
    $("#guestbookMessage").textContent = "????????????????";
    await loadGuestbook();
  } catch (error) {
    $("#guestbookMessage").textContent = error.message || "?????????????";
  }
}

function renderGuestbook(message = "") {
  const list = $("#guestbookList");
  if (!list) return;
  if (message) {
    list.innerHTML = `<p class="folded-note">${escapeHtml(message)}</p>`;
    return;
  }
  list.innerHTML = state.guestbook.length ? state.guestbook.map((entry) => `
    <article class="guestbook-card">
      <div>
        <strong>${escapeHtml(entry.name)}</strong>
        <span>${entry.createdAt ? formatDateTime(entry.createdAt) : "??"}</span>
      </div>
      <p>${escapeHtml(entry.message)}</p>
      ${entry.reply ? `<blockquote><b>?????</b>${escapeHtml(entry.reply)}</blockquote>` : ""}
    </article>
  `).join("") : `<p class="folded-note">???????????????????????</p>`;
  refreshIcons();
}

function bindLetters() {
  $("#letterGrid").addEventListener("click", (event) => {
    const card = event.target.closest("[data-letter]");
    if (!card) return;
    const letter = state.letters.find((item) => item.id === card.dataset.letter);
    if (!letter) return;
    openLetter(letter);
  });

  $("#closeLetterButton").addEventListener("click", () => $("#letterDialog").close());
}

function renderMessages() {
  const fixedMessages = state.messageWall.map((message) => `
    <article class="message-card">
      <i data-lucide="message-circle-heart"></i>
      <div>
        <h3>${escapeHtml(personalize(message.title))}</h3>
        <p>${escapeHtml(personalize(message.text))}</p>
      </div>
    </article>
  `);
  const guestMessages = state.guestbook.map((entry) => `
    <article class="message-card guest-message-card">
      <i data-lucide="message-square-heart"></i>
      <div>
        <h3>${escapeHtml(entry.name)}</h3>
        <p>${escapeHtml(entry.message)}</p>
        <time>${entry.createdAt ? formatDateTime(entry.createdAt) : "????"}</time>
        ${entry.reply ? `<blockquote>?????${escapeHtml(entry.reply)}</blockquote>` : ""}
      </div>
    </article>
  `);
  $("#messageWall").innerHTML = [...guestMessages, ...fixedMessages].join("");
  refreshIcons();
}

function renderLetters() {
  $("#letterGrid").innerHTML = state.letters.map((letter) => {
    const diff = daysUntil(letter.openAt);
    const locked = diff !== null && diff > 0;
    return `
      <button class="letter-card ${locked ? "locked" : ""}" type="button" data-letter="${letter.id}">
        <i data-lucide="${locked ? "lock" : "mail-open"}"></i>
        <h3>${escapeHtml(letter.title)}</h3>
        <p>${locked ? `?? ${diff} ?` : "??????"}</p>
      </button>
    `;
  }).join("");
  refreshIcons();
}

function openLetter(letter) {
  const diff = daysUntil(letter.openAt);
  $("#letterDate").textContent = formatDate(letter.openAt);
  $("#letterTitle").textContent = letter.title;
  $("#letterBody").textContent = diff !== null && diff > 0
    ? `????????${diff} ?????`
    : personalize(letter.body);
  $("#letterDialog").showModal();
  refreshIcons();
}

function fillSettingsForm() {
  const form = $("#siteSettingsForm");
  if (!form) return;
  form.partnerName.value = state.settings.partnerName || "";
  form.yourName.value = state.settings.yourName || "";
  form.startDate.value = state.settings.startDate || "";
  form.birthday.value = state.settings.birthday || "";
  form.nextMeet.value = state.settings.nextMeet || "";
  form.guestNames.value = normalizeTextList(state.settings.guestNames, [state.settings.partnerName, state.settings.yourName]).join(", ");
  form.passcodes.value = (state.settings.passcodes || []).join(", ");
  form.cityName.value = state.settings.cityName || "";
  form.cityLatitude.value = state.settings.cityLatitude || "";
  form.cityLongitude.value = state.settings.cityLongitude || "";
  form.cityAdcode.value = state.settings.cityAdcode || "";
  form.songUrl.value = state.settings.songUrl || "";
  form.heroLine.value = state.settings.heroLine || "";
}

function fillDailyToolsForm() {
  const form = $("#dailyToolsAdminForm");
  if (!form) return;
  const tools = state.dailyTools || DEFAULTS.dailyTools;
  form.meetDate.value = tools.meetDate || state.settings.nextMeet || "";
  form.meetTime.value = tools.meetTime || DEFAULTS.dailyTools.meetTime;
  form.meetTitle.value = tools.meetTitle || "";
  form.meetChecklist.value = normalizeTextList(tools.meetChecklist, DEFAULTS.dailyTools.meetChecklist).join("\n");
  form.careCards.value = normalizeTextList(tools.careCards, DEFAULTS.dailyTools.careCards).join("\n");
  form.dailyTasks.value = normalizeTextList(tools.dailyTasks, DEFAULTS.dailyTools.dailyTasks).join("\n");
  form.periodDate.value = tools.periodDate || "";
  form.periodCycleDays.value = tools.periodCycleDays || DEFAULTS.dailyTools.periodCycleDays;
  form.periodAvoid.value = normalizeTextList(tools.periodAvoid, DEFAULTS.dailyTools.periodAvoid).join("\n");
  form.periodWarm.value = normalizeTextList(tools.periodWarm, DEFAULTS.dailyTools.periodWarm).join("\n");
  form.periodMood.value = tools.periodMood || "";
  form.feedingFoods.value = normalizeTextList(tools.feedingFoods, DEFAULTS.dailyTools.feedingFoods).join("\n");
  form.feedingDrinks.value = normalizeTextList(tools.feedingDrinks, DEFAULTS.dailyTools.feedingDrinks).join("\n");
  form.feedingSnacks.value = normalizeTextList(tools.feedingSnacks, DEFAULTS.dailyTools.feedingSnacks).join("\n");
  form.feedingAvoid.value = normalizeTextList(tools.feedingAvoid, DEFAULTS.dailyTools.feedingAvoid).join("\n");
  form.tripPlace.value = tools.tripPlace || "";
  form.tripTime.value = tools.tripTime || "";
  form.tripTransport.value = tools.tripTransport || "";
  form.tripHotel.value = tools.tripHotel || "";
  form.tripNotes.value = normalizeTextList(tools.tripNotes, DEFAULTS.dailyTools.tripNotes).join("\n");
}

async function saveDailyTools(event) {
  event.preventDefault();
  const form = event.currentTarget;
  state.dailyTools = {
    meetTitle: form.meetTitle.value.trim() || DEFAULTS.dailyTools.meetTitle,
    meetDate: form.meetDate.value || state.settings.nextMeet || DEFAULTS.dailyTools.meetDate,
    meetTime: form.meetTime.value || DEFAULTS.dailyTools.meetTime,
    meetChecklist: normalizeTextList(form.meetChecklist.value, DEFAULTS.dailyTools.meetChecklist),
    careCards: normalizeTextList(form.careCards.value, DEFAULTS.dailyTools.careCards),
    dailyTasks: normalizeTextList(form.dailyTasks.value, DEFAULTS.dailyTools.dailyTasks),
    periodDate: form.periodDate.value || "",
    periodCycleDays: Number(form.periodCycleDays.value) || DEFAULTS.dailyTools.periodCycleDays,
    periodAvoid: normalizeTextList(form.periodAvoid.value, DEFAULTS.dailyTools.periodAvoid),
    periodWarm: normalizeTextList(form.periodWarm.value, DEFAULTS.dailyTools.periodWarm),
    periodMood: form.periodMood.value.trim() || DEFAULTS.dailyTools.periodMood,
    feedingFoods: normalizeTextList(form.feedingFoods.value, DEFAULTS.dailyTools.feedingFoods),
    feedingDrinks: normalizeTextList(form.feedingDrinks.value, DEFAULTS.dailyTools.feedingDrinks),
    feedingSnacks: normalizeTextList(form.feedingSnacks.value, DEFAULTS.dailyTools.feedingSnacks),
    feedingAvoid: normalizeTextList(form.feedingAvoid.value, DEFAULTS.dailyTools.feedingAvoid),
    tripPlace: form.tripPlace.value.trim() || DEFAULTS.dailyTools.tripPlace,
    tripTime: form.tripTime.value.trim() || DEFAULTS.dailyTools.tripTime,
    tripTransport: form.tripTransport.value.trim() || DEFAULTS.dailyTools.tripTransport,
    tripHotel: form.tripHotel.value.trim() || DEFAULTS.dailyTools.tripHotel,
    tripNotes: normalizeTextList(form.tripNotes.value, DEFAULTS.dailyTools.tripNotes)
  };
  try {
    await saveAdminContent("#dailyToolsAdminMessage", "????????");
    fillDailyToolsForm();
  } catch (error) {
    $("#dailyToolsAdminMessage").textContent = error.message;
  }
}

function bindMusic() {
  $("#musicButton").addEventListener("click", async () => {
    if (musicState.playing) {
      stopMusic();
    } else {
      await startMusic();
    }
    refreshIcons();
  });
  $(".brand-mark").addEventListener("click", async (event) => {
    if (!window.matchMedia("(max-width: 820px)").matches) return;
    event.preventDefault();
    if (musicState.playing) stopMusic();
    else await startMusic();
    refreshIcons();
  });
}

async function startMusic(options = {}) {
  if (musicState.playing) return;
  const button = $("#musicButton");
  const url = state.settings.songUrl;
  try {
    if (url) {
      if (!musicState.audio) {
        musicState.audio = new Audio();
        musicState.audio.loop = true;
      }
      musicState.audio.src = url;
      await musicState.audio.play();
    } else {
      await startSoftChimes();
    }
    musicState.playing = true;
    button.classList.add("solid");
    button.setAttribute("aria-label", "????");
    button.innerHTML = `<i data-lucide="pause"></i>`;
  } catch {
    if (options.auto) return;
    button.setAttribute("aria-label", "????????");
  }
}

function stopMusic() {
  if (musicState.audio) musicState.audio.pause();
  if (musicState.timer) window.clearInterval(musicState.timer);
  musicState.timer = null;
  musicState.playing = false;
  const button = $("#musicButton");
  button.classList.remove("solid");
  button.setAttribute("aria-label", "????");
  button.innerHTML = `<i data-lucide="music"></i>`;
}

async function startSoftChimes() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  if (!musicState.ctx) musicState.ctx = new AudioContext();
  const ctx = musicState.ctx;
  if (ctx.state === "suspended") {
    await ctx.resume();
  }
  const playNote = (freq, delay) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + delay + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 1.2);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + 1.25);
  };
  const playChord = () => {
    [329.63, 392, 493.88].forEach((freq, i) => playNote(freq, i * 0.12));
  };
  playChord();
  musicState.timer = window.setInterval(playChord, 5200);
}

function bindEasterEgg() {
  $("#secretHeart").addEventListener("click", () => {
    secretClicks += 1;
    if (secretClicks >= 7) {
      secretClicks = 0;
      showEaster();
    }
  });
  $("#closeEasterButton").addEventListener("click", () => $("#easterDialog").close());
  document.addEventListener("keydown", (event) => {
    if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
    typedSecret = (typedSecret + event.key).slice(-8);
    if (typedSecret.includes("520")) showEaster();
  });
}

function showEaster() {
  $("#easterText").textContent = `????? ${state.settings.partnerName} ????????????????????????????`;
  $("#easterDialog").showModal();
  refreshIcons();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.addEventListener("DOMContentLoaded", init);
