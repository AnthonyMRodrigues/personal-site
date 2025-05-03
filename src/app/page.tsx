import Image from "next/image";
import BrandIcon from "@/app/components/BrandIcon";
import PerfumesTable from "@/app/components/table";

export default function Home() {
  const brands = ['chanel', 'dior', 'gucci', 'carolina_herrera', 'versace', 'prada', 'burberry', 'hugo_boss'] as const;
  
  return (
    <main className="min-h-screen bg-site-primary-color">
      <div className={"ml-10 mr-10"}>
        <div className="flex justify-center">
            <Image
              src="/images/miha-logo_new.jpg"
              alt="Miha Boutique de Perfumes"
              width={700}
              height={300}
              priority
            />
        </div>

        {/* Most Wanted Brands Section */}
        <section className="mb-16">
          <h2 className="text-site-secondary-color text-3xl font-semibold text-center mb-10 font-la-orleans">
            Marcas mais procuradas
          </h2>
          <div className="flex flex-col gap-4">
            {/* First Row */}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-2 justify-items-center md:mb-4">
              {[...Array(8)].map((_, index) => (
                <div
                  key={`row1-${index}`}
                  className="rounded-full flex items-center justify-center transition-colors p-1.5 w-16 h-16 md:w-full md:h-full"
                >
                  <BrandIcon
                    brand={brands[index % brands.length]}
                    className="w-12 h-12 md:w-full md:h-full text-site-primary-color"
                  />
                </div>
              ))}
            </div>
            {/* Second Row */}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-2 justify-items-center mb-4">
              {[...Array(8)].map((_, index) => (
                <div
                  key={`row1-${index}`}
                  className="rounded-full flex items-center justify-center transition-colors p-1.5 w-16 h-16 md:w-full md:h-full"
                >
                  <BrandIcon
                    brand={brands[index % brands.length]}
                    className="w-12 h-12 md:w-full md:h-full text-site-primary-color"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Find Your Perfume Section */}
        <section className="mb-16">
          <h2 className="text-site-secondary-color text-3xl font-semibold text-center font-la-orleans">
            Encontre seu perfume
          </h2>
        </section>

        <section>
          <PerfumesTable />
        </section>
      </div>
    </main>
  );
}
