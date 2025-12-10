import './globals.css';
import { Metadata } from 'next';

export const metadata = {
  title: 'Rohit Task App',
  description: 'Interview Project Task App'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
