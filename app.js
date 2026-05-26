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
  "一起去海边看一次日出",
  "拍一组真正喜欢的合照",
  "做一本只属于我们的相册",
  "挑一个周末短途旅行",
  "一起坐一次摩天轮",
  "一起看一场烟花",
  "一起去露营或住一次帐篷",
  "一起去看星星",
  "一起去看日落",
  "一起在雨天散步",
  "一起去一次游乐园",
  "一起坐旋转木马",
  "一起去动物园或水族馆",
  "一起去博物馆慢慢逛",
  "一起看一场演唱会",
  "一起看一场话剧或音乐剧",
  "一起去电影院看午夜场",
  "一起在家开电影马拉松",
  "一起读同一本书",
  "一起交换一封手写信",
  "一起写未来一年的愿望",
  "一起做一次蛋糕",
  "一起做一顿完整晚餐",
  "一起包饺子或汤圆",
  "一起准备早餐",
  "一起去菜市场买菜",
  "一起尝试一家没去过的小店",
  "一起做一次咖啡或奶茶",
  "一起吃一次火锅",
  "一起吃一次路边摊",
  "一起去野餐",
  "一起在阳台或窗边喝饮料",
  "一起去公园骑车",
  "一起跑步或散步打卡一周",
  "一起爬一次山",
  "一起去健身或打球",
  "一起学一支简单的舞",
  "一起拼一幅拼图",
  "一起搭乐高或模型",
  "一起玩一次双人游戏",
  "一起做手工戒指或手链",
  "一起画对方",
  "一起录一段日常 vlog",
  "一起拍一组拍立得",
  "一起做情侣头像",
  "一起换一次情侣手机壁纸",
  "一起挑一件情侣小物",
  "一起买一束花",
  "一起种一盆植物",
  "一起给房间做一次布置",
  "一起整理衣柜",
  "一起大扫除再奖励一顿好吃的",
  "一起去宜家或家居店逛逛",
  "一起规划未来的小家",
  "一起做一张旅行地图",
  "一起去另一个城市过夜",
  "一起坐高铁旅行",
  "一起坐船或渡轮",
  "一起住一次景观房",
  "一起在陌生城市迷路一会儿",
  "一起去她想去很久的地方",
  "一起去你想带她去的地方",
  "一起在街边拍城市夜景",
  "一起去看雪",
  "一起堆雪人或打雪仗",
  "一起泡温泉",
  "一起去花海或植物园",
  "一起看樱花、银杏或枫叶",
  "一起去图书馆待一下午",
  "一起去咖啡馆各做各的事",
  "一起去陶艺店做杯子",
  "一起去香薰或蜡烛手作",
  "一起参加一次市集",
  "一起逛一次夜市",
  "一起做一次盲盒约会",
  "一起给对方挑衣服",
  "一起拍证件照风格的合照",
  "一起去看婚纱橱窗",
  "一起给对方写 10 个优点",
  "一起互相做一次心情采访",
  "一起制定吵架后的和好规则",
  "一起认真说一次谢谢和对不起",
  "一起做一次手机相册整理",
  "一起把聊天记录里喜欢的话存起来",
  "一起做一个纪念日歌单",
  "一起听同一首歌循环一晚",
  "一起互相推荐三部电影",
  "一起做一次早餐床边服务",
  "一起给对方准备小惊喜",
  "一起庆祝一个不重要的小日子",
  "一起过一次零点生日",
  "一起倒数跨年",
  "一起做一顿年夜饭或节日餐",
  "一起给未来的自己录音",
  "一起存一个旅行基金",
  "一起完成一次 7 天拍照挑战",
  "一起互换一天的歌单",
  "一起做一张情侣问答卷",
  "一起给彼此取一个新的昵称",
  "一起把这 100 件事打卡完成"
];

