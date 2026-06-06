// Central configuration for La Clínica del Casco.
// Swap these values to rebrand or update contact info in one place.

export const SITE = {
  name: 'La Clínica del Casco',
  shortName: 'Clínica del Casco',
  tagline: 'El punto de referencia motociclista de Montería',
  city: 'Montería, Córdoba',
  // Colombian number in international format for the wa.me link (no + or spaces).
  whatsappNumber: '57312 6704505',
  phoneDisplay: '+57 312 6704505',
  email: 'pedidos@clinicadelcasco.com',
  address: 'Cra. 6 # 30-45, Centro, Montería, Córdoba',
  hours: [
    { day: 'Lunes a Viernes', time: '8:00 AM – 7:00 PM' },
    { day: 'Sábados', time: '8:00 AM – 6:00 PM' },
    { day: 'Domingos y festivos', time: '9:00 AM – 1:00 PM' },
  ],
  social: {
    instagram: 'https://instagram.com/clinicadelcasco',
    instagramHandle: '@clinicadelcasco',
    facebook: 'https://facebook.com/clinicadelcasco',
    tiktok: 'https://tiktok.com/@clinicadelcasco',
  },
  // Google Maps embed centered on downtown Montería.
  mapsEmbed:
    'https://www.google.com/maps?q=Monter%C3%ADa%20Centro%20C%C3%B3rdoba%20Colombia&output=embed',
  mapsLink: 'https://maps.google.com/?q=Monteria+Centro+Cordoba',
};

export const HOOKS = [
  { icon: 'clock', title: 'Disponible 24/7', text: 'Compra cuando quieras, te respondemos a toda hora.' },
  { icon: 'truck', title: 'Enviamos a todo el país', text: 'Llevamos tu pedido a cualquier rincón de Colombia.' },
  { icon: 'bolt', title: 'Entregas el mismo día', text: 'En Montería recibes hoy mismo tu pedido.' },
];

export function whatsappLink(message = '') {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
