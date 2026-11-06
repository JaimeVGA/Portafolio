import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-[var(--border)] bg-[#070709] font-mono text-xs text-[var(--fg-dim)] select-none">
      <div className="site-container flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand and Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}
            className="text-lg text-white"
          >
            {personalInfo.name.toUpperCase()}
          </span>
          <span className="hidden sm:inline text-[var(--border-light)]">/</span>
          <span>© {new Date().getFullYear()} · Todos los derechos reservados</span>
        </div>

        {/* Center: System specs */}
        <div className="flex items-center gap-3 text-[11px] text-[var(--fg-faint)]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>SISTEMA: OK</span>
          </span>
          <span>·</span>
          <span>REACT 19 + TYPESCRIPT</span>
          <span>·</span>
          <span>AGENTIC UI</span>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] hover:border-white/30 text-[var(--fg-dim)] hover:text-white transition-colors"
          title="Subir al inicio"
        >
          <span>Inicio</span>
          <ArrowUp size={13} />
        </button>
      </div>
    </footer>
  );
};
