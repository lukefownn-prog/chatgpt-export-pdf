# ChatGPT Export to PDF

一個瀏覽器使用者腳本（userscript），在 [ChatGPT](https://chatgpt.com) 網頁對話畫面右下角加入「匯出 PDF」按鈕，
一鍵將目前對話內容整理成乾淨版面，並透過瀏覽器內建的「列印 → 另存為 PDF」功能匯出成 PDF 檔案。

因為 ChatGPT 網頁版目前沒有原生的匯出 PDF 功能，所以做了這個工具來補足。

## 特色

- 自動移除側邊欄、按鈕、圖示等雜訊，只保留對話內容
- 依照「使用者 / ChatGPT」角色套用不同顏色區塊，方便閱讀
- 保留程式碼區塊、表格、圖片等格式
- 純前端腳本，不上傳任何資料到第三方伺服器，所有處理都在您自己的瀏覽器內完成

## 安裝方式

### 方式一：Tampermonkey（推薦）

1. 安裝瀏覽器擴充功能 [Tampermonkey](https://www.tampermonkey.net/)
   （[Edge 版本](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) /
   [Chrome 版本](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)）
2. 點擊 Tampermonkey 圖示 → 「建立新指令碼」
3. 將本專案 [`chatgpt-export-pdf.user.js`](./chatgpt-export-pdf.user.js) 的內容全部貼上並儲存
4. 重新整理 [chatgpt.com](https://chatgpt.com)，右下角會出現「匯出 PDF」按鈕

### 方式二：手動貼上 Console（單次使用，不需安裝擴充功能）

1. 開啟要匯出的 ChatGPT 對話頁面
2. 按 `F12` 開啟開發人員工具，切到 Console 分頁
3. 複製 `chatgpt-export-pdf.user.js` 中 `(function () { ... })();` 的主體（略過檔案最上方的 `// ==UserScript==` 中繼資料註解區塊）
4. 貼上並按 Enter 執行
5. 右下角出現按鈕後即可使用（重新整理頁面後需要再貼一次）

## 使用方式

1. 點擊右下角的「匯出 PDF」按鈕
2. 瀏覽器會開啟新分頁顯示整理過的對話內容
3. 稍候會自動彈出列印對話框，於「目的地／印表機」選擇 **另存為 PDF**
4. 按下儲存，選擇存檔位置即完成匯出

> 若瀏覽器封鎖了彈出視窗，請允許 chatgpt.com 的彈出視窗權限後再重試一次。

## 已知限制

- ChatGPT 網頁版的 HTML 結構若日後改版，本腳本使用的 `[data-message-author-role]` 選擇器可能需要跟著調整
- 只會擷取「目前畫面上已渲染出來」的訊息；若對話很長，請先將整段對話從頭捲動到底，確保所有訊息都已載入，再進行匯出
- 互動式元件（例如可執行的程式碼沙盒、動態圖表）不會保留其互動性，只會保留其中的文字或截圖內容

## 授權

[MIT License](./LICENSE)
