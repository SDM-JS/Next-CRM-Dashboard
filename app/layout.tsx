import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/next.theme.provider';
import { Toaster } from '@/components/ui/sonner';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EduCRM - Educational Center Management',
  description: 'Modern CRM dashboard for educational centers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position='bottom-center' />
        </ThemeProvider>
      </body>
    </html>
  );
}