import React, { useState } from 'react';
import { projects } from '../data/portfolioData';
import type { Project } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { FolderGit2, ExternalLink, Star } from 'lucide-react';
import { GithubIcon } from './Icons';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const displayedProjects =
    filter === 'featured' ? projects.filter((p) => p.featured) : projects;

  return (
    <section id="proyectos" className="section-wrapper">
      <div className="site-container">
        {/* Centered Section Header */}
        <div className="section-header-centered">
          <div className="section-tag">
            <FolderGit2 size={13} />
            <span>Portafolio de Trabajo</span>
          </div>
          <h2 className="section-heading">PROYECTOS // BUILDS</h2>
          <p className="section-subtitle">
            Selección de aplicaciones, herramientas y prototipos desarrollados con foco en UX, robustez y rendimiento.
          </p>
        </div>

        {/* Centered Quick Filter */}
        <div className="flex justify-center gap-2 mb-12 font-mono text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg border transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-white/15 text-white border-white/40 font-semibold'
                : 'bg-white/5 border-[var(--border)] text-[var(--fg-dim)] hover:border-white/30'
            }`}
          >
            Todos ({projects.length})
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border transition-all cursor-pointer ${
              filter === 'featured'
                ? 'bg-[var(--accent)] text-white border-[var(--accent)] font-semibold'
                : 'bg-white/5 border-[var(--border)] text-[var(--fg-dim)] hover:border-white/30'
            }`}
          >
            <Star size={13} />
            <span>Destacados ({projects.filter((p) => p.featured).length})</span>
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="glass glass-card rounded-2xl overflow-hidden border border-[var(--border)] group cursor-pointer flex flex-col justify-between shadow-xl"
            >
              {/* Window Header */}
              <div className="mac-header justify-between bg-black/40">
                <div className="flex items-center gap-2">
                  <div className="mac-dots">
                    <span className="mac-dot red" />
                    <span className="mac-dot yellow" />
                    <span className="mac-dot green" />
                  </div>
                  <span className="font-mono text-[11px] text-[var(--fg-dim)] ml-2">
                    {project.id}.app
                  </span>
                </div>

                {project.featured && (
                  <span className="font-mono text-[10px] text-[var(--accent)] flex items-center gap-1 font-semibold">
                    <Star size={11} fill="currentColor" />
                    DESTACADO
                  </span>
                )}
              </div>

              {/* Project Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                
                {project.stats && (
                  <span className="absolute bottom-3 left-3 font-mono text-[11px] px-2.5 py-1 rounded bg-black/70 border border-white/10 text-white/90 backdrop-blur-sm">
                    {project.stats}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[var(--accent)] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--fg-dim)] leading-relaxed mb-5">
                    {project.summary}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-white/5 border border-white/5 text-[var(--fg-dim)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions Link Row */}
                  <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs text-[var(--fg-dim)]">
                    <span className="text-[var(--accent)] flex items-center gap-1 group-hover:translate-x-1 transition-transform font-medium">
                      Ver detalles completos →
                    </span>

                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-white p-1"
                          title="Código fuente"
                        >
                          <GithubIcon size={15} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-white p-1"
                          title="Demo en vivo"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </div>
    </section>
  );
};
