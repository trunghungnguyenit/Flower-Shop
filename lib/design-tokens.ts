/**
 * Design Tokens - Hoa Tươi Đà Nẵng
 * Premium Design System v2.0
 * ================================================
 * Phong cách: Sang trọng – Cao cấp – Tinh tế – Pastel
 */

// ================================================
// 🎨 COLOR PALETTE PREMIUM PASTEL
// ================================================
export const colors = {
  // Brand Colors
  primary: "#D97C8A",           // Hồng pastel sang trọng
  primaryDark: "#C56A79",       // Hover/Active state
  primaryLight: "#E8A4AF",      // Light variant

  // Accent Colors
  secondary: "#FAF7F8",         // Nền nhẹ nhàng
  accentGold: "#F7D88A",        // Vàng pastel - điểm nhấn luxury
  accentRose: "#E8C4C8",        // Rose pastel

  // Semantic Colors
  success: "#4CAF50",
  warning: "#FFC107",
  danger: "#E64A4A",
  info: "#5C9CE5",

  // Text Colors
  textPrimary: "#2A2A2A",
  textSecondary: "#6F6F6F",
  textMuted: "#9A9A9A",
  textLight: "#FFFFFF",

  // UI Colors
  borderSoft: "#EAEAEA",
  borderMedium: "#D8D8D8",
  background: "#FFFFFF",
  backgroundMuted: "#FDF9FA",
  backgroundAlt: "#FAF7F8",

  // Shadow Colors
  shadowLight: "rgba(0,0,0,0.04)",
  shadowMedium: "rgba(0,0,0,0.08)",
  shadowDark: "rgba(0,0,0,0.12)",
  shadowPrimary: "rgba(217,124,138,0.25)",
} as const;

// ================================================
// 🔠 TYPOGRAPHY SYSTEM (Việt hóa - Premium)
// ================================================
export const typography = {
  fontFamily: {
    // Primary: Elegant serif for headings
    display: '"Playfair Display", "Noto Serif", Georgia, serif',
    // Secondary: Clean sans-serif for body
    body: '"Inter", "Be Vietnam Pro", "SF Pro Text", system-ui, sans-serif',
    // Mono for code
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },

  fontSize: {
    // Headings
    h1: "clamp(48px, 5vw, 64px)",
    h2: "clamp(36px, 4vw, 44px)",
    h3: "clamp(26px, 3vw, 30px)",
    h4: "clamp(20px, 2.5vw, 24px)",

    // Body
    bodyLarge: "18px",
    body: "17px",
    bodySmall: "15px",

    // Caption & Small
    caption: "14px",
    small: "13px",
    tiny: "11px",
  },

  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.15,
    heading: 1.25,
    body: 1.65,
    relaxed: 1.8,
  },

  letterSpacing: {
    tight: "-0.02em",
    normal: "0",
    wide: "0.02em",
    wider: "0.05em",
    widest: "0.15em",
  },
} as const;

// ================================================
// 📏 SPACING & LAYOUT SYSTEM
// ================================================
export const spacing = {
  // Base spacing scale
  px: "1px",
  0: "0",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  7: "28px",
  8: "32px",
  10: "40px",
  12: "48px",
  14: "56px",
  16: "64px",
  20: "80px",
  24: "96px",
  28: "112px",
  32: "128px",
  40: "160px",

  // Semantic spacing
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "40px",
  "2xl": "64px",
  "3xl": "96px",
  "4xl": "128px",

  // Section padding
  sectionY: "clamp(80px, 10vw, 140px)",
  sectionYSmall: "clamp(60px, 8vw, 100px)",

  // Component gaps
  cardGap: "24px",
  gridGap: "28px",
} as const;

export const layout = {
  // Container widths
  maxWidth: "1240px",
  maxWidthNarrow: "960px",
  maxWidthWide: "1400px",

  // Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
} as const;

// ================================================
// 🔲 BORDER RADIUS
// ================================================
export const radius = {
  none: "0",
  soft: "6px",
  medium: "12px",
  large: "20px",
  xl: "28px",
  "2xl": "36px",
  round: "999px",
  full: "50%",
} as const;

