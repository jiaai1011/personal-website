# 贺佳琛 · 个人网站介绍视频 · 律动配乐版

Remotion 制作，1920 × 1080，30 fps，900 帧，30 秒。

分镜：0–4 秒个人肖像与姓名；4–7 秒山东菏泽；7–12 秒柳树生长；12–18 秒四段工作经历；18–25 秒生活照片；25–30 秒全息空间与结束语。

转场：横向推移、圆形扩展并推进、斜向遮罩、上推相册、横幅展开。转场保留两场画面重叠，避免中途黑场。经历每半秒、照片每四分之一秒依次入场。

原创合成电子配乐：120 BPM、立体声、和弦/拨弦旋律/低音/鼓组；柳树段减弱鼓点；4、7、12、18、25 秒的画面切换与节拍及过渡音效对齐，结尾渐弱。`make_music.py` 可重新生成配乐（需要 numpy）。无配音，不包含电话、邮箱、二维码或联系页面。

```sh
cd remotion
npm install
npx remotion studio src/index.tsx
npx remotion render src/index.tsx JiachenIntro2026 intro.mp4 --codec h264 --crf 18 --gl angle
```

Three.js 使用 MIT 许可证，见 `THREE-LICENSE.txt`。

画面修正：太空渐变和星点只用于太空场景，避免深色背景层覆盖柳树与土地，消除中间偏右的黑斑。
