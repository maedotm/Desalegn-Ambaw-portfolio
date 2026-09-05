'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  ArrowRight,
  BookOpen,
  Brain,
  Languages,
  Globe,
  Landmark,
  Building2,
  GraduationCap,
  Calendar,
  Clock,
  Sparkles,
  ChevronDown,
  MessageCircle,
} from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/animations';
import { SectionHeading } from '@/components/page-utils';
import {
  profile,
  researchAreas,
  books,
  timeline,
  featuredBlogPosts,
} from '@/lib/portfolio-data';
import path from 'path';

// small brand icons (LinkedIn/Facebook/Twitter) as inline SVGs
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

const socialLinks = {
  linkedin: '#',
  facebook: '#',
  twitter: '#',
  whatsapp: 'https://wa.me/251000000000',
};

const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  languages: Languages,
  book: BookOpen,
  globe: Globe,
  landmark: Landmark,
  building: Building2,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const featuredBook = books[0];
  const extraBooks = books.slice(1, 5);

  return (
    <div className="overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-[#0f2148] overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/13791908/pexels-photo-13791908.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            aria-hidden
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f2148]/80 via-[#0f2148]/70 to-[#0f2148]/90" />
        </div>

        {/* Animated background orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[140px] animate-float-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[160px]" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-30" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-100/80 text-sm font-medium">
              Scholar · Public Policy Expert · Governance Specialist
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight"
          >
            Desalegn
            <br />
            <span className="text-gradient-blue animate-gradient">Ambaw (Ph.D.)</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-blue-100/70 text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed"
          >
            Researching federalism, governance, infrastructure equity, and
            nation-building. Author of{' '}
            <span className="text-white font-medium italic">
              &ldquo;Building the Nation.&rdquo;
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-12"
          >
            <Link
              href="/about"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all"
            >
              Discover My Story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/books"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Read the Book
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2 text-blue-100/40"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="relative -mt-1 bg-gradient-to-b from-[#0f2148] to-[#0f1d35] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {profile.stats.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <Link
                  href={stat.href}
                  className="group block rounded-xl px-4 py-3 -mx-4 -my-3 transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <div className="text-5xl md:text-6xl font-bold text-gradient-blue font-serif group-hover:scale-105 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-blue-100/50 text-sm mt-2 uppercase tracking-wider group-hover:text-blue-100/80 transition-colors">
                    {stat.label}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===== BIO PREVIEW ===== */}
      <section className="relative bg-white py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="right">
              <div className="relative max-w-sm mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-400/30 to-blue-700/30 rounded-3xl blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
                  <img
                    src={profile.portrait}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Readability gradient so icons/text sit clearly over the photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2148]/90 via-[#0f2148]/5 to-[#0f2148]/50" />

                  {/* Social icons — top left */}
                  <div className="absolute top-5 left-5 flex items-center gap-2.5">
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:border-transparent hover:bg-[#0A66C2] hover:shadow-lg hover:shadow-[#0A66C2]/40"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:border-transparent hover:bg-[#1877F2] hover:shadow-lg hover:shadow-[#1877F2]/40"
                    >
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Twitter"
                      className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 hover:border-transparent hover:bg-black hover:shadow-lg hover:shadow-black/40"
                    >
                      <TwitterIcon className="w-4 h-4" />
                    </a>
                  </div>

                  {/* WhatsApp message icon — top right */}
                  <a
                    href={socialLinks.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Message on WhatsApp"
                    className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg transition-all duration-200 hover:scale-110 hover:bg-[#1DA851] hover:shadow-[#25D366]/50"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>

                  {/* Name / location / tagline — bottom */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-serif text-2xl font-bold leading-tight">
                      {profile.name}
                    </p>
                    <p className="text-blue-200/90 text-sm mt-1.5">
                      {profile.location}
                    </p>
                    <p className="text-blue-100/80 text-xs mt-3 leading-relaxed">
                      Scholar · Public Policy Expert
                      <br />
                      Governance Specialist · Senior Public Executive
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div>
              <SectionHeading
                eyebrow="About"
                title="A Life in Public Leadership and Research"
                center={false}
              />
              <Reveal direction="up" delay={0.1}>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  {profile.bio}
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all group"
                >
                  Read the full biography
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RESEARCH AREAS ===== */}
      <section className="relative bg-slate-50 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <SectionHeading
            eyebrow="Research"
            title="Areas of Investigation"
            subtitle="Three threads of inquiry spanning federalism, infrastructure equity, and inclusive development."
          />

          <Stagger className="grid md:grid-cols-3 gap-8" stagger={0.15}>
            {researchAreas.map((area) => {
              const Icon = iconMap[area.icon];
              return (
                <StaggerItem key={area.title} direction="up">
                  <div className="group card-lift relative rounded-2xl overflow-hidden bg-white shadow-lg border border-slate-100 h-full">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={area.image}
                        alt={area.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f2148]/80 to-transparent" />
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="p-7">
                      <h3 className="font-serif text-xl font-bold text-[#0f2148] mb-3">
                        {area.title}
                      </h3>
                      <p className="text-slate-500 leading-relaxed text-sm mb-4">
                        {area.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {area.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ===== PUBLICATION HIGHLIGHTS ===== */}
      <section className="relative bg-[#0f2148] py-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Published Works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white tracking-tight font-serif"
            >
              Infrastructure, governance, equity, and nation-building
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
            <Reveal direction="left">
              <div
                className="rounded-[2rem] p-6 shadow-2xl"
                style={{ background: `linear-gradient(135deg, ${featuredBook.color.panel}, ${featuredBook.color.soft})` }}
              >
                <div className="grid md:grid-cols-[220px_1fr] gap-8 items-center">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
                    <img
                      src={featuredBook.cover}
                      alt={featuredBook.title}
                      className="w-full h-full object-cover aspect-[3/4]"
                    />
                  </div>

                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ backgroundColor: featuredBook.color.chip, color: featuredBook.color.ink }}>
                      {featuredBook.type}
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#0f2148] mb-2">
                      {featuredBook.title}
                    </h3>
                    <p className="text-slate-600 text-lg italic mb-4">
                      {featuredBook.subtitle}
                    </p>
                    <p className="text-slate-700 leading-relaxed mb-6">
                      {featuredBook.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-7">
                      <span className="px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-medium">
                        {featuredBook.year}
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-white text-slate-700 text-xs font-medium border border-slate-200">
                        {featuredBook.publisher}
                      </span>
                    </div>
                    <Link
                      href="/books"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0f2148] text-white font-medium hover:bg-[#132d58] transition-colors group"
                    >
                      Explore all publications
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4">
              {extraBooks.map((book) => (
                <Reveal key={book.id} direction="up">
                  <a href={book.link} target="_blank" rel="noreferrer" className="group block">
                    <div
                      className="rounded-2xl p-4 transition-all group-hover:-translate-y-1"
                      style={{ background: `linear-gradient(135deg, ${book.color.panel}, ${book.color.soft})`, border: `1px solid ${book.color.accent}55` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-20 rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0">
                          <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: book.color.ink }}>
                            <span className="font-bold">{book.year}</span>
                            <span className="opacity-60">•</span>
                            <span>{book.type}</span>
                          </div>
                          <h4 className="font-serif text-lg font-bold text-[#0f2148] leading-snug line-clamp-2">
                            {book.title}
                          </h4>
                          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#0f2148]">
                            Visit publication
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="relative bg-white py-32 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            eyebrow="Journey"
            title="The Path So Far"
            subtitle="From doctoral research in federalism to senior public executive leadership and a Palgrave Macmillan publication."
          />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 md:-translate-x-px" />

            <Stagger className="space-y-12" stagger={0.15}>
              {timeline.map((item, i) => (
                <StaggerItem
                  key={`timeline-${i}`}
                  direction={i % 2 === 0 ? 'right' : 'left'}
                  className={`relative pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0
                    ? 'md:pr-12 md:text-right'
                    : 'md:ml-auto md:pl-12'
                    }`}
                >
                  {/* Dot */}
                  <div
                    className={`absolute top-6 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100 left-0 md:left-auto ${i % 2 === 0
                      ? 'md:-right-2 md:translate-x-1/2'
                      : 'md:-left-2 md:-translate-x-1/2'
                      }`}
                  />
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 card-lift hover:shadow-lg">
                    <span className="text-blue-600 font-bold text-sm">
                      {item.year}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#0f2148] mt-1">
                      {item.title}
                    </h3>
                    <p className="text-blue-600 text-sm font-medium mt-1">
                      {item.place}
                    </p>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ===== BLOG PREVIEWS ===== */}
      <section className="relative bg-slate-50 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
                Latest Writing
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0f2148] tracking-tight font-serif">
                From the Blog
              </h2>
            </div>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all group"
            >
              All articles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <Stagger className="grid md:grid-cols-3 gap-8" stagger={0.15}>
            {featuredBlogPosts.map((post) => (
              <StaggerItem key={post.slug} direction="up">
                <Link href={`/blogs/${post.slug}`} className="group block h-full">
                  <div className="card-lift rounded-2xl overflow-hidden bg-white shadow-lg border border-slate-100 h-full">
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f2148]/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white/80 text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#0f2148] mb-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-blue-600 text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                        Read more <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative bg-[#0f2148] py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/20 rounded-full blur-[140px]" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <Reveal direction="scale">
            <GraduationCap className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Let&apos;s Build the Nation Together
            </h2>
            <p className="text-blue-100/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Whether you are a fellow researcher, a policymaker, a development
              practitioner, or a curious reader — I would love to hear from you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all"
              >
                Get in Touch
              </Link>
              <Link
                href="/blogs"
                className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-all"
              >
                Read the Blog
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
