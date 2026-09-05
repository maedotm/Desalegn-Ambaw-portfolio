'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/animations';
import { PageLoader } from '@/components/page-utils';
import { supabase } from '@/lib/supabase/client';
import type { Blog } from '@/lib/supabase/types';
import { featuredBlogPosts } from '@/lib/portfolio-data';

interface DisplayPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  tags: string[];
  readTime: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

export default function BlogsPage() {
  const [posts, setPosts] = useState<DisplayPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const mapped: DisplayPost[] = (data as Blog[]).map((b) => ({
            slug: b.slug,
            title: b.title,
            excerpt: b.excerpt,
            image:
              b.image_url ||
              'https://images.pexels.com/photos/34601/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
            date: b.created_at,
            tags: b.tags || [],
            readTime: estimateReadTime(b.content),
          }));
          setPosts(mapped);
        } else {
          setPosts(featuredBlogPosts);
        }
      } catch {
        setPosts(featuredBlogPosts);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const filtered = posts.filter((p) => {
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !activeTag || p.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <PageLoader>
      {/* Hero */}
      <section className="relative bg-[#0f2148] pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-400/10 rounded-full blur-[100px]" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4"
          >
            The Blog
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight"
          >
            Notes from the
            <br />
            <span className="text-gradient-blue">lab and the page.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-blue-100/70 text-lg mt-8 leading-relaxed max-w-xl mx-auto"
          >
            Essays on neuroscience, language, and the stories we tell
            ourselves. Written for the curious, not just the credentialed.
          </motion.p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-white py-12 sticky top-0 z-30 border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTag(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    !activeTag
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                      activeTag === tag
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="bg-slate-50 py-20 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 animate-pulse"
                >
                  <div className="h-52 bg-slate-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-1/3" />
                    <div className="h-6 bg-slate-200 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 rounded w-full" />
                    <div className="h-4 bg-slate-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">
                No articles found. Try a different search or filter.
              </p>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && !search && !activeTag && (
                <Reveal direction="up" className="mb-16">
                  <Link href={`/blogs/${featured.slug}`} className="group block">
                    <div className="grid lg:grid-cols-2 gap-8 rounded-3xl overflow-hidden bg-white shadow-xl border border-slate-100 card-lift">
                      <div className="relative h-72 lg:h-auto overflow-hidden">
                        <img
                          src={featured.image}
                          alt={featured.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
                          Featured
                        </div>
                      </div>
                      <div className="p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-slate-400 text-xs mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(featured.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {featured.readTime}
                          </span>
                        </div>
                        <h2 className="font-serif text-3xl font-bold text-[#0f2148] mb-4 group-hover:text-blue-600 transition-colors">
                          {featured.title}
                        </h2>
                        <p className="text-slate-500 leading-relaxed mb-6">
                          {featured.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {featured.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 text-blue-600 font-semibold group-hover:gap-2 transition-all">
                          Read article <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )}

              {/* Grid */}
              <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
                {(search || activeTag ? filtered : rest).map((post) => (
                  <StaggerItem key={post.slug} direction="up">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="group block h-full"
                    >
                      <div className="card-lift rounded-2xl overflow-hidden bg-white shadow-lg border border-slate-100 h-full">
                        <div className="relative h-52 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2148]/40 to-transparent" />
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
            </>
          )}
        </div>
      </section>
    </PageLoader>
  );
}
