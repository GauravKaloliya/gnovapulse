"use client";
import { useEffect, useRef } from "react";

export default function PathDrawingSVG({ children, className, delay = 0, width, height, viewBox }: { children: React.ReactNode; className?: string; delay?: number; width?: string | number; height?: string | number; viewBox?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const paths = svg.querySelectorAll("path");
    paths.forEach((path, i) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
      path.style.transition = `stroke-dashoffset 1.2s ease-out ${delay + i * 0.15}s`;
      requestAnimationFrame(() => {
        path.style.strokeDashoffset = "0";
      });
    });
  }, [delay]);

  return (
    <svg ref={svgRef} className={className} aria-hidden="true" width={width} height={height} viewBox={viewBox}>
      {children}
    </svg>
  );
}
