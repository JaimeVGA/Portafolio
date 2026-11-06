import React, { useRef, useEffect, useCallback } from 'react';

interface RevealPortraitProps {
  base: string;
  reveal: string;
  alt: string;
  className?: string;
}

export const RevealPortrait: React.FC<RevealPortraitProps> = ({
  base,
  reveal,
  alt,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    revealImg: HTMLImageElement | null;
    maskCanvas: HTMLCanvasElement | null;
    maskCtx: CanvasRenderingContext2D | null;
    pointer: { x: number; y: number } | null;
    last: { x: number; y: number } | null;
    energy: number;
    raf: number;
    dpr: number;
    w: number;
    h: number;
  }>({
    revealImg: null,
    maskCanvas: null,
    maskCtx: null,
    pointer: null,
    last: null,
    energy: 0,
    raf: 0,
    dpr: 1,
    w: 0,
    h: 0
  });

  // Preload reveal image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = reveal;
    img.onload = () => {
      stateRef.current.revealImg = img;
    };
  }, [reveal]);

  // Resize canvas according to container
  const resize = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const state = stateRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.w = rect.width;
    state.h = rect.height;

    canvas.width = Math.round(rect.width * state.dpr);
    canvas.height = Math.round(rect.height * state.dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // Internal low-res mask for fluid performance
    const scale = 0.5;
    const maskW = Math.max(1, Math.round(rect.width * scale));
    const maskH = Math.max(1, Math.round(rect.height * scale));

    const mask = document.createElement('canvas');
    mask.width = maskW;
    mask.height = maskH;
    state.maskCanvas = mask;
    state.maskCtx = mask.getContext('2d', { willReadFrequently: true });

    // Ensure visible canvas is crystal clear initially
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  useEffect(() => {
    resize();
    const handleResize = () => resize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [resize]);

  // Main render loop for scratch mask and decay
  const render = useCallback(() => {
    const state = stateRef.current;
    state.raf = 0;
    const canvas = canvasRef.current;
    if (!canvas || !state.maskCtx || !state.maskCanvas || !state.revealImg) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const maskCtx = state.maskCtx;
    const mw = state.maskCanvas.width;
    const mh = state.maskCanvas.height;

    // If pointer is active, draw scratch trail
    if (state.pointer) {
      state.energy = 1.0;
      const p = state.pointer;
      const last = state.last || p;
      const dist = Math.hypot(p.x - last.x, p.y - last.y);
      const steps = Math.max(1, Math.ceil(dist / 5));
      const scale = mw / state.w;

      for (let i = 1; i <= steps; i++) {
        const u = i / steps;
        const x = (last.x + (p.x - last.x) * u) * scale;
        const y = (last.y + (p.y - last.y) * u) * scale;
        const brushSize = 95 * scale;

        const radGrad = maskCtx.createRadialGradient(x, y, 0, x, y, brushSize);
        radGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
        radGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.85)');
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        maskCtx.fillStyle = radGrad;
        maskCtx.beginPath();
        maskCtx.arc(x, y, brushSize, 0, Math.PI * 2);
        maskCtx.fill();
      }

      state.last = { ...p };
    } else {
      // Heal the mask smoothly over a few seconds
      maskCtx.globalCompositeOperation = 'destination-out';
      maskCtx.fillStyle = 'rgba(0, 0, 0, 0.015)';
      maskCtx.fillRect(0, 0, mw, mh);
      maskCtx.globalCompositeOperation = 'source-over';

      state.energy -= 0.008;
      if (state.energy <= 0) {
        state.energy = 0;
        // 100% clean clear: completely removes any residual pixels
        maskCtx.clearRect(0, 0, mw, mh);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return; // Halt render loop until next pointer action
      }
    }

    // Now composite onto visible canvas
    const dpr = state.dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Compute aspect-fit for the reveal image (e.g. Spiderman)
    const imgRatio = state.revealImg.width / state.revealImg.height;
    const containerRatio = state.w / state.h;
    let rw, rh, rx, ry;

    if (imgRatio > containerRatio) {
      rw = state.w;
      rh = state.w / imgRatio;
      rx = 0;
      ry = state.h - rh;
    } else {
      rh = state.h;
      rw = state.h * imgRatio;
      rx = (state.w - rw) / 2;
      ry = 0;
    }

    // Draw reveal image
    ctx.drawImage(
      state.revealImg,
      rx * dpr,
      ry * dpr,
      rw * dpr,
      rh * dpr
    );

    // Mask it with our scratch mask
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(state.maskCanvas, 0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';

    // Continue loop if energy remains or pointer active
    state.raf = requestAnimationFrame(render);
  }, []);

  const kick = useCallback(() => {
    const state = stateRef.current;
    if (!state.raf) {
      state.raf = requestAnimationFrame(render);
    }
  }, [render]);

  const handlePointerMove = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    stateRef.current.pointer = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    kick();
  };

  const handlePointerLeave = () => {
    stateRef.current.pointer = null;
    stateRef.current.last = null;
    kick();
  };

  return (
    <div
      ref={containerRef}
      className={`reveal-portrait ${className}`}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <img
        src={base}
        alt={alt}
        draggable={false}
        loading="eager"
      />
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
};
