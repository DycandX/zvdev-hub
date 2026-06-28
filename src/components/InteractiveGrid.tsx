"use client";

import { useEffect, useRef } from "react";

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for user prefers-reduced-motion setting
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Grid config
    const gap = 40;
    const maxRadius = 150;
    const magneticPull = 8; // strength of dot pull toward mouse

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
    };

    // Smooth mouse coordinates tracking
    const handleMouseMove = (event: MouseEvent) => {
      mouse.targetX = event.clientX;
      mouse.targetY = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      drawGrid();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const drawGrid = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate mouse position for fluid animations
      if (!prefersReducedMotion) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      } else {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      }

      // Calculate grid offset to center it slightly
      const offsetX = (width % gap) / 2;
      const offsetY = (height % gap) / 2;

      for (let x = offsetX; x < width; x += gap) {
        for (let y = offsetY; y < height; y += gap) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let drawX = x;
          let drawY = y;
          let dotSize = 1;
          let color = "rgba(255, 255, 255, 0.05)";

          // Calculate interactive effects if mouse is within maxRadius
          if (distance < maxRadius) {
            const factor = 1 - distance / maxRadius; // 1 at mouse center, 0 at edge

            if (!prefersReducedMotion) {
              // Pull the dot toward the mouse (magnetic pull effect)
              drawX += (dx / distance) * factor * magneticPull;
              drawY += (dy / distance) * factor * magneticPull;
            }

            // Dot glows larger
            dotSize = 1.2 + factor * 2.8;

            // Interpolate color between cyan (center) and violet (edges of influence)
            const r = Math.round(6 + (133 - 6) * (1 - factor));
            const g = Math.round(182 + (92 - 182) * (1 - factor));
            const b = Math.round(212 + (246 - 212) * (1 - factor));
            const alpha = 0.06 + factor * 0.5;
            color = `rgba(${r}, ${g}, ${b}, ${alpha})`;

            // Draw a subtle outer glow ring under the dot for visual depth
            ctx.beginPath();
            ctx.arc(drawX, drawY, dotSize * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${factor * 0.15})`;
            ctx.fill();
          }

          // Draw the grid dot
          ctx.beginPath();
          ctx.arc(drawX, drawY, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }
    };

    const renderLoop = () => {
      drawGrid();
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    // Trigger initial render
    if (prefersReducedMotion) {
      drawGrid();
    } else {
      renderLoop();
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none h-full w-full bg-[#030712]"
    />
  );
}
