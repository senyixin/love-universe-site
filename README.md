# 给她的小宇宙

一个带 Node 服务的专属情侣网站：私密入口、未来一周天气、回忆时间线、服务器相册、互动信号站、约会灵感、100 件情侣必做清单、实用小助手、地图足迹、双向留言本、未来信、专属小票券和隐藏管理台。

## 本地运行

```powershell
npm install
npm start
```

打开：

```text
http://127.0.0.1:5173
```

她输入你在后台「小设定」里配置的暗号进入专属页面。你输入默认后台密码：

```text
only-you-1314520
```

会进入隐藏管理台。正式部署后请先在管理台修改后台密码。

## 服务器部署

把压缩包上传到服务器后解压，在目录里执行：

```bash
npm install --omit=dev
npm start
```

服务默认监听 `0.0.0.0:5173`，服务器外网访问不到时，先检查云服务器安全组、防火墙和面板端口是否放行 `5173`。如果服务器需要指定端口或监听地址：

```bash
HOST=0.0.0.0 PORT=5173 npm start
```

Windows 服务器可用：

```powershell
$env:HOST="0.0.0.0"
$env:PORT="5173"
npm start
```

建议用 Nginx、宝塔、PM2 或服务器面板把域名反向代理到 `127.0.0.1:5173`。

## 高德天气

天气已经改成服务端调用高德 Web 服务 API。把你的高德 Key 配到服务器环境变量，或在项目根目录新建 `.env`：

```bash
AMAP_WEATHER_KEY="你的高德Web服务Key"
```

也兼容 `GAODE_WEATHER_KEY` 或 `AMAP_KEY`。默认城市是新沂市，后台「小设定」里可以改城市名、经纬度和高德城市 `adcode`，新沂市的 `adcode` 是 `320381`。改完后重启 Node/PM2/宝塔里的这个服务。

## 安卓 App

项目里已经包含 `android-app/`，它会像 App 一样直接打开服务器上的专属网站，主要使用网站的手机端排版。后台、照片上传、邮件配置和数据备份仍然由服务器网站处理，安装后桌面名称是「给你的小宇宙」。

在 GitHub 仓库的 Actions 里运行 `Android APK`，输入你的服务器地址，比如：

```text
https://你的域名
```

打包完成后下载 `love-universe-android-debug`，里面的 `app-debug.apk` 就可以安装测试。也可以本地安装 Android Studio、Android SDK 和 JDK 17 后执行：

```bash
gradle -p android-app :app:assembleDebug -PserverUrl=https://你的域名
```

## 隐藏管理台

同一个登录框有两个入口：

- 她输入她的暗号：进入专属页面。
- 你输入后台密码：进入隐藏管理台。

管理台可以修改：

- 后台密码
- 小设定：她的称呼、你的称呼、纪念日、生日、下次见面、暗号、默认城市、音乐链接、首页句子
- 小票券新增、编辑、删除、置顶、排序、可领取数量、生效日期、到期日期、退回和登记使用
- QQ 邮箱通知配置
- 回忆时间线内容和自由排序
- 服务器相册照片
- 地图足迹内容和自由排序
- 互动信号站、约会计划表、点餐盲盒、礼物备忘
- 约会灵感和可扩展功能盒子（默认含随机点餐盲盒）
- 双向留言本回复、隐藏和删除
- 留言墙内容和自由排序
- 未来信内容、几天后解锁和自由排序
- 数据导入导出备份

## QQ 邮箱通知

她使用小票券、点击互动信号、提交留言本后，服务器会给你发邮件。管理台里填写：

- QQ 邮箱账号：你的 `xxxx@qq.com`
- SMTP 授权码：QQ 邮箱设置里生成的授权码，不是 QQ 密码
- 收件邮箱：接收提醒的邮箱
- 发件显示邮箱：通常填同一个 QQ 邮箱

也可以用环境变量：

```bash
ADMIN_EMAIL_TO="你的收件邮箱" \
SMTP_HOST="smtp.qq.com" \
SMTP_PORT="465" \
SMTP_USER="你的QQ邮箱" \
SMTP_PASS="QQ邮箱SMTP授权码" \
SMTP_FROM="你的QQ邮箱" \
npm start
```

管理台保存的 QQ 邮箱配置优先于环境变量。

## 数据位置

- `data/site-content.json`：后台可编辑的网站内容
- `data/coupons.json`：小票券数据
- `data/photos.json`：服务器相册元数据
- `data/guestbook.json`：双向留言本
- `uploads/photos/`：本地上传到服务器的照片
- `data/mail-config.json`：QQ 邮箱授权配置，已被忽略，不应公开
- `data/admin-config.json`：后台密码哈希，已被忽略，不应公开
- `data/coupon-events.json`：小票券使用记录，已被忽略，不应公开
- `data/mood-events.json`：心情点击记录，已被忽略，不应公开

后台「数据导入导出」可以导出 JSON 备份并导回服务器。部署到服务器后，仍建议定期备份 `data/` 和 `uploads/photos/`。
