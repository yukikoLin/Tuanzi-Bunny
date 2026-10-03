# Tuanzi Bunny 官方網站

小糰兔官方網站的第一幕 Hero 原型：柔和藍天、不同速度漂移的雲朵，以及使用原始 `float_bunny.psd` 匯出的透明 PNG 角色。

## 本地預覽

這是零建置步驟的靜態網站。在專案根目錄啟動任一靜態伺服器即可：

```bash
python3 -m http.server 8000
```

接著開啟 `http://localhost:8000`。

## GitHub Pages

在 repository 的 **Settings → Pages** 中，將來源設為 **Deploy from a branch**，選擇 `main` branch 與 `/ (root)` 即可。

## 結構

```text
.
├── index.html              # 場景語意與 Hero 內容
├── styles.css              # 天空、雲朵、角色與響應式動畫
├── script.js               # 輕量 scroll parallax 基礎
└── assets/
    └── float-bunny.png     # PSD 匯出的透明角色素材
```

後續場景可沿用 `.scene` 區塊，並用 `data-parallax` 調整元素的 scroll 速度；若改用 GSAP ScrollTrigger，也能保留目前的場景分層與 HTML 結構。