// ================================================
// 🌫 SHADOW & ELEVATION
// ================================================
export const shadows = {
  // Card shadows
  card: "0 6px 22px rgba(0,0,0,0.06)",
  cardHover: "0 10px 36px rgba(0,0,0,0.12)",
  cardLifted: "0 16px 48px rgba(0,0,0,0.14)",

  // UI shadows
  sm: "0 2px 8px rgba(0,0,0,0.04)",
  md: "0 4px 16px rgba(0,0,0,0.06)",
  lg: "0 8px 32px rgba(0,0,0,0.08)",
  xl: "0 12px 48px rgba(0,0,0,0.10)",

  // Special shadows
  header: "0 4px 16px rgba(0,0,0,0.08)",
  dropdown: "0 8px 24px rgba(0,0,0,0.12)",
  modal: "0 24px 64px rgba(0,0,0,0.18)",

  // Glow effects
  glowPrimary: "0 0 24px rgba(217,124,138,0.35)",
  glowGold: "0 0 20px rgba(247,216,138,0.4)",

  // Inner shadows
  inner: "inset 0 2px 4px rgba(0,0,0,0.04)",
} as const;

// ================================================
// 🎬 ANIMATION TOKENS
// ================================================
export const animation = {
  // Easing functions
  ease: {
    default: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
  },

  // Durations
  duration: {
    instant: "50ms",
    fast: "150ms",
    normal: "250ms",
    slow: "400ms",
    slower: "600ms",
    slowest: "1000ms",
  },

  // Predefined animations
  fadeUp: {
    from: { opacity: 0, transform: "translateY(24px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    duration: "0.6s",
  },

  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: "0.4s",
  },

  scaleIn: {
    from: { opacity: 0, transform: "scale(0.95)" },
    to: { opacity: 1, transform: "scale(1)" },
    duration: "0.3s",
  },

  slideLeft: {
    from: { opacity: 0, transform: "translateX(-24px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    duration: "0.5s",
  },

  slideRight: {
    from: { opacity: 0, transform: "translateX(24px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    duration: "0.5s",
  },

  // Stagger delays
  stagger: {
    fast: "0.05s",
    normal: "0.08s",
    slow: "0.12s",
  },

  // Hover effects
  hover: {
    scale: "scale(1.03)",
    lift: "translateY(-4px)",
  },
} as const;

// ================================================
// 🧊 BLUR & EFFECTS
// ================================================
export const effects = {
  blur: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "24px",
  },

  glass: {
    light: "rgba(255, 255, 255, 0.85)",
    medium: "rgba(255, 255, 255, 0.75)",
    dark: "rgba(255, 255, 255, 0.6)",
  },

  gradient: {
    primary: "linear-gradient(135deg, #D97C8A 0%, #E8A4AF 100%)",
    gold: "linear-gradient(135deg, #F7D88A 0%, #FFE4A0 100%)",
    hero: "linear-gradient(to top, rgba(217,124,138,0.4) 0%, rgba(217,124,138,0.15) 35%, transparent 70%)",
    overlay: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)",
  },
} as const;

// ================================================
// 📦 COMPONENT SPECIFIC TOKENS
// ================================================
export const components = {
  button: {
    height: {
      sm: "36px",
      md: "44px",
      lg: "52px",
      xl: "60px",
    },
    padding: {
      sm: "0 16px",
      md: "0 24px",
      lg: "0 32px",
      xl: "0 40px",
    },
  },

  input: {
    height: "48px",
    padding: "14px 18px",
    borderWidth: "1.5px",
  },

  card: {
    padding: {
      sm: "16px",
      md: "24px",
      lg: "32px",
    },
  },

  header: {
    height: "80px",
    heightScrolled: "68px",
  },
} as const;

// ================================================
// TYPE EXPORTS
// ================================================
export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
export type ShadowToken = keyof typeof shadows;
export type FontSizeToken = keyof typeof typography.fontSize;
