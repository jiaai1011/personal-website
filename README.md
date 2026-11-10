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
