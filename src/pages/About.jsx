import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import { Badge, Button, SectionTitle } from '../components/ui';
import { SITE } from '../data/site';

const VALUES = [
  { icon: 'shield', title: 'Confianza', text: 'Productos originales y garantía real. Lo que prometemos, lo cumplimos.' },
  { icon: 'badge', title: 'Expertise', text: 'Años rodando con los motociclistas de la región. Sabemos lo que necesitas.' },
  { icon: 'fire', title: 'Pasión', text: 'Somos riders como tú. Vivimos y respiramos el mundo de las dos ruedas.' },
];

const STATS = [
  { value: '+2.500', label: 'Clientes felices' },
  { value: '+8', label: 'Años de experiencia' },
  { value: '24/7', label: 'Atención online' },
  { value: '100%', label: 'Productos originales' },
];

export default function About() {
  return (
    <div>
      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink-700 to-ink" />
        <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-fire/15 blur-[110px]" />
        <div className="mx-auto max-w-4xl px-4 py-20 text-center md:px-6">
          <Reveal>
            <Badge tone="fire" icon="badge">Nuestra historia</Badge>
            <h1 className="mt-5 font-display text-5xl text-chrome md:text-7xl">
              MÁS QUE UNA TIENDA, <span className="text-gradient-fire">UNA FAMILIA</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fog">
              {SITE.name} nació de la pasión por las motos en Montería. No somos una tienda genérica:
              somos el punto de referencia para los motociclistas de la ciudad y la región. Aquí
              encuentras a los expertos que entienden tu pasión.
            </p>
          </Reveal>
        </div>
      </section>

      {/* stats */}
      <section className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="surface clip-corner rounded-xl p-6 text-center">
                <p className="font-display text-4xl text-gradient-fire md:text-5xl">{s.value}</p>
                <p className="mt-1 font-heading text-sm uppercase tracking-wider text-fog">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* values */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <Reveal><SectionTitle center eyebrow="Lo que nos mueve" title="Nuestros valores" /></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="surface clip-corner h-full rounded-2xl p-8">
                <span className="grid h-14 w-14 place-items-center rounded-md bg-gradient-to-br from-fire to-crimson text-white">
                  <Icon name={v.icon} size={28} />
                </span>
                <h3 className="mt-5 font-heading text-2xl font-700 uppercase text-chrome">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-fog">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-fire/20 bg-gradient-to-br from-ink-700 to-ink p-10 text-center md:p-16">
            <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-crimson/20 blur-3xl" />
            <h2 className="relative font-display text-4xl text-chrome md:text-5xl">
              ¿LISTO PARA <span className="text-gradient-fire">RODAR</span> CON LOS MEJORES?
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-fog">
              Explora nuestro catálogo y equípate con lo mejor. Entrega el mismo día en Montería.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Button to="/catalogo" size="lg" icon="arrow">Ver catálogo</Button>
              <Button to="/ubicacion" variant="outline" size="lg" icon="map">Visítanos</Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
