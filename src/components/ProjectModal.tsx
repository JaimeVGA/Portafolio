import React, { useEffect } from 'react';
import type { Project } from '../types/portfolio';
import { X, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="glass max-w-3xl w-full rounded-2xl overflow-hidden border border-[var(--border-light)] shadow-2xl relative select-none"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 77, 46, 0.2)'
        }}
      >
        {/* Mac OS Window Header */}
        <div className="mac-header justify-between bg-black/50">
          <div className="flex items-center gap-3">
            <div className="mac-dots">
              <button
                onClick={onClose}
                className="mac-dot red hover:opacity-80 transition-opacity cursor-pointer"
                title="Cerrar (Esc)"
              />
              <span className="mac-dot yellow" />
              <span className="mac-dot green" />
            </div>
            <span className="font-mono text-xs text-[var(--fg-dim)]">
              {project.id}.app — Vista Detallada
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-[var(--fg-dim)] hover:text-white p-1 rounded-md transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[82vh] overflow-y-auto">
          {/* Project Image Banner */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
            {project.stats && (
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-md bg-black/80 text-[var(--accent)] border border-[var(--accent)]/30 backdrop-blur-md">
                <Sparkles size={12} />
                <span>{project.stats}</span>
              </div>
            )}
          </div>

          {/* Details Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-wider">
                  // PROYECTO
                </span>
                {project.featured && (
                  <span className="font-mono text-[10px] bg-[var(--accent)] text-white px-2 py-0.5 rounded font-semibold">
                    DESTACADO
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-[var(--fg-dim)] leading-relaxed">
                {project.fullDescription || project.summary}
              </p>
            </div>

            {/* Tags */}
            <div>
              <span className="block font-mono text-xs text-[var(--fg-faint)] uppercase mb-2">
                TECNOLOGÍAS IMPLEMENTADAS:
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-3 py-1 rounded-md bg-white/5 border border-[var(--border)] text-white/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-6 border-t border-[var(--border)] flex flex-wrap items-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink size={16} />
                  <span>Ver Demo en Vivo</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  <GithubIcon size={16} />
                  <span>Ver Código en GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
