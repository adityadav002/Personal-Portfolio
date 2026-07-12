import { useEffect, useState, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiGithub,
  FiExternalLink,
  FiAlertCircle,
  FiTrendingUp,
  FiAward,
  FiGrid,
} from "react-icons/fi";
import { parseProjectDesc } from "../utils/parseProjectDesc.js";

/* ═══════════════════════════════════════════════════════════════════
   STYLES — Embedded CSS (matches project pattern)
   ═══════════════════════════════════════════════════════════════════ */
const MODAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

  /* ── Reset & tokens ──────────────────────────────────────────── */
  .pm-root *, .pm-root *::before, .pm-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pm-root {
    --pm-bg-deep:    #090909;
    --pm-bg-card:    #0d0d0d;
    --pm-bg-surface: #111111;
    --pm-bg-raised:  #161616;
    --pm-accent:     #C6FF00;
    --pm-accent-dim: rgba(198, 255, 0, 0.12);
    --pm-accent-glow:rgba(198, 255, 0, 0.25);
    --pm-border:     rgba(255, 255, 255, 0.62);
    --pm-border-med: rgba(255, 255, 255, 0.12);
    --pm-border-hi:  rgba(255, 255, 255, 0.18);
    --pm-white:      #ffffff;
    --pm-body:       rgba(255, 255, 255, 0.72);
    --pm-muted:      rgba(255, 255, 255, 0.45);
    --pm-font-head:  'Poppins', sans-serif;
    --pm-font-body:  'Inter', sans-serif;
    --pm-radius-lg:  28px;
    --pm-radius-md:  16px;
    --pm-radius-sm:  12px;
    --pm-radius-xs:  8px;
    --pm-radius-pill: 30px;
    --pm-ease:       cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* ── Overlay ─────────────────────────────────────────────────── */
  .pm-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
  }

  /* ── Modal container ─────────────────────────────────────────── */
  .pm-modal {
    position: relative;
    width: min(1500px, 80vw);
    height: 88vh;
    background: var(--pm-bg-card);
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.03),
      0 40px 100px rgba(0, 0, 0, 0.7),
      0 0 80px rgba(198, 255, 0, 0.03);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* ── Close button ────────────────────────────────────────────── */
  .pm-close {
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--pm-border-med);
    color: var(--pm-white);
    cursor: pointer;
    transition: all 0.35s var(--pm-ease);
  }
  .pm-close:hover {
    background: var(--pm-accent-dim);
    border-color: var(--pm-accent);
    color: var(--pm-accent);
    transform: rotate(90deg);
    box-shadow: 0 0 20px var(--pm-accent-dim);
  }

  /* ── Scroll wrapper ──────────────────────────────────────────── */
  .pm-scroll {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.12) transparent;
    padding: 24px 40px 24px 24px;
  }
  .pm-scroll::-webkit-scrollbar { width: 5px; }
  .pm-scroll::-webkit-scrollbar-track { background: transparent; }
  .pm-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

  /* ── Main grid: two columns ──────────────────────────────────── */
  .pm-grid {
    display: grid;
    grid-template-columns: 45% 55%;
    gap: 20px;
    min-height: 0;
  }

  /* ── LEFT PANEL ──────────────────────────────────────────────── */
  .pm-left {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding-right: 16px;
  }

  /* Project badge */
  .pm-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--pm-font-body);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--pm-accent);
  }
  .pm-badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 2px;
    background: var(--pm-accent);
    box-shadow: 0 0 10px var(--pm-accent-glow);
  }

  /* Icon + Title row */
  .pm-title-row {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .pm-icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: var(--pm-radius-sm);
    background: var(--pm-bg-surface);
    border: 1px solid var(--pm-border-med);
    color: var(--pm-accent);
    flex-shrink: 0;
    box-shadow: 0 0 24px var(--pm-accent-dim);
    transition: all 0.3s var(--pm-ease);
  }
  .pm-icon-box:hover {
    border-color: var(--pm-accent);
    box-shadow: 0 0 30px var(--pm-accent-glow);
  }
  .pm-project-title {
    font-family: var(--pm-font-head);
    font-size: clamp(40px, 2.5vw, 60px);
    font-weight: 700;
    color: var(--pm-white);
    letter-spacing: -0.01em;
    line-height: 1.05;
  }

  /* Tech pills */
  .pm-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .pm-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: var(--pm-radius-pill);
    font-family: var(--pm-font-body);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--pm-white);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--pm-border-med);
    cursor: default;
    transition: all 0.3s var(--pm-ease);
  }
  .pm-pill:hover {
    border-color: rgba(198, 255, 0, 0.35);
    background: var(--pm-accent-dim);
    transform: translateY(-2px);
    box-shadow: 0 0 16px var(--pm-accent-dim);
  }
  .pm-pill-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--pm-accent);
    flex-shrink: 0;
  }

  /* Description */
  .pm-desc {
    font-family: var(--pm-font-body);
    font-size: 15px;
    font-weight: 400;
    line-height: 1.8;
    color: var(--pm-body);
    max-width: 520px;
  }

  /* Action buttons */
  .pm-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }
  .pm-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    min-width: 150px;
    height: 52px;
    border-radius: var(--pm-radius-sm);
    font-family: var(--pm-font-body);
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.35s var(--pm-ease);
    position: relative;
    overflow: hidden;
  }
  .pm-btn-primary {
    background: var(--pm-accent);
    color: #050505;
    box-shadow: 0 0 30px var(--pm-accent-dim);
  }
  .pm-btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 40px var(--pm-accent-glow), 0 8px 30px rgba(198, 255, 0, 0.2);
  }
  .pm-btn-primary .pm-btn-arrow {
    transition: transform 0.3s var(--pm-ease);
  }
  .pm-btn-primary:hover .pm-btn-arrow {
    transform: translateX(4px);
  }
  .pm-btn-secondary {
    background: transparent;
    color: var(--pm-white);
    border-color: var(--pm-border-hi);
  }
  .pm-btn-secondary:hover {
    border-color: var(--pm-accent);
    color: var(--pm-accent);
    transform: translateY(-3px);
    box-shadow: 0 0 20px var(--pm-accent-dim);
  }
  .pm-btn-secondary .pm-btn-arrow {
    transition: transform 0.3s var(--pm-ease);
  }
  .pm-btn-secondary:hover .pm-btn-arrow {
    transform: translateX(4px);
  }

  /* ── RIGHT PANEL ─────────────────────────────────────────────── */
  .pm-right {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  /* Main image */
  .pm-main-image-wrap {
    position: relative;
    width: 90%;
    aspect-ratio: 16 / 9;
    border-radius: var(--pm-radius-md);
    overflow: hidden;
    border: 1px solid var(--pm-border);
    background: var(--pm-bg-surface);
    box-shadow: 0 0 40px rgba(198, 255, 0, 0.04);
  }
  .pm-main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s var(--pm-ease);
  }
  .pm-main-image-wrap:hover .pm-main-image {
    transform: scale(1.02);
  }

  /* Skeleton loader */
  .pm-skeleton {
    position: absolute;
    inset: 0;
    background: var(--pm-bg-surface);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pm-skeleton::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 3px solid var(--pm-border-med);
    border-top-color: var(--pm-accent);
    border-radius: 50%;
    animation: pm-spin 0.8s linear infinite;
  }
  @keyframes pm-spin { to { transform: rotate(360deg); } }

  /* Thumbnail strip */
  .pm-thumbs-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .pm-thumb-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--pm-border);
    color: var(--pm-white);
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.3s var(--pm-ease);
  }
  .pm-thumb-nav:hover {
    border-color: var(--pm-accent);
    color: var(--pm-accent);
    background: var(--pm-accent-dim);
    transform: translateY(-1px);
    box-shadow: 0 0 14px var(--pm-accent-dim);
  }
  .pm-thumb-strip {
    display: flex;
    gap: 12px;
    flex: 1;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 4px;
  }
  .pm-thumb-strip::-webkit-scrollbar { display: none; }

  .pm-thumb {
    flex-shrink: 0;
    width: 100px;
    height: 70px;
    border-radius: var(--pm-radius-xs);
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.3s var(--pm-ease);
    position: relative;
  }
  .pm-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s var(--pm-ease);
  }
  .pm-thumb:hover {
    transform: scale(1.06);
    border-color: var(--pm-border-hi);
    box-shadow: 0 0 12px rgba(198, 255, 0, 0.1);
  }
  .pm-thumb:hover img {
    transform: scale(1.1);
  }
  .pm-thumb--active {
    border-color: var(--pm-accent) !important;
    box-shadow: 0 0 18px var(--pm-accent-dim) !important;
    transform: scale(1.04);
  }
  .pm-thumb-label {
    position: absolute;
    bottom: 4px;
    left: 6px;
    font-family: var(--pm-font-body);
    font-size: 9px;
    font-weight: 700;
    color: rgba(255,255,255,0.7);
    text-shadow: 0 1px 4px rgba(0,0,0,0.8);
    letter-spacing: 0.04em;
  }

  /* Pagination dots */
  .pm-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding-top: 4px;
  }
  .pm-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    padding: 0;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.18);
    transition: all 0.35s var(--pm-ease);
  }
  .pm-dot--active {
    background: var(--pm-accent);
    box-shadow: 0 0 10px var(--pm-accent-glow);
    transform: scale(1.25);
  }

  /* ── BOTTOM ROW ──────────────────────────────────────────────── */
  .pm-bottom {
    display: grid;
    grid-template-columns: 45% 55%;
    gap: 20px;
    margin-top: 15px;
  }

  /* Info cards (Problem / Impact) */
  .pm-info-cards {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-right: 16px;
  }
  .pm-info-card {
    border: 1px solid var(--pm-border);
    border-radius: var(--pm-radius-sm);
    padding: 20px 22px;
    transition: all 0.35s var(--pm-ease);
  }
  .pm-info-card:hover {
    border-color: rgba(198, 255, 0, 0.2);
    box-shadow: 0 0 20px var(--pm-accent-dim);
  }
  .pm-info-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }
  .pm-info-card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 1px solid var(--pm-border);
    color: var(--pm-accent);
    flex-shrink: 0;
  }
  .pm-info-card-title {
    font-family: var(--pm-font-head);
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--pm-accent);
  }
  .pm-info-card-text {
    font-family: var(--pm-font-body);
    font-size: 14px;
    line-height: 1.4;
    color: var(--pm-body);
  }

  /* Learned card */
  .pm-learned {
    border: 1px solid var(--pm-border);
    border-radius: var(--pm-radius-sm);
    padding: 28px 22px;
    transition: all 0.35s var(--pm-ease);
  }
  .pm-learned:hover {
    border-color: rgba(198, 255, 0, 0.2);
    box-shadow: 0 0 20px var(--pm-accent-dim);
  }
  .pm-learned-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }
  .pm-learned-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 1px solid var(--pm-border);
    color: var(--pm-accent);
    flex-shrink: 0;
  }
  .pm-learned-title {
    font-family: var(--pm-font-head);
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--pm-accent);
  }
  .pm-learned-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding: 0;
  }
  .pm-learned-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    font-family: var(--pm-font-body);
    font-size: 14px;
    line-height: 1.6;
    color: var(--pm-body);
  }
  .pm-learned-bullet {
    width: 7px;
    height: 7px;
    border-radius: 2px;
    background: var(--pm-accent);
    flex-shrink: 0;
    margin-top: 6px;
    box-shadow: 0 0 8px var(--pm-accent-glow);
  }

  /* ── Lightbox ────────────────────────────────────────────────── */
  .pm-lightbox {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: zoom-out;
    padding: 24px;
  }
  .pm-lightbox img {
    max-width: 92vw;
    max-height: 92vh;
    object-fit: contain;
    border-radius: 12px;
    cursor: default;
  }
  .pm-lightbox-close {
    position: absolute;
    top: 24px;
    right: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid var(--pm-border-med);
    background: rgba(255, 255, 255, 0.06);
    color: var(--pm-white);
    cursor: pointer;
    transition: all 0.3s var(--pm-ease);
  }
  .pm-lightbox-close:hover {
    background: var(--pm-accent);
    border-color: var(--pm-accent);
    color: #050505;
    transform: rotate(90deg);
  }

  /* ── Responsive ──────────────────────────────────────────────── */
  @media (max-width: 1100px) {
    .pm-modal {
      width: min(1500px, 90vw);
      height: 90vh;
    }
    .pm-scroll { padding: 36px 32px 32px; }
    .pm-grid { grid-template-columns: 50% 50%; gap: 28px; }
    .pm-bottom { grid-template-columns: 50% 50%; gap: 28px; }
    .pm-left { padding-right: 8px; }
    .pm-info-cards { padding-right: 8px; }
  }

  @media (max-width: 900px) {
    .pm-modal {
      width: 95vw;
      height: 92vh;
      border-radius: 20px;
    }
    .pm-scroll { padding: 28px 24px 28px; }
    .pm-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .pm-left { padding-right: 0; order: 2; }
    .pm-right { order: 1; }
    .pm-bottom {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    .pm-info-cards { padding-right: 0; }
    .pm-project-title { font-size: clamp(32px, 6vw, 48px); }
    .pm-close { top: 16px; right: 16px; width: 38px; height: 38px; }
  }

  @media (max-width: 600px) {
    .pm-modal {
      width: 100vw;
      height: 100vh;
      border-radius: 0;
    }
    .pm-scroll { padding: 20px 16px 24px; }
    .pm-btn { min-width: 100%; }
    .pm-actions { flex-direction: column; }
    .pm-thumb { width: 80px; height: 56px; }
    .pm-project-title { font-size: 30px; }
    .pm-icon-box { width: 48px; height: 48px; }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
    }
  }
