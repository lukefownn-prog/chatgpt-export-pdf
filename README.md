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


# ChatGPT Export to PDF

A browser userscript that adds an **"Export PDF"** button to the bottom-right corner of the **ChatGPT** web interface.

With a single click, it converts the current conversation into a clean, print-friendly layout and uses your browser's built-in **Print → Save as PDF** feature to generate a PDF file.

Since the ChatGPT web interface does not currently provide a native **Export to PDF** feature, this tool was created to fill that gap.

## Features

* Automatically removes the sidebar, buttons, icons, and other UI elements, leaving only the conversation content.
* Displays **User** and **ChatGPT** messages in different colored sections for improved readability.
* Preserves code blocks, tables, images, and other supported formatting.
* Runs entirely on the client side. No data is uploaded to any third-party server—everything is processed locally in your own browser.

## Installation

### Option 1: Tampermonkey (Recommended)

1. Install the **Tampermonkey** browser extension.

   * **Edge:** https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd
   * **Chrome:** https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
2. Click the Tampermonkey icon and select **Create a New Script**.
3. Copy the entire contents of `chatgpt-export-pdf.user.js` from this repository and paste it into the editor.
4. Save the script.
5. Refresh **https://chatgpt.com**. An **Export PDF** button will appear in the bottom-right corner of the page.

### Option 2: Run via the Browser Console (One-Time Use)

No browser extension is required.

1. Open the ChatGPT conversation you want to export.
2. Press **F12** to open the Developer Tools, then switch to the **Console** tab.
3. Copy the main body of `chatgpt-export-pdf.user.js` (the `(function () { ... })();` section), excluding the `// ==UserScript==` metadata block at the top.
4. Paste the code into the Console and press **Enter**.
5. Once the **Export PDF** button appears, you can use it immediately. Note that you'll need to repeat these steps after refreshing the page.

## Usage

1. Click the **Export PDF** button in the bottom-right corner.
2. A new browser tab will open, displaying a clean, formatted version of the conversation.
3. The browser's Print dialog will automatically appear.
4. Select **Save as PDF** (or an equivalent PDF printer) as the destination.
5. Choose a save location and click **Save** to export the conversation.

> If your browser blocks pop-up windows, please allow pop-ups for **chatgpt.com** and try again.

## Known Limitations

* If the ChatGPT website changes its HTML structure in future updates, the script's `[data-message-author-role]` selector may need to be updated accordingly.
* Only messages that have already been rendered on the page can be exported. For very long conversations, scroll from the beginning to the end first to ensure all messages have been loaded before exporting.
* Interactive elements (such as executable code sandboxes or dynamic charts) cannot retain their interactivity in the exported PDF. Only their rendered text or static content will be preserved.

