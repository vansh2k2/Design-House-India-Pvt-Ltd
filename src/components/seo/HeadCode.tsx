"use client";

import { useEffect } from "react";

export default function HeadCode({ code }: { code?: string }) {
  useEffect(() => {
    if (!code || typeof document === "undefined") return;
    const container = document.createElement("div");
    container.innerHTML = code.trim();
    const elements: Node[] = [];

    Array.from(container.children).forEach((child) => {
      if (child.tagName === "SCRIPT") {
        const script = document.createElement("script");
        Array.from((child as HTMLScriptElement).attributes).forEach((attr) => {
          script.setAttribute(attr.name, attr.value);
        });
        script.text = (child as HTMLScriptElement).text || child.innerHTML;
        if (document.head) {
          document.head.appendChild(script);
          elements.push(script);
        }
      } else {
        const cloned = child.cloneNode(true);
        if (document.head) {
          document.head.appendChild(cloned);
          elements.push(cloned);
        }
      }
    });

    return () => {
      elements.forEach((el) => {
        try {
          if (el && el.parentNode) el.parentNode.removeChild(el);
        } catch {}
      });
    };
  }, [code]);

  return null;
}