`;


/* ═══════════════════════════════════════════════════════════════════
   FRAMER MOTION VARIANTS
   ═══════════════════════════════════════════════════════════════════ */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 28, mass: 0.9 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const panelVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.1,
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const cardStagger = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.08,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const pillStagger = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.25 + i * 0.04,
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const imageVariants = {
  enter: { opacity: 0, scale: 0.98 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};


/* ═══════════════════════════════════════════════════════════════════
   LIGHTBOX COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
const Lightbox = memo(function Lightbox({ src, onClose }) {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <motion.div
      className="pm-lightbox"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        className="pm-lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <FiX size={18} />
      </button>
      <img
        src={src}
        alt="Screenshot fullsize"
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
});


/* ═══════════════════════════════════════════════════════════════════
   IMAGE CAROUSEL COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
const ImageCarousel = memo(function ImageCarousel({
  screenshots,
  onOpenLightbox,
}) {
  const [current, setCurrent] = useState(0);
  const [imgLoaded, setImgLoaded] = useState({});
  const thumbStripRef = useRef(null);
  const total = screenshots.length;

  const goTo = useCallback(
    (i) => {
      const idx = ((i % total) + total) % total;
      setCurrent(idx);
      // scroll thumb into view
      const strip = thumbStripRef.current;
      if (strip) {
        const thumb = strip.children[idx];
        if (thumb) {
          thumb.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    },
    [total]
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const h = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [prev, next]);

  if (total === 0) return null;

  return (
    <div className="pm-carousel">
      {/* Main image */}
      <div
        className="pm-main-image-wrap"
        onClick={() => onOpenLightbox(screenshots[current])}
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === "Enter" && onOpenLightbox(screenshots[current])
        }
        aria-label={`Screenshot ${current + 1} of ${total} — click to enlarge`}
        style={{ cursor: "zoom-in" }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={screenshots[current]}
            src={screenshots[current]}
            alt={`Project screenshot ${current + 1}`}
            className="pm-main-image"
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            loading="lazy"
            onLoad={() =>
              setImgLoaded((prev) => ({ ...prev, [current]: true }))
            }
          />
        </AnimatePresence>
        {!imgLoaded[current] && <div className="pm-skeleton" />}
      </div>

      {/* Thumbnail row */}
      {total > 1 && (
        <>
          <div className="pm-thumbs-row">
            <button
              className="pm-thumb-nav"
              onClick={prev}
              aria-label="Previous screenshot"
            >
              <FiChevronLeft size={16} />
            </button>

            <div className="pm-thumb-strip" ref={thumbStripRef}>
              {screenshots.map((src, i) => (
                <div
                  key={i}
                  className={`pm-thumb${i === current ? " pm-thumb--active" : ""
                    }`}
                  onClick={() => goTo(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && goTo(i)}
                  aria-label={`Thumbnail ${i + 1}`}
                >
                  <img
                    src={src}
                    alt={`Thumbnail ${i + 1}`}
                    loading="lazy"
                  />
                  <span className="pm-thumb-label">
                    #{String(i + 1).padStart(3, "0")}
                  </span>
                </div>
              ))}
            </div>

            <button
              className="pm-thumb-nav"
              onClick={next}
              aria-label="Next screenshot"
            >
              <FiChevronRight size={16} />
            </button>
          </div>

          {/* Dots */}
          <div className="pm-dots">
            {screenshots.map((_, i) => (
              <button
                key={i}
                className={`pm-dot${i === current ? " pm-dot--active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to screenshot ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
});


