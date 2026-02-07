"use client";

import { useEffect } from "react";

export default function GridBackground() {
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (media.matches) {
      root.style.setProperty("--mouse-x", "0.5");
      root.style.setProperty("--mouse-y", "0.5");
      return;
    }

    let targetX = 0.5;
    let targetY = 0.5;
    let currentX = 0.5;
    let currentY = 0.5;
    let rafId = 0;

    const update = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      root.style.setProperty("--mouse-x", currentX.toFixed(4));
      root.style.setProperty("--mouse-y", currentY.toFixed(4));
      rafId = window.requestAnimationFrame(update);
    };

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX / window.innerWidth;
      targetY = event.clientY / window.innerHeight;
    };

    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      targetX = touch.clientX / window.innerWidth;
      targetY = touch.clientY / window.innerHeight;
    };

    const onLeave = () => {
      targetX = 0.5;
      targetY = 0.5;
    };

    rafId = window.requestAnimationFrame(update);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <div className="grid-bg" aria-hidden="true" />;
}
