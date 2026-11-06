import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { FileDown, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Sobre mí', href: '#sobre-mi' },
    { label: 'Habilidades', href: '#habilidades' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Certificados', href: '#certificados' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'opacity-100 translate-y-0 bg-[#0a0a0b]/90 backdrop-blur-md border-b border-[var(--border)] py-3 shadow-xl pointer-events-auto'
          : 'opacity-0 -translate-y-full pointer-events-none py-3'
      }`}
    >
      <div className="site-container flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2 group text-decoration-none">
          <span
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}
            className="text-xl md:text-2xl text-[var(--fg)] tracking-wider group-hover:text-[var(--accent)] transition-colors"
          >
            {personalInfo.name.toUpperCase()}
          </span>
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-wider text-[var(--fg-dim)] hover:text-[var(--fg)] transition-colors font-mono font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Info / Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>{personalInfo.availability}</span>
          </div>

          <a
            href={personalInfo.cvUrl}
            download="CV_Jaime_Vega.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-md border border-[var(--border-light)] hover:border-[var(--accent)] text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
          >
            <FileDown size={14} />
            <span>CV</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[var(--fg-dim)] hover:text-white"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass mt-3 p-5 flex flex-col gap-4 border border-[var(--border)]">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{personalInfo.availability}</span>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-wider text-[var(--fg)] hover:text-[var(--accent)] font-mono py-1 border-b border-[var(--border)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href={personalInfo.cvUrl}
            download="CV_Jaime_Vega.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-primary w-full text-center text-xs mt-2"
          >
            Descargar CV
          </a>
        </div>
      )}
    </header>
  );
};
