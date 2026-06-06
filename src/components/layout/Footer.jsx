import { Link } from 'react-router-dom';
import Logo from '../Logo';
import Icon from '../Icon';
import SocialLinks from '../SocialLinks';
import { Badge } from '../ui';
import { SITE, HOOKS } from '../../data/site';
import { CATEGORIES } from '../../data/products';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-white/5 bg-ink-800">
      {/* hooks strip */}
      <div className="border-b border-white/5">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3 md:px-6">
          {HOOKS.map((h) => (
            <div key={h.title} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-fire/10 text-fire">
                <Icon name={h.icon} size={22} />
              </span>
              <div>
                <p className="font-heading font-700 uppercase tracking-wide text-chrome">{h.title}</p>
                <p className="text-sm text-fog">{h.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fog">
            Tu punto de referencia motociclista en Montería. Cascos, accesorios y repuestos con la
            confianza de los expertos.
          </p>
          <SocialLinks className="mt-5" />
        </div>

        <div>
          <h4 className="font-heading text-sm font-700 uppercase tracking-widest text-fire">Tienda</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/catalogo" className="text-fog transition-colors hover:text-chrome">Catálogo completo</Link></li>
            {CATEGORIES.slice(0, 4).map((c) => (
              <li key={c.slug}>
                <Link to={`/catalogo?categoria=${c.slug}`} className="text-fog transition-colors hover:text-chrome">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-700 uppercase tracking-widest text-fire">Cuenta</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/cuenta/login" className="text-fog transition-colors hover:text-chrome">Iniciar sesión</Link></li>
            <li><Link to="/cuenta/registro" className="text-fog transition-colors hover:text-chrome">Crear cuenta</Link></li>
            <li><Link to="/cuenta/perfil" className="text-fog transition-colors hover:text-chrome">Mis pedidos</Link></li>
            <li><Link to="/carrito" className="text-fog transition-colors hover:text-chrome">Mi carrito</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-700 uppercase tracking-widest text-fire">Contacto</h4>
          <ul className="mt-4 space-y-3 text-sm text-fog">
            <li className="flex items-start gap-2">
              <Icon name="map" size={16} className="mt-0.5 shrink-0 text-fire" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="phone" size={16} className="shrink-0 text-fire" />
              <a href={`tel:${SITE.whatsappNumber}`} className="hover:text-chrome">{SITE.phoneDisplay}</a>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="mail" size={16} className="shrink-0 text-fire" />
              <a href={`mailto:${SITE.email}`} className="hover:text-chrome">{SITE.email}</a>
            </li>
          </ul>
          <Badge tone="green" icon="clock" className="mt-4">Disponible 24/7</Badge>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-steel sm:flex-row md:px-6">
          <p>© {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.</p>
          <p>Hecho con motor y pasión en {SITE.city}.</p>
        </div>
      </div>
    </footer>
  );
}
