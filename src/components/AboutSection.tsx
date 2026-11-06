import React from 'react';
import { personalInfo, timeline } from '../data/portfolioData';
import { User, GraduationCap, Sparkles, Terminal } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre-mi" className="section-wrapper">
      <div className="site-container">
        {/* Centered Section Header */}
        <div className="section-header-centered">
          <div className="section-tag">
            <User size={13} />
            <span>Perfil & Formación</span>
          </div>
          <h2 className="section-heading">SOBRE MÍ // BIO</h2>
          <p className="section-subtitle">
            Conoce mi trayectoria, enfoque de ingeniería de software y camino académico.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Bio Terminal Card */}
          <div className="lg:col-span-7 glass border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl">
            <div className="mac-header">
              <div className="mac-dots">
                <span className="mac-dot red" />
                <span className="mac-dot yellow" />
                <span className="mac-dot green" />
              </div>
              <div className="font-mono text-xs text-[var(--fg-dim)] flex items-center gap-1.5 ml-2">
                <Terminal size={13} />
                <span>sobre-mi.txt — utf-8</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5 text-[var(--fg-dim)] text-base leading-relaxed">
              <div className="font-mono text-xs text-[var(--accent)] mb-1">
                // MANIFIESTO PROFESIONAL
              </div>

              {personalInfo.bioParagraphs.map((paragraph, index) => (
                <p key={index} className="text-white/90 font-normal">
                  {paragraph}
                </p>
              ))}

              <div className="pt-6 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-white/5 border border-[var(--border)]">
                  <span className="text-[var(--accent)] block font-semibold mb-1">ENFOQUE PRINCIPAL</span>
                  <span className="text-white">Ciencia de Datos, Machine Learning, Deep Learning y AI Engineering aplicada.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-[var(--border)]">
                  <span className="text-[var(--agent-layout)] block font-semibold mb-1">DATA & AI</span>
                  <span className="text-white">Integración de modelos LLM, visión por computadora y automatización con agentes.</span>
                </div>
              </div>
            </div>

            {/* Bottom Status bar */}
            <div className="px-6 py-3 bg-black/40 border-t border-[var(--border)] font-mono text-[11px] text-[var(--fg-faint)] flex items-center justify-between">
              <span>STATUS: ONLINE & READY</span>
              <span>LINES: 42 · WORDS: 280</span>
            </div>
          </div>

          {/* Timeline / Academic Journey */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--fg-dim)] uppercase tracking-wider mb-1">
              <GraduationCap size={16} className="text-[var(--accent)]" />
              <span>Línea de tiempo & Educación</span>
            </div>

            <div className="space-y-4">
              {timeline.map((item) => (
                <div
                  key={item.id}
                  className="glass p-5 rounded-xl border border-[var(--border)] relative group hover:border-[var(--accent)] transition-all shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                      {item.period}
                    </span>
                    {item.badge && (
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-[var(--fg-dim)]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1 group-hover:text-[var(--accent)] transition-colors">
                    {item.title}
                  </h3>
                  <div className="font-mono text-xs text-[var(--fg-dim)] mb-1.5">
                    {item.organization}
                  </div>
                  {item.description && (
                    <p className="text-xs text-[var(--fg-faint)] leading-normal">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl border border-dashed border-[var(--border)] bg-black/20 flex items-center gap-3">
              <Sparkles size={18} className="text-[var(--agent-type)] flex-shrink-0" />
              <p className="font-mono text-xs text-[var(--fg-dim)] italic">
                «El avance de la tecnología se basa en integrarla de tal manera que ni siquiera la notes.» — Bill Gates
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