const DEFAULTS = {
  settings: {
    partnerName: "Shannon",
    yourName: "我",
    heroLine: "今天也想认真地，把世界温柔地递给你。",
    passcodes: ["0520", "520", "我爱你", "shannon", "Shannon"],
    startDate: "2024-05-20",
    birthday: "2026-08-20",
    nextMeet: "2026-06-01",
    cityName: "新沂市",
    cityLatitude: 34.3686,
    cityLongitude: 118.3545,
    songUrl: ""
  },
  dialogLines: [
    { from: "me", text: "{她}，欢迎来到这个只偏心你的网站。" },
    { from: "her", text: "这里真的只属于我吗？" },
    { from: "me", text: "嗯。这里的天气、信件、回忆和小愿望，都站在你这边。" },
    { from: "me", text: "如果今天累了，就先把世界放一放。我来负责想你。" },
    { from: "her", text: "那如果我想你呢？" },
    { from: "me", text: "那就点一下那颗心。我会把它当成今天最重要的通知。" }
  ],
  quotes: [
    "喜欢你这件事，今天也没有下班。",
    "见不到你的时候，我就把想念折成很小的句子。",
    "愿你今天的风，都绕开不开心。",
    "你不用一直很厉害，你被爱的时候也可以很软。",
    "普通的一天，因为想到你，突然有了纪念意义。",
    "如果世界吵闹，我就给你留一盏安静的灯。",
    "今天也站在你这边，毫无原则地。"
  ],
  timeline: [
    { date: "2024-05-20", title: "把今天设成起点", text: "从这一天开始，日子有了可以被倒数和珍藏的理由。" },
    { date: "2024-08-14", title: "第一次认真计划旅行", text: "地图上每一个被圈起来的地方，都像在提前等我们。" },
    { date: "2025-02-14", title: "一封没有寄丢的信", text: "很多话说出口会害羞，写下来就会一直发光。" },
    { date: "2026-05-25", title: "这个网站诞生", text: "它不算大，但每一个角落都向着你。" }
  ],
  photos: [
    { id: "rainy-cafe", title: "雨天咖啡", date: "想和你慢慢坐一下午", src: "assets/photos/photo-rainy-cafe.png" },
    { id: "travel-morning", title: "出发前的早晨", date: "下一趟旅行已经在心里排队", src: "assets/photos/photo-travel-morning.png" },
    { id: "park-picnic", title: "傍晚野餐", date: "蓝色小时里，灯和你都很温柔", src: "assets/photos/photo-park-picnic.png" }
  ],
  moods: {
    happy: { label: "开心", icon: "smile", response: "那今天就把快乐放大一点：买一杯喜欢的饮料，拍一张好看的云，晚上把好事讲给我听。" },
    tired: { label: "累了", icon: "cloud-rain", response: "今天可以不用逞强。先喝水，慢慢呼吸，把难的事分小一点；我会一直在。" },
    miss: { label: "想你", icon: "heart", response: "收到。你的想念已经被我小心放好，等见面的时候一口气还给你。" },
    angry: { label: "生气", icon: "frown", response: "可以生气，可以不讲道理一会儿。等你愿意说的时候，我认真听，不抢话。" },
    sleepy: { label: "睡不着", icon: "moon", response: "把手机亮度调低，肩膀放松一点。今晚的烦心事先交给明天，我们先哄你睡觉。" },
    hug: { label: "要抱抱", icon: "hand-heart", response: "抱抱已经发出：不问原因，不设条件，只负责把你接住。" }
  },
  dateIdeas: [
    { title: "雨天电影局", time: "2 小时", tags: ["电影", "热饮", "抱枕"], text: "选一部都没看过的电影，准备热饮和零食，谁先猜中剧情谁获得一个小奖励。" },
    { title: "城市散步盲盒", time: "90 分钟", tags: ["散步", "拍照", "甜品"], text: "随便选一个地铁站下车，沿着最漂亮的街走，遇见第一家甜品店就进去。" },
    { title: "一起做饭实验", time: "1 晚", tags: ["做饭", "音乐", "打分"], text: "每人选一道菜，给对方的作品打分。最低分负责洗碗，最高分负责被夸。" },
    { title: "日出或夜景计划", time: "半天", tags: ["风景", "相机", "外套"], text: "挑一个视野好的地方，看日出或夜景。带外套，也带一点不用赶时间的心情。" },
    { title: "奶茶路线图", time: "下午", tags: ["奶茶", "街区", "小票"], text: "挑三家没喝过的店，给每一杯取名字，最后选出今日冠军。" },
    { title: "晚风骑行", time: "傍晚", tags: ["骑行", "落日", "耳机"], text: "找一条不赶路的路，骑到天色变软。中途停下来拍一张只有你们懂的照片。" },
    { title: "旧照片复刻", time: "2 小时", tags: ["照片", "回忆", "造型"], text: "选一张以前的合照，在同样姿势或同样情绪里复刻一次，顺便看看你们变得多亲近。" },
    { title: "超市随机晚餐", time: "1 晚", tags: ["超市", "料理", "随机"], text: "每人只许选三样食材，回家拼成一顿饭。不好吃也算一次值得笑的作品。" },
    { title: "书店交换书签", time: "下午", tags: ["书店", "安静", "礼物"], text: "各自挑一本想让对方翻开的书，再给对方写一张藏在书里的小纸条。" },
    { title: "夜市评分员", time: "晚上", tags: ["夜市", "小吃", "排名"], text: "从第一家摊位吃到最后，给每样小吃起一个很认真或很离谱的奖项。" },
    { title: "彼此的一日摄影师", time: "半天", tags: ["拍照", "街区", "滤镜"], text: "今天只负责把对方拍好看。最后各选 9 张，拼成一张属于这天的小相册。" },
    { title: "居家手作夜", time: "1 晚", tags: ["手作", "蜡烛", "歌单"], text: "做香薰、拼图、串珠或小摆件，作品不需要完美，但要写上日期。" },
    { title: "随机公交终点站", time: "半天", tags: ["公交", "探索", "照片"], text: "选一辆顺眼的公交坐到一个陌生站点，在附近找一家小店坐下来。" },
    { title: "情侣问答电台", time: "1 小时", tags: ["聊天", "录音", "问题"], text: "每人准备 10 个问题，像录电台一样认真回答。可以把好笑的片段留给以后听。" },
    { title: "为她的一小时", time: "1 小时", tags: ["偏爱", "陪伴", "放松"], text: "这一小时只做她想做的事：散步、发呆、逛店、吃甜品，都不催。" }
  ],
  wishes: COUPLE_WISH_TEXTS.map((text, index) => ({ id: `couple-100-${String(index + 1).padStart(3, "0")}`, text, done: false })),
  coupons: [
    { id: "coupon-1", title: "奶茶免排队券", text: "想喝哪杯都可以，我负责下单和夸你眼光好。" },
    { id: "coupon-2", title: "无条件抱抱券", text: "不讲道理也能用，优先级最高。" },
    { id: "coupon-3", title: "电影选择权", text: "今晚看什么，你说了算。" },
    { id: "coupon-4", title: "哄睡语音券", text: "睡不着的时候兑换，直到你困为止。" }
  ],
  places: [
    { id: "place-1", name: "第一次见面的地方", note: "空气里都是紧张和装作镇定。", x: 25, y: 68 },
    { id: "place-2", name: "最常去的街角", note: "路过很多次，每一次都更像自己的地方。", x: 58, y: 42 },
    { id: "place-3", name: "下一站", note: "还没去，但已经很期待。", x: 76, y: 28 }
  ],
  messageWall: [
    { id: "message-1", title: "置顶留言", text: "这里可以放你想让她每次都看见的话。" },
    { id: "message-2", title: "今天也偏心你", text: "如果今天不太顺，就先把难过寄存在这里，我会慢慢接住。" }
  ],
  letters: [
    { id: "letter-1", title: "今天就能打开", openAt: daysFromNow(0), unlockAfterDays: 0, body: "{她}，这个网站的第一封信想告诉你：你不用成为完美的一天，我也照样喜欢今天的你。" },
    { id: "letter-2", title: "三天后的信", openAt: daysFromNow(3), unlockAfterDays: 3, body: "如果你打开了这封信，说明我们又一起经过了三个普通日子。谢谢你让普通变得值得。" },
    { id: "letter-3", title: "下次见面前", openAt: daysFromNow(7), unlockAfterDays: 7, body: "见面前我总会有点期待过头。想牵手，想看你笑，想把路走慢一点。" },
    { id: "letter-4", title: "留给某个不开心", openAt: daysFromNow(14), unlockAfterDays: 14, body: "不开心来的时候，不要一个人硬扛。你可以把难过说得乱七八糟，我会慢慢听懂。" }
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
const adminEditors = {
  timeline: "",
  idea: "",
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
    settings: { ...DEFAULTS.settings, ...(saved.settings || {}) },
    serverPhotos: [],
    coupons: [],
    adminCoupons: [],
    adminEvents: [],
    mailConfig: null,
    securityConfig: null,
    timeline: DEFAULTS.timeline.map((item) => ({ ...item })),
    dateIdeas: DEFAULTS.dateIdeas.map((item) => ({ ...item, tags: [...item.tags] })),
    messageWall: DEFAULTS.messageWall.map((item) => ({ ...item })),
    letters: DEFAULTS.letters.map((item) => ({ ...item })),
    wishes: normalizeWishes(saved.wishes, saved.wishlistVersion),
    places: saved.places || DEFAULTS.places
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
  state.places = normalizePlaces(content.places);
  state.messageWall = normalizeMessages(content.messageWall);
  state.letters = normalizeLetters(content.letters);
}

function normalizeTimeline(items) {
  const source = Array.isArray(items) ? items : DEFAULTS.timeline;
  return source.map((item) => ({
    id: item.id || `timeline-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    date: normalizeDateInput(item.date) || dayKey(),
    title: String(item.title || "新的回忆"),
    text: String(item.text || "把这一刻写下来。")
  }));
}

function normalizeDateIdeas(items) {
  const source = Array.isArray(items) ? items : DEFAULTS.dateIdeas;
  return source.map((item) => ({
    id: item.id || `idea-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: String(item.title || "新的约会灵感"),
    time: String(item.time || "随时"),
    tags: Array.isArray(item.tags)
      ? item.tags.map((tag) => String(tag || "").trim()).filter(Boolean)
      : String(item.tags || "").split(/[，,]/).map((tag) => tag.trim()).filter(Boolean),
    text: String(item.text || "写下这次约会要怎么发生。")
  }));
}

function normalizePlaces(items) {
  const source = Array.isArray(items) ? items : DEFAULTS.places;
  return source.map((item) => ({
    id: item.id || `place-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: String(item.name || "新的地点"),
    note: String(item.note || "这里会有新的故事。"),
    x: clampPercent(item.x, 50),
    y: clampPercent(item.y, 50)
  }));
}

function normalizeMessages(items) {
  const source = Array.isArray(items) ? items : DEFAULTS.messageWall;
  return source.map((item) => ({
    id: item.id || `message-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: String(item.title || "新的留言"),
    text: String(item.text || "把想说的话写在这里。")
  }));
}

function normalizeLetters(items) {
  const source = Array.isArray(items) ? items : DEFAULTS.letters;
  return source.map((item) => {
    const unlockAfterDays = Math.max(0, Math.floor(Number(item.unlockAfterDays || 0)));
    return {
      id: item.id || `letter-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: String(item.title || "新的未来信"),
      openAt: normalizeDateInput(item.openAt) || daysFromNow(unlockAfterDays),
      unlockAfterDays,
      body: String(item.body || "这封信还没有正文。")
    };
  });
}

function normalizeDateInput(value) {
  const text = String(value || "").trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : "";
}

function clampPercent(value, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(4, Math.min(96, Number(number.toFixed(1))));
}

function persist() {
  localStorage.setItem(STORE_KEY, JSON.stringify({
    settings: state.settings,
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
    .replaceAll("{她}", state.settings.partnerName || "她")
    .replaceAll("{我}", state.settings.yourName || "我");
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

function formatDate(dateString) {
  const d = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString("zh-CN", { month: "long", day: "numeric" });
}

function formatDateTime(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "时间未知";
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
  bindPlans();
  bindMap();
  bindLetters();
  bindSettings();
  bindMusic();
  bindEasterEgg();
  bindAdmin();
  await loadContent();
  renderAll();
  loadServerPhotos();
  loadCoupons();

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
  $("#entryForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = $("#passcodeInput");
    const key = input.value;

    if (await tryAdminLogin(key)) {
      input.value = "";
      showAdmin(true);
      return;
    }

    if (isPasscodeValid(key)) {
      state.unlocked = true;
      persist();
      unlock(true);
      input.value = "";
      return;
    }

    const panel = $(".entry-panel");
    panel.classList.remove("is-wrong");
    void panel.offsetWidth;
    panel.classList.add("is-wrong");
    $("#entryMessage").textContent = "门听见了，但还想再确认一次。";
  });
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
  if (!$("#weatherGrid").children.length) {
    loadWeather(state.settings.cityLatitude, state.settings.cityLongitude, state.settings.cityName);
  }
  if (!chatIndex) {
    revealNextLine();
    window.setTimeout(revealNextLine, 460);
  }
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
  await Promise.all([loadAdminCoupons(), loadAdminEvents(), loadMailConfig(), loadAdminContent(), loadSecurityConfig(), loadServerPhotos()]);
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
  renderTimeline();
  renderAlbum();
  renderMoods();
  renderDateIdea();
  renderWishes();
  renderCoupons();
  renderMap();
  renderMessages();
  renderLetters();
  fillSettingsForm();
  refreshIcons();
}

function renderPersonalText() {
  $all("[data-partner-name]").forEach((node) => {
    node.textContent = state.settings.partnerName || "她";
  });
  $("#heroLine").textContent = personalize(state.settings.heroLine);
}

function renderCounters() {
  const together = daysBetween(state.settings.startDate);
  $("#heroDays").textContent = `第 ${together} 天`;
  $("#anniversaryText").textContent = `我们已经第 ${together} 天`;

  const meet = daysUntil(state.settings.nextMeet);
  $("#meetText").textContent = meet === null ? "等你写下日期" : meet <= 0 ? "就是今天" : `还有 ${meet} 天`;

  const birthday = daysUntil(state.settings.birthday, true);
  $("#birthdayText").textContent = birthday === null ? "等你写下日期" : birthday === 0 ? "今天生日" : `还有 ${birthday} 天`;
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
      $("#weatherStatus").textContent = "这个浏览器暂时拿不到定位，先用默认城市。";
      return;
    }

    $("#weatherStatus").textContent = "正在靠近她那边的天空...";
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => loadWeather(coords.latitude, coords.longitude, "当前位置"),
      () => {
        $("#weatherStatus").textContent = "定位没有打开，先用默认城市。";
        loadWeather(state.settings.cityLatitude, state.settings.cityLongitude, state.settings.cityName);
      },
      { enableHighAccuracy: true, timeout: 9000, maximumAge: 900000 }
    );
  });

  $("#cityForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = $("#cityInput").value.trim();
    if (!city) return;
    $("#weatherStatus").textContent = `正在找 ${city}...`;
    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=zh&format=json`);
      if (!response.ok) throw new Error("city");
      const data = await response.json();
      const match = data.results && data.results[0];
      if (!match) {
        $("#weatherStatus").textContent = "没有找到这个城市，换个名字试试。";
        return;
      }
      state.settings.cityName = [match.name, match.admin1, match.country].filter(Boolean).join(" · ");
      state.settings.cityLatitude = match.latitude;
      state.settings.cityLongitude = match.longitude;
      persist();
      loadWeather(match.latitude, match.longitude, state.settings.cityName);
    } catch {
      $("#weatherStatus").textContent = "城市查询失败，等网络稳定一点再试。";
    }
  });
}

async function loadWeather(latitude, longitude, placeName) {
  $("#weatherStatus").textContent = `正在整理 ${placeName || "当前位置"} 的未来一周天气...`;
  try {
    const params = new URLSearchParams({
      latitude,
      longitude,
      daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset",
      timezone: "auto",
      forecast_days: "7"
    });
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!response.ok) throw new Error("weather");
    const data = await response.json();
    renderWeather(data.daily, placeName);
  } catch {
    $("#weatherStatus").textContent = "天气接口暂时没有回应，先把伞和外套都当作备选。";
    $("#weatherCare").innerHTML = `<i data-lucide="umbrella"></i><span>天气没刷新出来，但关心照常：出门前看一眼天空，别让自己冷到或淋到。</span>`;
    refreshIcons();
  }
}

