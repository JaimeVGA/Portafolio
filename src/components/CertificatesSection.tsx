import React from 'react';
import { certificates } from '../data/portfolioData';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

export const CertificatesSection: React.FC = () => {
  return (
    <section id="certificados" className="section-wrapper bg-[#0d0d12]/30">
      <div className="site-container">
        {/* Centered Section Header */}
        <div className="section-header-centered">
          <div className="section-tag">
            <Award size={13} />
            <span>Validación & Logros</span>
          </div>
          <h2 className="section-heading">CERTIFICADOS // LOGROS</h2>
          <p className="section-subtitle">
            Acreditaciones obtenidas en programas especializados, hackatones y certificaciones de industria.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="glass glass-card p-6 sm:p-7 rounded-2xl border border-[var(--border)] flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Header Tag and Year */}
                <div className="flex items-center justify-between font-mono text-xs mb-4">
                  {cert.tag ? (
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[var(--accent)] font-semibold">
                      {cert.tag}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="text-[var(--fg-faint)] font-semibold">{cert.year}</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white group-hover:text-[var(--accent)] transition-colors mb-2.5 leading-snug">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--fg-dim)] mb-6">
                  <ShieldCheck size={14} className="text-emerald-400 flex-shrink-0" />
                  <span>{cert.issuer}</span>
                </div>
              </div>

              {/* Verification link */}
              {cert.link && (
                <div className="pt-4 border-t border-[var(--border)]">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between font-mono text-xs text-[var(--fg-dim)] hover:text-white transition-colors"
                  >
                    <span>Verificar credencial</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
