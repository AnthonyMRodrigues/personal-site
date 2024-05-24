import type { Metadata } from "next";
import {Montserrat} from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/lara-dark-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

const montserrat = Montserrat(
    {
      subsets: ["latin"],
      variable: "--font-montserrat",
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
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
