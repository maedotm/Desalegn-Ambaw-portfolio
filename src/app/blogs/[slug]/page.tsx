'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Tag,
  Share2,
  BookOpen,
} from 'lucide-react';
import { Reveal } from '@/components/animations';
import { PageLoader } from '@/components/page-utils';
import { supabase } from '@/lib/supabase/client';
import type { Blog } from '@/lib/supabase/types';
import { featuredBlogPosts } from '@/lib/portfolio-data';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

interface DisplayPost {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  tags: string[];
  readTime: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [post, setPost] = useState<DisplayPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          const b = data as Blog;
          setPost({
            title: b.title,
            excerpt: b.excerpt,
            content: b.content,
            image:
              b.image_url ||
              'https://images.pexels.com/photos/34601/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
            date: b.created_at,
            tags: b.tags || [],
            readTime: estimateReadTime(b.content),
          });
        } else {
          // Try fallback featured posts
          const fallback = featuredBlogPosts.find((p) => p.slug === slug);
          if (fallback) {
            setPost({
              title: fallback.title,
              excerpt: fallback.excerpt,
              content: `${fallback.excerpt}\n\nThis is a featured article. Full content is available in the published version.\n\nThe research behind this piece draws on years of laboratory work and field observation. What began as a narrow question — how does the brain process narrative? — opened onto a vast landscape of inquiry about the relationship between language, thought, and consciousness.\n\nIn the years since the first experiments, the field has matured. We now have converging evidence from neuroimaging, behavioral studies, and cross-cultural research that stories are not merely entertainment — they are a fundamental cognitive technology. They allow us to simulate experience, to rehearse social scenarios, and to transmit hard-won knowledge across generations.\n\nThe implications extend far beyond the laboratory. If stories shape the brain, then the stories we choose to tell — and the ones we choose not to — become questions of profound ethical weight. Who gets to tell which stories? Whose narratives are amplified, and whose are silenced? These are not abstract questions. They shape policy, education, and the texture of everyday life.\n\nWhat follows is an attempt to trace these threads: from the neuron to the novel, from the lab bench to the bookshelf.`,
              image: fallback.image,
              date: fallback.date,
              tags: fallback.tags,
              readTime: fallback.readTime,
            });
          } else {
            setNotFound(true);
          }
        }
      } catch {
        const fallback = featuredBlogPosts.find((p) => p.slug === slug);
        if (fallback) {
          setPost({
            title: fallback.title,
            excerpt: fallback.excerpt,
            content: `${fallback.excerpt}\n\nThis is a featured article. Full content is available in the published version.`,
            image: fallback.image,
            date: fallback.date,
            tags: fallback.tags,
            readTime: fallback.readTime,
          });
        } else {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <PageLoader>
        <div className="pt-40 pb-32 bg-white min-h-screen">
          <div className="max-w-3xl mx-auto px-6">
            <div className="animate-pulse space-y-6">
              <div className="h-6 bg-slate-200 rounded w-1/4" />
              <div className="h-12 bg-slate-200 rounded w-3/4" />
              <div className="h-64 bg-slate-200 rounded-2xl" />
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </PageLoader>
    );
  }

  if (notFound || !post) {
    return (
      <PageLoader>
        <div className="pt-40 pb-32 bg-white min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            <BookOpen className="w-16 h-16 text-blue-300 mx-auto mb-6" />
            <h1 className="font-serif text-3xl font-bold text-[#0f2148] mb-4">
              Article not found
            </h1>
            <p className="text-slate-500 mb-8">
              The article you are looking for may have been moved or is no longer
              available.
            </p>
            <button
              onClick={() => router.push('/blogs')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </button>
          </div>
        </div>
      </PageLoader>
    );
  }

  const paragraphs = post.content.split('\n').filter((p) => p.trim());

  return (
    <PageLoader>
      {/* Hero with image */}
      <section className="relative pt-32 pb-16 bg-[#0f2148] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-3xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              All articles
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-300 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex items-center gap-6 text-blue-100/60 text-sm"
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime} read
            </span>
          </motion.div>
        </div>
      </section>

      {/* Cover image */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/9]"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Content */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal direction="up">
            <p className="font-serif text-xl text-[#0f2148] leading-relaxed mb-10 italic border-l-4 border-blue-500 pl-6">
              {post.excerpt}
            </p>
          </Reveal>

          <div className="prose prose-lg max-w-none">
            {paragraphs.map((para, i) => (
              <Reveal key={i} direction="up" delay={Math.min(i * 0.05, 0.3)}>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Share */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: post.title, url: window.location.href });
                } else {
                  navigator.clipboard?.writeText(window.location.href);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          {/* Back to blogs */}
          <div className="mt-12 text-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to all articles
            </Link>
          </div>
        </div>
      </section>

      {/* Related CTA */}
      <section className="bg-[#0f2148] py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <Reveal direction="scale">
            <h2 className="font-serif text-3xl font-bold text-white mb-6">
              Enjoyed this piece?
            </h2>
            <p className="text-blue-100/70 text-lg mb-8">
              Explore more research, or reach out to start a conversation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-xl shadow-blue-500/30 hover:scale-105 transition-all"
              >
                More articles <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-all"
              >
                Get in touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLoader>
  );
}
