'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.89 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.28C15.8 4.19 14.9 4.1 13.87 4.1c-2.16 0-3.64 1.32-3.64 3.75v2.65h-2.5v3h2.5V21h3.27z" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.9 6.9c-.6.27-1.24.45-1.9.53a3.3 3.3 0 0 0 1.45-1.83c-.64.38-1.35.65-2.1.8a3.3 3.3 0 0 0-5.63 3.01A9.36 9.36 0 0 1 5.9 5.98a3.3 3.3 0 0 0 1.02 4.4c-.55-.02-1.06-.17-1.51-.42v.04a3.3 3.3 0 0 0 2.64 3.23c-.5.14-1.03.16-1.55.06a3.3 3.3 0 0 0 3.08 2.29A6.62 6.62 0 0 1 3 16.98a9.33 9.33 0 0 0 5.05 1.48c6.06 0 9.38-5.02 9.38-9.38l-.01-.43c.64-.46 1.2-1.04 1.63-1.7l-.15-.05z" />
    </svg>
  );
}

function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.48 2 2 6.48 2 12c0 1.99.52 3.84 1.43 5.45L2 22l4.7-1.23A9.94 9.94 0 0 0 12.04 22C17.6 22 22 17.52 22 12S17.6 2 12.04 2zm5.06 13.03c-.26.73-1.52 1.4-2.09 1.49-.54.08-1.15.12-4.03-.96-3.07-1.14-5.05-4.09-5.18-4.26-.13-.17-1.05-1.3-1.05-2.48 0-1.18.62-1.76.84-2 .22-.24.48-.27.64-.27.16 0 .33 0 .5 0 .17 0 .44-.06.67.5.22.57.74 1.98.8 2.12.06.13.1.28.02.45-.08.17-.12.27-.25.43-.13.17-.27.38-.38.52-.12.14-.25.3.02.58.27.29 1.58 2.45 3.4 3.98 2.31 1.87 3.64 2.17 4.21 1.92.57-.25 1.8-.66 2.05-1.29.25-.63.25-1.16.18-1.28-.07-.12-.25-.17-.51-.3z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-[#0f2148] border-t border-white/10 pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">Desalegn Ambaw PhD</span>
            </div>
            <p className="text-blue-100/60 max-w-md leading-relaxed">
              Scholar, public policy expert, governance specialist, and senior
              public executive working at the intersection of federalism,
              institutional capacity, infrastructure equity, and inclusive
              development.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'About' },
                { href: '/books', label: 'Books' },
                { href: '/blogs', label: 'Blogs' },
                { href: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-blue-100/60 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-100/70 hover:bg-[#0A66C2] hover:text-white hover:border-transparent transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-100/70 hover:bg-[#1877F2] hover:text-white hover:border-transparent transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-100/70 hover:bg-black hover:text-white hover:border-transparent transition-all"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/251000000000"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-[#25D366] border border-[#25D366] flex items-center justify-center text-white hover:bg-[#1DA851] hover:scale-105 transition-all"
                aria-label="WhatsApp"
              >
                <WhatsappIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-blue-100/40 text-sm">
            © {new Date().getFullYear()} Desalegn Ambaw PhD. All rights reserved.
          </p>
          <p className="text-blue-100/40 text-sm">
            Crafted with curiosity and care.
          </p>
        </div>
      </div>
    </footer>
  );
}
