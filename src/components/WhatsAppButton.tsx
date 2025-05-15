'use client';

import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open('https://wa.me/+5511969058377?text=Olá, gostaria de saber mais sobre os perfumes.', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 md:p-6 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8 md:w-12 md:h-12" />
    </button>
  );
};

export default WhatsAppButton; 