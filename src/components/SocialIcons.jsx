// Small inline SVG icons (no extra downloads). All use currentColor.
const ICONS = {
  telegram: (
    <path
      fill="currentColor"
      stroke="none"
      d="M21.9 4.3a1.2 1.2 0 0 0-1.2-.2L2.9 11a1.1 1.1 0 0 0 .1 2.1l4.5 1.4 1.7 5.3a1.1 1.1 0 0 0 1.8.5l2.5-2.3 4.6 3.4a1.2 1.2 0 0 0 1.9-.7l3.1-15.1a1.2 1.2 0 0 0-.2-1.3zM9.6 14.1l8.2-5-6.3 6.6-.3 2.6-1.6-4.2z"
    />
  ),
  whatsapp: (
    <>
      <path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6L3 21z" />
      <path d="M9 9.5c.5 2 2.5 4 5 5l1.3-1.3-2-1-1 .8c-.8-.4-1.5-1.1-1.9-1.9l.8-1-1-2L9 9.5z" />
    </>
  ),
  tiktok: <path d="M14 3v11.2a3.6 3.6 0 1 1-3.6-3.6M14 3c.4 2.4 2 4 4.6 4.2" />,
  facebook: (
    <path
      fill="currentColor"
      stroke="none"
      d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8z"
    />
  ),
};

export default function SocialIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}
