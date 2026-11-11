# 贺佳琛的个人网站

个人介绍、开场动画与全息互动空间，使用 HTML、CSS、JavaScript 和 Three.js 实现。

- 网页链接：https://he-jiachen-home-1109.oakendelta8.chatgpt.site
- GitHub 仓库：https://github.com/jiaai1011/personal-website

## 本地运行

在项目目录运行：

```sh
python3 -m http.server 8080
```

浏览器打开 http://localhost:8080 。动画加载本地模块和 JSON 数据，请通过 HTTP 服务访问。

## 文件说明

- `index.html`：网页结构、样式和基础交互。
- `intro-film.js`：Three.js 开场动画。
- `starfield.js`、`holo-effects.js`：星空及全息交互效果。
- `ocean.js`、`ocean-scene.js`：海洋视觉脚本。
- 图片、SVG 与 `shandong.json`：页面素材和地图数据。
- `vendor/`：Three.js 模块及许可证。

这是无需构建的静态网站，部署时上传本目录的网页和资源文件即可。

## 30 秒个人介绍视频

[查看 MP4 视频](videos/he-jiachen-intro-30s.mp4) · [下载视频](https://github.com/jiaai1011/personal-website/raw/refs/heads/main/videos/he-jiachen-intro-30s.mp4)

1920 × 1080 横屏，30 秒，包含原创电子配乐和节奏转场，已修正柳树场景的背景黑斑；不含联系方式。使用 Remotion 制作。

## 视频源码与播放页

- [Remotion 视频工程](remotion/)：完整分镜、转场、柳树动画、照片和配乐，支持修改与导出。
- [视频播放页源码](video/index.html)：响应式 HTML 播放器，支持在线播放与下载。
- [在线观看](https://he-jiachen-home-1109.oakendelta8.chatgpt.site/video/)

编辑视频：

```sh
cd remotion
npm install
npm run studio
# 导出 MP4
npm run render
```

预览播放页：在仓库根目录启动上面的 HTTP 服务，然后访问 `/video/`。
