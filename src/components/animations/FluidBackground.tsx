import React, { useRef, useEffect } from 'react';

const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Simple Perlin-like noise
    const noise = (x: number, y: number, t: number) => {
      return (
        Math.sin(x * 0.01 + t * 0.3) * Math.cos(y * 0.01 + t * 0.2) * 0.5 +
        Math.sin(x * 0.02 - t * 0.1) * Math.cos(y * 0.015 + t * 0.15) * 0.3 +
        Math.sin((x + y) * 0.005 + t * 0.25) * 0.2
      );
    };

    const getTimeColors = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 12) {
        // Morning: warm gold
        return { r1: 255, g1: 165, b1: 0, r2: 34, g2: 139, b2: 230, r3: 255, g3: 215, b3: 0 };
      } else if (hour >= 12 && hour < 17) {
        // Afternoon: vibrant
        return { r1: 34, g1: 139, b1: 230, r2: 0, g2: 200, b2: 83, r3: 255, g3: 165, b3: 0 };
      } else if (hour >= 17 && hour < 21) {
        // Evening: warm sunset
        return { r1: 255, g1: 107, b1: 53, r2: 255, g2: 165, b2: 0, r3: 200, g3: 80, b3: 192 };
      } else {
        // Night: deep blue
        return { r1: 30, g1: 64, b1: 175, r2: 0, g2: 128, b2: 128, r3: 100, g3: 50, b3: 200 };
      }
    };

    const draw = () => {
      time += 0.008;
      const { width, height } = canvas;
      const colors = getTimeColors();

      // Create gradient layers
      const gradient1 = ctx.createRadialGradient(
        width * (0.3 + 0.2 * Math.sin(time * 0.5)),
        height * (0.3 + 0.2 * Math.cos(time * 0.3)),
        0,
        width * 0.5,
        height * 0.5,
        width * 0.8
      );
      gradient1.addColorStop(0, `rgba(${colors.r1}, ${colors.g1}, ${colors.b1}, 0.08)`);
      gradient1.addColorStop(1, `rgba(${colors.r1}, ${colors.g1}, ${colors.b1}, 0)`);

      const gradient2 = ctx.createRadialGradient(
        width * (0.7 + 0.2 * Math.cos(time * 0.4)),
        height * (0.6 + 0.2 * Math.sin(time * 0.35)),
        0,
        width * 0.5,
        height * 0.5,
        width * 0.7
      );
      gradient2.addColorStop(0, `rgba(${colors.r2}, ${colors.g2}, ${colors.b2}, 0.06)`);
      gradient2.addColorStop(1, `rgba(${colors.r2}, ${colors.g2}, ${colors.b2}, 0)`);

      const gradient3 = ctx.createRadialGradient(
        width * (0.5 + 0.3 * Math.sin(time * 0.6)),
        height * (0.4 + 0.3 * Math.cos(time * 0.45)),
        0,
        width * 0.5,
        height * 0.5,
        width * 0.6
      );
      gradient3.addColorStop(0, `rgba(${colors.r3}, ${colors.g3}, ${colors.b3}, 0.05)`);
      gradient3.addColorStop(1, `rgba(${colors.r3}, ${colors.g3}, ${colors.b3}, 0)`);

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, width, height);

      // Wave overlay
      ctx.beginPath();
      for (let x = 0; x < width; x += 4) {
        const y = height * 0.7 + noise(x, 0, time) * 40 + Math.sin(x * 0.01 + time) * 15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = `rgba(${colors.r1}, ${colors.g1}, ${colors.b1}, 0.03)`;
      ctx.fill();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};

export default FluidBackground;
