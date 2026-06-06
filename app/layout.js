import './globals.css';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { AuthProvider } from '@/components/auth/AuthProvider';

export const metadata = {
  title: 'Jira Tools - ระบบจัดการ Worklogs',
  description: 'ระบบหลังบ้านสำหรับจัดการงาน Jira และ Worklogs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
