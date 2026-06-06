import { motion } from 'framer-motion';
import Icon from '../Icon';
import { whatsappLink, SITE } from '../../data/site';

// Always-visible floating WhatsApp button (fixed) per project requirements.
export default function WhatsAppFloat() {
  const message = `¡Hola ${SITE.shortName}! 👋 Quiero más información sobre sus productos.`;
  return (
    <motion.a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 220, damping: 16 }}
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3"
    >
      <span className="pointer-events-none hidden rounded-full bg-ink-700 px-4 py-2 text-sm font-600 text-chrome shadow-lg ring-1 ring-white/10 transition-opacity group-hover:opacity-100 md:block md:opacity-0">
        Chatea con nosotros
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-transform group-hover:scale-110">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <Icon name="whatsapp" size={30} />
      </span>
    </motion.a>
  );
}
