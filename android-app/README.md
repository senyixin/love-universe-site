# Android App

这是一个原生 Android App，不再用 WebView 打开网页。App 会直接请求服务器上的 Node API，自己绘制暗号入口、天气、互动信号、约会计划、小票券、留言本、留言墙和未来信。后台管理、数据备份、照片上传和邮箱配置仍然运行在服务器网站后台。

## 本地打包

需要先安装 Android Studio、Android SDK 和 JDK 17，然后在项目根目录执行：

```bash
gradle -p android-app :app:assembleDebug -PserverUrl=https://你的域名
```

App 启动后会连接这个服务器地址读取数据，通过她的暗号进入原生页面，不再跳转网页。

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
