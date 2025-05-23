import type { Metadata } from "next";
import {Montserrat, Lato, Cormorant_Garamond} from "next/font/google";
import "./globals.css";
// import "primereact/resources/themes/lara-dark-blue/theme.css";  //theme
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import WhatsAppButton from '@/components/WhatsAppButton'
import Script from 'next/script'

const montserrat = Montserrat(
    {
      subsets: ["latin"],
      variable: "--font-montserrat",
    }
);

const lato = Lato(
    {
        subsets: ["latin"],
        weight: ['100', '300', '400', '700', '900'],
        variable: "--font-lato",
    }
);

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300'],
    display: 'swap',
});

const futura = Montserrat({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-futura',
});

export const metadata: Metadata = {
  title: "Miha Perfumes | Encontre o perfume perfeito para você",
  description: "Encontre o perfume perfeito para você. Explore nossa seleção de perfumes e descubra novos aromas que combinam com você.",
  keywords: "perfume, fragrância, perfume recomendado, fragrância recomendada, fragrância para você, fragrância para homem, fragrância para mulher, fragrância para casal, fragrância para família, fragrância para amigos, 212, paco rabanne, chanel, dior, gucci, carolina herrera, calvin klein, versace, yves saint laurent, giorgio armani, prada, burberry, lancome, paco rabanne, jean paul gaultier, hugo boss, bvgari, tom ford",
  authors: [{ name: "Miha" }],
  creator: "Anthony Rodrigues",
  publisher: "Anthony Rodrigues",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://mihaperfumes.com.br", // Replace with your actual domain
    siteName: "Miha Perfumes",
    title: "Miha Perfumes | Encontre o perfume perfeito para você",
    description: "Encontre o perfume perfeito para você. Explore nossa seleção de perfumes e descubra novos aromas que combinam com você.",
    images: [
      {
        url: "/images/icon.jpeg", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Miha Perfumes - Encontre o perfume perfeito para você",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miha - AI-Powered Perfume Recommendations",
    description: "Discover your perfect perfume with AI-powered recommendations",
    images: ["/images/miha-logo.jpg"], // Replace with your actual Twitter image
    creator: "@miha", // Replace with your Twitter handle
  },
  viewport: "width=device-width, initial-scale=1.0",
  verification: {
    google: "G-ND24C6D423", // Your Google Analytics ID
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="/images/icon.jpeg" type="image/jpeg" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ND24C6D423"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ND24C6D423');
          `}
        </Script>
    </head>
    <body className={`${montserrat.variable} ${lato.variable} ${cormorant.className} ${futura.variable} bg-site-primary-color min-h-screen`}>
      {children}
      <WhatsAppButton />
    </body>
    </html>
  );
}
