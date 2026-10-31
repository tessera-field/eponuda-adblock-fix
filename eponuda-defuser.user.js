// ==UserScript==
// @name         Eponuda Adblock Fix
// @namespace    https://github.com/
// @version      1.0.0
// @description  Fixes eponuda.com when using content blockers by neutralizing anti-adblock detection and redirects.
// @match        *://*.eponuda.com/*
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==

(() => {
  const targetWindow = typeof unsafeWindow !== "undefined" ? unsafeWindow : window;

  try {
    for (const key of Object.keys(targetWindow.sessionStorage)) {
      if (key.includes("adshield") || key.startsWith("_fa_")) {
        targetWindow.sessionStorage.removeItem(key);
      }
    }
    for (const key of Object.keys(targetWindow.localStorage)) {
      if (key.includes("adshield") || key.startsWith("_fa_")) {
        targetWindow.localStorage.removeItem(key);
      }
    }
  } catch (e) {}

  const originalFunction = targetWindow.Function;
  const isAdShield = (code) => {
    return (
      typeof code === "string" &&
      (code.includes("html-load") ||
        code.includes("content-loader") ||
        code.includes("error-report") ||
        code.includes("Vital API") ||
        code.includes("nowprocket") ||
        code.includes("ad-shield") ||
        code.includes("adshield"))
    );
  };

  const createDummy = () => {
    return function (callback) {
      if (typeof callback === "function") {
        try {
          callback();
        } catch (e) {}
      }
    };
  };

  targetWindow.Function = new Proxy(originalFunction, {
    apply(target, thisArg, args) {
      if (isAdShield(args.join("\n"))) {
        return createDummy();
      }
      return Reflect.apply(target, thisArg, args);
    },
    construct(target, args) {
      if (isAdShield(args.join("\n"))) {
        return createDummy();
      }
      return Reflect.construct(target, args);
    }
  });

  const originalEval = targetWindow.eval;
  targetWindow.eval = function (code) {
    if (isAdShield(code)) {
      return createDummy();
    }
    return originalEval.apply(this, arguments);
  };

  const cleanup = () => {
    const overlays = document.querySelectorAll(
      'iframe[style*="2147483647"], iframe[style*="100vw"], iframe[src*="error-report.com"]'
    );
    overlays.forEach((el) => el.remove());
    if (document.documentElement) {
      document.documentElement.style.setProperty("overflow", "auto", "important");
    }
    if (document.body) {
      document.body.style.setProperty("overflow", "auto", "important");
    }
  };

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType === 1) {
          if (
            node.tagName === "SCRIPT" &&
            ((node.src && (node.src.includes("content-loader") || node.src.includes("html-load"))) ||
              node.hasAttribute("nowprocket") ||
              node.hasAttribute("data-sdk"))
          ) {
            node.removeAttribute("onerror");
            node.removeAttribute("onload");
            node.onerror = null;
            node.onload = null;
            node.src = "";
            node.remove();
          }
          if (
            node.tagName === "IFRAME" &&
            ((node.src && (node.src.includes("error-report") || node.src.includes("modal.html"))) ||
              (node.getAttribute("style") &&
                (node.getAttribute("style").includes("2147483647") ||
                  node.getAttribute("style").includes("100vw"))))
          ) {
            node.remove();
            cleanup();
          }
        }
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("DOMContentLoaded", cleanup);
  window.addEventListener("load", cleanup);
})();
