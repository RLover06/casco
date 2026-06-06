// Lightweight inline icon set (stroke-based, currentColor) so we ship zero
// icon-font weight and everything inherits the theme color.

const PATHS = {
  helmet: (
    <>
      <path d="M3 13a9 9 0 0 1 18 0v3a1 1 0 0 1-1 1h-6l-1.5 3h-4l1-3H4a1 1 0 0 1-1-1z" />
      <path d="M9 13h11" />
    </>
  ),
  glove: (
    <>
      <path d="M7 11V6a1.5 1.5 0 0 1 3 0v4m0 0V4.5a1.5 1.5 0 0 1 3 0V10m0 0V5.5a1.5 1.5 0 0 1 3 0V13a6 6 0 0 1-6 6H9.5a4 4 0 0 1-3-1.4L4 14.5a1.6 1.6 0 0 1 2.4-2.1L8 14" />
    </>
  ),
  jacket: (
    <>
      <path d="M9 3 5 5 3 9l3 1v10h12V10l3-1-2-4-4-2" />
      <path d="M12 3v17M9 3l3 3 3-3" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </>
  ),
  bolt: <path d="M13 2 3 14h7l-1 8 10-12h-7z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  truck: (
    <>
      <path d="M1 3h13v10H1zM14 7h4l3 3v3h-7z" />
      <circle cx="6" cy="17" r="2" />
      <circle cx="18" cy="17" r="2" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2 3h3l2.4 12.4a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 7H6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  star: <path d="m12 2 3 6.5 7 .8-5.2 4.8 1.4 6.9L12 17.8 5.4 21l1.4-6.9L1.6 9.3l7-.8z" />,
  check: <path d="M20 6 9 17l-5-5" />,
  arrow: <path d="M5 12h14m-6-7 7 7-7 7" />,
  arrowLeft: <path d="M19 12H5m6 7-7-7 7-7" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  x: <path d="M18 6 6 18M6 6l12 12" />,
  trash: (
    <>
      <path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  map: (
    <>
      <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 6 10 7L22 6" />
    </>
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  shield: <path d="M12 2 4 5v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V5z" />,
  whatsapp: (
    <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.9.9-2.8-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5 0a6.5 6.5 0 0 1-1.9-1.2 7.2 7.2 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 0 0 0-.4l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8c2 .8 2 .5 2.4.5a2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14 9V7c0-1 .3-1.5 1.6-1.5H17V2.2C16.6 2.1 15.5 2 14.5 2 12 2 10.3 3.5 10.3 6.3V9H8v3.2h2.3V22h3.4v-9.8h2.5L17 9z" />
  ),
  tiktok: (
    <path d="M16 3c.3 2.3 1.7 3.8 4 4v3c-1.4 0-2.8-.4-4-1.1V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.2A2.8 2.8 0 1 0 13 15V3z" />
  ),
  fire: <path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-1 .3-2 1-3-2 1-4 3.5-4 7a7 7 0 0 0 14 0c0-6-7-12-7-12z" />,
  badge: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="m8.5 13-1.5 8 5-3 5 3-1.5-8" />
    </>
  ),
};

export default function Icon({ name, size = 24, className = '', strokeWidth = 1.8, ...rest }) {
  const fillIcons = ['whatsapp', 'facebook', 'tiktok', 'bolt', 'star'];
  const isFill = fillIcons.includes(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFill ? 'currentColor' : 'none'}
      stroke={isFill ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {PATHS[name] ?? null}
    </svg>
  );
}
