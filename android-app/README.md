# Android App

这是一个 Android WebView 外壳，负责像 App 一样直接打开服务器上的专属网站。Node 服务、后台管理、照片上传、邮件通知和小票券仍然运行在你的服务器上。

## 本地打包

需要先安装 Android Studio、Android SDK 和 JDK 17，然后在项目根目录执行：

```bash
gradle -p android-app :app:assembleDebug -PserverUrl=https://你的域名
```

App 启动后会直接进入这个网站地址，不再显示手动填写网址的跳转页。

APK 会生成在：

```text
android-app/app/build/outputs/apk/debug/app-debug.apk
```

如果只是用安卓模拟器连本机开发服务，可以不传 `serverUrl`，默认会打开：

```text
http://10.0.2.2:5173
```

真机使用时建议填 HTTPS 域名，例如：

```bash
gradle -p android-app :app:assembleDebug -PserverUrl=https://love.example.com
```

## GitHub 自动打包

进入 GitHub 仓库的 Actions，运行 `Android APK` 工作流，输入服务器地址。打包完成后在 workflow artifacts 里下载 `love-universe-android-debug`。安装后桌面名称是「给你的小宇宙」。
