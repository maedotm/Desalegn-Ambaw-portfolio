'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { PageLoader } from '@/components/page-utils';
import { books } from '@/lib/portfolio-data';

export default function BooksPage() {
  const [selectedBookId, setSelectedBookId] = useState<string>(books[0].id);
  const selectedBook = books.find((book) => book.id === selectedBookId) ?? books[0];
  const detailRef = useRef<HTMLDivElement>(null);

  const handleSelectBook = (id: string) => {
    setSelectedBookId(id);
    detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <PageLoader>
      <section id="published-books" className="relative bg-[#0f2148] pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-[100px]" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Published works
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight"
          >
            Research, books, and publications
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-blue-100/70 text-lg mt-5 leading-relaxed max-w-3xl mx-auto"
          >
            A catalogue of Desalegn Ambaw’s published work on infrastructure equity,
            federalism, institutional capacity, and nation-building in Ethiopia.
          </motion.p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {books.map((book) => {
                const isSelected = selectedBookId === book.id;
                return (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => handleSelectBook(book.id)}
                    className="group block w-full text-left"
                  >
                    <div
                      className="rounded-2xl p-3 h-full transition-all duration-200 border"
                      style={{
                        background: `linear-gradient(135deg, ${book.color.soft}, ${book.color.panel})`,
                        borderColor: isSelected ? book.color.accent : '#e2e8f0',
                        boxShadow: isSelected ? `0 18px 40px -18px ${book.color.accent}` : 'none',
                        transform: isSelected ? 'translateY(-1px)' : 'translateY(0)',
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-20 rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0 shadow-sm">
                          <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-2 text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ color: book.color.ink }}>
                            <span>{book.year}</span>
                            <span className="opacity-60">•</span>
                            <span>{book.type}</span>
                          </div>
                          <h3 className="font-serif text-base font-bold text-[#0f2148] leading-snug line-clamp-2">
                            {book.title}
                          </h3>
                          <p className="text-sm text-slate-600 mt-1 line-clamp-1">{book.publisher}</p>
                          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: book.color.ink }}>
                            Open publication
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div ref={detailRef} className="relative scroll-mt-28">
              <div
                className="group relative overflow-hidden rounded-[2rem] p-6 md:p-8 shadow-2xl backdrop-blur-xl bg-slate-950/70 border border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]"
              >
                {/* Ambient color glow from the book's own palette — sits behind content, never over text */}
                <div
                  className="pointer-events-none absolute -top-24 -right-16 w-72 h-72 rounded-full blur-[100px] opacity-40 transition-opacity duration-300 group-hover:opacity-60"
                  style={{ background: selectedBook.color.accent }}
                />
                <div
                  className="pointer-events-none absolute -bottom-24 -left-16 w-72 h-72 rounded-full blur-[100px] opacity-25 transition-opacity duration-300 group-hover:opacity-40"
                  style={{ background: selectedBook.color.deep }}
                />

                <div className="relative grid lg:grid-cols-[160px_1fr] gap-8 items-start">
                  <div className="flex flex-col gap-4">
                    <div className="rounded-2xl overflow-hidden border border-white/20 bg-white shadow-xl w-full max-w-[160px]">
                      <img src={selectedBook.cover} alt={selectedBook.title} className="w-full h-full object-cover aspect-[3/4]" />
                    </div>

                    <span
                      className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-center"
                      style={{ backgroundColor: selectedBook.color.soft, color: selectedBook.color.deep }}
                    >
                      {selectedBook.type}
                    </span>

                    <div className="flex flex-col gap-2">
                      <span className="px-3 py-1.5 rounded-full bg-white text-slate-900 text-xs font-medium text-center">
                        {selectedBook.year}
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium border border-white/15 backdrop-blur-sm text-center">
                        {selectedBook.publisher}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
                      {selectedBook.title}
                    </h2>

                    <p className="text-lg italic text-slate-200 mt-3">{selectedBook.subtitle}</p>

                    <p className="text-slate-100 leading-relaxed mt-6 text-base">
                      {selectedBook.description}
                    </p>

                    {selectedBook.premise && (
                      <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 mt-0.5 text-white" />
                          <p className="text-slate-100 leading-relaxed italic">
                            {selectedBook.premise}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href={selectedBook.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 font-medium hover:bg-slate-100 transition-colors"
                      >
                        Read publication
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a
                        href="/about"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-colors"
                      >
                        View author profile
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLoader>
  );
}