function renderWeather(daily, placeName) {
  const cards = daily.time.map((date, index) => {
    const code = daily.weather_code[index];
    const max = Math.round(daily.temperature_2m_max[index]);
    const min = Math.round(daily.temperature_2m_min[index]);
    const rain = daily.precipitation_probability_max[index] ?? 0;
    const info = weatherInfo(code);
    return `
      <article class="weather-card">
        <div class="weather-day">
          <span>${index === 0 ? "今天" : weekday(date)}</span>
          <span>${formatDate(date)}</span>
        </div>
        <div class="weather-icon"><i data-lucide="${info.icon}"></i></div>
        <strong class="weather-temp">${min}° / ${max}°</strong>
        <div class="weather-meta">
          <span>${info.label}</span>
          <span>降雨 ${rain}%</span>
          <span>日落 ${shortTime(daily.sunset[index])}</span>
        </div>
      </article>
    `;
  }).join("");

  $("#weatherGrid").innerHTML = cards;
  $("#weatherStatus").textContent = `${placeName || "当前位置"} · 未来 7 天`;
  $("#weatherCare").innerHTML = `<i data-lucide="${careIcon(daily)}"></i><span>${weatherCare(daily)}</span>`;
  refreshIcons();
}

function weatherInfo(code) {
  if (code === 0) return { label: "晴", icon: "sun" };
  if ([1, 2, 3].includes(code)) return { label: "多云", icon: "cloud-sun" };
  if ([45, 48].includes(code)) return { label: "有雾", icon: "cloud-fog" };
  if ([51, 53, 55, 56, 57].includes(code)) return { label: "小雨", icon: "cloud-drizzle" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { label: "下雨", icon: "cloud-rain" };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: "下雪", icon: "snowflake" };
  if ([95, 96, 99].includes(code)) return { label: "雷雨", icon: "cloud-lightning" };
  return { label: "天气变化", icon: "cloud" };
}

