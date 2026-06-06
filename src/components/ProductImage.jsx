import Icon from './Icon';
import { CATEGORIES } from '../data/products';

const ICON_BY_CATEGORY = {
  cascos: 'helmet',
  guantes: 'glove',
  chaquetas: 'jacket',
  accesorios: 'gear',
  repuestos: 'bolt',
};

// Renders a branded, gradient SVG-style tile for a product. Using generated
// art keeps the demo fully offline; swap for <img src={product.image}/> later.
export default function ProductImage({ product, className = '', iconSize = 96 }) {
  const accent = CATEGORIES.find((c) => c.slug === product.category)?.accent ?? '#ff5a1f';
  const iconName = ICON_BY_CATEGORY[product.category] ?? 'helmet';

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(120% 120% at 70% 10%, ${accent}22, transparent 55%), linear-gradient(160deg, #1a1a1e, #0a0a0b)`,
      }}
    >
      {/* diagonal speed lines */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `repeating-linear-gradient(115deg, ${accent} 0 2px, transparent 2px 22px)`,
        }}
      />
      <div
        className="absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl"
        style={{ background: accent, opacity: 0.25 }}
      />
      <Icon name={iconName} size={iconSize} strokeWidth={1.2} style={{ color: accent }} className="relative drop-shadow-lg" />
      <span className="absolute bottom-3 left-3 font-display text-xs tracking-widest text-white/40">
        LCC
      </span>
    </div>
  );
}
