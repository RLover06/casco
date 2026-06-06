import { Link } from 'react-router-dom';
import Icon from './Icon';

/* --------------------------------- Button -------------------------------- */
const VARIANTS = {
  primary:
    'bg-gradient-to-r from-fire to-crimson text-white hover:from-fire-bright hover:to-crimson-bright glow-fire',
  outline:
    'border border-white/15 text-chrome hover:border-fire hover:text-fire bg-white/0 hover:bg-white/[0.03]',
  ghost: 'text-chrome hover:text-fire',
  dark: 'bg-ink-700 text-chrome hover:bg-ink-600 border border-white/5',
};

export function Button({
  as = 'button',
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  icon,
  ...rest
}) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };
  const cls = `inline-flex items-center justify-center gap-2 font-heading font-700 uppercase tracking-wider rounded-md transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {icon && <Icon name={icon} size={18} />}
    </>
  );

  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{content}</a>;
  const Tag = as;
  return <Tag className={cls} {...rest}>{content}</Tag>;
}

/* --------------------------------- Badge --------------------------------- */
export function Badge({ children, tone = 'fire', icon, className = '' }) {
  const tones = {
    fire: 'bg-fire/15 text-fire-bright border-fire/30',
    crimson: 'bg-crimson/15 text-crimson-bright border-crimson/30',
    chrome: 'bg-white/5 text-chrome border-white/10',
    green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-600 uppercase tracking-wider ${tones[tone]} ${className}`}
    >
      {icon && <Icon name={icon} size={13} />}
      {children}
    </span>
  );
}

/* ------------------------------ Section title ----------------------------- */
export function SectionTitle({ eyebrow, title, sub, center = false }) {
  return (
    <div className={center ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}>
      {eyebrow && (
        <span className="font-heading text-sm font-700 uppercase tracking-[0.3em] text-fire">
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-2 text-4xl md:text-5xl font-display text-chrome ${center ? '' : 'accent-bar'}`}>
        {title}
      </h2>
      {sub && <p className="mt-6 text-fog leading-relaxed">{sub}</p>}
    </div>
  );
}

/* ------------------------------ Star rating ------------------------------ */
export function Stars({ value = 0, size = 14 }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} de 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Icon
          key={n}
          name="star"
          size={size}
          className={n <= Math.round(value) ? 'text-fire' : 'text-steel'}
        />
      ))}
    </span>
  );
}
