import type { Metadata } from "next";
import {Montserrat, Lato, Cormorant_Garamond} from "next/font/google";
import "./globals.css";
// import "primereact/resources/themes/lara-dark-blue/theme.css";  //theme
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import WhatsAppButton from '@/components/WhatsAppButton'

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
  title: "Miha perfumes",
  description: "Miha perfumes",
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
        <title>Miha perfumes</title>
    </head>
    <body className={`${montserrat.variable} ${lato.variable} ${cormorant.className} ${futura.variable} bg-site-primary-color`}>
      {children}
      <WhatsAppButton />
    </body>
    </html>
  );
}
