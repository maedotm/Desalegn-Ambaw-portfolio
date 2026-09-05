'use client';

import { motion } from 'framer-motion';
import {
  GraduationCap,
  Brain,
  BookOpen,
  Award,
  Users,
  Globe,
  Landmark,
  Building2,
  Mail,
  Quote,
  Briefcase,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/animations';
import { PageLoader } from '@/components/page-utils';
import { profile, timeline, researchAreas } from '@/lib/portfolio-data';

// lucide-react no longer ships brand/logo icons, so these are small inline SVGs
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

const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  book: BookOpen,
  globe: Globe,
  landmark: Landmark,
  building: Building2,
};

const values = [
  {
    icon: Landmark,
    title: 'Equity',
    description:
      'Infrastructure distribution must be evaluated for fairness across regions, not only by aggregate investment volume.',
  },
  {
    icon: Building2,
    title: 'Institutional Capacity',
    description:
      'Effective planning, coordination, and delivery of public goods depends on the strength of federal institutions.',
  },
  {
    icon: Globe,
    title: 'Inclusive Development',
    description:
      'National cohesion is built when citizens and regional states perceive development as fair and responsive.',
  },
  {
    icon: BookOpen,
    title: 'Evidence-Based Policy',
    description:
      'Research should translate into actionable policy pathways, reform roadmaps, and equitable allocation frameworks.',
  },
];

const seniorRoles = [
  {
    title: 'Chief Executive Officer',
    org: 'Ethiopian Deposit Insurance Fund (EDIF)',
  },
  {
    title: 'Executive Director',
    org: 'Institute of Foreign Affairs (IFA)',
  },
  {
    title: 'State Minister',
    org: 'Ministry of Transport',
  },
  {
    title: 'State Minister',
    org: 'Ministry of Urban Development and Construction',
  },
];

const coreSpecializations = [
  'Federalism and Intergovernmental Relations',
  'Infrastructure Equity and Governance',
  'Governance and Institutional Capacity',
  'Public Policy and Inclusive Development',
  'State-Building and Nation-Building',
  'Financial-Sector Governance',
];

const publications = [
  {
    venue: 'Public Organization Review (Springer)',
  label: 'Peer-reviewed journal',
  },
  {
    venue: 'International Review of Administrative Sciences',
    label: 'Peer-reviewed journal',
  },
  {
    venue: 'Journal of Infrastructure, Policy and Development',
    label: 'Peer-reviewed journal',
  },
  {
    venue: 'Journal of Mega Infrastructure & Sustainable Development',
    label: 'Peer-reviewed journal',
  },
  {
    venue:
      'Management Theory and Studies for Rural Business and Infrastructure Development',
    label: 'Peer-reviewed journal',
  },
];

const academicLinks = [
  {
    label: 'Palgrave Macmillan Book Page',
    href: '#',
    text: 'Building the Nation: Infrastructure, Equity, and Federalism in Ethiopia',
  },
  {
    label: 'ORCID Profile',
    href: '#',
    text: '0000-0003-2152-0366',
  },
  {
    label: 'ResearchGate Profile',
    href: '#',
    text: 'Ambaw Desalegn Contributions',
  },
  {
    label: 'Google Scholar Profile',
    href: '#',
    text: 'Governance, Federalism, Infrastructure Policy, and Inclusive Development',
  },
];

const mediaCoverage = [
  'EDIF Stakeholder Awareness Workshop',
  "Ethiopia's Deposit Insurance Fund Performance Report — Stock Market ET",
  'National Bank of Ethiopia (NBE) Awareness Dialogue Conference',
  '2Merkato Financial Report on EDIF',
  'African Leadership Magazine Recognition',
];

// TODO: replace these placeholder links with the real profile URLs and WhatsApp number
const socialLinks = {
  linkedin: '#',
  facebook: '#',
  twitter: '#',
  whatsapp: 'https://wa.me/251000000000',
};

