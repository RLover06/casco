import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../Logo';
import Icon from '../Icon';
import SocialLinks from '../SocialLinks';
import { useStore } from '../../context/StoreContext';

const NAV = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/ubicacion', label: 'Ubicación' },
  { to: '/nosotros', label: 'Nosotros' },
];

export default function Header() {
  const { cartCount, user } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const linkClass = ({ isActive }) =>
    `relative font-heading text-sm font-600 uppercase tracking-wider transition-colors hover:text-fire ${
      isActive ? 'text-fire' : 'text-chrome'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/40'
          : 'bg-gradient-to-b from-ink/80 to-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SocialLinks className="hidden md:flex" size={16} />

          <Link
            to={user ? '/cuenta/perfil' : '/cuenta/login'}
            aria-label="Mi cuenta"
            className="grid h-10 w-10 place-items-center rounded-md text-chrome transition-colors hover:bg-white/5 hover:text-fire"
          >
            <Icon name="user" size={22} />
          </Link>

          <Link
            to="/carrito"
            aria-label="Carrito de compras"
            className="relative grid h-10 w-10 place-items-center rounded-md text-chrome transition-colors hover:bg-white/5 hover:text-fire"
          >
            <Icon name="cart" size={22} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-fire px-1 text-[11px] font-700 text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            className="grid h-10 w-10 place-items-center rounded-md text-chrome transition-colors hover:bg-white/5 lg:hidden"
          >
            <Icon name={open ? 'x' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/5 bg-ink-800 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `rounded-md px-4 py-3 font-heading text-base font-600 uppercase tracking-wider transition-colors ${
                      isActive ? 'bg-fire/10 text-fire' : 'text-chrome hover:bg-white/5'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-3 flex items-center justify-between border-t border-white/5 px-4 pt-4">
                <span className="text-sm text-fog">Síguenos</span>
                <SocialLinks size={16} />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
