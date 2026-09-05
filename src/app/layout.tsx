import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Geist } from 'next/font/google';
import { AuthProvider } from '@/components/auth-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Desalegn Ambaw (Phd) — Portfolio',
    icons: {
    icon: '/images/AmbawTab.png',
    shortcut: '/images/AmbawTab.png',
    apple: '/images/AmbawTab.png',
  },
  description:
    'Explore the work of Desalegn Ambaw (Phd) — researcher in consciousness and language, author of "The Luminous Mind," and storyteller of the human experience.',
  openGraph: {
    title: 'Desalegn Ambaw (Phd) — Researcher & Author',
    description:
      'Researcher, author, and storyteller exploring the intersection of consciousness, language, and the human experience.'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.variable, playfair.variable, "font-sans", geist.variable)}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
