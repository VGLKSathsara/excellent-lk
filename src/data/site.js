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
};

// Add new services here – each one becomes a clickable card in the SERVICE section.
export const SERVICES = [
  {
    icon: "calculator",
    title: "Premium Lot Calculator",
    text: "A trading workspace to size positions from your risk, journal trades, track wallet changes and review your progress.",
    url: "https://lost-size-calculator-frontend.vercel.app",
    cta: "Open Service",
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