function weatherCare(daily) {
  const code = daily.weather_code[0];
  const max = daily.temperature_2m_max[0];
  const min = daily.temperature_2m_min[0];
  const rain = daily.precipitation_probability_max[0] ?? 0;
  const info = weatherInfo(code);

  if (info.label === "雷雨") return "今天可能有雷雨，尽量早点回家；如果路上害怕，就把电话打过来。";
  if (rain >= 55 || info.label.includes("雨")) return "今天记得带伞，鞋子也选不怕湿的。雨天慢一点走，别急。";
  if (info.label.includes("雪")) return "今天有雪意，围巾和手套可以上线；手冷的时候就当我牵着。";
  if (max >= 33) return "今天会热，少晒一点，多喝水，冰饮可以有但别太猛。";
  if (min <= 8) return "今天偏冷，外套穿厚一点。风大的时候，别把自己交给硬撑。";
  if (info.label === "晴") return "今天适合散步、拍照和晒一点太阳。记得涂防晒，也记得开心。";
  return "天气还算温和，适合把节奏放稳一点；出门前看一眼包里有没有纸巾和水。";
}

function careIcon(daily) {
  const code = daily.weather_code[0];
  const rain = daily.precipitation_probability_max[0] ?? 0;
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
    renderAlbum();
    renderAdminPhotos();
  } catch {
    state.serverPhotos = [];
    renderAlbum("相册服务器还没连上，先显示样例照片。用 Node 服务启动后就能上传。");
    renderAdminPhotos("相册服务器还没连上。");
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
  $("#photoDialogTitle").textContent = photo ? "编辑服务器照片" : "上传照片";
  $("#photoMessage").textContent = photo
    ? "可以只改标题和文案；如果重新选择照片，会替换服务器上的图片。"
    : "选择本地照片后会上传到服务器，页面再从服务器接口读取。";
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
    $("#photoMessage").textContent = "标题要填好。";
    return;
  }

  if (!id && !file) {
    $("#photoMessage").textContent = "请先选择一张本地照片。";
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("date", date || "这张照片背后，有一段只有你们懂的时间。");
  if (file) formData.append("photo", file);

  const submit = form.querySelector("button[type='submit']");
  submit.disabled = true;
  $("#photoMessage").textContent = "正在保存到服务器...";

  try {
    const response = await fetch(id ? `/api/photos/${encodeURIComponent(id)}` : "/api/photos", {
      method: id ? "PUT" : "POST",
      body: formData
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "save");
    await loadServerPhotos();
    $("#photoDialog").close();
  } catch {
    $("#photoMessage").textContent = "保存失败，请确认 Node 服务正在运行，并且图片格式是 jpg/png/webp/gif。";
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
    console.error("删除服务器照片失败");
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

function renderAlbum(message = "") {
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
          <button class="icon-button" data-edit-photo="${photo.id}" type="button" aria-label="编辑照片"><i data-lucide="pencil"></i></button>
          <button class="icon-button" data-remove-photo="${photo.id}" type="button" aria-label="移除照片"><i data-lucide="x"></i></button>
        </div>
        <span class="photo-badge">服务器</span>
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
          <span>编辑</span>
        </button>
        <button class="ghost-button danger" data-remove-photo="${photo.id}" type="button">
          <i data-lucide="trash-2"></i>
          <span>删除</span>
        </button>
      </div>
    </article>
  `).join("") : `<p class="admin-empty">还没有上传到服务器的照片。</p>`;
  refreshIcons();
}

function bindMood() {
  $("#moodGrid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-mood]");
    if (!button) return;
    selectedMood = button.dataset.mood;
    renderMoods();
  });
}

function renderMoods() {
  $("#moodGrid").innerHTML = Object.entries(DEFAULTS.moods).map(([key, mood]) => `
    <button class="mood-button ${selectedMood === key ? "is-active" : ""}" type="button" data-mood="${key}">
      <i data-lucide="${mood.icon}"></i>
      <span>${mood.label}</span>
    </button>
  `).join("");

  if (selectedMood) {
    const mood = DEFAULTS.moods[selectedMood];
    $("#moodResponse").innerHTML = `<i data-lucide="${mood.icon}"></i><span>${escapeHtml(personalize(mood.response))}</span>`;
  }
  refreshIcons();
}

function bindPlans() {
  $("#drawIdeaButton").addEventListener("click", () => renderDateIdea(true));
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

function renderDateIdea(random = false) {
  const ideas = state.dateIdeas.length ? state.dateIdeas : DEFAULTS.dateIdeas;
  const index = random ? Math.floor(Math.random() * ideas.length) : Math.abs(hashCode(dayKey())) % ideas.length;
  const idea = ideas[index];
  $("#dateIdeaCard").innerHTML = `
    <h4>${idea.title}</h4>
    <p>${idea.text}</p>
    <div class="idea-tags">
      <span>${idea.time}</span>
      ${idea.tags.map((tag) => `<span>${tag}</span>`).join("")}
    </div>
  `;
}

function renderWishes() {
  const doneCount = state.wishes.filter((wish) => wish.done).length;
  const total = state.wishes.length || 1;
  $("#wishProgressText").textContent = `已完成 ${doneCount} / ${total}`;
  $("#wishProgressBar").style.width = `${Math.round((doneCount / total) * 100)}%`;

  $("#wishList").innerHTML = state.wishes.map((wish) => `
    <label class="wish-item ${wish.done ? "done" : ""}">
      <input type="checkbox" data-wish-toggle="${wish.id}" ${wish.done ? "checked" : ""}>
      <span>${escapeHtml(wish.text)}</span>
      <button class="icon-button" type="button" data-remove-wish="${wish.id}" aria-label="删除愿望">
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
    state.coupons = Array.isArray(data.coupons) ? data.coupons : [];
  } catch {
    state.coupons = DEFAULTS.coupons.map((coupon) => ({
      ...coupon,
      totalQuantity: 1,
      claimedQuantity: 0,
      usedQuantity: 0,
      availableQuantity: 1,
      effectiveDate: "",
      expiryDate: "",
      status: { usable: true, label: "本地预览", reason: "" },
      useHistory: []
    }));
  }
  renderCoupons();
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
    if (!response.ok) throw new Error(data.error || "操作失败");
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
            <span class="coupon-status ${active ? "is-live" : "is-muted"}">${escapeHtml(coupon.status?.label || "可使用")}</span>
          </div>
          <p>${escapeHtml(coupon.text)}</p>
          <div class="coupon-stats">
            <span>可领 ${coupon.availableQuantity}</span>
            <span>已领 ${coupon.claimedQuantity}</span>
            <span>已用 ${coupon.usedQuantity}</span>
          </div>
          <div class="coupon-dates">
            <span>生效：${coupon.effectiveDate || "立即"}</span>
            <span>到期：${coupon.expiryDate || "长期"}</span>
          </div>
          ${latest ? `<p class="coupon-used-time">上次使用：${formatDateTime(latest.usedAt)}</p>` : ""}
          ${coupon.inlineMessage ? `<p class="coupon-error">${escapeHtml(coupon.inlineMessage)}</p>` : ""}
        </div>
        <div class="coupon-actions">
          <button class="secondary-button" type="button" data-coupon="${coupon.id}" data-coupon-action="claim" ${canClaim ? "" : "disabled"}>
            <i data-lucide="ticket"></i>
            <span>领取</span>
          </button>
          <button class="primary-button" type="button" data-coupon="${coupon.id}" data-coupon-action="use" ${canUse ? "" : "disabled"}>
            <i data-lucide="stamp"></i>
            <span>使用</span>
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
  $("#refreshMailConfigButton").addEventListener("click", loadMailConfig);
  $("#mailConfigForm").addEventListener("submit", saveMailConfig);
  $("#securityForm").addEventListener("submit", saveSecurityConfig);
  $("#timelineAdminForm").addEventListener("submit", saveAdminTimeline);
  $("#ideaAdminForm").addEventListener("submit", saveAdminIdea);
  $("#placeAdminForm").addEventListener("submit", saveAdminPlace);
  $("#messageAdminForm").addEventListener("submit", saveAdminMessage);
  $("#letterAdminForm").addEventListener("submit", saveAdminLetter);
  $("#adminAddPhotoButton").addEventListener("click", () => openPhotoEditor());
  $("#resetTimelineFormButton").addEventListener("click", resetTimelineForm);
  $("#resetIdeaFormButton").addEventListener("click", resetIdeaForm);
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
  $("#adminPlaceList").addEventListener("click", (event) => handleAdminContentAction(event, "place"));
  $("#adminMessageList").addEventListener("click", (event) => handleAdminContentAction(event, "message"));
  $("#adminLetterList").addEventListener("click", (event) => handleAdminContentAction(event, "letter"));
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
      ? `上次修改：${formatDateTime(state.securityConfig.updatedAt)}`
      : "当前使用默认后台密码，建议正式部署前修改。";
  } catch {
    $("#securityMessage").textContent = "后台密码状态暂时没有读取成功。";
  }
}

async function saveSecurityConfig(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const currentKey = form.currentKey.value;
  const newKey = form.newKey.value.trim();
  const confirmKey = form.confirmKey.value.trim();
  if (newKey !== confirmKey) {
    $("#securityMessage").textContent = "两次输入的新后台密码不一致。";
    return;
  }

  $("#securityMessage").textContent = "正在保存后台密码...";
  try {
    const response = await fetch("/api/admin/security", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentKey, newKey })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "保存失败");
    form.reset();
    state.securityConfig = data.config || {};
    $("#securityMessage").textContent = "后台密码已更新，下次登录请使用新密码。";
  } catch (error) {
    $("#securityMessage").textContent = error.message;
  }
}

