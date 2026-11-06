import React, { useRef, useEffect, useState } from 'react';

interface HeroCutoutProps {
  portraitUrl: string;
  name: string;
}

export const HeroCutout: React.FC<HeroCutoutProps> = ({ portraitUrl, name }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Dynamic cyber particle / radar effect over photo
    let particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render scanning radar line when hovered
      if (isHovered && coords) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(coords.x, coords.y, 0, coords.x, coords.y, 140);
        gradient.addColorStop(0, 'rgba(255, 77, 46, 0.45)');
        gradient.addColorStop(0.5, 'rgba(255, 138, 61, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 77, 46, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(coords.x, coords.y, 140, 0, Math.PI * 2);
        ctx.fill();

        // Crosshair target
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(coords.x - 15, coords.y);
        ctx.lineTo(coords.x + 15, coords.y);
        ctx.moveTo(coords.x, coords.y - 15);
        ctx.lineTo(coords.x, coords.y + 15);
        ctx.stroke();
      }

      // Draw subtle particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHovered, coords]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCoords(null);
      }}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-[420px] aspect-[4/5] mx-auto rounded-2xl overflow-hidden group select-none border border-[var(--border)] glass"
      style={{
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
      }}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent z-10 opacity-70" />

      {/* Main Image */}
      <img
        src={portraitUrl}
        alt={`Retrato de ${name}`}
        className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
        loading="eager"
      />

      {/* Interactive Canvas Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none" />

      {/* Corner Blueprint Elements */}
      <div className="absolute top-3 left-3 z-30 font-mono text-[10px] text-[var(--accent)] bg-black/60 px-2 py-0.5 rounded border border-[var(--accent)]/30 backdrop-blur-sm">
        CAM_01 // LIVE
      </div>

      <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between font-mono text-[11px] text-[var(--fg-dim)] bg-black/70 px-3 py-1.5 rounded-lg border border-[var(--border)] backdrop-blur-md">
        <span>{isHovered ? 'TARGET: ACQUIRED' : 'PASA EL CURSOR'}</span>
        <span className="text-[var(--accent)] font-semibold">
          {coords ? `${Math.round(coords.x)}, ${Math.round(coords.y)}` : 'SCANNER: READY'}
        </span>
      </div>

      {/* Scanline line animation */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent z-20 animate-pulse pointer-events-none opacity-40 top-1/2" />
    </div>
  );
};
