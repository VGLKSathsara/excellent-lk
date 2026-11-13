// Single source of truth for content. Edit text here as the site grows.

export const NAV = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "service", label: "SERVICE" },
  { id: "prices", label: "PRICES" },
];

export const SECTION_IDS = NAV.map((n) => n.id);

export const HERO = {
  badge: "Fast · Smart · Reliable",
  titleTop: "Welcome to",
  titleBrand: "Excellent.lk",
  text: "Your digital partner in Sri Lanka. We build, grow and support your online presence with speed and precision.",
};

export const ABOUT = {
  title: "About Excellent.lk",
  text: "Excellent.lk is a growing digital brand built around speed, clarity and quality. This section is a placeholder – replace it with your real story, mission and team.",
  stats: [
    { value: "100+", label: "Projects" },
    { value: "50+", label: "Clients" },
    { value: "24/7", label: "Support" },
  ],
  // Shown as "Connect with us" in the About section.
  socials: [
    { id: "telegram", label: "Telegram", handle: "@excellent_lk", url: "https://t.me/excellent_lk" },
    { id: "whatsapp", label: "WhatsApp", handle: "+94 70 371 4386", url: "https://wa.me/94703714386" },
    { id: "tiktok", label: "TikTok", handle: "@excellentlk", url: "https://www.tiktok.com/@excellentlk" },
    { id: "facebook", label: "Facebook", handle: "Follow our page", url: "https://www.facebook.com/share/1ECv43UeP1/" },
  ],
};

// Add new services here – each one becomes a clickable card in the SERVICE section.
export const SERVICES = [
  {
    icon: "calculator",
    title: "Premium Lot Calculator",
    text: "A trading workspace to size positions from your risk, journal trades, track wallet changes and review your progress.",
    url: "https://lost-size-calculator-frontend.vercel.app",
    cta: "Open Service",
    telegram: "https://t.me/PremiumLotCalculator",
  },
];

export const PRICES = [
  {
    name: "Starter",
    price: "LKR 0",
    note: "Placeholder price",
    features: ["Single-page website", "Mobile friendly", "Basic SEO"],
  },
  {
    name: "Business",
    price: "LKR 0",
    note: "Placeholder price",
    features: ["Multi-section website", "Contact forms", "Analytics setup", "Priority support"],
    featured: true,
  },
  {
    name: "Pro",
    price: "LKR 0",
    note: "Placeholder price",
    features: ["Custom features", "User login", "Admin tools", "Dedicated support"],
  },
];
