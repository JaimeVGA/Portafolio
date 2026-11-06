import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Copy, Check, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contacto" className="section-wrapper">
      <div className="site-container">
        {/* Centered Section Header */}
        <div className="section-header-centered">
          <div className="section-tag">
            <MessageSquare size={13} />
            <span>Canales de Comunicación</span>
          </div>
          <h2 className="section-heading">CONTACTO // CONECTAR</h2>
          <p className="section-subtitle">
            ¿Tienes una propuesta, proyecto o vacante? Conectemos a través de mis canales profesionales.
          </p>
        </div>

        {/* Content Layout Centered */}
        <div className="max-w-2xl mx-auto">
          {/* Direct Info Card */}
          <div className="glass p-8 sm:p-10 rounded-2xl border border-[var(--border)] space-y-8 shadow-xl">
            <div>
              <div className="mac-dots mb-6">
                <span className="mac-dot red" />
                <span className="mac-dot yellow" />
                <span className="mac-dot green" />
              </div>

              <div className="font-mono text-xs text-[var(--accent)] uppercase tracking-wider mb-2">
                // DISPONIBILIDAD INMEDIATA
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Abierto a nuevos retos
              </h3>
              <p className="text-sm text-[var(--fg-dim)] leading-relaxed mb-8">
                Puedes copiar mi correo electrónico para escribirme o conectar a través de mis perfiles oficiales en GitHub y LinkedIn.
              </p>

              {/* Email Copy Card */}
              <div className="p-5 rounded-xl bg-white/5 border border-[var(--border)] mb-6">
                <span className="block font-mono text-[11px] text-[var(--fg-faint)] uppercase mb-2">
                  CORREO ELECTRÓNICO (COPIA CON UN CLIC)
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="font-mono text-sm sm:text-base text-white font-medium select-all break-all">
                    {personalInfo.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--accent)] hover:opacity-90 text-white font-mono text-xs font-semibold transition-all flex-shrink-0 cursor-pointer shadow-md"
                    title="Copiar correo"
                  >
                    {copied ? <Check size={15} className="text-white" /> : <Copy size={15} />}
                    <span>{copied ? '¡Copiado con éxito!' : 'Copiar correo'}</span>
                  </button>
                </div>
              </div>

              {/* Social Channels List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-[var(--border)] hover:border-[var(--accent)] text-[var(--fg-dim)] hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon size={18} className="text-white group-hover:text-[var(--accent)] transition-colors" />
                    <span className="font-semibold">GitHub</span>
                  </div>
                  <span className="text-[var(--accent)]">↗</span>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-[var(--border)] hover:border-[var(--accent)] text-[var(--fg-dim)] hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon size={18} className="text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">LinkedIn</span>
                  </div>
                  <span className="text-[var(--accent)]">↗</span>
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-[var(--fg-faint)] text-center sm:text-left">
              <span>ZONA HORARIA: UTC-6 (MÉXICO)</span>
              <span>TIEMPO DE RESPUESTA: &lt; 24H</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
