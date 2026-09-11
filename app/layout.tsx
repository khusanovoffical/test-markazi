import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Milliy va Xalqaro Mock Sertifikat Trenajyori",
  description: "CEFR, Matematika, Informatika va Ona tili fanlaridan rasmiy ko'rinishdagi mock sertifikat trenajyori",
  keywords: "CEFR, mock test, sertifikat, matematika, informatika, ona tili, trenajyor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0a0f1a] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
