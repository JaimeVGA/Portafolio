import React, { useState, useEffect, useRef, useCallback } from 'react';
import { personalInfo } from '../data/portfolioData';
import { RevealPortrait } from './RevealPortrait';

// Agent definitions
const AGENTS = {
  layout: { name: 'Layout', color: 'var(--agent-layout)' },
  type: { name: 'Tipografía', color: 'var(--agent-type)' },
  photo: { name: 'Foto', color: 'var(--agent-photo)' },
  copy: { name: 'Copy', color: 'var(--agent-copy)' },
  ui: { name: 'UI', color: 'var(--agent-ui)' }
};

type AgentKey = keyof typeof AGENTS;

interface AgentState {
  x: number;
  y: number;
  opacity: number;
}

interface BoxState {
  x: number;
  y: number;
  w: number;
  h: number;
  agent: AgentKey;
  label: string;
}

export const HeroAgentic: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  const [built, setBuilt] = useState<boolean>(false);
  const [running, setRunning] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [logs, setLogs] = useState<{ id: number; text: string }[]>([
    { id: 0, text: '5 agentes conectados · construyendo portafolio' }
  ]);

  // Phases for each module (0: hidden, 1: wireframe/measuring, 2: building, 3: completed)
  const [phases, setPhases] = useState<{ [key: string]: number }>({
    grid: 0,
    nav: 0,
    word: 0,
    photo: 0,
    hello: 0,
    name: 0,
    meta: 0,
    side: 0,
    cta: 0
  });

  // Agents position state
  const [agents, setAgents] = useState<{ [key in AgentKey]: AgentState }>({
    layout: { x: 0, y: 0, opacity: 1 },
    type: { x: 0, y: 0, opacity: 1 },
    photo: { x: 0, y: 0, opacity: 1 },
    copy: { x: 0, y: 0, opacity: 1 },
    ui: { x: 0, y: 0, opacity: 1 }
  });

  // Active selection bounding boxes
  const [boxes, setBoxes] = useState<{ [key: string]: BoxState }>({});

  // Typewriter text for name
  const [typedName, setTypedName] = useState<string>('');
  const fullName = personalInfo.name.toUpperCase();

  // Helper to measure an element relative to container
  const measure = useCallback((key: string) => {
    const el = elementsRef.current[key];
    const root = containerRef.current;
    if (!el || !root) return null;
    const r = el.getBoundingClientRect();
    const c = root.getBoundingClientRect();
    return {
      x: r.left - c.left,
      y: r.top - c.top,
      w: r.width,
      h: r.height
    };
  }, []);

  // Register element ref
  const setRef = (key: string) => (el: HTMLElement | null) => {
    elementsRef.current[key] = el;
  };

  // Skip animation
  const handleSkip = useCallback(() => {
    setRunning(false);
    setProgress(1);
    setPhases({
      grid: 3,
      nav: 3,
      word: 3,
      photo: 3,
      hello: 3,
      name: 3,
      meta: 3,
      side: 3,
      cta: 3
    });
    setBoxes({});
    setTypedName(fullName);
    setBuilt(true);
    // Hide agents
    setAgents((prev) => {
      const next = { ...prev };
      (Object.keys(next) as AgentKey[]).forEach((k) => {
        next[k].opacity = 0;
      });
      return next;
    });
  }, [fullName]);

  // Replay animation
  const handleReplay = useCallback(() => {
    setBuilt(false);
    setProgress(0);
    setRunning(true);
    setTypedName('');
    setBoxes({});
    setPhases({
      grid: 0,
      nav: 0,
      word: 0,
      photo: 0,
      hello: 0,
      name: 0,
      meta: 0,
      side: 0,
      cta: 0
    });
    setLogs([{ id: Date.now(), text: '5 agentes conectados · reconstruyendo portafolio' }]);
  }, []);

  // Animation timeline runner
  useEffect(() => {
    if (!running) return;

    const root = containerRef.current;
    if (!root) return;

    const cw = root.clientWidth || window.innerWidth;
    const ch = root.clientHeight || window.innerHeight;

    // Start with all 5 agents clustered in the center (Frame 00:00 of video!)
    const cx = cw / 2;
    const cy = ch / 2;

    setAgents({
      layout: { x: cx - 25, y: cy - 25, opacity: 1 },
      type: { x: cx + 25, y: cy - 25, opacity: 1 },
      photo: { x: cx, y: cy, opacity: 1 },
      copy: { x: cx - 25, y: cy + 25, opacity: 1 },
      ui: { x: cx + 25, y: cy + 25, opacity: 1 }
    });

    const timers: (number | ReturnType<typeof setTimeout>)[] = [];

    // Orchestrated timeline events (matches video timeline)
    const schedule = (ms: number, fn: () => void) => {
      timers.push(setTimeout(fn, ms));
    };

    // Progress ticker
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 1) {
          clearInterval(progressInterval);
          return 1;
        }
        return p + 0.02;
      });
    }, 100);
    timers.push(progressInterval);

    // t=300ms: Layout moves to top-left of grid
    schedule(300, () => {
      setAgents((prev) => ({
        ...prev,
        layout: { x: 40, y: 70, opacity: 1 }
      }));
    });

    // t=600ms: Grid phase 1
    schedule(600, () => {
      setPhases((p) => ({ ...p, grid: 1 }));
      setAgents((prev) => ({
        ...prev,
        layout: { x: cw - 60, y: ch - 60, opacity: 1 }
      }));
    });

    // t=750ms: Type moves to PORTAFOLIO word
    schedule(750, () => {
      const m = measure('word');
      if (m) {
        setAgents((prev) => ({
          ...prev,
          type: { x: m.x, y: m.y, opacity: 1 }
        }));
      }
    });

    // t=850ms: Photo agent moves to center photo
    schedule(850, () => {
      const m = measure('photo');
      if (m) {
        setAgents((prev) => ({
          ...prev,
          photo: { x: m.x, y: m.y, opacity: 1 }
        }));
      }
    });

    // t=1000ms: Copy agent moves to Hello/Name
    schedule(1000, () => {
      const m = measure('hello');
      if (m) {
        setAgents((prev) => ({
          ...prev,
          copy: { x: m.x, y: m.y, opacity: 1 }
        }));
      }
    });

    // t=1100ms: UI agent moves to side stats
    schedule(1100, () => {
      const m = measure('side');
      if (m) {
        setAgents((prev) => ({
          ...prev,
          ui: { x: m.x, y: m.y, opacity: 1 }
        }));
      }
    });

    // t=1200ms: Grid phase 2 (lines and ruler ready)
    schedule(1200, () => {
      setPhases((p) => ({ ...p, grid: 2 }));
      setLogs((l) => [...l, { id: 1, text: '[layout] grid de 12 columnas y reglas milimétricas ✓' }]);
    });

    // t=1400ms: Word phase 1 (wireframe active)
    schedule(1400, () => {
      setPhases((p) => ({ ...p, word: 1 }));
      const m = measure('word');
      if (m) {
        setBoxes((b) => ({
          ...b,
          word: { x: m.x, y: m.y, w: m.w, h: m.h, agent: 'type', label: 'Display / PORTAFOLIO' }
        }));
        setAgents((prev) => ({
          ...prev,
          type: { x: m.x + m.w - 30, y: m.y + m.h - 30, opacity: 1 }
        }));
      }
    });

    // t=1600ms: Photo phase 1 (placeholder active)
    schedule(1600, () => {
      setPhases((p) => ({ ...p, photo: 1 }));
      const m = measure('photo');
      if (m) {
        setBoxes((b) => ({
          ...b,
          photo: { x: m.x, y: m.y, w: m.w, h: m.h, agent: 'photo', label: 'Yo.jpg' }
        }));
        setAgents((prev) => ({
          ...prev,
          photo: { x: m.x + m.w / 2, y: m.y + m.h / 2, opacity: 1 }
        }));
      }
    });

    // t=1700ms: Nav phase 1 & 2
    schedule(1700, () => {
      setPhases((p) => ({ ...p, nav: 1 }));
      const m = measure('nav');
      if (m) {
        setAgents((prev) => ({
          ...prev,
          layout: { x: m.x + m.w / 2, y: m.y + 30, opacity: 1 }
        }));
      }
    });

    // t=2000ms: Word phase 2 (orange fill slides up) & Nav phase 2
    schedule(2000, () => {
      setPhases((p) => ({ ...p, word: 2, nav: 2 }));
      setLogs((l) => [...l, { id: 2, text: '[tipografía] Anton 900 · tracking -2% ✓' }]);
    });

    // t=2300ms: Photo phase 2 (scanline sweeps upwards)
    schedule(2300, () => {
      setPhases((p) => ({ ...p, photo: 2 }));
      setLogs((l) => [...l, { id: 3, text: '[foto] visor cibernético · daft punk ready ✓' }]);
    });

    // t=2600ms: Hello phase 2 & Name phase 1
    schedule(2600, () => {
      setPhases((p) => ({ ...p, hello: 2, name: 1 }));
      const m = measure('name');
      if (m) {
        setBoxes((b) => ({
          ...b,
          name: { x: m.x, y: m.y, w: m.w, h: m.h, agent: 'copy', label: 'H1 / Nombre' }
        }));
      }
    });

    // t=2900ms: Name types out with caret
    schedule(2900, () => {
      setPhases((p) => ({ ...p, name: 2 }));
      setLogs((l) => [...l, { id: 4, text: `[copy] «Hola, soy ${personalInfo.name}» ✓` }]);
    });

    // t=3600ms: Meta tag phase 2
    schedule(3600, () => {
      setPhases((p) => ({ ...p, meta: 2 }));
      const m = measure('meta');
      if (m) {
        setAgents((prev) => ({
          ...prev,
          ui: { x: m.x + m.w, y: m.y, opacity: 1 }
        }));
      }
    });

    // t=3900ms: CTA phase 1 & 2 (Buttons drop in)
    schedule(3900, () => {
      setPhases((p) => ({ ...p, cta: 2 }));
      const m = measure('cta');
      if (m) {
        setBoxes((b) => ({
          ...b,
          cta: { x: m.x, y: m.y, w: m.w, h: m.h, agent: 'layout', label: 'Botón / CTA' }
        }));
        setAgents((prev) => ({
          ...prev,
          layout: { x: m.x + m.w, y: m.y + m.h, opacity: 1 }
        }));
      }
      setLogs((l) => [...l, { id: 5, text: '[ui] componentes y estados hover ✓' }]);
    });

    // t=4500ms: Completion & cleanup
    schedule(4500, () => {
      setPhases({
        grid: 3,
        nav: 3,
        word: 3,
        photo: 3,
        hello: 3,
        name: 3,
        meta: 3,
        side: 3,
        cta: 3
      });
      setBoxes({});
      setRunning(false);
      setBuilt(true);
      setProgress(1);

      // Fade out agents smoothly
      setAgents((prev) => {
        const next = { ...prev };
        (Object.keys(next) as AgentKey[]).forEach((k) => {
          next[k].opacity = 0;
        });
        return next;
      });

      setLogs((l) => [...l, { id: 6, text: '[qa] contraste AA · responsive · listo para revisión ✓' }]);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [running, measure, personalInfo.name]);

  // Typewriter effect for name
  useEffect(() => {
    if (phases.name >= 2 && typedName.length < fullName.length) {
      const typeSpeed = setTimeout(() => {
        setTypedName(fullName.slice(0, typedName.length + 1));
      }, 75);
      return () => clearTimeout(typeSpeed);
    }
  }, [phases.name, typedName, fullName]);

  const scrollToDesktop = () => {
    document.getElementById('sobre-mi')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="hero"
      data-built={built}
      aria-label="Presentación"
    >
      {/* 1. Blueprint 12-Column Grid */}
      <div className="hero-grid" data-phase={phases.grid} aria-hidden="true">
        <div className="ruler" />
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      {/* 2. Top Navigation Bar */}
      <header className="hero-nav" ref={setRef('nav')} data-phase={phases.nav}>
        <a href="#hero" className="logo">
          {personalInfo.name.toUpperCase()}
          <span>●</span>
        </a>

        <nav aria-label="Secciones" className="hidden md:flex">
          <a href="#sobre-mi">Sobre mí</a>
          <a href="#habilidades">Habilidades</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#certificados">Certificados</a>
          <a href="#contacto">Contacto</a>
        </nav>

        <div className="nav-right">
          <span className="status">
            <i /> DISPONIBLE
          </span>
          <a
            href={personalInfo.cvUrl}
            download="CV_Jaime_Vega.pdf"
            target="_blank"
            rel="noreferrer"
            className="nav-cv"
          >
            CV ↗
          </a>
        </div>
      </header>

      {/* 3. Role & Location Metadata Top Left */}
      <div className="hero-meta" ref={setRef('meta')} data-phase={phases.meta}>
        <span>{personalInfo.role.toUpperCase()}</span>
        <span className="dim">{personalInfo.location.toUpperCase()} · DATA SCIENCE & AI</span>
      </div>

      {/* 4. Giant "PORTAFOLIO" Letters Spanning the Screen */}
      <div className="hero-word" ref={setRef('word')} data-phase={phases.word} aria-hidden="true">
        <span className="wire">PORTAFOLIO</span>
        <span className="fill">
          {'PORTAFOLIO'.split('').map((char, i) => (
            <span key={i} style={{ '--i': i } as React.CSSProperties}>
              {char}
            </span>
          ))}
        </span>
      </div>

      {/* 5. Center Cutout Photo with Scanline & Scratch Reveal */}
      <div className="hero-photo" ref={setRef('photo')} data-phase={phases.photo}>
        <div className="photo-placeholder" aria-hidden="true" />
        <div className="photo-clip">
          <RevealPortrait
            base="/hero/yo-transparent.png"
            reveal="/hero/daftpunk-reveal.png"
            alt={`Retrato de ${personalInfo.name}`}
          />
        </div>
        <span className="scan" aria-hidden="true" />
      </div>

      {/* 6. Left Greeting ("Hola, soy") */}
      <p className="hero-hello" ref={setRef('hello')} data-phase={phases.hello}>
        {phases.hello >= 2 ? 'Hola, soy' : ''}
      </p>

      {/* 7. Left Headline (Name with typing caret) */}
      <h1 className="hero-name" ref={setRef('name')} data-phase={phases.name}>
        <span>{typedName}</span>
        {phases.name >= 2 && typedName.length < fullName.length && (
          <span className="caret" style={{ background: 'var(--agent-copy)' }} />
        )}
        {phases.name >= 2 && typedName.length >= fullName.length && (
          <span className="dot" aria-hidden="true">.</span>
        )}
      </h1>

      {/* 8. Bottom Left CTA Buttons */}
      <div className="hero-cta" ref={setRef('cta')} data-phase={phases.cta}>
        <button className="btn-primary" onClick={scrollToDesktop}>
          <span>Explorar mi portafolio</span>
          <span aria-hidden="true">↓</span>
        </button>
        <a className="btn-ghost" href="#contacto">
          Contacto
        </a>
      </div>

      {/* 10. Hint Below Photo */}
      <p className="hero-hint" data-show={built}>
        <span aria-hidden="true">◐</span> Pasa el cursor sobre la foto
      </p>

      {/* 11. Bounding Boxes Overlay */}
      <div className="hero-overlay" aria-hidden="true">
        {Object.entries(boxes).map(([key, box]) => (
          <div
            key={key}
            className="sel-box"
            style={{
              left: box.x,
              top: box.y,
              width: box.w,
              height: box.h,
              '--c': AGENTS[box.agent].color
            } as React.CSSProperties}
          >
            <span className="sel-label">
              {box.label}{' '}
              <em>
                {Math.round(box.w)} × {Math.round(box.h)}
              </em>
            </span>
            <i className="h tl" />
            <i className="h tr" />
            <i className="h bl" />
            <i className="h br" />
          </div>
        ))}

        {/* 12. Floating Agent Cursors */}
        {(Object.keys(agents) as AgentKey[]).map((k) => {
          const ag = agents[k];
          if (ag.opacity <= 0) return null;
          return (
            <div
              key={k}
              className="agent"
              style={{
                transform: `translate3d(${ag.x}px, ${ag.y}px, 0)`,
                opacity: ag.opacity,
                '--c': AGENTS[k].color
              } as React.CSSProperties}
            >
              <svg width="18" height="20" viewBox="0 0 18 20" aria-hidden="true">
                <path
                  d="M1.5 1.5 L16 9.2 L9.4 10.9 L6.2 18 Z"
                  fill={AGENTS[k].color}
                  stroke="#0a0a0b"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="agent-tag">{AGENTS[k].name}</span>
            </div>
          );
        })}
      </div>

      {/* 13. Bottom Floating Console (While Building) */}
      {running && (
        <div className="hero-console" role="status">
          <div className="console-head">
            <span className="dots">
              {Object.values(AGENTS).map((ag) => (
                <i key={ag.name} style={{ background: ag.color }} />
              ))}
            </span>
            <span>agentes · construyendo</span>
            <span className="pct">{Math.round(progress * 100)}%</span>
            <button onClick={handleSkip}>Saltar</button>
          </div>

          <ol>
            {logs.slice(-2).map((l) => (
              <li key={l.id}>{l.text}</li>
            ))}
          </ol>

          <div className="bar">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      )}

      {/* 14. Replay Button */}
      {built && (
        <button
          className="hero-replay"
          onClick={handleReplay}
          title="Volver a ver a los agentes construir esta página"
        >
          ↻ Reconstruir
        </button>
      )}
    </section>
  );
};
