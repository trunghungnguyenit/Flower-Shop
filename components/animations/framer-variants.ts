// ================================================================
// FRAMER MOTION ANIMATION VARIANTS - PREMIUM SCROLL ANIMATIONS
// ================================================================

// Premium easing curve - smooth and elegant
export const premiumEase = [0.25, 0.1, 0.25, 1] as const
export const smoothSpring = { type: "spring", stiffness: 100, damping: 15 }

// Base transition settings
export const baseTransition = {
  duration: 0.6,
  ease: premiumEase,
}

// ========================
// FADE ANIMATIONS
// ========================
export const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { ...baseTransition, duration: 0.7 }
  },
  exit: { opacity: 0, y: -20 }
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: baseTransition
  },
  exit: { opacity: 0 }
}

// ========================
// SCALE ANIMATIONS
// ========================
export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: baseTransition
  },
  exit: { opacity: 0, scale: 0.95 }
}

export const scaleInUp = {
  initial: { opacity: 0, scale: 0.96, y: 28 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { ...baseTransition, duration: 0.7 }
  },
}

// ========================
// SLIDE ANIMATIONS
// ========================
export const slideInLeft = {
  initial: { opacity: 0, x: -32 },
  animate: {
    opacity: 1,
    x: 0,
    transition: baseTransition
  },
  exit: { opacity: 0, x: -30 }
}

export const slideInRight = {
  initial: { opacity: 0, x: 32 },
  animate: {
    opacity: 1,
    x: 0,
    transition: baseTransition
  },
  exit: { opacity: 0, x: 30 }
}

// ========================
// STAGGER CONTAINERS
// ========================
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

export const staggerContainerFast = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
}

export const staggerContainerSlow = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  }
}

// ========================
// STAGGER ITEMS
// ========================
export const staggerItem = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase }
  }
}

export const staggerItemScale = {
  initial: { opacity: 0, y: 20, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: premiumEase }
  }
}

export const staggerItemLeft = {
  initial: { opacity: 0, x: -32 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: premiumEase }
  }
}

export const staggerItemRight = {
  initial: { opacity: 0, x: 32 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: premiumEase }
  }
}

// ========================
// SECTION TITLE ANIMATION
// ========================
export const sectionTitleVariants = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: premiumEase,
    }
  }
}

// ========================
// CARD HOVER ANIMATIONS
// ========================
export const cardHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: { duration: 0.25, ease: premiumEase }
  }
}

export const iconHover = {
  rest: { rotate: 0 },
  hover: {
    rotate: 3,
    transition: { duration: 0.2, ease: premiumEase }
  }
}