import React, { useState } from 'react';
import { skillCategories } from '../data/portfolioData';
import { Cpu, Code2, Server, Brain, Terminal, Layers } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categoryIcons: { [key: string]: React.ReactNode } = {
    'ai-data': <Brain size={16} className="text-[#38bdf8]" />,
    'databases-cloud': <Server size={16} className="text-[#06b6d4]" />,
    'web-dev': <Code2 size={16} className="text-[#3b82f6]" />,
    'systems-lowlevel': <Terminal size={16} className="text-[#60a5fa]" />,
    languages: <Layers size={16} className="text-[#818cf8]" />
  };

  const filteredCategories =
    selectedCategory === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === selectedCategory);

  return (
    <section id="habilidades" className="section-wrapper bg-[#0d0d12]/50">
      <div className="site-container">
        {/* Centered Section Header */}
        <div className="section-header-centered">
          <div className="section-tag">
            <Cpu size={13} />
            <span>Stack Técnico</span>
          </div>
          <h2 className="section-heading">HABILIDADES // STACK</h2>
          <p className="section-subtitle">
            Conjunto de herramientas, lenguajes y arquitecturas que domino para llevar productos del concepto a producción.
          </p>
        </div>

        {/* Centered Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 font-mono text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg border transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[var(--accent)] text-white border-[var(--accent)] font-semibold shadow-md'
                : 'bg-white/5 border-[var(--border)] text-[var(--fg-dim)] hover:border-white/30'
            }`}
          >
            Todos ({skillCategories.reduce((acc, c) => acc + c.skills.length, 0)})
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-white/15 text-white border-white/40 font-semibold'
                  : 'bg-white/5 border-[var(--border)] text-[var(--fg-dim)] hover:border-white/30'
              }`}
            >
              {categoryIcons[cat.id]}
              <span>{cat.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="glass p-6 sm:p-8 rounded-2xl border border-[var(--border)] relative overflow-hidden group hover:border-[var(--border-light)] transition-all shadow-xl"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-[var(--border)]">
                    {categoryIcons[category.id] || <Layers size={18} />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[var(--accent)] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-xs text-[var(--fg-dim)] mt-0.5">{category.description}</p>
                  </div>
                </div>
              </div>

              {/* Skill Bars List */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-semibold text-white/90 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                        {skill.name}
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                      <div
                        className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer Tag */}
              <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-[11px] text-[var(--fg-faint)]">
                <span>HABILIDADES: {category.skills.length}</span>
                <span className="text-[var(--fg-dim)]">VERIFICADO // PROD READY</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
