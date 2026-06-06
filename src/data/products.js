// Product catalog. In a real deployment this would come from an API/DB;
// the shape here mirrors a typical REST response so the UI can stay unchanged.

export const CATEGORIES = [
  { slug: 'cascos', name: 'Cascos', icon: 'helmet', accent: '#ff5a1f' },
  { slug: 'guantes', name: 'Guantes', icon: 'glove', accent: '#c81025' },
  { slug: 'chaquetas', name: 'Chaquetas', icon: 'jacket', accent: '#ff7a3c' },
  { slug: 'accesorios', name: 'Accesorios', icon: 'gear', accent: '#c9ccd6' },
  { slug: 'repuestos', name: 'Repuestos', icon: 'bolt', accent: '#e23a4a' },
];

export const PRODUCTS = [
  {
    id: 'casco-integral-velocity',
    name: 'Casco Integral Velocity GT',
    category: 'cascos',
    price: 489000,
    oldPrice: 589000,
    stock: 12,
    featured: true,
    rating: 4.8,
    short: 'Integral aerodinámico con doble visera y certificación DOT.',
    description:
      'Casco integral de policarbonato de alta resistencia con sistema de ventilación multicanal, visera antirrayas con tratamiento UV y visera solar interna retráctil. Forro extraíble y lavable. Ideal para ciudad y carretera.',
    specs: ['Certificación DOT', 'Doble visera', 'Forro lavable', 'Peso 1.45 kg'],
    colors: ['Negro mate', 'Rojo carmesí', 'Blanco perla'],
  },
  {
    id: 'casco-abatible-ranger',
    name: 'Casco Abatible Ranger Pro',
    category: 'cascos',
    price: 615000,
    stock: 7,
    featured: true,
    rating: 4.9,
    short: 'Modular abatible con bluetooth-ready y doble homologación.',
    description:
      'Casco modular abatible perfecto para viajeros. Mentonera de apertura con un solo botón, espacio para intercomunicador, interior hipoalergénico y cierre micrométrico de seguridad.',
    specs: ['Modular abatible', 'Bluetooth-ready', 'Doble visera', 'Cierre micrométrico'],
    colors: ['Negro mate', 'Gris grafito', 'Naranja fuego'],
  },
  {
    id: 'casco-abierto-urban',
    name: 'Casco Abierto Urban City',
    category: 'cascos',
    price: 215000,
    stock: 23,
    featured: false,
    rating: 4.5,
    short: 'Ligero y fresco para el día a día en la ciudad.',
    description:
      'Casco abierto tipo jet, ligero y ventilado, con visera corta de protección solar. Perfecto para trayectos urbanos cortos donde prima la comodidad.',
    specs: ['Tipo jet', 'Ultraligero', 'Visera corta', 'Peso 0.9 kg'],
    colors: ['Negro brillante', 'Blanco', 'Amarillo neón'],
  },
  {
    id: 'guantes-racing-grip',
    name: 'Guantes Racing Grip Carbon',
    category: 'guantes',
    price: 129000,
    stock: 31,
    featured: true,
    rating: 4.7,
    short: 'Protección de nudillos en carbono y palma reforzada.',
    description:
      'Guantes deportivos con protección de carbono en nudillos, refuerzo en palma y dedos táctiles compatibles con pantallas. Ajuste perfecto con doble velcro.',
    specs: ['Protección carbono', 'Dedos táctiles', 'Palma reforzada', 'Tallas S–XXL'],
    colors: ['Negro/Rojo', 'Negro/Naranja', 'Negro total'],
  },
  {
    id: 'guantes-urban-touch',
    name: 'Guantes Urban Touch',
    category: 'guantes',
    price: 69000,
    stock: 40,
    featured: false,
    rating: 4.4,
    short: 'Cómodos, transpirables y con pantalla táctil.',
    description:
      'Guantes urbanos transpirables ideales para el clima cálido de Montería. Ligeros, con protecciones discretas y compatibilidad táctil total.',
    specs: ['Transpirables', 'Dedos táctiles', 'Clima cálido', 'Tallas S–XL'],
    colors: ['Negro', 'Gris'],
  },
  {
    id: 'chaqueta-impact-pro',
    name: 'Chaqueta Impact Pro Cordura',
    category: 'chaquetas',
    price: 349000,
    oldPrice: 419000,
    stock: 9,
    featured: true,
    rating: 4.8,
    short: 'Cordura con protecciones CE en hombros, codos y espalda.',
    description:
      'Chaqueta de cordura resistente a la abrasión con protecciones CE removibles en hombros, codos y espalda. Ventilaciones con cierre, ajustes en cintura y forro térmico desmontable.',
    specs: ['Protecciones CE', 'Cordura 600D', 'Forro desmontable', 'Reflectivos 360°'],
    colors: ['Negro', 'Negro/Naranja', 'Gris grafito'],
  },
  {
    id: 'chaqueta-airflow',
    name: 'Chaqueta Airflow Mesh',
    category: 'chaquetas',
    price: 259000,
    stock: 14,
    featured: false,
    rating: 4.6,
    short: 'Malla ultraventilada para el calor monteriano.',
    description:
      'Chaqueta de malla de máxima ventilación, pensada para el clima caliente. Protecciones removibles y detalles reflectivos para mayor visibilidad nocturna.',
    specs: ['Malla ventilada', 'Protecciones removibles', 'Reflectivos', 'Tallas S–XXL'],
    colors: ['Negro/Gris', 'Negro/Rojo'],
  },
  {
    id: 'impermeable-stormrider',
    name: 'Impermeable StormRider',
    category: 'chaquetas',
    price: 95000,
    stock: 26,
    featured: false,
    rating: 4.3,
    short: 'Traje impermeable de dos piezas, plegable y liviano.',
    description:
      'Conjunto impermeable de chaqueta y pantalón, plegable en su propia bolsa. Costuras selladas y puños ajustables para mantenerte seco en todo aguacero.',
    specs: ['100% impermeable', 'Dos piezas', 'Plegable', 'Costuras selladas'],
    colors: ['Negro', 'Amarillo alta visibilidad'],
  },
  {
    id: 'intercomunicador-link',
    name: 'Intercomunicador Bluetooth Link',
    category: 'accesorios',
    price: 178000,
    stock: 18,
    featured: true,
    rating: 4.7,
    short: 'Comunícate casco a casco hasta 1 km.',
    description:
      'Sistema de comunicación Bluetooth para casco con alcance de hasta 1 km, manos libres, GPS por voz y música. Batería de hasta 12 horas de conversación.',
    specs: ['Alcance 1 km', 'Manos libres', '12 h batería', 'Resistente a lluvia'],
    colors: ['Negro'],
  },
  {
    id: 'soporte-celular-x',
    name: 'Soporte Celular Anti-Vibración X',
    category: 'accesorios',
    price: 59000,
    stock: 37,
    featured: false,
    rating: 4.5,
    short: 'Sujeción firme con amortiguación para tu teléfono.',
    description:
      'Soporte universal para manubrio con sistema anti-vibración que protege la cámara del celular. Sujeción de aluminio con bloqueo de seguridad.',
    specs: ['Anti-vibración', 'Aluminio', 'Universal 4.7"–7"', 'Bloqueo seguro'],
    colors: ['Negro', 'Plata'],
  },
  {
    id: 'maleta-baul-46l',
    name: 'Baúl Trasero 46L TopCase',
    category: 'accesorios',
    price: 239000,
    stock: 11,
    featured: false,
    rating: 4.6,
    short: 'Amplio baúl con base universal y cerradura.',
    description:
      'Baúl trasero de 46 litros con capacidad para dos cascos, base de montaje universal, apertura rápida y cerradura con llave. Resistente al agua.',
    specs: ['46 litros', 'Caben 2 cascos', 'Resistente al agua', 'Base universal'],
    colors: ['Negro'],
  },
  {
    id: 'kit-cadena-oring',
    name: 'Kit de Cadena O-Ring Reforzada',
    category: 'repuestos',
    price: 145000,
    stock: 20,
    featured: false,
    rating: 4.7,
    short: 'Cadena, piñón y catalina de larga duración.',
    description:
      'Kit completo de transmisión O-Ring de alta durabilidad: cadena sellada, piñón y catalina. Mayor vida útil y menor mantenimiento.',
    specs: ['Tecnología O-Ring', 'Kit completo', 'Larga duración', 'Múltiples referencias'],
    colors: ['Estándar'],
  },
  {
    id: 'aceite-moto-4t',
    name: 'Aceite Sintético 4T 10W-40',
    category: 'repuestos',
    price: 42000,
    stock: 60,
    featured: false,
    rating: 4.8,
    short: 'Protección sintética para motores de alto rendimiento.',
    description:
      'Aceite 100% sintético 10W-40 para motores 4 tiempos. Protección superior contra el desgaste, estable a altas temperaturas y embrague húmedo compatible.',
    specs: ['100% sintético', '10W-40', '1 litro', 'JASO MA2'],
    colors: ['1 Litro'],
  },
  {
    id: 'guaya-seguridad-led',
    name: 'Guaya de Seguridad con Alarma LED',
    category: 'repuestos',
    price: 78000,
    stock: 15,
    featured: false,
    rating: 4.4,
    short: 'Candado de disco con alarma de 110 dB.',
    description:
      'Candado de disco antirrobo con alarma de 110 dB y sensor de movimiento. Incluye cable recordatorio para no arrancar con el candado puesto.',
    specs: ['Alarma 110 dB', 'Sensor de movimiento', 'Acero endurecido', 'Cable recordatorio'],
    colors: ['Negro/Naranja'],
  },
];

export function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

export function getFeatured() {
  return PRODUCTS.filter((p) => p.featured);
}

export function getByCategory(slug) {
  if (!slug || slug === 'todos') return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === slug);
}

export function categoryName(slug) {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}
