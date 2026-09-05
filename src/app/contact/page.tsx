'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  MessageSquare,
  Clock,
} from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/animations';
import { PageLoader } from '@/components/page-utils';
import { supabase } from '@/lib/supabase/client';
import { profile } from '@/lib/portfolio-data';

interface ContactInfo {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: profile.location,
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Usually within 48 hours',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const { error } = await supabase.from('messages').insert({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });

      if (error) throw error;

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    }
  };

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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-2xl shadow-blue-500/30 mb-8"
          >
            <MessageSquare className="w-10 h-10 text-white" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Contact
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight"
          >
            Let&apos;s start a
            <br />
            <span className="text-gradient-blue">conversation.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-blue-100/70 text-lg mt-8 leading-relaxed max-w-xl mx-auto"
          >
            Whether you want to discuss research, invite a talk, or just share a
            thought about the book — I read every message.
          </motion.p>
        </div>
      </section>

      {/* Contact section */}
      <section className="bg-white py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info column */}
            <div className="lg:col-span-2">
              <Reveal direction="right">
                <h2 className="font-serif text-3xl font-bold text-[#0f2148] mb-4">
                  Get in touch
                </h2>
                <p className="text-slate-500 leading-relaxed mb-10">
                  Fill out the form and I will get back to you as soon as I can.
                  For speaking invitations, please include the date and venue.
                </p>
              </Reveal>

              <Stagger className="space-y-6" stagger={0.1}>
                {contactInfo.map((info) => (
                  <StaggerItem key={info.label} direction="right">
                    <a
                      href={info.href}
                      className={`flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 card-lift ${
                        info.href ? 'hover:shadow-lg cursor-pointer' : ''
                      }`}
                    >
                      <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">
                          {info.label}
                        </p>
                        <p className="text-[#0f2148] font-medium mt-1">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {/* Form column */}
            <div className="lg:col-span-3">
              <Reveal direction="left">
                <form
                  onSubmit={handleSubmit}
                  className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-100 shadow-lg"
                >
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm font-medium text-[#0f2148] mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0f2148] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-sm font-medium text-[#0f2148] mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#0f2148] mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell me what is on your mind..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>

                  {/* Status messages */}
                  <AnimatePresence>
                    {status === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-5 flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-100"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <p className="text-green-700 text-sm font-medium">
                          Message sent! I will get back to you soon.
                        </p>
                      </motion.div>
                    )}
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-5 flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100"
                      >
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        <p className="text-red-700 text-sm font-medium">
                          {errorMsg}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </PageLoader>
  );
}