function renderAdminContent() {
  renderAdminTimeline();
  renderAdminIdeas();
  renderAdminPlaces();
  renderAdminMessages();
  renderAdminLetters();
}

function contentPayload() {
  return {
    settings: state.settings,
    timeline: state.timeline,
    dateIdeas: state.dateIdeas,
    places: state.places,
    messageWall: state.messageWall,
    letters: state.letters
  };
}

async function saveAdminContent(messageSelector, successText = "已保存，她那边刷新后会看到最新内容。") {
  if (messageSelector) $(messageSelector).textContent = "正在保存到服务器...";
  const response = await fetch("/api/admin/content", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: contentPayload() })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "保存失败");
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
    $("#timelineAdminTitle").textContent = "编辑回忆";
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
    $("#ideaAdminTitle").textContent = "编辑约会灵感";
    $("#ideaAdminMessage").textContent = "";
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
    $("#placeAdminTitle").textContent = "编辑地图足迹";
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
    $("#messageAdminTitle").textContent = "编辑留言";
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
    $("#letterAdminTitle").textContent = "编辑未来信";
    $("#letterAdminMessage").textContent = "";
  }
}

async function deleteContentItem(type, id) {
  const configs = {
    timeline: { list: "timeline", label: "这条回忆", message: "#timelineAdminMessage" },
    idea: { list: "dateIdeas", label: "这个约会灵感", message: "#ideaAdminMessage" },
    place: { list: "places", label: "这个地图足迹", message: "#placeAdminMessage" },
    message: { list: "messageWall", label: "这条留言", message: "#messageAdminMessage" },
    letter: { list: "letters", label: "这封未来信", message: "#letterAdminMessage" }
  };
  const config = configs[type];
  if (!config || !window.confirm(`删除${config.label}？`)) return;
  state[config.list] = state[config.list].filter((item) => item.id !== id);
  try {
    await saveAdminContent(config.message, "已删除并同步。");
    resetContentForm(type, false);
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
    tags: form.tags.value.split(/[，,]/).map((tag) => tag.trim()).filter(Boolean),
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
  $("#timelineAdminTitle").textContent = "新增回忆";
  if (clearMessage) $("#timelineAdminMessage").textContent = "";
}

function resetIdeaForm(clearMessage = true) {
  adminEditors.idea = "";
  const form = $("#ideaAdminForm");
  form.reset();
  form.ideaId.value = "";
  $("#ideaAdminTitle").textContent = "新增约会灵感";
  if (clearMessage) $("#ideaAdminMessage").textContent = "";
}

function resetPlaceForm(clearMessage = true) {
  adminEditors.place = "";
  const form = $("#placeAdminForm");
  form.reset();
  form.placeId.value = "";
  $("#placeAdminTitle").textContent = "新增地图足迹";
  if (clearMessage) $("#placeAdminMessage").textContent = "";
}

function resetMessageForm(clearMessage = true) {
  adminEditors.message = "";
  const form = $("#messageAdminForm");
  form.reset();
  form.messageId.value = "";
  $("#messageAdminTitle").textContent = "新增留言";
  if (clearMessage) $("#messageAdminMessage").textContent = "";
}

function resetLetterForm(clearMessage = true) {
  adminEditors.letter = "";
  const form = $("#letterAdminForm");
  form.reset();
  form.letterId.value = "";
  form.unlockDays.value = 0;
  $("#letterAdminTitle").textContent = "新增未来信";
  if (clearMessage) $("#letterAdminMessage").textContent = "";
}

function renderAdminTimeline() {
  $("#adminTimelineList").innerHTML = state.timeline.length ? state.timeline.map((item) => `
    <article class="admin-content-card">
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.date)}</span>
        <p>${escapeHtml(item.text)}</p>
      </div>
      ${adminContentButtons("timeline", item.id)}
    </article>
  `).join("") : `<p class="admin-empty">还没有回忆。</p>`;
  refreshIcons();
}

function renderAdminIdeas() {
  $("#adminIdeaList").innerHTML = state.dateIdeas.length ? state.dateIdeas.map((item) => `
    <article class="admin-content-card">
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.time)} · ${(item.tags || []).map(escapeHtml).join(" / ")}</span>
        <p>${escapeHtml(item.text)}</p>
      </div>
      ${adminContentButtons("idea", item.id)}
    </article>
  `).join("") : `<p class="admin-empty">还没有约会灵感。</p>`;
  refreshIcons();
}

function renderAdminPlaces() {
  $("#adminPlaceList").innerHTML = state.places.length ? state.places.map((item) => `
    <article class="admin-content-card">
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <span>位置 ${item.x}% / ${item.y}%</span>
        <p>${escapeHtml(item.note)}</p>
      </div>
      ${adminContentButtons("place", item.id)}
    </article>
  `).join("") : `<p class="admin-empty">还没有地图足迹。</p>`;
  refreshIcons();
}

function renderAdminMessages() {
  $("#adminMessageList").innerHTML = state.messageWall.length ? state.messageWall.map((item) => `
    <article class="admin-content-card">
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.text)}</p>
      </div>
      ${adminContentButtons("message", item.id)}
    </article>
  `).join("") : `<p class="admin-empty">还没有留言。</p>`;
  refreshIcons();
}

function renderAdminLetters() {
  $("#adminLetterList").innerHTML = state.letters.length ? state.letters.map((item) => {
    const diff = Math.max(0, daysUntil(item.openAt) || 0);
    return `
      <article class="admin-content-card">
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <span>${diff > 0 ? `还有 ${diff} 天解锁` : "现在可打开"} · ${escapeHtml(item.openAt)}</span>
          <p>${escapeHtml(item.body)}</p>
        </div>
        ${adminContentButtons("letter", item.id)}
      </article>
    `;
  }).join("") : `<p class="admin-empty">还没有未来信。</p>`;
  refreshIcons();
}

function adminContentButtons(type, id) {
  return `
    <div class="admin-content-actions">
      <button class="secondary-button" type="button" data-admin-content-type="${type}" data-admin-content-id="${id}" data-admin-content-action="edit">
        <i data-lucide="pencil"></i>
        <span>编辑</span>
      </button>
      <button class="ghost-button danger" type="button" data-admin-content-type="${type}" data-admin-content-id="${id}" data-admin-content-action="delete">
        <i data-lucide="trash-2"></i>
        <span>删除</span>
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
    $("#mailConfigMessage").textContent = "邮箱配置暂时没有读取成功。";
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
  $("#mailConfigMessage").textContent = "正在保存邮箱配置...";
  try {
    const response = await fetch("/api/admin/mail-config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "保存失败");
    state.mailConfig = data.config;
    fillMailConfigForm(data.config);
    $("#mailConfigMessage").textContent = data.config.hasPassword
      ? "已保存。她使用小票券时会通过 QQ 邮箱发送通知。"
      : "已保存，但还没有授权码，暂时不能发邮件。";
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
    ? `QQ 邮箱已配置授权码。${config.updatedAt ? `上次更新：${formatDateTime(config.updatedAt)}` : ""}`
    : "QQ 邮箱需要在邮箱设置里开启 SMTP，并使用授权码。";
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
    state.adminCoupons = Array.isArray(data.coupons) ? data.coupons : [];
    renderAdminCoupons();
    await loadCoupons();
  } catch {
    $("#adminCouponList").innerHTML = `<p class="admin-empty">管理数据暂时没有加载成功。</p>`;
  }
}

async function loadAdminEvents() {
  try {
    const response = await fetch("/api/admin/coupon-events");
    if (response.status === 401) {
      showEntry();
      return;
    }
    if (!response.ok) throw new Error("events");
    const data = await response.json();
    state.adminEvents = Array.isArray(data.events) ? data.events : [];
    renderAdminEvents();
  } catch {
    $("#adminEventList").innerHTML = `<p class="admin-empty">还没有加载到使用记录。</p>`;
  }
}

function renderAdminCoupons() {
  $("#adminCouponList").innerHTML = state.adminCoupons.length ? state.adminCoupons.map((coupon) => {
    const active = Boolean(coupon.status?.usable);
    return `
      <article class="admin-coupon-card">
        <div class="admin-coupon-main">
          <div class="coupon-title-row">
            <h3>${escapeHtml(coupon.title)}</h3>
            <span class="coupon-status ${active ? "is-live" : "is-muted"}">${escapeHtml(coupon.status?.label || "可使用")}</span>
          </div>
          <p>${escapeHtml(coupon.text)}</p>
          <div class="coupon-stats">
            <span>总数 ${coupon.totalQuantity}</span>
            <span>可领 ${coupon.availableQuantity}</span>
            <span>已领 ${coupon.claimedQuantity}</span>
            <span>已用 ${coupon.usedQuantity}</span>
          </div>
          <div class="coupon-dates">
            <span>生效：${coupon.effectiveDate || "立即"}</span>
            <span>到期：${coupon.expiryDate || "长期"}</span>
          </div>
          ${coupon.useHistory?.length ? `<p class="coupon-used-time">最近使用：${formatDateTime(coupon.useHistory[0].usedAt)}</p>` : ""}
        </div>
        <div class="admin-coupon-actions">
          <button class="secondary-button" type="button" data-admin-coupon="${coupon.id}" data-admin-coupon-action="edit">
            <i data-lucide="pencil"></i><span>编辑</span>
          </button>
          <button class="ghost-button" type="button" data-admin-coupon="${coupon.id}" data-admin-coupon-action="return" ${coupon.claimedQuantity > 0 ? "" : "disabled"}>
            <i data-lucide="undo-2"></i><span>退回 1</span>
          </button>
          <button class="ghost-button" type="button" data-admin-coupon="${coupon.id}" data-admin-coupon-action="use" ${coupon.claimedQuantity > 0 && active ? "" : "disabled"}>
            <i data-lucide="stamp"></i><span>使用 1</span>
          </button>
          <button class="ghost-button danger" type="button" data-admin-coupon="${coupon.id}" data-admin-coupon-action="delete">
            <i data-lucide="trash-2"></i><span>删除</span>
          </button>
        </div>
      </article>
    `;
  }).join("") : `<p class="admin-empty">还没有小票券。</p>`;
  refreshIcons();
}

function renderAdminEvents() {
  $("#adminEventList").innerHTML = state.adminEvents.length ? state.adminEvents.map((event) => `
    <article class="admin-event-card">
      <strong>${escapeHtml(event.couponTitle)}</strong>
      <span>${formatDateTime(event.usedAt)} · ${escapeHtml(event.actor || "她")}</span>
      <p>${escapeHtml(event.note || "")}</p>
      <em>邮件：${emailStatusText(event.emailStatus)}</em>
    </article>
  `).join("") : `<p class="admin-empty">还没有使用记录。她使用小票券后，这里会出现时间和邮件状态。</p>`;
}

async function saveAdminCoupon(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const payload = {
    title: form.title.value.trim(),
    text: form.text.value.trim(),
    totalQuantity: Number(form.totalQuantity.value || 0),
    effectiveDate: form.effectiveDate.value,
    expiryDate: form.expiryDate.value
  };
  const id = form.couponId.value.trim();
  $("#adminCouponMessage").textContent = "正在保存...";
  try {
    const response = await fetch(id ? `/api/admin/coupons/${encodeURIComponent(id)}` : "/api/admin/coupons", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "保存失败");
    $("#adminCouponMessage").textContent = "已保存，她那边刷新后会看到最新状态。";
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
  if (action === "delete" && !window.confirm(`删除「${coupon.title}」？`)) return;

  const routes = {
    delete: { method: "DELETE", url: `/api/admin/coupons/${encodeURIComponent(id)}` },
    return: { method: "POST", url: `/api/admin/coupons/${encodeURIComponent(id)}/return`, body: { quantity: 1 } },
    use: { method: "POST", url: `/api/admin/coupons/${encodeURIComponent(id)}/use`, body: { note: "管理员手动登记使用。" } }
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
    if (!response.ok) throw new Error(data.error || "操作失败");
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
  $("#adminFormTitle").textContent = "编辑小票券";
  $("#adminCouponMessage").textContent = "";
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetAdminCouponForm(clearMessage = true) {
  const form = $("#couponAdminForm");
  adminEditingCouponId = "";
  form.reset();
  form.couponId.value = "";
  form.totalQuantity.value = 1;
  $("#adminFormTitle").textContent = "新增小票券";
  if (clearMessage) $("#adminCouponMessage").textContent = "";
}

function emailStatusText(status) {
  if (status === "sent") return "已发送";
  if (status === "failed") return "发送失败";
  return "未配置 SMTP，已记录在服务器";
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
      note: note || "这里会有新的故事。",
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
  $("#messageWall").innerHTML = state.messageWall.map((message) => `
    <article class="message-card">
      <i data-lucide="message-circle-heart"></i>
      <div>
        <h3>${escapeHtml(personalize(message.title))}</h3>
        <p>${escapeHtml(personalize(message.text))}</p>
      </div>
    </article>
  `).join("");
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
        <p>${locked ? `还有 ${diff} 天` : "现在可以打开"}</p>
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
    ? `这封信还在路上，${diff} 天后再拆。`
    : personalize(letter.body);
  $("#letterDialog").showModal();
  refreshIcons();
}

function bindSettings() {
  $("#settingsButton").addEventListener("click", () => {
    fillSettingsForm();
    $("#settingsDialog").showModal();
    refreshIcons();
  });

  $("#closeSettingsButton").addEventListener("click", () => $("#settingsDialog").close());

  $("#settingsForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    state.settings.partnerName = form.get("partnerName").trim() || DEFAULTS.settings.partnerName;
    state.settings.yourName = form.get("yourName").trim() || DEFAULTS.settings.yourName;
    state.settings.startDate = form.get("startDate") || DEFAULTS.settings.startDate;
    state.settings.birthday = form.get("birthday") || DEFAULTS.settings.birthday;
    state.settings.nextMeet = form.get("nextMeet") || DEFAULTS.settings.nextMeet;
    state.settings.heroLine = form.get("heroLine").trim() || DEFAULTS.settings.heroLine;
    state.settings.cityName = form.get("cityName").trim() || DEFAULTS.settings.cityName;
    state.settings.songUrl = form.get("songUrl").trim();
    state.settings.passcodes = String(form.get("passcodes") || "")
      .split(/[，,]/)
      .map((item) => item.trim())
      .filter(Boolean);
    if (!state.settings.passcodes.length) state.settings.passcodes = DEFAULTS.settings.passcodes;
    persist();
    renderAll();
    $("#settingsDialog").close();
  });
}

function fillSettingsForm() {
  const form = $("#settingsForm");
  if (!form) return;
  form.partnerName.value = state.settings.partnerName || "";
  form.yourName.value = state.settings.yourName || "";
  form.startDate.value = state.settings.startDate || "";
  form.birthday.value = state.settings.birthday || "";
  form.nextMeet.value = state.settings.nextMeet || "";
  form.passcodes.value = (state.settings.passcodes || []).join(", ");
  form.cityName.value = state.settings.cityName || "";
  form.songUrl.value = state.settings.songUrl || "";
  form.heroLine.value = state.settings.heroLine || "";
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
}

async function startMusic() {
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
      startSoftChimes();
    }
    musicState.playing = true;
    button.classList.add("solid");
    button.setAttribute("aria-label", "暂停音乐");
    button.innerHTML = `<i data-lucide="pause"></i>`;
  } catch {
    button.setAttribute("aria-label", "音乐没有播放成功");
  }
}

function stopMusic() {
  if (musicState.audio) musicState.audio.pause();
  if (musicState.timer) window.clearInterval(musicState.timer);
  musicState.timer = null;
  musicState.playing = false;
  const button = $("#musicButton");
  button.classList.remove("solid");
  button.setAttribute("aria-label", "播放音乐");
  button.innerHTML = `<i data-lucide="music"></i>`;
}

function startSoftChimes() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  if (!musicState.ctx) musicState.ctx = new AudioContext();
  const ctx = musicState.ctx;
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
  $("#easterText").textContent = `这一颗心为 ${state.settings.partnerName} 亮起来了。以后每个普通日子，都可以被我们偷偷变成纪念日。`;
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