/* ═══════════════════════════════════════════════════════════════════
   MAIN MODAL COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function Modal({
  show,
  onClose,
  linkurl,
  videourl,
  posterurl,
  desc,
  title = "Project",
  tags = [],
  screenshots = [],
  sourceCodeUrl,
  // New fields
  projectIndex = 0,
  projectNumber,
  problem,
  impact,
  learned,
}) {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const modalRef = useRef(null);

  // Parse description for fallback data
  const parsed = parseProjectDesc(desc);
  const overviewText = parsed.overview || desc || "";
  const techChips = tags.length ? tags : parsed.techStack;

  // Project number display
  const displayNumber = projectNumber || String(projectIndex + 1).padStart(2, "0");

  // Body scroll lock
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  // ESC to close (only when lightbox is not open)
  useEffect(() => {
    if (!show) return;
    const handler = (e) => {
      if (e.key === "Escape" && !lightboxSrc) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [show, onClose, lightboxSrc]);

  // Focus trap
  useEffect(() => {
    if (!show || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const trapFocus = (e) => {
      if (e.key !== "Tab") return;

      const focusable = modal.querySelectorAll(focusableSelector);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", trapFocus);

    // Auto-focus close button
    const closeBtn = modal.querySelector(".pm-close");
    if (closeBtn) closeBtn.focus();

    return () => window.removeEventListener("keydown", trapFocus);
  }, [show]);

  if (!show) return null;

  return (
    <div className="pm-root">
      <style>{MODAL_STYLES}</style>

      <AnimatePresence>
        {show && (
          <motion.div
            className="pm-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} project details`}
          >
            <motion.div
              className="pm-modal"
              ref={modalRef}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                className="pm-close"
                onClick={onClose}
                aria-label="Close modal"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <FiX size={20} />
              </motion.button>

              {/* Scrollable content */}
              <div className="pm-scroll">
                {/* ── Main two-column grid ─────────────────── */}
                <div className="pm-grid">
                  {/* ── LEFT PANEL ──────────────────────────── */}
                  <motion.div
                    className="pm-left"
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                  >
                    {/* Badge */}
                    <motion.div
                      className="pm-badge"
                      variants={cardStagger}
                      initial="hidden"
                      animate="visible"
                      custom={0}
                    >
                      <span className="pm-badge-dot" />
                      PROJECT {displayNumber}
                    </motion.div>

                    {/* Icon + Title */}
                    <motion.div
                      className="pm-title-row"
                      variants={cardStagger}
                      initial="hidden"
                      animate="visible"
                      custom={1}
                    >
                      <div className="pm-icon-box">
                        <FiGrid size={28} />
                      </div>
                      <h1 className="pm-project-title">{title}</h1>
                    </motion.div>

                    {/* Tech Pills */}
                    {techChips.length > 0 && (
                      <div className="pm-pills">
                        {techChips.map((tech, i) => (
                          <motion.span
                            key={i}
                            className="pm-pill"
                            variants={pillStagger}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                          >
                            <span className="pm-pill-dot" />
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    )}

                    {/* Description */}
                    {overviewText && (
                      <motion.p
                        className="pm-desc"
                        variants={cardStagger}
                        initial="hidden"
                        animate="visible"
                        custom={3}
                      >
                        {overviewText}
                      </motion.p>
                    )}

                    {/* Action buttons */}
                    <motion.div
                      className="pm-actions"
                      variants={cardStagger}
                      initial="hidden"
                      animate="visible"
                      custom={4}
                    >
                      {linkurl && (
                        <motion.a
                          href={linkurl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pm-btn pm-btn-primary"
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Live Preview
                        </motion.a>
                      )}
                      {sourceCodeUrl && (
                        <motion.a
                          href={sourceCodeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pm-btn pm-btn-secondary"
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FiGithub size={17} />
                          Source Code
                        </motion.a>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* ── RIGHT PANEL ─────────────────────────── */}
                  <motion.div
                    className="pm-right"
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                  >
                    <ImageCarousel
                      screenshots={screenshots}
                      onOpenLightbox={(src) => setLightboxSrc(src)}
                    />
                  </motion.div>
                </div>

                {/* ── Bottom row ────────────────────────────── */}
                <motion.div
                  className="pm-bottom"
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  {/* Bottom left — Problem & Impact */}
                  <div className="pm-info-cards">
                    {problem && (
                      <motion.div
                        className="pm-info-card"
                        variants={cardStagger}
                        initial="hidden"
                        animate="visible"
                        custom={5}
                      >
                        <div className="pm-info-card-header">
                          <div className="pm-info-card-icon">
                            <FiAlertCircle size={18} />
                          </div>
                          <span className="pm-info-card-title">
                            {problem.title || "PROBLEM"}
                          </span>
                        </div>
                        <p className="pm-info-card-text">
                          {problem.description}
                        </p>
                      </motion.div>
                    )}

                    {impact && (
                      <motion.div
                        className="pm-info-card"
                        variants={cardStagger}
                        initial="hidden"
                        animate="visible"
                        custom={6}
                      >
                        <div className="pm-info-card-header">
                          <div className="pm-info-card-icon">
                            <FiTrendingUp size={18} />
                          </div>
                          <span className="pm-info-card-title">
                            {impact.title || "IMPACT"}
                          </span>
                        </div>
                        <p className="pm-info-card-text">
                          {impact.description}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Bottom right — What I Learned */}
                  {learned && learned.length > 0 && (
                    <motion.div
                      className="pm-learned"
                      variants={cardStagger}
                      initial="hidden"
                      animate="visible"
                      custom={5}
                    >
                      <div className="pm-learned-header">
                        <div className="pm-learned-icon">
                          <FiAward size={18} />
                        </div>
                        <span className="pm-learned-title">
                          WHAT I LEARNED
                        </span>
                      </div>
                      <ul className="pm-learned-list">
                        {learned.map((item, i) => (
                          <motion.li
                            key={i}
                            className="pm-learned-item"
                            variants={cardStagger}
                            initial="hidden"
                            animate="visible"
                            custom={6 + i}
                          >
                            <span className="pm-learned-bullet" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <Lightbox
            src={lightboxSrc}
            onClose={() => setLightboxSrc(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}