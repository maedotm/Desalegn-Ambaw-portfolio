'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, PenLine } from 'lucide-react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/books', label: 'Books' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [onBlueSection, setOnBlueSection] = useState(false);
  const [open, setOpen] = useState(false);

  const isLightHeader = !scrolled || onBlueSection;

  useEffect(() => {
    const onScroll = () => {
      const hasScrolled = window.scrollY > 20;
      setScrolled(hasScrolled);

      const blueSection = document.getElementById('published-books');
      if (!blueSection) {
        setOnBlueSection(false);
        return;
      }

      const rect = blueSection.getBoundingClientRect();
      setOnBlueSection(rect.top <= 110 && rect.bottom > 140);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isLightHeader
          ? 'bg-transparent py-5'
          : 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 py-3 shadow-sm'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 group">
          <div className="relative w-20 h-15 overflow-hidden group-hover:scale-110 transition-transform">
            <Image
              src="/images/AmbawLogo.png"
              alt="Desalegn Ambaw logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span
            className={cn(
              'font-bold text-lg tracking-tight hidden sm:block transition-colors',
              isLightHeader ? 'text-white' : 'text-slate-900'
            )}
          >
            Desalegn Ambaw (Ph.D.)
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  active
                    ? isLightHeader
                      ? 'text-white'
                      : 'text-slate-900'
                    : isLightHeader
                      ? 'text-white/80 hover:text-white'
                      : 'text-slate-700 hover:text-blue-600'
                )}
              >
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    className={cn(
                      'absolute inset-0 rounded-lg border',
                      isLightHeader ? 'bg-white/10 border-white/10' : 'bg-slate-100 border-slate-200'
                    )}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="ml-3 flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all"
          >
            <PenLine className="w-4 h-4" />
            Admin
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={cn(
            'md:hidden p-2 transition-colors',
            isLightHeader ? 'text-white' : 'text-slate-900'
          )}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              'md:hidden overflow-hidden border-t',
              isLightHeader ? 'bg-[#0f2148]/95 border-white/10' : 'bg-white/95 border-slate-200'
            )}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href
                      ? isLightHeader
                        ? 'bg-white/10 text-white'
                        : 'bg-slate-100 text-slate-900'
                      : isLightHeader
                        ? 'text-blue-100/80 hover:bg-white/5 hover:text-white'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-500 text-white flex items-center gap-2"
              >
                <PenLine className="w-4 h-4" />
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
