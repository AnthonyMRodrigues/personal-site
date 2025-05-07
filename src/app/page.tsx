import Image from "next/image";
import BrandIcon from "@/app/components/BrandIcon";
import PerfumesTable from "@/app/components/table";
import Footer from "@/app/components/footer/footer";

export default function Home() {
  const brands = ['chanel', 'dior', 'gucci', 'carolina_herrera', 'versace', 'prada', 'burberry', 'hugo_boss'] as const;
  
  return (
    <main className="min-h-screen bg-site-primary-color">
      <div>
        <div className="flex justify-center ml-10 mr-10 mt-5">
            <Image
              src="/images/miha-logo.jpg"
              alt="Miha Boutique de Perfumes"
              width={200}
              height={200}
              priority
            />
        </div>

        {/* Most Wanted Brands Section */}
        <section>
          <h2 className="text-site-secondary-color text-3xl font-semibold text-center font-la-orleans">
            Marcas mais procuradas
          </h2>
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
            {/* Mobile: 1 row of 8 icons */}
            <div className="grid grid-cols-8 gap-2 justify-items-center md:hidden">
              {[...Array(8)].map((_, index) => (
                <div
                  key={`mobile-${index}`}
                  className="rounded-full flex items-center justify-center transition-colors p-1.5 w-12 h-12"
                >
                  <BrandIcon
                    brand={brands[index % brands.length]}
                    className="w-10 h-10 text-site-primary-color"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Find Your Perfume Section */}
        <section className="mb-6">
          <h2 className="text-site-secondary-color text-3xl font-semibold text-center font-la-orleans">
            Encontre seu perfume
          </h2>
        </section>

        <section>
          <PerfumesTable />
        </section>
        <Footer />
      </div>
    </main>
  );
}
