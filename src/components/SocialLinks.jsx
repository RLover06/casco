import Icon from './Icon';
import { SITE } from '../data/site';

const LINKS = [
  { name: 'instagram', href: SITE.social.instagram, label: 'Instagram' },
  { name: 'facebook', href: SITE.social.facebook, label: 'Facebook' },
  { name: 'tiktok', href: SITE.social.tiktok, label: 'TikTok' },
];

export default function SocialLinks({ size = 18, className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {LINKS.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-fog transition-all hover:border-fire hover:text-fire hover:-translate-y-0.5"
        >
          <Icon name={l.name} size={size} />
        </a>
      ))}
    </div>
  );
}
