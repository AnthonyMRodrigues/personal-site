interface BrandIconProps {
  brand: 'chanel' | 'dior' | 'gucci' | 'carolina_herrera' | 'calvin_klein' | 'versace' | 'yves_saint_laurent' |
  'giorgio_armani' | 'prada' | 'burberry'|  'lancome' | 'paco_rabanne' | 'jean_paul_gaultier' |
  'hugo_boss' | 'bvgari' | 'tom_ford';
  className?: string;
}
import Image from 'next/image';

export default function BrandIcon({ brand, className = '' }: BrandIconProps) {
  const icons = {
    chanel: <Image src="/svg_perfums/chanel-svgrepo-com-white.svg" alt="Chanel" width={100} height={100} />,
    dior: <Image src="/svg_perfums/dior-svgrepo-com-white.svg" alt="Dior" width={100} height={100} />,
    gucci: <Image src="/svg_perfums/gucci-4-white.svg" alt="Gucci" width={100} height={100} />,
    carolina_herrera: <Image src="/svg_perfums/carolina-herrera-vector-logo-seeklogo/carolina-herrera-seeklogo-white.svg" alt="Carolina Herrera" width={100} height={100} />,
    calvin_klein: <Image src="/svg_perfums/calvin-klein-1-white.svg" alt="Calvin Klein" width={100} height={100} />,
    versace: <Image src="/svg_perfums/versace-medusa-2-logo-svgrepo-com (1)-white.svg" alt="Versace" width={100} height={100} />,
    yves_saint_laurent: <Image src="/svg_perfums/yves-saint-laurent-1-white.svg" alt="Yves Saint Laurent" width={100} height={100} />,
    giorgio_armani: <Image src="/svg_perfums/giorgio-armani-white.svg" alt="Giorgio Armani" width={100} height={100} />,
    prada: <Image src="/svg_perfums/prada-logo-svgrepo-com (1)-white.svg" alt="Prada" width={100} height={100} />,
    burberry: <Image src="/svg_perfums/burberry-3-logo-svgrepo-com (1)-white.svg" alt="Burberry" width={100} height={100} />,
    lancome: <Image src="/svg_perfums/lancome-3-white.svg" alt="Lancôme" width={100} height={100} />,
    hugo_boss: <Image src="/svg_perfums/boss-hugo-boss-logo-svgrepo-com-white.svg" alt="Hugo Boss" width={100} height={100} />,
    paco_rabanne: <Image src="/svg_perfums/paco-rabanne-white.svg" alt="Paco Rabanne" width={100} height={100} />,
    jean_paul_gaultier: <Image src="/svg_perfums/jean-paul-gaultier-white.svg" alt="Jean Paul Gaultier" width={100} height={100} />,
    bvgari: <Image src="/svg_perfums/bvlgari-white.svg" alt="Bvlgari" width={100} height={100} />,
    tom_ford: <Image src="/svg_perfums/tom-ford-vector-logo-seeklogo/tom-ford-seeklogo-white.svg" alt="Tom Ford" width={100} height={100} />,
  };

  return icons[brand];
} 

// 1.	CHANEL -> chanel.svg - Done
// 2.	DIOR -> dior-svgrepo-com.svg - Done
// 3.	GUCCI -> gucci-svgrepo-com.svg - Done
// 4.	CAROLINA HERRERA -> carolina-herrera-seeklogo.svg - Done
// 5.	CALVIN KLEIN -> calvin-klein-1.svg - Done
// 6.	VERSACE -> versace-medusa-2-logo-svgrepo-com (1).svg - Done
// 7.	YVES SAINT LAURENT -> yves-saint-laurent-1.svg - Done
// 8.	GIORGIO ARMANI -> giorgio-armani.svg - Done
// 9.	PRADA -> prada-logo-svgrepo-com (1).svg - Done
// 10.	BURBERRY -> burberry-3-logo-svgrepo-com (1).svg - Done
// 11.	LANCOME -> lancome-3.svg - Done
// 12.	PACO RABANNE -> paco-rabanne.svg - Done
// 13.	JEAN PAUL GAULTIER -> jean-paul-gaultier.svg - Done
// 14.	NARCISO RODRIGUEZ
// 15.	HUGO BOSS -> hugo-boss-svgrepo-com.svg
// 16.	BVLGARI -> bvlgari.svg - Done
// 17.	TOM FORD
// 18.	JIMMY CHOO
// 19.	MOSCHINO
// 20.	AZZARO