export default function AboutPage() {
  return (
    <PageLoader>
      {/* Hero */}
      <section className="relative bg-[#0f2148] pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-[100px]" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4"
              >
                About
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight"
              >
                A life spent
                <br />
                <span className="text-gradient-blue">building institutions.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-blue-100/70 text-lg mt-8 leading-relaxed max-w-lg"
              >
                {profile.shortBio}
              </motion.p>
            </div>

            <Reveal direction="left">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-400/30 to-blue-700/30 rounded-3xl blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] max-w-sm mx-auto">
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
                      Desalegn Ambaw, Ph.D.
                    </p>
                    <p className="text-blue-200/90 text-sm mt-1.5">
                      Addis Ababa, Ethiopia
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
          </div>
        </div>
      </section>

      {/* Full Bio */}
      <section className="bg-white py-32">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal direction="up">
            <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">
              Biography
            </span>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h2 className="font-serif text-4xl font-bold text-[#0f2148] mb-8">
              Scholar and senior public executive
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.15}>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                {profile.bio}
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                His career combines high-level public executive leadership with
                rigorous academic research. He has served as Chief Executive
                Officer of the Ethiopian Deposit Insurance Fund (EDIF),
                Executive Director of the Institute of Foreign Affairs (IFA),
                and State Minister at both the Ministry of Transport and the
                Ministry of Urban Development and Construction.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                He holds a Ph.D. in Federalism and Governance Studies from the
                Center for Federalism and Governance Studies at Addis Ababa
                University, and an MBA from The Open University (UK). His
                research has appeared across international academic journals
                and informs policy on federal governance, equitable
                development, and infrastructure.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Education */}
      <section className="bg-slate-50 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="text-center mb-12">
            <Reveal direction="up">
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
                Education
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h2 className="font-serif text-4xl font-bold text-[#0f2148]">
                Academic Foundation
              </h2>
            </Reveal>
          </div>

          <Stagger className="grid md:grid-cols-2 gap-6" stagger={0.12}>
            <StaggerItem direction="right">
              <div className="bg-white rounded-2xl p-8 border border-slate-100 card-lift h-full">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0f2148] mb-2">
                  Ph.D. in Federalism and Governance Studies
                </h3>
                <p className="text-blue-600 text-sm font-medium mb-3">
                  Center for Federalism and Governance Studies, Addis Ababa University
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Advanced research training focused on federalism, governance,
                  and institutional transformation.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem direction="left">
              <div className="bg-white rounded-2xl p-8 border border-slate-100 card-lift h-full">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0f2148] mb-2">
                  Master of Business Administration (MBA)
                </h3>
                <p className="text-blue-600 text-sm font-medium mb-3">
                  The Open University, United Kingdom
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Business and management education supporting a career across
                  public leadership and institutional governance.
                </p>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Senior Public Roles */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <Reveal direction="up">
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
                Public Leadership
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h2 className="font-serif text-4xl font-bold text-[#0f2148]">
                Senior Public Executive Roles
              </h2>
            </Reveal>
          </div>

          <Stagger className="grid sm:grid-cols-2 gap-5" stagger={0.1}>
            {seniorRoles.map((role) => (
              <StaggerItem key={role.org} direction="up">
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 card-lift hover:shadow-lg h-full">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#0f2148]">
                      {role.title}
                    </h3>
                    <p className="text-blue-600 text-sm font-medium mt-1">
                      {role.org}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Core Specializations */}
      <section className="bg-slate-50 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="text-center mb-12">
            <Reveal direction="up">
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
                Expertise
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h2 className="font-serif text-4xl font-bold text-[#0f2148]">
                Core Research &amp; Professional Specializations
              </h2>
            </Reveal>
          </div>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.08}>
            {coreSpecializations.map((spec) => (
              <StaggerItem key={spec} direction="up">
                <div className="flex items-center gap-3 p-5 bg-white rounded-xl border border-slate-100 card-lift hover:shadow-md">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-[#0f2148]">
                    {spec}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Reveal direction="up">
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
                Principles
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0f2148]">
                What drives this work
              </h2>
            </Reveal>
          </div>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
            {values.map((v) => (
              <StaggerItem key={v.title} direction="up">
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 card-lift h-full">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                    <v.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#0f2148] mb-2">
                    {v.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-slate-50 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <Reveal direction="up">
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
                Career
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0f2148]">
                Milestones
              </h2>
            </Reveal>
          </div>

          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 md:-translate-x-px" />

            <Stagger className="space-y-12" stagger={0.12}>
              {timeline.map((item, i) => (
                <StaggerItem
                  key={`${i}-${item.title}`}
                  direction={i % 2 === 0 ? 'right' : 'left'}
                  className={`relative pl-12 md:pl-0 md:w-1/2 ${
                    i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                  }`}
                >
                  <div
                    className={`absolute top-6 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100 left-0 md:left-auto ${
                      i % 2 === 0
                        ? 'md:-right-2 md:translate-x-1/2'
                        : 'md:-left-2 md:-translate-x-1/2'
                    }`}
                  />
                  <div className="bg-white rounded-2xl p-6 border border-slate-100 card-lift hover:shadow-lg">
                    <span className="text-blue-600 font-bold text-xs uppercase tracking-wider">
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

      {/* Selected Publications */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <Reveal direction="up">
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
                Research
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0f2148]">
                Selected Peer-Reviewed Journals
              </h2>
            </Reveal>
          </div>

          <Stagger className="space-y-4" stagger={0.08}>
            {publications.map((pub) => (
              <StaggerItem key={pub.venue} direction="left">
                <div className="flex gap-6 items-start p-6 bg-slate-50 rounded-2xl border border-slate-100 card-lift hover:shadow-lg">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-[#0f2148] leading-snug">
                      {pub.venue}
                    </h3>
                    <p className="text-blue-600 text-sm mt-1 font-medium">
                      {pub.label}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Academic Profiles */}
      <section className="bg-slate-50 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <Reveal direction="up">
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
                Connect
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0f2148]">
                Academic Profiles &amp; Links
              </h2>
            </Reveal>
          </div>

          <Stagger className="grid sm:grid-cols-2 gap-5" stagger={0.1}>
            {academicLinks.map((link) => (
              <StaggerItem key={link.label} direction="up">
                <a
                  href={link.href}
                  className="block p-6 bg-white rounded-2xl border border-slate-100 card-lift hover:shadow-lg group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-600 text-xs font-semibold uppercase tracking-wider">
                      {link.label}
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <p className="text-[#0f2148] text-sm font-medium leading-relaxed">
                    {link.text}
                  </p>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <Reveal direction="up">
              <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">
                Recognition
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0f2148]">
                Media Coverage &amp; Stakeholder Dialogues
              </h2>
            </Reveal>
          </div>

          <Stagger className="space-y-3" stagger={0.08}>
            {mediaCoverage.map((item) => (
              <StaggerItem key={item} direction="left">
                <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100 card-lift hover:shadow-md">
                  <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                  <span className="text-slate-600 text-sm font-medium">
                    {item}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-[#0f2148] py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <Reveal direction="scale">
            <Quote className="w-12 h-12 text-blue-400 mx-auto mb-8" />
            <p className="font-serif text-3xl md:text-4xl text-white leading-relaxed italic">
              Infrastructure is not merely physical capital — it is a material
              and symbolic expression of state fairness.
            </p>
            <p className="text-blue-300 mt-6 font-medium">
              — Desalegn Ambaw (Ph.D.)
            </p>
          </Reveal>
        </div>
      </section>
    </PageLoader>
  );
}