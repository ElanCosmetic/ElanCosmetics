import React from 'react'
import './globals.css'
import './style.css'
import { poppins } from './ui/fonts'
import { Toaster } from "@/components/ui/sonner"

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export const metadata = {
  description: 'ElanCosmetics - magazin specializat în produse cosmetice de top, cu o selecție variată de branduri premium, inclusiv cosmetice coreene inovatoare. Descoperă cele mai noi tendințe în îngrijirea pielii și machiaj, produse autentice și calitate garantată.',
  title: 'ElanCosmetics',
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {

  const { locale } = await params;
  // @typescript-eslint/no-explicit-any : because of the locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${poppins.className} antialiased bg-gray-100 text-gray-50`}>
        <NextIntlClientProvider messages={messages} >
          <main className='flex-1 flex flex-col'>{children}</main>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
