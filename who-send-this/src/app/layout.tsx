import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AnimatedBackground from '@/components/AnimatedBackground';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Who Send This?',
  description: 'Mensagens anônimas. Sem rastros. Sem identidade.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-950 text-white min-h-screen antialiased`}>
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
