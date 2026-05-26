# 给她的小宇宙

一个带 Node 服务的专属情侣网站：私密入口、未来一周天气、回忆时间线、服务器相册、约会灵感、100 件情侣必做清单、地图足迹、留言墙、未来信、专属小票券和隐藏管理台。

## 本地运行

```powershell
npm install
npm start
```

打开：

```text
http://127.0.0.1:5173
```

她输入默认暗号 `0520`、`520`、`我爱你`、`shannon`、`Shannon` 进入专属页面。你输入默认后台密码：

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

如果服务器需要指定端口：

```bash
PORT=5173 npm start
```

Windows 服务器可用：

```powershell
$env:PORT="5173"
npm start
```

建议用 Nginx、宝塔、PM2 或服务器面板把域名反向代理到 `127.0.0.1:5173`。

## 隐藏管理台

同一个登录框有两个入口：

- 她输入她的暗号：进入专属页面。
- 你输入后台密码：进入隐藏管理台。

管理台可以修改：

- 后台密码
- 小票券新增、编辑、删除、可领取数量、生效日期、到期日期、退回和登记使用
- QQ 邮箱通知配置
- 回忆时间线
- 服务器相册照片
- 地图足迹
- 约会灵感
- 留言墙
- 未来信内容和几天后解锁

## QQ 邮箱通知

她使用小票券后，服务器会给你发邮件。管理台里填写：

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
- `uploads/photos/`：本地上传到服务器的照片
- `data/mail-config.json`：QQ 邮箱授权配置，已被忽略，不应公开
- `data/admin-config.json`：后台密码哈希，已被忽略，不应公开
- `data/coupon-events.json`：小票券使用记录，已被忽略，不应公开

部署到服务器后，记得定期备份 `data/` 和 `uploads/photos/`。
