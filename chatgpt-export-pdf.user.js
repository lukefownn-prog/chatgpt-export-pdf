// ==UserScript==
// @name         ChatGPT 對話匯出 PDF
// @namespace    local.chatgpt.export
// @version      1.0
// @description  在 ChatGPT 網頁對話畫面右下角新增一個按鈕，點擊後產生乾淨的列印版面，並開啟瀏覽器「列印」對話框，選擇「另存為 PDF」即可匯出目前聊天記錄。
// @match        https://chatgpt.com/*
// @match        https://chat.openai.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const BTN_ID = 'cgpt-export-pdf-btn';

  function injectButton() {
    if (document.getElementById(BTN_ID)) return;

    const btn = document.createElement('button');
    btn.id = BTN_ID;
    btn.textContent = '匯出 PDF';
    Object.assign(btn.style, {
      position: 'fixed',
      right: '20px',
      bottom: '20px',
      zIndex: 999999,
      padding: '10px 16px',
      background: '#10a37f',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
    });
    btn.addEventListener('click', exportToPdf);
    document.body.appendChild(btn);
  }

  function getConversationTitle() {
    const titleEl = document.querySelector('title');
    let t = titleEl ? titleEl.textContent.trim() : 'ChatGPT對話';
    t = t.replace(/[\\/:*?"<>|]/g, '_');
    return t || 'ChatGPT對話';
  }

  function collectMessages() {
    // ChatGPT 對話中的每則訊息都帶有 data-message-author-role 屬性
    const nodes = document.querySelectorAll('[data-message-author-role]');
    const messages = [];

    nodes.forEach((node) => {
      const role = node.getAttribute('data-message-author-role');
      const clone = node.cloneNode(true);

      // 移除操作按鈕、複製/重新產生等互動元件與圖示
      clone.querySelectorAll('button, svg, [role="toolbar"], textarea').forEach((el) => el.remove());

      const html = clone.innerHTML.trim();
      if (html) {
        messages.push({ role, html });
      }
    });

    return messages;
  }

  function buildPrintableHtml(messages, title) {
    const roleLabel = (role) => {
      if (role === 'user') return '使用者';
      if (role === 'assistant') return 'ChatGPT';
      if (role === 'system') return '系統';
      return role;
    };

    const body = messages
      .map((m) => {
        return `
          <div class="msg msg-${m.role}">
            <div class="msg-role">${roleLabel(m.role)}</div>
            <div class="msg-content">${m.html}</div>
          </div>
        `;
      })
      .join('\n');

    return `
      <!DOCTYPE html>
      <html lang="zh-Hant">
      <head>
      <meta charset="UTF-8" />
      <title>${title}</title>
      <style>
        @page { margin: 18mm 14mm; }
        body {
          font-family: -apple-system, "Microsoft JhengHei", "PingFang TC", "Segoe UI", sans-serif;
          font-size: 13px;
          line-height: 1.6;
          color: #111;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1.doc-title {
          font-size: 18px;
          margin-bottom: 20px;
          border-bottom: 2px solid #333;
          padding-bottom: 8px;
        }
        .msg {
          margin-bottom: 18px;
          page-break-inside: avoid;
        }
        .msg-role {
          font-weight: 700;
          font-size: 12px;
          margin-bottom: 4px;
          color: #555;
        }
        .msg-user .msg-role { color: #0b6b53; }
        .msg-assistant .msg-role { color: #7a3fd6; }
        .msg-content {
          padding: 10px 14px;
          border-radius: 8px;
          background: #f5f5f7;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .msg-user .msg-content { background: #eaf6f2; }
        .msg-assistant .msg-content { background: #f3eefb; }
        pre {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 10px;
          border-radius: 6px;
          overflow-x: auto;
          white-space: pre-wrap;
          word-wrap: break-word;
          font-size: 11px;
        }
        code {
          font-family: Consolas, Menlo, monospace;
        }
        img { max-width: 100%; }
        table { border-collapse: collapse; width: 100%; margin: 8px 0; }
        table, th, td { border: 1px solid #ccc; }
        th, td { padding: 6px 10px; }
      </style>
      </head>
      <body>
        <h1 class="doc-title">${title}</h1>
        ${body}
      </body>
      </html>
    `;
  }

  function exportToPdf() {
    const messages = collectMessages();
    if (messages.length === 0) {
      alert('找不到對話內容，請確認目前頁面是否為 ChatGPT 對話畫面。');
      return;
    }

    const title = getConversationTitle();
    const html = buildPrintableHtml(messages, title);

    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('請允許瀏覽器彈出視窗，才能產生列印版面。');
      return;
    }
    printWin.document.open();
    printWin.document.write(html);
    printWin.document.close();

    // 等待內容（含圖片）載入後再叫出列印對話框
    printWin.onload = () => {
      setTimeout(() => {
        printWin.focus();
        printWin.print();
      }, 400);
    };
  }

  // 監控頁面變化（ChatGPT 是 SPA，切換對話不會整頁重新載入）
  const observer = new MutationObserver(() => injectButton());
  observer.observe(document.body, { childList: true, subtree: true });
  injectButton();
})();
