import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="La Clínica del Casco - Inicio">
      <span className="relative grid h-10 w-10 place-items-center rounded-md bg-gradient-to-br from-fire to-crimson text-white transition-transform group-hover:rotate-[-6deg]">
        <Icon name="helmet" size={24} strokeWidth={2} />
      </span>
      <span className="leading-none">
        <span className="block font-display text-xl tracking-wide text-chrome">
          LA CLÍNICA <span className="text-gradient-fire">DEL CASCO</span>
        </span>
        <span className="block font-heading text-[10px] uppercase tracking-[0.35em] text-fog">
          Montería · Moto Gear
        </span>
      </span>
    </Link>
  );
}
