"use client";
import { useEffect, useRef, useCallback } from "react";

export default function CursorManager() {
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const handleMouse = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      // Detect hoverable elements
      let target = e.target as HTMLElement;
      let isHovering = false;
      while (target && target !== document.body) {
        if (
          target.tagName === "A" || target.tagName === "BUTTON" ||
          target.classList.contains("btn") || target.getAttribute("role") === "button" ||
          target.dataset.hoverable !== undefined
        ) {
          isHovering = true;
          break;
        }
        target = target.parentElement!;
      }
      ring.classList.toggle("hovering", isHovering);
    };

    const handleClick = () => {
      ring.classList.add("clicking");
      setTimeout(() => ring.classList.remove("clicking"), 200);
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mousedown", handleClick);

    const animate = () => {
      const dx = targetRef.current.x - posRef.current.x;
      const dy = targetRef.current.y - posRef.current.y;
      posRef.current.x += dx * 0.15;
      posRef.current.y += dy * 0.15;
      ring.style.transform = `translate(${posRef.current.x - 20}px, ${posRef.current.y - 20}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return <div ref={ringRef} className="cine-cursor-ring" aria-hidden="true" />;
}

export function useMagneticEffect() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.05;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const handleLeave = () => { el.style.transform = ""; };
    el.addEventListener("mousemove", handleMouse);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouse);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return ref;
}

export function useRippleEffect() {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const container = ref.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement("div");
    ripple.className = "ripple-effect";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x - size / 2}px`;
    ripple.style.top = `${y - size / 2}px`;
    container.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  }, []);

  return { ref, handleClick };
}
