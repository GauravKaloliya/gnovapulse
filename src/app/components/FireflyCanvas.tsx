"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number;
  life: number; maxLife: number;
}

export default function FireflyCanvas() {
  const fireflyRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<HTMLCanvasElement>(null);
  const lightfieldRef = useRef<HTMLCanvasElement>(null);

  // 36. Firefly Particles
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const canvas = fireflyRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement!;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.1,
      size: Math.random() * 2.5 + 1,
      alpha: 0.3 + Math.random() * 0.7,
      life: 0,
      maxLife: 100 + Math.random() * 200,
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life > p.maxLife || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 10;
          p.vx = (Math.random() - 0.5) * 0.3;
          p.vy = (Math.random() - 0.5) * 0.3 - 0.15;
          p.life = 0;
          p.alpha = 0.3 + Math.random() * 0.7;
        }

        const flicker = 0.5 + Math.sin(p.life * 0.05) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 153, 50, ${p.alpha * flicker * 0.8})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 153, 50, ${p.alpha * flicker * 0.12})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // 38. Data Stream
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const canvas = streamRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement!;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const CHARS = "01";
    const fontSize = 10;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.random() * 100);

    let animId: number;
    const animate = () => {
      ctx.fillStyle = "rgba(23, 43, 54, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 153, 50, 0.15)";
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // 40. Mouse-reactive Light Field
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const canvas = lightfieldRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      const parent = canvas.parentElement!;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const gridSize = 60;
    const points: { x: number; y: number; ox: number; oy: number }[] = [];

    const rebuildGrid = () => {
      points.length = 0;
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * gridSize + (Math.random() - 0.5) * 8;
          const oy = r * gridSize + (Math.random() - 0.5) * 8;
          points.push({ x: ox, y: oy, ox, oy });
        }
      }
    };
    rebuildGrid();

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleLeave = () => { mouse.x = -1000; mouse.y = -1000; };
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseleave", handleLeave);

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of points) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const force = (1 - dist / 150) * 6;
          p.x -= dx / dist * force;
          p.y -= dy / dist * force;
        } else {
          p.x += (p.ox - p.x) * 0.02;
          p.y += (p.oy - p.y) * 0.02;
        }

        const brightness = dist < 150 ? 1 - dist / 150 : 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 153, 50, ${0.08 + brightness * 0.25})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <>
      <canvas ref={fireflyRef} className="firefly-canvas" aria-hidden="true" />
      <canvas ref={streamRef} className="data-stream-canvas" aria-hidden="true" />
      <canvas ref={lightfieldRef} className="lightfield-canvas" aria-hidden="true" />
    </>
  );
}
