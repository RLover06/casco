import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import SocialLinks from '../components/SocialLinks';
import { Badge, Button, SectionTitle } from '../components/ui';
import { SITE, whatsappLink, HOOKS } from '../data/site';

export default function Location() {
  const contact = [
    { icon: 'map', label: 'Dirección', value: SITE.address },
    { icon: 'phone', label: 'Teléfono / WhatsApp', value: SITE.phoneDisplay, href: whatsappLink() },
    { icon: 'mail', label: 'Correo', value: SITE.email, href: `mailto:${SITE.email}` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <Reveal>
        <Badge tone="fire" icon="map">Visítanos</Badge>
        <h1 className="mt-4 font-display text-5xl text-chrome md:text-6xl">
          ESTAMOS EN <span className="text-gradient-fire">MONTERÍA</span>
        </h1>
        <p className="mt-3 max-w-xl text-fog">
          Ven a nuestra tienda física, pruébate los cascos y recibe asesoría experta. O pídelo en
          línea con entrega el mismo día.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        {/* map */}
        <Reveal>
          <div className="surface clip-corner overflow-hidden rounded-2xl">
            <iframe
              title="Ubicación La Clínica del Casco en Montería"
              src={SITE.mapsEmbed}
              className="h-[420px] w-full border-0 grayscale-[0.3]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <Button href={SITE.mapsLink} variant="outline" className="mt-4" icon="map">
            Abrir en Google Maps
          </Button>
        </Reveal>

        {/* contact + hours */}
        <Reveal delay={0.1}>
          <div className="space-y-6">
            <div className="surface rounded-2xl p-6">
              <h2 className="font-heading text-xl font-700 uppercase tracking-wide text-chrome">Contacto</h2>
              <ul className="mt-4 space-y-4">
                {contact.map((c) => (
                  <li key={c.label} className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-fire/10 text-fire">
                      <Icon name={c.icon} size={20} />
                    </span>
                    <div>
                      <p className="font-heading text-xs font-600 uppercase tracking-wider text-fog">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-chrome hover:text-fire">{c.value}</a>
                      ) : (
                        <p className="text-chrome">{c.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-5">
                <span className="text-sm text-fog">Síguenos</span>
                <SocialLinks size={16} />
              </div>
            </div>

            <div className="surface rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <Icon name="clock" size={20} className="text-fire" />
                <h2 className="font-heading text-xl font-700 uppercase tracking-wide text-chrome">Horarios</h2>
              </div>
              <ul className="mt-4 space-y-3">
                {SITE.hours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between border-b border-white/5 pb-3 text-sm last:border-0 last:pb-0">
                    <span className="text-chrome">{h.day}</span>
                    <span className="text-fog">{h.time}</span>
                  </li>
                ))}
              </ul>
              <Badge tone="green" icon="clock" className="mt-4">Atención online 24/7</Badge>
            </div>
          </div>
        </Reveal>
      </div>

      {/* hooks */}
      <div className="mt-16">
        <Reveal><SectionTitle center eyebrow="Por qué comprarnos" title="Más cerca, más rápido" /></Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {HOOKS.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.08}>
              <div className="surface clip-corner h-full rounded-xl p-6 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-fire/10 text-fire">
                  <Icon name={h.icon} size={28} />
                </span>
                <h3 className="mt-4 font-heading text-lg font-700 uppercase text-chrome">{h.title}</h3>
                <p className="mt-1 text-sm text-fog">{h.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
