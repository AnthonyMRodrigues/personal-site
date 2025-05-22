'use client'

import Image from "next/image";
import BrandIcon from "@/app/components/BrandIcon";
import PerfumesTable from "@/app/components/table";
import Footer from "@/app/components/footer/footer";
import { useEffect, useState } from "react";
import { Tooltip } from 'primereact/tooltip';

export default function Home() {
  const [imageSize, setImageSize] = useState(250);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setImageSize(mobile ? 250 : 500);
      setIsMobile(mobile);
    };
    
    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const brands = ['chanel', 'dior', 'gucci', 'carolina_herrera', 'calvin_klein', 'versace',
    'yves_saint_laurent', 'giorgio_armani', 'prada', 'burberry', 'lancome', 'paco_rabanne',
    'jean_paul_gaultier',  'hugo_boss', 'bvgari', 'tom_ford'
  ] as const;
  
  return (
    <main className="min-h-screen bg-site-primary-color">
      <div>
        <div className="flex justify-center ml-10 mr-10 mt-5 mb-8">
            <Image
              src="/images/miha-logo.jpg"
              alt="Miha Boutique de Perfumes"
              width={imageSize}
              height={imageSize}
              priority
            />
        </div>

        {/* Most Wanted Brands Section */}
        <section className="px-1 md:px-2 mb-5">
          <div className="flex flex-col gap-4">
            {/* Desktop: 2 rows of 8 icons */}
            <div className="hidden md:grid md:grid-cols-8 md:gap-2 justify-items-center">
              {[...Array(16)].map((_, index) => (
                <div
                  key={`desktop-${index}`}
                  className="rounded-full flex items-center justify-center transition-colors p-1.5 w-full h-full"
                >
                  <BrandIcon
                    brand={brands[index % brands.length]}
                    className="w-full h-full text-site-primary-color"
                  />
                </div>
              ))}
            </div>
            {/* Mobile: 2 rows of 6 icons */}
            <div className="grid grid-cols-7 gap-2 justify-items-center md:hidden">
              {[...Array(14)].map((_, index) => (
                <div
                  key={`mobile-${index}`}
                  className="flex items-center justify-center transition-colors"
                >
                  <BrandIcon
                    brand={brands[index % brands.length]}
                    className={`text-site-primary-color ${
                      index < 6 ? 'w-8 h-8' : 'w-12 h-12'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Find Your Perfume Section */}
        <section className="mb-8">
          <h1 className="text-site-secondary-color font-black text-center md:text-4xl text-2xl">
            CATÁLOGO DE PRODUTOS
          </h1>
          <p className="text-site-secondary-color text-center text-xs md:text-base">
            FAÇA O SEU PEDIDO PELO NOSSO WHATSAPP
          </p>
        </section>

        <section className="md:px-10 relative">
        {isMobile && (
  <>
    <div className="w-full flex justify-end mb-2 px-4">
      <Tooltip 
        target=".custom-target-icon" 
        position="right"
        style={{ 
          fontSize: '0.7rem',
          padding: '0.25rem 0.5rem',
          whiteSpace: 'nowrap !important',
          maxWidth: 'none !important'
        }}
        autoHide={true}
      />
      <i className="custom-target-icon pi pi-info-circle p-text-secondary p-overlay-badge text-xs"
          data-pr-tooltip="CLIQUE NO NOME DA COLUNA PARA ORDENAR"
          data-pr-position="right"
          data-pr-at="right+20 top"
          data-pr-my="left center-2"
          data-pr-autohide="true"
          style={{ fontSize: '0.85rem' }}
      >
      </i>
    </div>
  </>
)}

          <PerfumesTable />
        </section>
        <Footer />
      </div>
    </main>
  );
}
