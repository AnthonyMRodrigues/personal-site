import type { Metadata } from "next";
import {Montserrat, Lato} from "next/font/google";
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

export const metadata: Metadata = {
  title: "Anthony Rodrigues",
  description: "The data engineer that you are looking for.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-la-orleans">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Anthony Rodrigues - Your Data Engineer, Data Architect, Software engineer</title>
    </head>
    <body className={`${montserrat.variable} ${lato.variable} font-la-orleans bg-site-primary-color`}>
      {children}
      <WhatsAppButton />
    </body>
    </html>
  );
}
