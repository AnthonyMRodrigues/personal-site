import type { Metadata } from "next";
import {Montserrat, Lato, Cormorant_Garamond} from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
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
  title: "Miha Perfumes | Fragrâncias Originais das Melhores Marcas",
  description: "Descubra fragrâncias originais diretamente das melhores marcas do mundo. Encontre o perfume perfeito para você com envio para todo o Brasil e atendimento personalizado. Sinta o luxo, viva a essência.",
  keywords: "perfumes importados, perfumes originais, fragrâncias de luxo, perfumes femininos, perfumes masculinos, perfumes para casal, perfumes recomendados, perfumes famosos, perfumes online, loja de perfumes, Miha Perfumes, 212, Paco Rabanne, Chanel, Dior, Gucci, Carolina Herrera, Calvin Klein, Versace, Yves Saint Laurent, Giorgio Armani, Prada, Burberry, Lancôme, Jean Paul Gaultier, Hugo Boss, Bvlgari, Tom Ford, Abercrombie & Fitch, AFNAN, Al Haramain, Al Wataniah, Amaran, Animale, Antonio Banderas, Armaf, Azzaro, Benetton, Boucheron, Brand Collection, Britney Spears, Brut, Cacharel, Chloé, Coach, Colcci, Corvette, Cuba, Davidoff, Diesel, Disney, Dolce & Gabbana, Emporio Armani, Everlast, Ferrari, Figaro, Forum, Galaxy Concept, Gilles Cantuel, Givenchy, Grès, Gusttavo Lima, iScents, Issey Miyake, Jacques Bogart, Jaguar, Joli Joli, Juicy Couture, Kate Spade, Kenzo, La Florentina, La Rive, Lacoste, Lamborghini, Lanvin, Lattafa, Linn Young, Lolita, Maison Alhambra, Manasik, Marc Jacobs, Marina de Bourbon, Mercedes-Benz, Molyneux, Mont'Anne, MontBlanc, Moschino, Mugler, Nazareno Gabrielli, New Brand, Nina Ricci, Nusuk, Orientica, Paloma Picasso, Paris Elysees, Paris Riviera, Police, Puccini, Puig, Ralph Lauren, Rochas, Saint Hilaire, Shakira, Style & Scents, Ted Lapidus, Tommy Hilfiger, Ulric de Varens, Valentino, Victoria's Secret, Victorinox, Viktor & Rolf, Women'secret, Boutique de Perfumes, Butique de perfumes",
  authors: [{ name: "Anthony Rodrigues" }],
  creator: "Anthony Rodrigues",
  publisher: "Anthony Rodrigues",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://mihaperfumes.com.br", // Replace with your actual domain
    siteName: "Miha Perfumes",
    title: "Miha Perfumes | Fragrâncias Originais das Melhores Marcas",
    description: "Encontre o perfume perfeito para você. Explore nossa seleção de perfumes e descubra novos aromas que combinam com você.",
    images: [
      {
        url: "/images/icon.png", // Replace with your actual OG image
        width: 180,
        height: 180,
        alt: "Miha Perfumes - Encontre o perfume perfeito para você",
      },
    ],
  },
  verification: {
    google: "G-ND24C6D423", // Your Google Analytics ID
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Miha Perfumes',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <link rel="icon" href="./favicon.ico" sizes="any" />
        {/* <link rel="apple-touch-icon" href="/images/apple-icon.png" /> */}
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
        <head>
  <meta property="og:title" content="Miha Perfumes" />
  <meta property="og:description" content="Fragrâncias Originais das Melhores Marcas" />
  <meta property="og:image" content="https://mihaperfumes.com.br/images/icon.png" />
  <meta property="og:url" content="https://mihaperfumes.com.br" />
  <meta property="og:type" content="website" />
  
  <meta name="twitter:card" content="Miha Perfumes" />
  <meta name="twitter:title" content="Miha Perfumes" />
  <meta name="twitter:description" content="Fragrâncias Originais das Melhores Marcas" />
  <meta name="twitter:image" content="https://mihaperfumes.com.br/images/icon.png" />

  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
</head>
    </head>
    <body className={`${montserrat.variable} ${lato.variable} ${cormorant.className} ${futura.variable} bg-site-primary-color min-h-screen`}>
      {children}
      <WhatsAppButton />
    </body>
    </html>
  );
}
