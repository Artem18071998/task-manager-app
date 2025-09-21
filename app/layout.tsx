import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Приложение для управления задачами',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"> {/* Устанавливаем английский по умолчанию для календарей */}
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Добавляем мета-теги для правильной локализации */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}