import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Badge, SectionTitle } from '../components/ui';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import SocialLinks from '../components/SocialLinks';
import { HOOKS, SITE } from '../data/site';
import { CATEGORIES, getFeatured } from '../data/products';

const MARQUEE = [
  'DISPONIBLE 24/7',
  'ENVIAMOS A TODO EL PAÍS',
  'ENTREGAS EL MISMO DÍA EN MONTERÍA',
  'PAGO CONTRAENTREGA',
];

export default function Home() {
  const featured = getFeatured();

  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden">
        {/* animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink-800 to-ink" />
          <div className="absolute -left-40 top-0 h-[480px] w-[480px] rounded-full bg-fire/20 blur-[120px] animate-pulse-glow" />
          <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-crimson/20 blur-[120px] animate-pulse-glow" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'repeating-linear-gradient(115deg, #fff 0 1px, transparent 1px 40px)' }}
          />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge tone="fire" icon="fire">El #1 de los motociclistas en Montería</Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 font-display text-6xl leading-[0.9] text-chrome sm:text-7xl md:text-8xl"
            >
              DOMINA LA <span className="text-gradient-fire">CARRETERA</span> CON ESTILO
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-fog"
            >
              Cascos, guantes, chaquetas y accesorios de las mejores marcas. Calidad de expertos,
              precios de barrio y la confianza que solo te da {SITE.shortName}.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button to="/catalogo" size="lg" icon="arrow">Ver catálogo</Button>
              <Button to="/ubicacion" variant="outline" size="lg" icon="map">Cómo llegar</Button>
            </motion.div>

            {/* commercial hooks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3"
            >
              {HOOKS.map((h) => (
                <div key={h.title} className="surface clip-corner-tl flex items-center gap-3 p-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-fire/15 text-fire">
                    <Icon name={h.icon} size={20} />
                  </span>
                  <span className="font-heading text-sm font-700 uppercase leading-tight tracking-wide text-chrome">
                    {h.title}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto aspect-square max-w-md">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-fire/30 to-crimson/30 blur-2xl" />
              <div className="surface relative grid h-full place-items-center overflow-hidden rounded-3xl border-fire/20">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'repeating-linear-gradient(115deg, #ff5a1f 0 2px, transparent 2px 26px)' }}
                />
                <Icon name="helmet" size={260} strokeWidth={0.8} className="text-fire drop-shadow-[0_0_40px_rgba(255,90,31,0.5)]" />
                <div className="absolute bottom-6 left-6 right-6 surface clip-corner rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl text-chrome">+2.500</span>
                    <Icon name="badge" size={28} className="text-fire" />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-fog">Motociclistas confían en nosotros</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* marquee */}
        <div className="border-y border-white/5 bg-ink-800/60 py-3">
          <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
            {[...MARQUEE, ...MARQUEE].map((t, i) => (
              <span key={i} className="flex items-center gap-3 font-heading text-sm font-700 uppercase tracking-[0.25em] text-fog">
                <Icon name="bolt" size={16} className="text-fire" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== CATEGORIES ========================== */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <Reveal>
          <SectionTitle eyebrow="Explora" title="Compra por categoría" />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06}>
              <Link
                to={`/catalogo?categoria=${c.slug}`}
                className="group surface clip-corner flex flex-col items-center gap-3 p-6 text-center transition-all hover:-translate-y-1 hover:border-fire/40"
              >
                <span
                  className="grid h-16 w-16 place-items-center rounded-full transition-transform group-hover:scale-110"
                  style={{ background: `${c.accent}1f`, color: c.accent }}
                >
                  <Icon name={c.icon} size={32} />
                </span>
                <span className="font-heading text-lg font-700 uppercase tracking-wide text-chrome group-hover:text-fire">
                  {c.name}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================== FEATURED ========================== */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle eyebrow="Lo más vendido" title="Productos destacados" />
            <Button to="/catalogo" variant="outline" icon="arrow">Ver todo</Button>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================ CTA BANNER ============================ */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-fire/20 bg-gradient-to-br from-ink-700 to-ink p-8 md:p-14">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-fire/20 blur-3xl" />
            <div className="relative grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="font-display text-4xl text-chrome md:text-5xl">
                  ¿NECESITAS ASESORÍA <span className="text-gradient-fire">EXPERTA?</span>
                </h2>
                <p className="mt-4 max-w-md text-fog">
                  Nuestro equipo te ayuda a elegir el casco y los accesorios perfectos para tu moto.
                  Escríbenos por WhatsApp, te respondemos al instante.
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 md:items-end">
                <Button href={`https://wa.me/${SITE.whatsappNumber}`} size="lg" icon="whatsapp">
                  Hablar con un experto
                </Button>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-fog">o síguenos en</span>
                  <SocialLinks size={16} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ========================== INSTAGRAM ========================== */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <Reveal>
          <SectionTitle
            center
            eyebrow="Comunidad"
            title="Síguenos en Instagram"
            sub={`${SITE.social.instagramHandle} — Comparte tus rodadas y etiquétanos para aparecer en nuestro feed.`}
          />
        </Reveal>
        <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {CATEGORIES.concat(CATEGORIES.slice(0, 1)).map((c, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative grid aspect-square place-items-center overflow-hidden rounded-lg"
                style={{ background: `linear-gradient(160deg, ${c.accent}33, #0a0a0b)` }}
              >
                <Icon name={c.icon} size={40} style={{ color: c.accent }} className="opacity-70 transition-transform group-hover:scale-110" />
                <span className="absolute inset-0 grid place-items-center bg-ink/70 opacity-0 transition-opacity group-hover:opacity-100">
                  <Icon name="instagram" size={28} className="text-white" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href={SITE.social.instagram} variant="outline" icon="instagram">
            Ver perfil completo
          </Button>
        </div>
      </section>
    </>
  );
}
