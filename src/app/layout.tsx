import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video Editor - Convert videos to shorts/reels',
  description: 'Browser-based video editor for converting large videos to shorts or reels',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
