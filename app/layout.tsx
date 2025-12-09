import './globals.css';
import { Metadata } from 'next';

export const metadata = {
  title: 'Rohit Task App',
  description: 'My Custom Task App'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
