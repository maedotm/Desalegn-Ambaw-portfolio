'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  LogOut,
  Plus,
  Edit3,
  Trash2,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  Save,
  X,
  Check,
  Inbox,
  FileText,
  Calendar,
} from 'lucide-react';
import { useAuth } from '@/components/auth-provider';
import { PageLoader } from '@/components/page-utils';
import { Reveal } from '@/components/animations';
import { supabase } from '@/lib/supabase/client';
import type { Blog, Message } from '@/lib/supabase/types';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

type Tab = 'blogs' | 'messages';

export default function AdminPage() {
  const { user, loading, signIn, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Data
  const [tab, setTab] = useState<Tab>('blogs');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Editor
  const [editing, setEditing] = useState<Blog | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [draft, setDraft] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    tags: '',
    published: false,
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Delete confirm
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Selected message
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setSigningIn(true);
    setAuthError('');
    const { error } = await signIn(email, password);
    if (error) setAuthError(error);
    setSigningIn(false);
  }

  async function loadData() {
    setDataLoading(true);
    try {
      const [blogsRes, msgsRes] = await Promise.all([
        supabase.from('blogs').select('*').order('created_at', { ascending: false }),
        supabase.from('messages').select('*').order('created_at', { ascending: false }),
      ]);

      if (blogsRes.data) setBlogs(blogsRes.data as Blog[]);
      if (msgsRes.data) setMessages(msgsRes.data as Message[]);
    } catch {
      // ignore
    } finally {
      setDataLoading(false);
    }
  }

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  function openNewBlog() {
    setEditing(null);
    setDraft({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image_url: '',
      tags: '',
      published: false,
    });
    setSaveError('');
    setShowEditor(true);
  }

  function openEditBlog(blog: Blog) {
    setEditing(blog);
    setDraft({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      image_url: blog.image_url || '',
      tags: blog.tags.join(', '),
      published: blog.published,
    });
    setSaveError('');
    setShowEditor(true);
  }

  async function saveBlog(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError('');

    const payload = {
      title: draft.title,
      slug: draft.slug || slugify(draft.title),
      excerpt: draft.excerpt,
      content: draft.content,
      image_url: draft.image_url || null,
      tags: draft.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      published: draft.published,
    };

    try {
      if (editing) {
        const { error } = await supabase
          .from('blogs')
          .update(payload)
          .eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blogs').insert(payload);
        if (error) throw error;
      }
      setShowEditor(false);
      await loadData();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  async function deleteBlog(id: string) {
    try {
      const { error } = await supabase.from('blogs').delete().eq('id', id);
      if (error) throw error;
      setDeleteId(null);
      await loadData();
    } catch {
      // ignore
    }
  }

  async function markMessageRead(msg: Message) {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', msg.id);
      if (error) throw error;
      await loadData();
    } catch {
      // ignore
    }
  }

  async function deleteMessage(id: string) {
    try {
      const { error } = await supabase.from('messages').delete().eq('id', id);
      if (error) throw error;
      setSelectedMessage(null);
      await loadData();
    } catch {
      // ignore
    }
  }

  // ===== LOGIN SCREEN =====
  if (!loading && !user) {
    return (
      <PageLoader>
        <section className="relative min-h-screen flex items-center justify-center bg-[#0f2148] overflow-hidden pt-20">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-[100px]" />
          </div>
          <div className="absolute inset-0 bg-grid opacity-20" />

          <Reveal direction="scale" className="relative z-10 w-full max-w-md px-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30 mb-5">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h1 className="font-serif text-3xl font-bold text-white">
                  Owner Login
                </h1>
                <p className="text-blue-100/50 text-sm mt-2">
                  Sign in to manage blogs and messages
                </p>
              </div>

              <form onSubmit={handleSignIn} className="space-y-5">
                <div>
                  <label className="block text-blue-100/60 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-white/30"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-blue-100/60 text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-white/30"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-100/40 hover:text-blue-100/70 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {authError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm"
                  >
                    {authError}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={signingIn}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {signingIn ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Sign In
                    </>
                  )}
                </button>
              </form>
            </div>
          </Reveal>
        </section>
      </PageLoader>
    );
  }

  if (loading) {
    return (
      <PageLoader>
        <div className="min-h-screen flex items-center justify-center bg-[#0f2148]">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </div>
      </PageLoader>
    );
  }

  // ===== DASHBOARD =====
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <PageLoader>
      {/* Header */}
      <section className="relative bg-[#0f2148] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3"
              >
                Dashboard
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl font-bold text-white"
              >
                Welcome back
              </motion.h1>
              <p className="text-blue-100/50 text-sm mt-2">
                Signed in as {user?.email}
              </p>
            </div>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white sticky top-16 z-30 border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2">
          <button
            onClick={() => setTab('blogs')}
            className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-colors ${
              tab === 'blogs'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <FileText className="w-4 h-4" />
            Blogs
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs">
              {blogs.length}
            </span>
          </button>
          <button
            onClick={() => setTab('messages')}
            className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-colors ${
              tab === 'messages'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Mail className="w-4 h-4" />
            Messages
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs">
                {unreadCount} new
              </span>
            )}
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="bg-slate-50 min-h-[60vh] py-12">
        <div className="max-w-7xl mx-auto px-6">
          {tab === 'blogs' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl font-bold text-[#0f2148]">
                  Blog Posts
                </h2>
                <button
                  onClick={openNewBlog}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium shadow-lg shadow-blue-500/30 hover:scale-105 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  New Post
                </button>
              </div>

              {dataLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-6 border border-slate-100 animate-pulse"
                    >
                      <div className="h-6 bg-slate-200 rounded w-1/3 mb-3" />
                      <div className="h-4 bg-slate-200 rounded w-2/3" />
                    </div>
                  ))}
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
                  <FileText className="w-12 h-12 text-blue-200 mx-auto mb-4" />
                  <p className="text-slate-400">No blog posts yet.</p>
                  <button
                    onClick={openNewBlog}
                    className="mt-4 inline-flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Create your first post
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {blogs.map((blog, i) => (
                    <motion.div
                      key={blog.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white rounded-2xl p-6 border border-slate-100 card-lift hover:shadow-lg"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-serif text-lg font-bold text-[#0f2148] truncate">
                              {blog.title}
                            </h3>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                                blog.published
                                  ? 'bg-green-50 text-green-600'
                                  : 'bg-amber-50 text-amber-600'
                              }`}
                            >
                              {blog.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <p className="text-slate-400 text-sm line-clamp-2">
                            {blog.excerpt}
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(blog.created_at)}
                            </span>
                            <span>/{blog.slug}</span>
                            {blog.tags.length > 0 && (
                              <span>{blog.tags.join(', ')}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => openEditBlog(blog)}
                            className="p-2.5 rounded-lg bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(blog.id)}
                            className="p-2.5 rounded-lg bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'messages' && (
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0f2148] mb-8">
                Contact Messages
              </h2>

              {dataLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-6 border border-slate-100 animate-pulse"
                    >
                      <div className="h-5 bg-slate-200 rounded w-1/4 mb-3" />
                      <div className="h-4 bg-slate-200 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
                  <Inbox className="w-12 h-12 text-blue-200 mx-auto mb-4" />
                  <p className="text-slate-400">No messages yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`bg-white rounded-2xl p-6 border transition-all cursor-pointer card-lift hover:shadow-lg ${
                        !msg.read
                          ? 'border-blue-200 bg-blue-50/30'
                          : 'border-slate-100'
                      }`}
                      onClick={() => {
                        setSelectedMessage(msg);
                        if (!msg.read) markMessageRead(msg);
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {!msg.read && (
                              <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                            )}
                            <h3 className="font-semibold text-[#0f2148] truncate">
                              {msg.subject}
                            </h3>
                          </div>
                          <p className="text-slate-400 text-sm">
                            From <span className="font-medium text-slate-600">{msg.name}</span> ({msg.email})
                          </p>
                          <p className="text-slate-500 text-sm mt-2 line-clamp-1">
                            {msg.message}
                          </p>
                          <p className="text-slate-300 text-xs mt-2">
                            {formatDate(msg.created_at)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Blog Editor Modal */}
      <AnimatePresence>
        {showEditor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setShowEditor(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-slate-100 px-8 py-5 flex items-center justify-between rounded-t-3xl z-10">
                <h2 className="font-serif text-xl font-bold text-[#0f2148]">
                  {editing ? 'Edit Post' : 'New Post'}
                </h2>
                <button
                  onClick={() => setShowEditor(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <form onSubmit={saveBlog} className="p-8 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#0f2148] mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={draft.title}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        title: e.target.value,
                        slug: editing ? draft.slug : slugify(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Article title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0f2148] mb-2">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    required
                    value={draft.slug}
                    onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono"
                    placeholder="article-url-slug"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0f2148] mb-2">
                    Excerpt
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={draft.excerpt}
                    onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Short summary shown in blog listings"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0f2148] mb-2">
                    Content
                  </label>
                  <textarea
                    required
                    rows={8}
                    value={draft.content}
                    onChange={(e) => setDraft({ ...draft, content: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y font-mono leading-relaxed"
                    placeholder="Write your article here. Use blank lines to separate paragraphs."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0f2148] mb-2">
                    Cover Image URL (optional)
                  </label>
                  <input
                    type="url"
                    value={draft.image_url}
                    onChange={(e) => setDraft({ ...draft, image_url: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0f2148] mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={draft.tags}
                    onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Neuroscience, Language, Cognition"
                  />
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => setDraft({ ...draft, published: !draft.published })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      draft.published ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                        draft.published ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                  <span className="text-sm font-medium text-[#0f2148]">
                    {draft.published ? 'Published' : 'Draft'}
                  </span>
                </label>

                {saveError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                    {saveError}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-lg shadow-blue-500/30 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {saving ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                    {saving ? 'Saving...' : 'Save Post'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditor(false)}
                    className="px-6 py-3.5 rounded-xl bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setDeleteId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-5">
                <Trash2 className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0f2148] mb-2">
                Delete this post?
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                This action cannot be undone. The blog post will be permanently
                removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => deleteBlog(deleteId)}
                  className="flex-1 px-5 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-5 py-3 rounded-xl bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedMessage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-slate-100 px-8 py-5 flex items-center justify-between rounded-t-3xl">
                <h2 className="font-serif text-xl font-bold text-[#0f2148]">
                  Message
                </h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <div className="p-8">
                <h3 className="font-serif text-lg font-bold text-[#0f2148] mb-2">
                  {selectedMessage.subject}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                  <span className="font-medium text-slate-700">
                    {selectedMessage.name}
                  </span>
                  <span>·</span>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
                <p className="text-slate-400 text-xs mb-6">
                  {formatDate(selectedMessage.created_at)}
                </p>
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
                <div className="flex gap-3 mt-6">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:scale-[1.02] transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    Reply
                  </a>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="px-5 py-3 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLoader>
  );
}
