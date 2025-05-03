interface BrandIconProps {
  brand: 'chanel' | 'dior' | 'gucci' | 'carolina_herrera' | 'versace' | 'prada' | 'burberry' | 'hugo_boss';
  className?: string;
}
import Image from 'next/image';

export default function BrandIcon({ brand, className = '' }: BrandIconProps) {
  const icons = {
    chanel: <Image src="/svg_perfums/chanel.svg" alt="Chanel" width={100} height={100} />,
    dior: <Image src="/svg_perfums/dior-svgrepo-com.svg" alt="Dior" width={100} height={100} />,
    gucci: <Image src="/svg_perfums/gucci-logo-svgrepo-com.svg" alt="Gucci" width={100} height={100} />,
    carolina_herrera: <Image src="/svg_perfums/carolina-herrera.svg" alt="Carolina Herrera" width={100} height={100} />,
    versace: <Image src="/svg_perfums/versace-medusa-2-logo-svgrepo-com.svg" alt="Versace" width={100} height={100} />,
    prada: <Image src="/svg_perfums/prada-logo-svgrepo-com.svg" alt="Prada" width={100} height={100} />,
    burberry: <Image src="/svg_perfums/burberry-3-logo-svgrepo-com.svg" alt="Burberry" width={100} height={100} />,
    hugo_boss: <Image src="/svg_perfums/boss-hugo-boss-logo-svgrepo-com.svg" alt="Hugo Boss" width={100} height={100} />,
  };

  return icons[brand];
} 

// 1.	CHANEL -> chanel.svg
// 2.	DIOR -> dior-svgrepo-com.svg
// 3.	GUCCI -> gucci-svgrepo-com.svg
// 4.	CAROLINA HERRERA
// 5.	CALVIN KLEIN
// 6.	VERSACE -> versace-svgrepo-com.svg
// 7.	YVES SAINT LAURENT
// 8.	GIORGIO ARMANI
// 9.	PRADA -> prada-svgrepo-com.svg
// 10.	BURBERRY -> burberry-svgrepo-com.svg
// 11.	LANCOME
// 12.	PACO RABANNE
// 13.	JEAN PAUL GAULTIER
// 14.	NARCISO RODRIGUEZ
// 15.	HUGO BOSS -> hugo-boss-svgrepo-com.svg
// 16.	BVLGARI
// 17.	TOM FORD
// 18.	JIMMY CHOO
// 19.	MOSCHINO
// 20.	AZZARO